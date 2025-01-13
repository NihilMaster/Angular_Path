import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'; // URL base de la API

  constructor(private http: HttpClient) { }

  // Obtener lista de Pokemones
  getPokemonList(limit: number = 100, offset: number = 0): Observable<any> {
    console.log(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonById(id: number): Observable<any> {
    console.log(`${this.apiUrl}/${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
