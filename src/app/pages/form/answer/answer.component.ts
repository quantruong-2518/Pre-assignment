import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { IQuestion, IOption } from 'src/app/models/Question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  public questions!: Array<IQuestion>;

  constructor(
    private _questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAnswers();
  }

  public getAnswers(): void {
    const rawQuestions = this._questionService.questionsFB.value
      .questions as Array<IQuestion>;

    this.questions = rawQuestions.map((question: IQuestion) => {
      const checkedAnswer = question.answerOptions.filter(
        (option: IOption) => !!option.checked
      );
      return { ...question, answerOptions: checkedAnswer };
    });
  }

  public backToBuilder(): void {
    this._questionService.resetQuestionFB();
    this.router.navigate(['form', 'builder']);
  }
}
