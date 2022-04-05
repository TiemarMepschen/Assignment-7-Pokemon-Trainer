import { Component, Input } from '@angular/core';
import { StorageUtil } from 'src/app/utils/storage.util';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { Region } from 'src/app/models/region.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage {

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { }

  currentRegion: Region = {
    name: "Kanto",
    start: 1,
    end: 151
  }

  regions: Region[] = [
    {name: "Kanto", start: 1, end: 151},
    {name: "Johto", start: 152, end: 251},
    {name: "Hoenn", start: 252, end: 386},
    {name: "Sinnoh", start: 387, end: 493},
    {name: "Unova", start: 494, end: 649},
    {name: "Kalos", start: 650, end: 721},
    {name: "Alola", start: 722, end: 809},
    {name: "Galar", start: 810, end: 898},
    {name: "Forms", start: 899, end: 1126}
  ]

  handleClicked(region: Region): void {
    this.currentRegion = region;
  }

  get pokemonList() {
    const pokemonArray = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)
    if (pokemonArray !== undefined) {
      return pokemonArray
    } else {
      this.pokemonCatalogueService.findAllPokemon()
      const pokemonArray = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)
      return pokemonArray!
    }
    return []
  }

}
