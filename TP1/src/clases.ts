export enum Region{"AR","BR","CH"};

abstract class Titulo{
    titulo: string;
    region: Array<Region>;

    constructor(titulo: string){
        this.titulo = titulo; 
        this.region = new Array();
    }

    getTitulo(): string{
        return this.titulo;
    }

    setTitulo(nuevo: string): void{
        this.titulo = nuevo;
    }

    disponible(regionD: Region): boolean{
        for (let i=0; i < this.region.length; i++) {
            if(this.region[i] == regionD){
                return true;
            }
        }
        return false;
    }

    agregarRegion(regionA: Region): void{
        this.region.push(regionA);
    }

    quitarRegion(regionQ: Region): void{
        let i = this.region.indexOf(regionQ);
        this.region.splice(i,1)
    }


}

export class Sistema{
    Usuarios: Array<Usuario>;
    Biblioteca: Array<Titulo>;

    constructor(){
        this.Usuarios = new Array();
        this.Biblioteca = new Array();
    }

    agregarUsuario(usuario: Usuario): boolean {
        let repetido: boolean;
        this.Usuarios.forEach(element => {
            if (element.getUsername() == usuario.getUsername()) {
                repetido = true;
            }
        });
        if (repetido == true) {
            return false;
        } else {
            this.Usuarios.push(usuario);
            return true;
        }
    }

    agregarTitulo(titulo: Titulo): void{
        this.Biblioteca.push(titulo);
    }

    buscarUsuario(nombre: String): Usuario {
        return this.Usuarios.find(Usuario => Usuario.getUsername() == nombre);
    }

    buscarTitulo(nombre: string): Array<Titulo>{
        let bibliotecaClon: Array<Titulo>;
        for (let i=0; i < this.Biblioteca.length; i++) {
            if(this.Biblioteca[i].titulo == nombre){
                bibliotecaClon.push(this.Biblioteca[i]);
            }
        }
        return bibliotecaClon;
    }
}

export class Usuario{
    nombre: string;
    region: Region;
    lista: Map<Titulo,number>;
    listaVista: Array<Titulo>;
    capsVistos: Map<Titulo,number>;

    constructor (nombre: string, region:Region){
        this.nombre = nombre;
        this.region = region;
        this.lista = new Map();
        this.listaVista = new Array();
        this.capsVistos = new Map();
    }

    getUsername(): string{
        return this.nombre;
    }

    getRegion(): Region{
        return this.region;
    }

    visto(titulo: Titulo): boolean{
        if(titulo instanceof Pelicula){
            if(this.listaVista.includes(titulo)){
                return true;
            }
        }
        else if(titulo instanceof Serie){
            if(titulo.cantidadDeCapitulos() == this.capsVistos.get(titulo)){
                return true;
            }
        }
        return false;
    }

    viendo(titulo: Titulo): boolean{  
        if(titulo instanceof Pelicula){
            if(this.lista.has(titulo)){
                return true;
            }
        }
        else if(titulo instanceof Serie){
            if(titulo.cantidadDeCapitulos() != this.capsVistos.get(titulo)){
                return true;
            }
        }
        return false;
    }

    capituloActual(serie: Titulo): number{
        if(serie instanceof Serie){
            if(this.visto){
                return serie.cantidadDeCapitulos();
            }
            else if(!this.visto && !this.viendo){
                return 0;
            }
            else if (this.viendo){
                return this.capsVistos.get(serie)+1;
            }
        }
    }

