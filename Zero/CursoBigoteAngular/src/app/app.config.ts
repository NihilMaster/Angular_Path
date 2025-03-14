import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {

  // ZoneJS:
  // Mecanismo tradicional para la detección de cambios en Angular.
  // ZoneJS es una librería utilizada por Angular para interceptar eventos asíncronos 
  // (como clics, temporizadores o peticiones HTTP) y automatizar la detección de 
  // cambios en los componentes. `eventCoalescing: true` mejora el rendimiento al 
  // agrupar múltiples eventos asíncronos en un único ciclo de detección de cambios, 
  // reduciendo la carga sobre el framework. Proporciona una detección de cambios 
  // global en toda la aplicación, lo que puede ser más sencillo de configurar pero 
  // menos eficiente en aplicaciones con alto volumen de eventos.
  //providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]

  // Zoneless:
  // Alternativa experimental a ZoneJS, que permite un control más granular de la detección de cambios.
  // En este enfoque, la responsabilidad de disparar la detección de cambios recae en el desarrollador, 
  // lo que puede resultar en una mayor optimización en aplicaciones que manejan eventos de forma intensiva.
  // Al eliminar ZoneJS, se reduce el overhead asociado a la interceptación de eventos asíncronos, 
  // lo que resulta en un mejor rendimiento en escenarios específicos.
  providers: [
    provideExperimentalZonelessChangeDetection(), 
    provideRouter(routes, withComponentInputBinding()), // withComponentInputBinding() permite el acceso directo a las propiedades de los componentes
    provideHttpClient(withFetch()), // provideHttpClient() permite el uso de HTTP en la aplicación, usando el fetch API en este caso
    provideClientHydration()] // provideClientHydration() permite la sincronización del estado de la aplicación con el servidor, hidratando el estado de la aplicación en el navegador por parte del cliente
};

