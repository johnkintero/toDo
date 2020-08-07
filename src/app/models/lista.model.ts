import { ListaItem } from './lista-item.model';

export class Lista {
    id : number;
    titulo : string;
    creadaEn : Date;
    terminadaEn: Date;
    completada : boolean;
    items : ListaItem[];

    constructor( _titulo : string ){
        this.titulo = _titulo;
        this.creadaEn = new Date();
        this.completada = false;
        this.items =[];
        this.id = new Date().getTime();
    }
}