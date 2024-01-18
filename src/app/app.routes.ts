import { Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { QuestionsComponent } from './questions/questions.component';

export const routes: Routes = [
    {path:"",component:QuestionsComponent,pathMatch:"full"},
    // {path:":id",component:QuestionComponent,pathMatch:"full",},
];
