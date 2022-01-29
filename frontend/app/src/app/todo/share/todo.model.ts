export class Todo {
  _id: number;
  comment: string;
  completed: boolean;
  day: string;
}

export class Res {
  success : boolean;
  message : string;
  status : number;
  data : Todo[] = [];
}
