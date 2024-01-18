import { Injectable } from '@angular/core';
import { Quiz } from './models/quiz';
import quizes from '../assets/data.json';
import relations from '../assets/data-relation.json';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  nextQuestionId(): number {
    const index = Math.floor(Math.random() * quizes.length);
    const q = quizes[index];
    return q.id;
  }

  getRelations() {
    return relations;
  }
  getQuestion(id: number): Quiz {
    const q = quizes.find((q) => q.id === id);
    if (!q) throw new Error('No question match id: ' + id);
    const { question, answer, hints, image } = q;
    const quiz = new Quiz(question, answer, hints, image);
    // Bind id to object
    quiz.id = id;
    return quiz;
  }
}
