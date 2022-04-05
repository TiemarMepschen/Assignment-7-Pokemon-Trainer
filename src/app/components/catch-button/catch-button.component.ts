import { Component, Input } from '@angular/core';
import { StorageUtil } from 'src/app/utils/storage.util';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { CaughtPokemonService } from 'src/app/services/caught-pokemon.service';
import { User } from 'src/app/models/user.module';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent {

  @Input() pokemonId: number = 0;

  constructor(
    private readonly caughtPokemonService: CaughtPokemonService
  ) { }

  onCatchClick(): void {

    const pokemonArray = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)
    if (pokemonArray !== undefined) {
      const index = pokemonArray.findIndex(pokemon => pokemon.id === this.pokemonId)
      if (pokemonArray[index] !== undefined) {
        pokemonArray[index].caught = true;
      }
      // add pokemon to user pokemon
      this.caughtPokemonService.updatePokemon(pokemonArray[index])
      .subscribe({
        next: (response: User) => {
        },
        error: (error: HttpErrorResponse) => {
          alert("ERROR: " + error.message)
        }
      })

      // update local storage
      StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemon, pokemonArray)
    }
  }
}
