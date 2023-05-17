// IMPORTACIONES PERSONALIZADAS //
function importarScript(nombre) {
    let s = document.createElement("script");
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}

importarScript("js/utils.js");
// FIN IMPORTACIONES PERSONALIZADAS //


// VARIABLES GLOBALES //
var allDiv = ['divPpal', 'divAgregarEmpresa', 'divAgregarReclamo', 'divEstadisticas', 'divVerReclamos'];
var rubrosEmpresas = ['Viajes', 'Restarurantes', 'Bancos', 'Muebles', 'Autos', 'Servicios', 'General'];

var empresas = new Array();
var empresasAEstadistica = new Array();
var cantidadEmpresas = 0;

var reclamos = new Array();
var cantidadReclamos = 0;

var rubrosMayorReclamos = new Array();
var rubrosMayorReclamosCantidad = 2;

var filtroTabla = '*';

// TEST
empresas['Empresa A'] = ['Empresa A', 'Juan Ramon', 'Viajes',2];
empresas['T Empresa B'] = ['T Empresa B', 'Carlos', 'General',0];

cantidadEmpresas = 2;
reclamos[0] = ['Reclamo 1', 'Empresa A', 'Titulo Test 1', 'Esto es una descripcion',1];
reclamos[1] = ['Reclamo 2', 'Empresa A', 'Titulo Test 2', 'Esto es una descripcion',1];
cantidadReclamos = 2;

rubrosMayorReclamos['Viajes'] = 2;


let sistema = new Sistema();
// Datos de Prueba
let e1= new Empresa("Empresa A", "18 de Julio 1234",'Viajes',2);
let e2= new Empresa("Empresa B", "Yaguaron 222",'General',0);

let r1 = new Reclamo('Reclamo 1', 'Empresa A', 'Titulo Test 1', 'Esto es una descripcion',1);
let r2 = new Reclamo('Reclamo 2', 'Empresa A', 'Titulo Test 2', 'Esto es una descripcion',1);

sistema.agregarEmpresa(e1);
sistema.agregarEmpresa(e2);

sistema.agregarReclamo(r1);
sistema.agregarReclamo(r2);
// FIN TEST

// FIN VARIABLES GLOBALES //

// START FUNCTION // 


function myOnLoad(){
    cargarRubros();
    cargarEmpresas();
    ordernarTablaEstadistica();
}

function controlDivHeader(divMostrar){
    let divsAOcultar = allDiv.filter(div => div != divMostrar);
    divsAOcultar.forEach(function(elemento, indice, array) {
        let div = document.getElementById(elemento);    
        div.style.display = "none";
    });
    let div = document.getElementById(divMostrar);
    div.style.display = "block";
}

function crearReclamo(){
    if(cantidadEmpresas === 0){
        alert("Debe ingresar empresas primero")
    }else{
        controlDivHeader('divAgregarReclamo');
    }
}

function agregarEmpresa(){
    let nombre = document.getElementById('newEmpresa_Nombre').value;
    let direccion = document.getElementById('newEmpresa_Direccion').value;
    let select = document.getElementById('newEmpresa_Rubros');
    let rubro = select.options[select.selectedIndex].value;

    let empresa = [];
    empresa.push(nombre);
    empresa.push(direccion);
    empresa.push(rubro);
    // Seteo la cantidad de reclamos
    empresa.push(0);

    // Chequeamos si existe la empresa    
    if(empresas[nombre] === undefined){
        empresas[nombre] = empresa;
        cantidadEmpresas++;
        myOnLoad();
        alert("Empresa agregada con éxito");
    }else{
        alert("La empresa ya existe");
    }
}

function agregarReclamo(){
    let nombre = document.getElementById('newReclamo_Nombre').value;
    let selectEmpresa = document.getElementById('newReclamo_Empresas');
    let emp = selectEmpresa.options[selectEmpresa.selectedIndex].value;
    let titulo = document.getElementById('newReclamo_Titulo').value;
    let descripcion = document.getElementById('newReclamo_Descripcion').value;

    let reclamo = [];
    reclamo.push(nombre);
    reclamo.push(emp);
    this.aumentarCantidadReclamoEmpresa(emp);
    reclamo.push(titulo);
    reclamo.push(descripcion);
    reclamo.push(1); // Agregamos ocurrencia

    reclamos.push(reclamo);
    cantidadReclamos++;

    alert("Reclamo agregado con éxito");
}

function aumentarOcurrenciaReclamo(id){
    reclamos[id][4]++;
    cantidadReclamos++;
    this.aumentarCantidadReclamoEmpresa(reclamos[id][1]);
    this.cargarVerReclamos();
}

function cargarRubros(){
    addOptions("newEmpresa_Rubros", rubrosEmpresas);
}

function cargarEmpresas(){
    addOptions("newReclamo_Empresas", empresas, true);
}

