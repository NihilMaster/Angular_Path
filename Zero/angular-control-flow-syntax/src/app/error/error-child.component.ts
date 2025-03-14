import { Component } from '@angular/core';

@Component({
    selector: 'app-error-child',
    standalone: true,
    imports: [],
    template: '<p>Contenido que nunca va a cargar</p>'
})
export class ErrorComponentChild {
    constructor() {
        throw new Error("Simulated Load Error");
    }
}