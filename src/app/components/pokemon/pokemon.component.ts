import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {

  @Input() pokemon: Pokemon = {
    id: 0,
    name: '',
    sprite: '',
    caught: false
  };

  constructor() { }

}
