### **Ejercicio Completo: Gestión de Tareas Dinámicas con Angular**

#### **Descripción General**

Crea una aplicación de gestión de tareas donde el usuario pueda agregar, editar, eliminar y marcar tareas como completadas. La aplicación debe responder dinámicamente a las interacciones del usuario y utilizar formularios reactivos para la gestión de datos.

---

### **Requisitos Funcionales**

1. **Agregar Tarea:**

   - Formulario reactivo con validaciones (campo requerido y longitud mínima).
   - Botón de envío deshabilitado si el formulario es inválido.
   - Al agregar la tarea, esta debe mostrarse en la lista.
2. **Listar Tareas:**

   - Mostrar las tareas en una lista con la opción de marcar como completada.
   - Aplicar estilos dinámicos a las tareas completadas (ej. tachado o color diferente).
3. **Editar Tarea:**

   - Botón para editar el contenido de una tarea.
   - Al hacer clic, el texto debe cambiar a un campo editable.
   - Guardar cambios con un botón de confirmación.
4. **Eliminar Tarea:**

   - Botón para eliminar tareas individuales.
   - Confirmar antes de eliminar.
5. **Filtrar Tareas:**

   - Opciones para filtrar por **Todas**, **Completadas** y **Pendientes**.
   - Usa directivas para mostrar u ocultar tareas según el filtro.
6. **Persistencia Temporal:**

   - Guardar las tareas en el almacenamiento local del navegador (`localStorage`).
   - Al recargar la página, recuperar las tareas almacenadas.

---

### **Requisitos Técnicos**

1. **Directivas Estructurales (`*ngIf`, `*ngFor`):**

   - Mostrar/ocultar contenido según el estado de la lista.
   - Iterar sobre la lista de tareas para mostrarlas dinámicamente.
2. **Directivas de Atributo (`[ngClass]`, `[disabled]`, `[hidden]`):**

   - Aplicar estilos según el estado de la tarea (ej. completada).
   - Deshabilitar el botón de enviar si el formulario es inválido.
3. **Lifecycle Hooks:**

   - **`ngOnInit`:** Cargar las tareas desde `localStorage` al iniciar.
   - **̶`̶n̶g̶O̶n̶C̶h̶a̶n̶g̶e̶s̶`̶:** ̶D̶e̶t̶e̶c̶t̶a̶r̶ ̶c̶a̶m̶b̶i̶o̶s̶ ̶e̶n̶ ̶e̶l̶ ̶f̶i̶l̶t̶r̶o̶ ̶d̶e̶ ̶t̶a̶r̶e̶a̶s̶.̶(Este hook no sirve con un *select*)
   - **`ngModelCheck`:** Detectar cambios en el filtro de tareas.
   - **`ngDoCheck`:** Validar si todas las tareas están completadas para mostrar un mensaje.
   - **`ngAfterViewInit`:** Ejecutar lógica después de que la vista esté cargada.
   - **`ngOnDestroy`:** Guardar las tareas antes de que el componente se destruya.
4. **Formulario Reactivo:**

   - Usar `FormGroup` y `FormControl` para manejar el formulario de tareas.
   - Validar que el campo de la tarea no esté vacío y tenga al menos 3 caracteres.
   - Mostrar mensajes de error en tiempo real.
5. **Eventos (`(click)`, `(keyup.enter)`):**

   - Agregar tarea al presionar Enter.
   - Marcar como completada al hacer clic.
   - Eliminar o editar tareas mediante botones.
6. **Pipes (`async`, personalizados si es necesario):**

   - Utilizar `async` si decides implementar carga simulada con observables.
   - Crear un pipe para filtrar tareas si deseas modularizar esa lógica.

---

### **Pistas por Funcionalidad**

- **Agregar Tarea:** Usa un `FormGroup` con validadores (`Validators.required`, `Validators.minLength`).
- **Filtrado:** Implementa filtros con `*ngIf` o un pipe personalizado.
- **Estilos Dinámicos:** Aplica `[ngClass]` para cambiar el estilo según el estado.
- **Persistencia:** Maneja `localStorage` en `ngOnInit` y `ngOnDestroy`.
- **Carga Simulada:** Usa `setTimeout` en `ngAfterViewInit` para simular la carga de tareas.
- **Confirmación al Eliminar:** Usa `window.confirm()` para pedir confirmación.

---

### **Extensión Opcional**

- Implementa paginación si hay muchas tareas.
- Añade animaciones al agregar o eliminar tareas.
- Integra un sistema de prioridades (alta, media, baja) para cada tarea.

Este ejercicio integra todos los conceptos de directivas, *templates*, *lifecycle hooks* y formularios. ¡Ideal para poner en práctica tus conocimientos!
