import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../models/quiz';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,RouterModule,QuestionComponent],
  templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit {
  quizes:Quiz[]=[]
  currentIndex=-1
  constructor(
    private readonly quizService:QuizService,
  ){}
ngOnInit(): void {
   this.quizService.onNextQuiz$.subscribe(()=>{
    if(this.currentIndex === this.quizService.loadedQuizzes.length-1)
      this.currentIndex=-1;
    else ++this.currentIndex;
   }) 
}
  onStartQuiz(){
    this.quizService.reloadQuizes();
    this.quizes = [...this.quizService.loadedQuizzes];
    this.currentIndex=0
  }
}
