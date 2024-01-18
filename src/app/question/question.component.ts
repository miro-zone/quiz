import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../models/quiz';
import { relative } from 'path';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements OnInit {
  quiz?: Quiz;

  showAnswer = false;
  hintsCount = 0;
  relatedQuizes: Quiz[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const id = pm.get('id');
      if (!id || !Number(id)) return;
      this.quiz = this.quizService.getQuestion(+id);
      if (this.quiz?.id)
        this.relatedQuizes = this.quizService.getRelatedQuestion(this.quiz.id);
    });
  }

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
    this.showAnswer = false;
    this.hintsCount = 0;
    this.router.navigate(['/' + this.quizService.nextQuestionId()]);
  }
}
