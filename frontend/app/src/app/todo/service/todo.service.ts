import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../share/todo.model"


const URL = '/todo';
const ShareDate = {
  "comment": "운동하기",
  "day": "2022-01-27"
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient){}

  // getSomedayTodo(date : string):Observable<Todo[]>{
  //   return this.http.get<Todo[]>(URL +'/day?day='+date);
  // }

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


  addTask(data: { comment: string; _id: number; completed: boolean; day: string }):Observable<Todo>{
    console.log("성공");
    return this.http.post<Todo>(URL, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
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
