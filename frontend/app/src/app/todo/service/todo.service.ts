import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../share/todo.model"
const URL = '/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient){}

  getSomedayTodo():Observable<Task[]>{
    return this.http.get<Task[]>(URL + '/day');
  }

  getTodayTodo():Observable<Task[]>{
    return this.http.get<Task[]>(URL + '/today');
  }

  getCmpTodayTodo():Observable<Task[]>{
    return this.http.get<Task[]>(URL + '/today/complited');
  }

  getNotCmpTodayTodo():Observable<Task[]>{
    return this.http.get<Task[]>(URL + '/today/notComplited');
  }

  getCompletedTodo(task: Todo):Observable<Task[]>{
    return this.http.get<Task[]>(URL + '/completed' + task._id);
  }


  addTask(task: Todo):Observable<Todo>{
    return this.http.post<Todo>(URL, task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
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
}
