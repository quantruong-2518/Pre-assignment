import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { QuestionType } from 'src/app/models/Question.model';
import { QuestionService } from 'src/app/services/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss'],
})
export class AddQuestionModalComponent implements OnInit {
  public isOpen = false;
  public currentType = QuestionType.Paragraph;

  public questions!: FormArray;
  public questionFB!: FormGroup;
  public answerOptions!: FormArray;

  private readonly _subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.getQuestions();
    this.initForm();
  }

  public getQuestions(): void {
    this.questions = this._questionService.questionsFB.get(
      'questions'
    ) as FormArray;
  }

  public initForm(): void {
    this.questionFB = this.fb.group({
      id: null,
      content: [null, Validators.required],
      type: [QuestionType.Paragraph, Validators.required],
      required: false,
      answerOptions: this.fb.array([]),
      hasOther: false,
    });

    this.answerOptions = this.questionFB.controls['answerOptions'] as FormArray;

    this.initOptionsFormArray(QuestionType.Paragraph);
    this.observeTypeChange();
  }

  public observeTypeChange(): void {
    this._subscription.add(
      this.questionFB.controls['type'].valueChanges.subscribe(
        (type: QuestionType) => {
          this.currentType = type;
          this.resetOptionFormArray();

          if (!this.answerOptions.length) {
            this.initOptionsFormArray(type);
          }
        }
      )
    );
  }

  // * Adding some kind of answers

  public addCheckbox() {
    this.answerOptions.push(
      this.fb.group({
        checked: false,
        content: [null, Validators.required],
      })
    );
  }
  public addParagraphField() {
    this.answerOptions.push(
      this.fb.group({
        checked: true,
        content: [null, Validators.required],
      })
    );
  }
  public addOtherAnswer() {
    this.answerOptions.push(
      this.fb.group({
        checked: false,
        content: 'Order',
      })
    );
  }
  public removeOption(index: number) {
    this.answerOptions.removeAt(index);
  }

  // * FormArray implementations
  // ---------------------
  public initOptionsFormArray(type: QuestionType): void {
    const defaultChildArray = +type === QuestionType.Paragraph ? [] : [1, 2];
    for (const item of defaultChildArray) {
      this.addCheckbox();
    }
  }
  public resetOptionFormArray() {
    while (this.answerOptions.length !== 0) {
      this.answerOptions.removeAt(0);
    }
  }
  // ---------------------

  public get isCheckboxQuestion(): boolean {
    return this.questionFB.controls['type'].value == QuestionType.Checkbox;
  }

  public onSubmit(): void {
    this.currentType === QuestionType.Paragraph && this.addParagraphField();

    // * create question ID
    this.questionFB.get('id')?.patchValue(this.questions.length);

    // * add other question if needed
    this.questionFB.get('hasOther')?.value && this.addOtherAnswer();

    // * submit form
    const formClone = _.cloneDeep(this.questionFB);
    this.questions.push(formClone);

    // * close modal
    this.closeModal();
  }

  // * Modals interactions
  // ---------------------
  public openModal() {
    this.isOpen = true;
  }
  public closeModal() {
    this.initForm();
    this.isOpen = false;
  }
  // ---------------------
}
