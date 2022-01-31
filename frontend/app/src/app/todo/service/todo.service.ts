import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../share/todo.model"
import { Res } from "../share/todo.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const URL = 'httP://localhost:8080/todo';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient){}

  getTodayTodo(date : string):Observable<Res>{
    return this.http.get<Res>(URL +'?day='+date);
  }

  getAllTodo():Observable<Res>{
    return this.http.get<Res>(URL);
  }

  addTask(data: { comment: string; day: string }):Observable<object>{
    return this.http.post<object>(URL, data);
  }

  editTodo(task: { comment: string; _id: number; completed: boolean}):Observable<Todo>{
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put<Todo>(URL + '/' + task._id, task, httpOptions);
  }

  deleteTodo(id:number){
    return this.http.delete(URL + '/' + id)
      .pipe(map((res:any) => res)).subscribe();
  }

  makeCompleted(task: {_id: number; completed: boolean}):Observable<Todo>{
    return this.http.put<Todo>(URL + '/' + task._id, task, httpOptions);
  }
}
