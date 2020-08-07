import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  listas : Lista[] = [];

  constructor() { 
    const LISTA1 = new Lista('Recolectar piedras');
    const LISTA2 = new Lista('Héroes');
    this.listas.push(LISTA1,LISTA2);
  }

  AgregarLista(nombre:string): number{
    console.log('Llego al servicio');
    let newList : Lista =  null;
      newList = new Lista(nombre);
      this.listas.push(newList);
      
    return this.listas.find(lista => lista.titulo == nombre).id;
  }

  //crea un item en el localstorage del cliente que se puede ver con las herramientas de desarollador
  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  //recupera la informacion del localstorage
  cargarStorage(){
    if ( localStorage.getItem('data')) {
      this.listas = JSON.parse( localStorage.getItem('data'));
    }
  }

}