function cargarVerReclamos(busco){
    // Obtener el elemento padre donde se agregará el div
    let miElementoPadre = document.getElementById("divGenerateVerReclamos");
    // Limpiamos el Div
    miElementoPadre.innerHTML = "";

    for (let i = reclamos.length -1; i >= 0; i--) {
        if(busco){
            if(reclamos[i][0].toUpperCase().includes(document.getElementById("inputBuscar").value.toUpperCase())){
                crearDivVerReclamo(miElementoPadre, i);
            }
        }else{
            crearDivVerReclamo(miElementoPadre, i);
        }
    }
}

function crearDivVerReclamo(miElementoPadre, i){
    let divReclamoGral = document.createElement("div");
    divReclamoGral.innerHTML = `<h2>Reclamo ${(i+1)}</h2>`;

        // Crear un elemento div
    let divReclamoEspecifico = document.createElement("div");
    divReclamoEspecifico.id = "divReclamo_" + i;
    // Crear un nodo de texto html con el contenido dinámico
    let miContenido = `
        <p>${reclamos[i][0]}: <span style='background-color: orange;'>${reclamos[i][2]}</span></p>
        <p>Empresa: <span style='background-color: green;'>${reclamos[i][1]}</span></p>
        <p>${reclamos[i][3]}</p>
        <p><button onclick="aumentarOcurrenciaReclamo(${i})">¡A mi también me pasó!</button> Contador ${reclamos[i][4]}</p>
    `;
    divReclamoEspecifico.innerHTML = miContenido;
    // Agregamos la clase de estilo
    divReclamoEspecifico.classList.add('divIteradorReclamo');
            
    // Agregar el div como hijo del elemento padre
    divReclamoGral.appendChild(divReclamoEspecifico);

    miElementoPadre.appendChild(divReclamoGral);
}
function cargarEstadisticas(){
    this.cargarTablaEstadistica();
    this.cargarInfoEstadisticas();
}

function cargarTablaEstadistica(){
    let divTable = document.getElementById("divTable");
    // Limpiamos el Div
    divTable.innerHTML = "";

    let miTabla = document.createElement("table");
    miTabla.classList.add('styleClassTable');
    // Crear el encabezado de la tabla
    let miEncabezado = document.createElement("thead");
    let miFilaEncabezado = document.createElement("tr");

    // Crear las celdas de encabezado
    let miCeldaNombre = document.createElement("th");
    miCeldaNombre.textContent = "Nombre";
    let miCeldaDireccion = document.createElement("th");
    miCeldaDireccion.textContent = "Direccion";
    let miCeldaRubro = document.createElement("th");
    miCeldaRubro.textContent = "Rubro";
    let miCeldaCantidad = document.createElement("th");
    miCeldaCantidad.textContent = "Cantidad";

    // Agregar las celdas de encabezado a la fila de encabezado
    miFilaEncabezado.appendChild(miCeldaNombre);
    miFilaEncabezado.appendChild(miCeldaDireccion);
    miFilaEncabezado.appendChild(miCeldaRubro);
    miFilaEncabezado.appendChild(miCeldaCantidad);

    // Agregar la fila de encabezado a la sección de encabezado
    miEncabezado.appendChild(miFilaEncabezado);

    miTabla.appendChild(miEncabezado);
    

    // Crear la sección del cuerpo de la tabla
    let miCuerpoTabla = document.createElement("tbody");

    // Crear las filas y celdas de tabla dinámicamente
    for(let empresa in empresasAEstadistica){
        // Crear una nueva fila de tabla
        let miFila = document.createElement("tr");
    
        // Crear una celda para el nombre
        let miCeldaNombre = document.createElement("td");
        miCeldaNombre.textContent = empresasAEstadistica[empresa][0];
        miFila.appendChild(miCeldaNombre);
    
        // Crear una celda para la direccion
        let miCeldaDireccion = document.createElement("td");
        miCeldaDireccion.textContent = empresasAEstadistica[empresa][1];
        miFila.appendChild(miCeldaDireccion);

        // Crear una celda para la rubro
        let miCeldaRubro = document.createElement("td");
        miCeldaRubro.textContent = empresasAEstadistica[empresa][2];
        miFila.appendChild(miCeldaRubro);

        // Crear una celda para la cantidad reclamos
        let miCeldaCantidadReclamos = document.createElement("td");
        miCeldaCantidadReclamos.textContent = empresasAEstadistica[empresa][3];
        miFila.appendChild(miCeldaCantidadReclamos);
    
        // Agregar la fila a la tabla
        miCuerpoTabla.appendChild(miFila);
    }

    miTabla.appendChild(miCuerpoTabla);

    divTable.appendChild(miTabla);

}

function aumentarCantidadReclamoEmpresa(nombreEmpresa){
    empresas[nombreEmpresa][3]++;
    aumentoReclamoRubro(empresas[nombreEmpresa][2]);
}


