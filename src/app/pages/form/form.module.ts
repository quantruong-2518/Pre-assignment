import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ? Modules
import { FormRoutingModule } from './form-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// ? Components
import { FormComponent } from './form.component';
import { BuilderComponent } from './builder/builder.component';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { AddQuestionModalComponent } from 'src/app/components/_dialogs/add-question-modal/add-question-modal.component';

import { QuestionService } from 'src/app/services/question.service';
import { FormGuard } from 'src/app/guards/form.guard';

const MODULES = [
  CommonModule,
  FormRoutingModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMPONENTS = [
  FormComponent,
  BuilderComponent,
  QuestionComponent,
  AnswerComponent,
  AddQuestionModalComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
  providers: [QuestionService, FormGuard],
})
export class FormModule {}
