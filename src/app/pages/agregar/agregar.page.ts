import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista : Lista;
  nombreItem = "";
  items : ListaItem[] = [];
  constructor(private _serviceActividades : ActividadesService, private _activeRoute : ActivatedRoute) {
    const listaId = this._activeRoute.snapshot.paramMap.get('listaId');
    this.lista =  this._serviceActividades.ObtenerLista( listaId );
    this.items = this.lista.items;

   }

  ngOnInit() {
 
  }

  AgregarItem(){
    //nombreItem se llena desde el html vinculando el modelo utilizando en el control
    //input [(NgModel)] = nombreItem esto hace que lo que se ingrese en el input quede 
    // en la variable
    // () = emiten un evento
    // [] = escuchan evento
    // el NgModel escucha y emite eventos

    //valido que exista el nombre
   if( this.nombreItem.length === 0){
      return;
   }
   // creo un nuevo item enviado el nombre al constructor del item
   const nuevoItem = new ListaItem( this.nombreItem );
   //inserto el nuevo item a la lista de items de la lista actual.
   this.lista.items.push( nuevoItem );
   this.nombreItem = '';

   this._serviceActividades.guardarStorage();
  }

  cambioCheck(item : ListaItem){
    //guarda en la variable la cantidad de items pendientes
    const pendientes = this.lista.items
                          .filter(itemData => !itemData.completado)
                          .length;
    console.log({pendientes});

    //valida si el total de pendientes es 0 entonces actualiza la actividade
    // a completada
    if(pendientes === 0){
     this.lista.terminadaEn = new Date();
     this.lista.completada =  true; 
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }
    
    //Guarda la informacion en el storage
    this._serviceActividades.guardarStorage();
  }

  borrarItem(i : number){
    this.lista.items.splice(i,1);
    this._serviceActividades.guardarStorage();
  }

}
