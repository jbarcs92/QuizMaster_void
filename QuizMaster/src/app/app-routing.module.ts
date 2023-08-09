import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizCreateComponent } from './components/quiz-create/quiz-create.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizEditComponent } from './components/quiz-edit/quiz-edit.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'admin/new', component: QuizCreateComponent },
  { path: 'admin/edit/:id', component: QuizEditComponent },
  { path: 'admin', component: QuizListComponent }  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }