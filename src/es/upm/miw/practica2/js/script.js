var fechaActual = new Date();
function cargarDatosIniciales() {
	// Fecha emision
	document.getElementById("fechaEmision").value = fechaActual
			.toLocaleDateString("es-ES");
}
function calcularFecha(radiobutton) {
	var fechaCalculada = new Date();
	fechaCalculada.setMilliseconds(fechaActual.getMilliseconds()
			+ (radiobutton.value) * 24 * 60 * 60 * 1000);
	document.getElementById("fechaLimite").value = fechaCalculada
			.toLocaleDateString("es-ES");
}

function aniadirConcepto() {	
	var table = document.getElementById("myTable");
	if (table.rows.length < 9) {
		var row = table.insertRow(table.rows.length);
		for (var i = 0; i <= 4; i++) {
			if (i < 3) {
				row.insertCell(i).contentEditable = true;
				//Importe
			} else if(i==3){
				row.insertCell(i).className = "importe";
				//Eliminar
			}else{
				row.insertCell(i).innerHTML = "<button class=\"btnEliminar\" type=\"button\" onclick=\"eliminarConcepto(this)\">x</button>";
			}
		}
	}
	table.rows[table.rows.length-1].cells[1].setAttribute('onkeyup',"calcularDatos(this)");
	table.rows[table.rows.length-1].cells[2].setAttribute('onkeyup',"calcularDatos(this)");
		comprobarNumeroConceptos();
}
function eliminarConcepto(miBoton) {
	miBoton.parentNode.parentNode.remove();
	comprobarNumeroConceptos();
}

function eliminarTodosConcepto(){
	var table = document.getElementById("myTable");
	if (table.rows.length > 2) {
		for(var index=table.rows.length-1;index>=2;index--){
			table.deleteRow(index);
		}
	}
	comprobarNumeroConceptos();
}

function comprobarNumeroConceptos() {
	//activa o desactiva los botones de eliminar y/o aniadir
	var table = document.getElementById("myTable");
	if (table.rows.length > 2) {
		document.getElementById("btnEliminarTodo").disabled = false;
	}else {
		document.getElementById("btnEliminarTodo").disabled = true;
	}
	if(table.rows.length == 8){
		document.getElementById("btnAniadir").disabled = false;
	}
	if(table.rows.length == 9){
		document.getElementById("btnAniadir").disabled = true;
	}
}

function calcularDatos(miTd){
	var precioUnidad = miTd.parentNode.cells[1].innerHTML;
	var cantidad = miTd.parentNode.cells[2].innerHTML;
	if(precioUnidad!=""&&cantidad!=""){
		alert("calculardatos");
		miTd.parentNode.cells[3].innerHTML = parseInt(precioUnidad) * parseInt(cantidad);
		
	}
}
