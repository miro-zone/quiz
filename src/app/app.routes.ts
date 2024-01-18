import { Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:"",component:HomeComponent,pathMatch:"full"},
    {path:":id",component:QuestionComponent,pathMatch:"full",},
];
