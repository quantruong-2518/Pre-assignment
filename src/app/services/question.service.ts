import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { IQuestion } from '../models/Question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public questionsFB = this.fb.group({
    questions: this.fb.array([]),
  }) as FormGroup<{ questions: FormArray }>;

  constructor(private fb: FormBuilder) {}

  public resetQuestionFB(): void {
    this.questionsFB = this.fb.group({
      questions: this.fb.array([]),
    });
  }
}
