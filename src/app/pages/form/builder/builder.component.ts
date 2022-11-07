import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddQuestionModalComponent } from 'src/app/components/_dialogs/add-question-modal/add-question-modal.component';
import { IQuestion } from 'src/app/models/Question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  public questionsFormArray!: FormArray;
  public questionsFB!: FormGroup<{ questions: FormArray }>;

  @ViewChild('dialog')
  private createQuestionModal!: AddQuestionModalComponent;

  constructor(
    private _questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.questionsFB = this._questionService.questionsFB;

    this.questionsFormArray = this.questionsFB.get('questions') as FormArray;
  }
  public retrieveQuestions(): void {}

  public trackByFnc(index: number, question: FormControl) {
    return index;
  }

  public review(): void {
    this.router.navigate(['form', 'answers']);
  }

  public openModal(): void {
    this.createQuestionModal.openModal();
  }
}
