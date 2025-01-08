import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-label-category',
  templateUrl: './label-category.component.html',
  styleUrls: ['./label-category.component.css']
})
export class LabelCategoryComponent implements OnInit {

  @Input()
  id:string='';

  @Input()
  textContent:string='';

  hover:boolean=false;

  @Output()
  onClick: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void {
  }

  handleOnClick(): void{

    this.onClick.emit({id:this.id,category:this.textContent});

  }

 

}
