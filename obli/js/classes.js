class Empresa {
	
	constructor(nombre,direccion,rubro) {
		
		this.nombre     = nombre;
		this.direccion  = direccion;
		this.rubro      = rubro;
	}
	toString(){
		return this.nombre +" en: "+ this.direccion+ " Rubro: "+ this.rubro  ;
	}
}

class Reclamo {
	
	constructor(nombre,empresa,titulo,descripcion) {
		
		this.nombre     = nombre;
        this.empresa    = empresa;
        this.titulo     = titulo;
        this.descripcion= descripcion;
		
	}
	toString(){
		return this.nombre;
	}
}

class Sistema {
	constructor(){
		this.listaEmpresas=[];
		this.listaReclamos=[];
	}

    agregarEmpresa(unElemento){
		this.listaEmpresas.push(unElemento);
	}

    agregarReclamo(unElemento){
		this.listaReclamos.push(unElemento);
	}
}