function cargarInfoEstadisticas(){

    let miElementoPadre = document.getElementById("divInfoEstadisticas");
    // Limpiamos el Div
    miElementoPadre.innerHTML = "";

    let promedioReclamos = Math.abs(cantidadReclamos / cantidadEmpresas);
    let divInfoGral = document.createElement("div");
    divInfoGral.innerHTML = `
        <h2>Información General</h2>
        <p>El promedio de las cantidades considerando todos los reclamos de todas las empresas es: ${promedioReclamos}</p>

        <p>Total de empresas registradas: ${cantidadEmpresas}</p>
    `;

    let divEmpresasSinReclamo = document.createElement("div");
    divEmpresasSinReclamo.innerHTML = `
        <h2>Empresas sin Reclamos</h2>
        <ul>
    `;
    for(let empresa in empresas){
        if(empresas[empresa][3] === 0){
            divEmpresasSinReclamo.innerHTML += `
                <li>${empresas[empresa][0]} (${empresas[empresa][1]}) - Rubro: ${empresas[empresa][2]}</li>
            `;
        }
    }
    divEmpresasSinReclamo.innerHTML += `
        </ul>
    `;

    let divRubrosReclamos = document.createElement("div");
    divRubrosReclamos.innerHTML = `
        <h2>Rubros con máxima cantidad de reclamos</h2>
    `;
    for(let rubro in rubrosMayorReclamos){
        divRubrosReclamos.innerHTML += `
            <li>${rubro} cantidad: ${rubrosMayorReclamos[rubro]} </li>
        `;
    }
    divRubrosReclamos.innerHTML += `
        </ul>
    `;
    
    miElementoPadre.appendChild(divInfoGral);
    miElementoPadre.appendChild(divEmpresasSinReclamo);
    miElementoPadre.appendChild(divRubrosReclamos);
}

function compararPorNombreCreciente(a, b) {
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[0] > b[0]) {
        return 1;
    }
    return 0;
}
function compararPorNombreDecreciente(a, b) {
    if (a[0] < b[0]) {
        return 1;
    }
    if (a[0] > b[0]) {
        return -1;
    }
    return 0;
}

function ordernarTablaEstadistica(){
    let radios = document.getElementsByName("radioOrderNombre");
    let selected = Array.from(radios).find(radio => radio.checked);
    
    filtrarListaEmpresas();

    let listaEmpresas = [];
    for (let empresa in empresas) {
        listaEmpresas.push(empresas[empresa][0]);
    }
    
    if(selected.value ==='creciente'){
        listaEmpresas.sort();
    }else{
        listaEmpresas.sort();
        listaEmpresas.reverse();
    }

    for (let i = 0; i < listaEmpresas.length; i++) {
        empresasAEstadistica.push(empresas[listaEmpresas[i]]);
    }
    cargarEstadisticas();
}


function aumentoReclamoRubro(rubro){

    let cantidadRubro = contarReclamosRubro(rubro);
    if(rubrosMayorReclamosCantidad == cantidadRubro){
        // Agregamos el rubro a la lista
        rubrosMayorReclamos[rubro] = cantidadRubro;
    }
    if(cantidadRubro > rubrosMayorReclamosCantidad){
        rubrosMayorReclamosCantidad = cantidadRubro;
        rubrosMayorReclamos = [];
        rubrosMayorReclamos[rubro] = cantidadRubro;
    }
}

function contarReclamosRubro(rubro){
    let cantidad = 0;
    for(empresa in empresasAEstadistica){
        if(empresasAEstadistica[empresa][2] == rubro){
            cantidad = empresasAEstadistica[empresa][3];
        }
    }
    return cantidad;
}

function changeFiltroTabla(filtro = '*'){
    let btnS = document.getElementById("btn-filtro-s");
    let btnT = document.getElementById("btn-filtro-t");
    let btnAll = document.getElementById("btn-filtro-all");

    btnS.classList.remove('btn-filtro-activo');
    btnT.classList.remove('btn-filtro-activo');
    btnAll.classList.remove('btn-filtro-activo');

    switch (filtro) {
        case 'S':
            btnS.classList.add('btn-filtro-activo');
            break;
        case 'T':
            btnT.classList.add('btn-filtro-activo');
            break;
        default:
            btnAll.classList.add('btn-filtro-activo');
            break;
    }
    filtroTabla = filtro;
    ordernarTablaEstadistica();
}

function filtrarListaEmpresas(){
    // Limpio empresas
    empresasAEstadistica = [];
    if (filtroTabla === 'T' || filtroTabla === 'S') {
        // Vamos a filtrar
        for (let empresa in empresas) {
            if(empresa[0].toLocaleUpperCase() === filtroTabla.toLocaleUpperCase()){
                empresasAEstadistica.push(empresas[empresa][0]);
            }
        }
    }else{
        empresasAEstadistica = empresas.slice();
    }
}