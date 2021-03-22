export enum Region{"AR","BR","CH"};

interface Titulo{
    titulo: string;
}

export class Sistema{
    Usuarios: Array<Usuario>;
    Biblioteca: Array<Titulo>;

    agregarUsuario(usuario: Usuario): boolean{
        for (let i=0; i< this.Usuarios.length; i++) {
            if(this.Usuarios[i] == usuario){
                return false;
            }
        }
        return true;
    }

    agregarTitulo(titulo: Titulo): void{
        this.Biblioteca.push(titulo);
    }

    buscarUsuario(nombreB: string): Usuario{
        for (let i=0; i< this.Usuarios.length; i++) {
            if(this.Usuarios[i].nombre == nombreB){
                return this.Usuarios[i];
            }
        }
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

    constructor (nombre: string, region:Region){
        this.nombre = nombre;
        this.region = region;
    }

    getUsername(): string{
        return this.nombre;
    }

    getRegion(): Region{
        return this.region;
    }

    visto(titulo: Titulo): boolean{   
    }

    viendo(titulo: Titulo): boolean{   
    }

    capituloActual(serie: Titulo): number{   
    }

    ver(titulo: Titulo, tiempo_visualizado: number): boolean{
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

export class Pelicula implements Titulo{
    titulo: string;
    region: Array<Region>;
    contenido: Contenido;

    constructor (titulo: string){
        this.titulo = titulo;
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

    getContenido(): Contenido{
        return this.contenido;
    }

    setContenido(contenidoN: Contenido): void{
        this.contenido = contenidoN;
    }
}

export class Serie implements Titulo{
    titulo: string;
    region: Array<Region>;
    contenido: Array<Contenido>;

    constructor(titulo: string){
        this.titulo = titulo;
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