import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrainerComponent } from './components/trainer-profile/trainer-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CatchButtonComponent } from './components/catch-button/catch-button.component';
import { ReleaseButtonComponent } from './components/release-button/release-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    TrainerPage,
    PokemonCataloguePage,
    PokemonComponent,
    TrainerComponent,
    HeaderComponent,
    LoginFormComponent,
    PokemonListComponent,
    CatchButtonComponent,
    ReleaseButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
