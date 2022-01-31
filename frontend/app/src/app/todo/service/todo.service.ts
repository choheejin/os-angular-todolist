import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../share/todo.model"
import { Res } from "../share/todo.model";


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

  getSomedayTodo(date : string):Observable<Todo[]>{
    return this.http.get<Todo[]>(URL +'/day?day='+date);
  }

  getAllTodo():Observable<Res>{
    return this.http.get<Res>(URL);
  }

  addTask(data: { comment: string; day: string }):Observable<object>{
    return this.http.post<object>(URL, data);
  }

  editTodo(task: Todo):Observable<Todo[]>{
    return this.http
      .put(URL + '/' + task._id, task)
      .pipe(map((response: any) => response));
  }

  deleteTodo(id:number){
    return this.http.delete(URL + '/' + id)
      .pipe(map((res:any) => res)).subscribe();
  }
}
