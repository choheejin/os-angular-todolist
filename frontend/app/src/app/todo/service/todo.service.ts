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

  // getSomedayTodo(date : string):Observable<Todo[]>{
  //   return this.http.get<Todo[]>(URL +'/day?day='+date);
  // }

  getAllTodo():Observable<Res>{
    return this.http.get<Res>(URL + '/all');
  }

  getTodayTodo():Observable<Todo[]>{
    return this.http.get<Todo[]>(URL + '/today');
  }

  getCmpTodayTodo():Observable<Todo[]>{
    return this.http.get<Todo[]>(URL + '/today/complited');
  }

  getNotCmpTodayTodo():Observable<Todo[]>{
    return this.http.get<Todo[]>(URL + '/today/notComplited');
  }

  getCompletedTodo(task: Todo):Observable<Todo[]>{
    return this.http.get<Todo[]>(URL + '/completed' + task._id);
  }


  addTask(data: { comment: string; day: string }):Observable<object>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.post<object>(URL, data, httpOptions);
  }

  editTodo(task: Todo):Observable<Todo[]>{
    return this.http
      .put(URL + '/' + task._id, task)
      .pipe(map((response: any) => response));
  }

  deleteTask(id: number){
    return this.http.delete(URL + '/' + id)
      .pipe(map((res:any) => res));
  }

  updateTodo(task: Todo): Observable<Todo[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Todo[]>(URL + '/' + task._id, task, httpOptions);
  }
}
