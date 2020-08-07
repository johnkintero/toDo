import { Component } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public _actividadesService : ActividadesService, private router :  Router,
              private _alertControler : AlertController ) {
                console.log(this._actividadesService.listas);
              }
  
  async promptNuevaLista(){
    const alert = await this._alertControler.create({
      cssClass:'',
      header:'Nueva Lista!',
      inputs:[
        {
          name:'Nombrelista',
          type:'text',
          placeholder:'Nombre lista'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role:'cancel',
          cssClass:'secondary',
          handler: ()=>{
            console.log('Seguro que desea Cancelar');
          }
        },{
          text:'Crear',
          handler:(data)=>{
            if (data.Nombrelista.length > 0) {
              this._actividadesService.AgregarLista(data.Nombrelista);
            }
            else{ return; }
          }
        }
      ]
    });
    await alert.present();
  }

  agregarLista(){
    this.router.navigateByUrl('/tabs/tab1/agregar');
  }

}
