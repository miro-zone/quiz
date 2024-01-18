import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './question.component.html',
})
export class QuestionComponent   {
@Input() quiz!:Quiz;

  showAnswer = false;
  hintsCount = 0;
  constructor(
    private readonly quizService: QuizService
  ) {}

 get relatedQuizzes(){
  return this.quizService.getRelatedQuizzes(this.quiz.id||1);
 } 

  get hints(): string[] {
    if (!this.quiz) return [];
    return this.quiz.hints.slice(0, this.hintsCount);
  }
  onRelated(relatedQuiz:Quiz){
    this.hintsCount=0;
    this.showAnswer=false;
    this.quiz = relatedQuiz;
  }

  isAvailableHint() {
    if (!this.quiz) return;
    const { hints } = this.quiz;
    return hints.length && this.hintsCount < hints.length;
  }

  onNextQuestion() {
    this.hintsCount=0;
    this.showAnswer=false;
    this.quizService.onNextQuiz$.next();
  }
}
