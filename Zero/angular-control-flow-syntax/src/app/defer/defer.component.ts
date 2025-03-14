// import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-defer',
  imports: [],
  // imports: [NgIf], // Sólo para el contexto de cómo es convencionalmente.
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss'
})
export class DeferComponent {
  // Permite cargar contenido de forma diferida, según una condición
  // Mejora el rendimiento, aplica Lazy-Loading ya que retrasa la carga de partes NO críticas.
  // En este caso permite postergar la carga de la imagen (Lazy-Loading) hasta que se presione el botón.
  protected isImageVisible = false;

  showImage() {
    this.isImageVisible = true;
  }
}
