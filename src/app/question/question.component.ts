import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../models/quiz';
import { EventEmitter } from 'stream';

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
  relatedQuizes: Quiz[] = [];
  constructor(
    private readonly quizService: QuizService
  ) {}

  

  get hints(): string[] {
    if (!this.quiz) return [];
    return this.quiz.hints.slice(0, this.hintsCount);
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
