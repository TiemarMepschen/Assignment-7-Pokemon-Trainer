import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { }

  ngOnInit(): void { }

  handleLogin(): void {
    this.pokemonCatalogueService.findAllPokemon();
    this.router.navigateByUrl('/pokemon');
  }
}
