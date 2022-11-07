import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { QuestionService } from '../services/question.service';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanActivate {
  constructor(
    private _questionService: QuestionService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const questions = this._questionService.questionsFB.value.questions;

    if (questions.length) {
      return true;
    } else {
      return this.router.navigate(['form', 'builder']);
    }
  }
}
