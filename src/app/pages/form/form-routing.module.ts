import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGuard } from 'src/app/guards/form.guard';

import { AnswerComponent } from './answer/answer.component';
import { BuilderComponent } from './builder/builder.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'builder',
    pathMatch: 'full',
  },
  {
    path: 'builder',
    component: BuilderComponent,
  },
  {
    path: 'answers',
    canActivate: [FormGuard],
    component: AnswerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
