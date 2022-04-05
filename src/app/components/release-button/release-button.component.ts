import { Component, Input } from '@angular/core';
import { StorageUtil } from 'src/app/utils/storage.util';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { CaughtPokemonService } from 'src/app/services/caught-pokemon.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.module';

@Component({
  selector: 'app-release-button',
  templateUrl: './release-button.component.html',
  styleUrls: ['./release-button.component.css']
})
export class ReleaseButtonComponent {

  @Input() pokemonId: number = 0;

  constructor(
    private readonly caughtPokemonService: CaughtPokemonService
  ) { }

  onReleaseClick(): void {

    const pokemonArray = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)
    if (pokemonArray !== undefined) {
      const index = pokemonArray.findIndex(pokemon => pokemon.id === this.pokemonId)
      if (pokemonArray[index] !== undefined) {
        pokemonArray[index].caught = false;
      }
      // remove pokemon from user pokemon
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
