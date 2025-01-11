import { LabelCategoryComponent } from './label-category.component';
/*
describe('LabelCategoryComponent', () => {
    let component: LabelCategoryComponent;


    beforeEach(() => {
        component = new LabelCategoryComponent();
        component.id = "1";
        component.textContent = 'New Category';

    });

 
  it('should display the correct text content', () => {
    component.textContent = 'New Category';

    expect(component.textContent).toBe('New Category');
  });

  
  it('should call handleOnClick when button is clicked', () => {
    const spy = jest.spyOn(component, 'handleOnClick');

    //crear el botón dentro del test
    const button = document.createElement('button');
    button.addEventListener('click', () => component.handleOnClick());
    
    //agregar btn al DOM 
    document.body.appendChild(button);

    button.click();

    // verificar si el método handleOnClick fue llamado
    expect(spy).toHaveBeenCalled();

    document.body.removeChild(button);
  });

  it('should call handleOnClick and emit the correct parameters', () => {
    const emitSpy = jest.spyOn(component.onClick, 'emit');

    component.handleOnClick();

    // verificar si el método emit fue llamado con los parámetros correctos
    expect(emitSpy).toHaveBeenCalledWith({
      id: "1",
      category: 'New Category'
    });
  });

});*/