    ver(titulo: Titulo, tiempo_visualizado: number): boolean{
        if(titulo instanceof Pelicula){
            if(titulo.disponible(this.region)){
                if(titulo.getContenido().getDuracion() == tiempo_visualizado){
                    this.listaVista.push(titulo);
                    return true;
                }
                else if (titulo.getContenido().getDuracion() < tiempo_visualizado){
                    return false;
                }
                else{
                    if(this.lista.has(titulo)){
                        let tiempo = this.lista.get(titulo);
                        if(tiempo + tiempo_visualizado > titulo.getContenido().getDuracion()){
                            return false;
                        }
                        else if(tiempo + tiempo_visualizado < titulo.getContenido().getDuracion()){
                            this.lista.set(titulo,(tiempo + tiempo_visualizado));
                            return true;
                        }
                        else{
                            this.listaVista.push(titulo);
                            this.lista.delete(titulo);
                            return true;
                        }
                    }
                    else{
                        this.lista.set(titulo,tiempo_visualizado);
                        return true;
                    }
                }
            }
        }
        else if(titulo instanceof Serie){
            if(titulo.disponible(this.region)){
                let duracionTotal = 0;
                for (let i=0; i < titulo.cantidadDeCapitulos(); i++) {
                    duracionTotal= duracionTotal + titulo.obtenerCapitulo(i).getDuracion();
                    return true;
                }
                if(tiempo_visualizado = duracionTotal){
                    this.listaVista.push(titulo);
                    return true;
                }
                else if (tiempo_visualizado > duracionTotal){
                    return false;
                }
                else{
                    if(this.lista.has(titulo)){
                        if(titulo.obtenerCapitulo(this.capituloActual(titulo)).getDuracion() == 0){
                            let tiempoRestante = 0;
                            for (let i = this.capsVistos.get(titulo); i < titulo.cantidadDeCapitulos(); i++) {
                                if(this.capsVistos.get(titulo) == titulo.cantidadDeCapitulos()){
                                    this.lista.delete(titulo);
                                    this.listaVista.push(titulo);
                                    return true;
                                }
                                else {
                                    tiempoRestante = tiempo_visualizado - titulo.obtenerCapitulo(i).getDuracion();
                                    this.lista.set(titulo,tiempoRestante);
                                    this.capsVistos.set(titulo,this.capsVistos.get(titulo)+1);
                                }
                            }
                        }
                        else{
                            tiempo_visualizado = tiempo_visualizado - (titulo.obtenerCapitulo(this.capituloActual(titulo)).getDuracion() - this.lista.get(titulo));
                            this.capsVistos.set(titulo,this.capsVistos.get(titulo)+1);
                            let tiempoRestante = 0;
                            for (let i = this.capsVistos.get(titulo); i < titulo.cantidadDeCapitulos(); i++) {
                                if(this.capsVistos.get(titulo) == titulo.cantidadDeCapitulos()){
                                    this.lista.delete(titulo);
                                    this.listaVista.push(titulo);
                                    return true;
                                }
                                else {
                                    tiempoRestante = tiempo_visualizado - titulo.obtenerCapitulo(i).getDuracion();
                                    this.lista.set(titulo,tiempoRestante);
                                    this.capsVistos.set(titulo,this.capsVistos.get(titulo)+1);
                                }
                            }
                        }
                    }
                    else{
                        let tiempoRestante = 0;
                        let vueltas = 0;
                        for (let i=0; i < titulo.cantidadDeCapitulos(); i++) {
                            if(tiempo_visualizado == 0){
                                this.lista.set(titulo,tiempoRestante);
                                this.capsVistos.set(titulo,vueltas);
                                return true;
                            }
                            tiempoRestante = tiempo_visualizado - titulo.obtenerCapitulo(i).getDuracion();
                            vueltas++;                         
                        }
                    }
                }

            }
        }
        return false;
    }
}

export class Contenido{
    duracion: number;
    fechaSubida: Date;

    constructor (duracion: number){
        this.duracion = duracion;
        this.fechaSubida= new Date(Date.now());
    }

    getDate(): Date{
        return this.fechaSubida;
    }

    getDuracion():number{
        return this.duracion;
    }
}

export class Pelicula extends Titulo{
    contenido: Contenido;

    constructor(titulo: string){
        super(titulo);
    }

    getContenido(): Contenido{
        return this.contenido;
    }

    setContenido(contenidoN: Contenido): void{
        this.contenido = contenidoN;
    }
}

export class Serie extends Titulo{
    contenido: Array<Contenido>;

    constructor(titulo: string){
        super(titulo);
        this.contenido = new Array();
    }

    agregarCapitulo(capitulo: Contenido): void{
        this.contenido.push(capitulo);
    }

    obtenerCapitulo(capitulo: number): Contenido{
        for (let i = 0; i < this.contenido.length; i++) {
            if(capitulo == this.contenido.indexOf(this.contenido[i])){
                let capObtenido = this.contenido[i];
                return capObtenido;
            }
        }
    }

    cantidadDeCapitulos(): number{
        let cantCap = 0;
        for (let i=0; i < this.contenido.length; i++) {
            cantCap = cantCap +1;
        }
        return cantCap;
    }

    primerCapitulo(): Contenido{
        let capitulo1 = this.contenido[0];
        return capitulo1;
    }
}