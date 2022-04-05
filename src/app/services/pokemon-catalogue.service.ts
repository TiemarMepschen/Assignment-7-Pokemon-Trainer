import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { UserService } from './user.service';
import { User } from '../models/user.module';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  private _pokemon: Pokemon[] = [
    { id: 0, name: '', sprite: '', caught: false },
  ];
  private _error: string = '';

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) {}

  public get pokemon(): Pokemon[] | undefined {
    return this._pokemon;
  }

  public get error(): string {
    return this._error;
  }

  public findAllPokemon(): void {
    this.http.get<Pokemon[]>(apiPokemon).subscribe({
      next: (pokemon: any) => {
        const pokemonArray: Pokemon[] = this.createPokemonArray(
          pokemon.results
        );
        StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemon, pokemonArray);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      },
    });
  }

  public createPokemonArray(
    pokemon: [{ name: string; url: string }]
  ): Pokemon[] {
    let pokemonArray: Pokemon[] = [];
    
    // check if user is stored in local storage
    if (this.userService.trainer === undefined) {
      throw new Error("Pokemon-catalogue: User is not logged in")
    }
    const user = this.userService.trainer;

    for (let i = 0; i < pokemon.length; i++) {
      // get id from url
      const url: string[] = pokemon[i].url.split('/');
      const id: number = Number(url[6]);

      // check if pokemon is already contained in the trainer's pokemon list
      let caught: boolean = false;
      if (user.pokemon.includes(pokemon[i].name, 0)) {
        caught = true;
      }

      // create sprite url
      let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        // add pokemon to array
        pokemonArray.push({id: id, name: pokemon[i].name, sprite: imgUrl, caught: caught})
    }

    return pokemonArray;
  }
}
