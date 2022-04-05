import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.module';
import { UserService } from './user.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root',
})
export class CaughtPokemonService {
  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) {}

  public updatePokemon(pokemon: Pokemon): Observable<User> {
    // check if there is a user stored in localStorage
    if (!this.userService.trainer) {
      throw new Error('updatePokemon: There is no user');
    }
    const user: User = this.userService.trainer;

    // get current list of pokemon from user
    let pokemonArray: string[] = user.pokemon;

    // add or remove pokemon from array based on the caught boolean
    if (pokemon.caught) {
      const index = pokemonArray.indexOf(pokemon.name);
      // check if pokemon is already stored in array
      if (index === -1) {
        pokemonArray.push(pokemon.name);
      } else {
        throw new Error(
          'updatePokemon: The pokemon is already contained in trainers collection'
        );
      }
    } 
    else {
      const index = pokemonArray.indexOf(pokemon.name);
      // check if pokemon is contained in array
      if (index > -1) {
        pokemonArray.splice(index, 1);
      } else {
        throw new Error(
          'updatePokemon: The pokemon is not contained in trainers collection'
        );
      }
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    this._loading = true;
    // update api with a patch request with userId and pokemon list
    return this.http
      .patch<User>(
        `${apiTrainers}/${user.id}`,
        {
          pokemon: pokemonArray,
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.trainer = updatedUser;
        }),
        finalize(() => {
          this._loading = false;
        })
      );
  }
}
