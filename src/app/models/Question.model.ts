export enum QuestionType {
  Paragraph = 1,
  Checkbox = 2,
}

export interface IOption {
  checked: boolean;
  content: string;
}

export interface IQuestion {
  id: number;
  content: string;
  answerOptions: Array<IOption>;
  required: boolean;
  type: QuestionType;
  hasOther: boolean;
}
