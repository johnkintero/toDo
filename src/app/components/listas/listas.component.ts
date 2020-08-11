import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista : IonList;
  @Input() terminada = true;

  constructor(public _actividadesService : ActividadesService, private router : Router, private _alertControler : AlertController) { }

  ngOnInit() {}

  agregarItemsLista( idLista : number){
    console.log(this.terminada);
    
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${idLista}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);
    }
  }
  borrarLista(lista: Lista){
    this._actividadesService.borrarLista(lista);
  }
  async prompEditarNombre(lista : Lista){
    const alert = await this._alertControler.create({
      cssClass:'',
      header: 'Editar Nombre',
      inputs:[
        {
          name:'nuevoTitulo',
          type:'text',
          value: lista.titulo
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          cssClass:'secondary',
          handler: () =>{
            this.lista.closeSlidingItems();
          }
        },
        {
          text :'Actualizar',
          handler : (data)=>{
            lista.titulo = data.nuevoTitulo;
            this._actividadesService.guardarStorage(); 
            this.lista.closeSlidingItems();
            }
          }
      ]
    });
    await alert.present();
  }

}
