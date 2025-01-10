import { Component, EventEmitter, OnInit, Output } from '@angular/core';
/**
 * Componente reutilizable para la creacion de inputs de entrada / barra de busqueda.
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
   /**
   * Variable que almacena el contenido ingresado por el usuario del input del template.
   */
  searchQuery: string = '';

   /**
   * Captura la funcion que le pasa el componente padre por parametro y puede ejecutarla.
   */
  @Output()
  searchChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * A traves de searchChange, ejecuta la funcion del padre y le envia el string ingresado en el input html.
   * Obtiene los caracteres ingresados por el usuario en el input del template.
   */
  onSearchChange() {
    this.searchChange.emit(this.searchQuery); 
  }

}
