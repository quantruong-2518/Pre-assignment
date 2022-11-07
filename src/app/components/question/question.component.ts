import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IQuestion, QuestionType } from 'src/app/models/Question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() public question!: any;

  public questionFG!: FormGroup;
  public otherAnswer = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.questionFG = this.question;
  }

  public get isParagraphQuestion(): boolean {
    return this.question.value.type == QuestionType.Paragraph;
  }

  public get answerOptions(): FormArray {
    return this.question.get('answerOptions') as FormArray;
  }

  public changeOtherAnswer($event: any): void {
    const lastElementIdx = this.answerOptions.controls.length - 1;
    this.answerOptions.controls[lastElementIdx].patchValue({
      checked: true,
      content: `Other - ${$event.target.value}`,
    });
  }
}
