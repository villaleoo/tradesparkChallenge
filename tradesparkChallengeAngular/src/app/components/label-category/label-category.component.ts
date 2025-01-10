import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Componente reutilizable para la creacion de etiquetas con botones.
 */
@Component({
  selector: 'app-label-category',
  templateUrl: './label-category.component.html',
  styleUrls: ['./label-category.component.css']
})

export class LabelCategoryComponent implements OnInit {
  /**
   * Identificador unico para una etiqueta.
   */
  @Input()
  id:string='';

  /**
   * Contenido de la etiqueta.
   */
  @Input()
  textContent:string='';

   /**
   * Detecta el mouse encima del button de la etiqueta.
   */
  hover:boolean=false;

  /**
   * Captura la funcion que le pasa el componente padre por parametro y puede ejecutarla.
   */
  @Output()
  onClick: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Se ejecuta cuando se hace click en el button del template.
   * @returns Emite un evento que contiene el id de la etiqueta y su contenido de tipo string. 
   */
  handleOnClick(): void{

    this.onClick.emit({id:this.id,category:this.textContent});

  }

 

}
