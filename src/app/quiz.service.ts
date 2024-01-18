import { Injectable  } from '@angular/core';
import { Quiz } from './models/quiz';
import quizes from '../assets/data.json';
import relations from '../assets/data-relation.json';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuizService   {


  onNextQuiz$ = new Subject<void>;
  loadedQuizzes:Quiz[];

  constructor() {
    this.loadedQuizzes = [...quizes];
    this.reloadQuizes();
  }

  
  getRelations() {
    return relations;
  }
  
  getQuiz(id: number): Quiz {
    const q = quizes.find((q) => q.id === id);
    if (!q) throw new Error('No question match id: ' + id);
    const { question, answer, hints, image } = q;
    const quiz = new Quiz(question, answer, hints, image);
    // Bind id to object
    quiz.id = id;
    return quiz;
  }

  getRelatedQuizzes(id:number){
    const relatedQuizesIndexs:number[] = relations[id.toString() as keyof typeof relations]||[];
    const relatedQuizes = quizes.filter(q=>relatedQuizesIndexs.includes(q.id));
    return relatedQuizes;
  }

   reloadQuizes(){
    this.loadedQuizzes.sort(()=>Math.random()-0.5);
  }
}
