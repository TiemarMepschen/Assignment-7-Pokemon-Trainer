import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.module';
import { environment } from 'src/environments/environment';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  //login
  public login(username: string): Observable<User> {
    return this.checkTrainerName(username)
    .pipe(
      switchMap((trainer: User | undefined) => {
        if (trainer === undefined) {
          // user does not exist
          return this.createTrainer(username);
        }
        return of(trainer)
      })
    )
  }

  // check if user exists
  private checkTrainerName(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      // RxJs operators
      map((response: User[]) => response.pop())
    )
  }

  // Create a user
  private createTrainer(username: string): Observable<User> {
    // trainer
    const trainer = {
      username,
      pokemon: []
    };

    // headers
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    // POST request
    return this.http.post<User>(apiTrainers, trainer, {
      headers
    })
  }
}
