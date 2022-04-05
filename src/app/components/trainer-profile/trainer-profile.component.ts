import { Component } from '@angular/core';
import { User } from 'src/app/models/user.module';
import { Pokemon } from 'src/app/models/pokemon.model';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';

@Component({
  selector: 'app-trainer-proflie',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerComponent {

  get user(): User | undefined {
    return this.userService.trainer;
  }

  nameToPokemon(pokemonName: string): Pokemon {
    const pokemonArray = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon);
    const pokemon = pokemonArray!.find(pokemon => pokemon.name === pokemonName);
    if (pokemon !== undefined) {
      return pokemon
    }
    return {
      id: 0,
      name: '',
      sprite: '',
      caught: false
    }
  }

  


  namesToPokemon(pokemonNameList: string[]): Pokemon[] {
    return pokemonNameList.map(pokemon => this.nameToPokemon(pokemon))
  }

  constructor(
    private readonly userService: UserService
  ) { }

}
