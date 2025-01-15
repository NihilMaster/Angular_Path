# Angular Path

## Índice

- Primer
- Pokeapi (SPA)
- Tasks

## Teoría:

Componentes:

- HTML: Maquetación
- CSS/SCSS: Estilización
- TypeScript: Lógica

Templates y directivas:

- Estructurales: Cambian el DOM (e.g., *ngIf, *ngFor).
- Atributos: Modifican el comportamiento visual (e.g., [ngClass], [ngStyle]).

Data Binding:
Sincronización modelo-vista de 4 formas:

1. Interpolación: {{ dato }}
2. Binding unidireccional: [propiedad]="valor"
3. Binding de eventos: (evento)="función()"
4. Binding bidireccional: [(ngModel)]="dato"

Servicio e Inyección de Dependencias:
Los Servicios encapsula lógica reutilizable como la interacción con APIs.
La Inyección permite usar estos servicios en componentes.

Módulos:
El módulo raíz es AppModule, pero se pueden crear a la necesidad del proyecto.
Estos agrupan componentes relacionados.

Arquitectura:
Maneja flujos asíncronos sobre eventos y respuestas

Universal y PWA:
Soporta apps universales (Renderizado del lado del servidor) y progresivas (PWA).

Renderizado:

* (SPA) Single Page Application:
  La aplicación completa se carga en el cliente y se carga una sola página. La apariencia de navegar a través de la aplicación se controla dinámicamente a través de JavaScript en el cliente.
* (SSR) Server Side Rendering:
  En lugar de entregar la aplicación completamente al cliente, la aplicación se ejecutará en un servidor externo. Se pueden hacer solicitudes de páginas a ese servidor, el servidor renderizará esa página y luego la entregará al cliente.
* (SSG) Static Site Generation:
  La aplicación se construye una vez para crear muchas páginas estáticas diferentes, y luego estas páginas se cargan directamente desde un servidor (en lugar de ser generadas por el servidor al instante).
