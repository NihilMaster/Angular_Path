import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { CommonModule } from '@angular/common';  // Importar CommonModule
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonById: any;
  isLoading: boolean = false;
  wasClicked: boolean = false;
  errorMessage: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.fetchPokemonList(0, 50);
  }

  fetchPokemonList(lim : number, off : number): void {
    this.isLoading = true;
    this.pokemonService.getPokemonList(lim,off).subscribe({
      next: (data) => {
        this.pokemonList = data.results;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }

  fetchPokemonById(id: number): void {
    this.wasClicked = true;
    this.pokemonService.getPokemonById(id).subscribe({
      next: (data) => {
        this.errorMessage = '';
        this.pokemonById = data;
      },
      error: (error) => {
        console.log("ErrorData",error);
        this.errorMessage = 'El Pokémon no ha sido encontrado.';
      }
    });
  }
}
