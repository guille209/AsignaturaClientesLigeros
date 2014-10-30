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
			.toLocaleDateString("es-ES")
}

function aniadirConcepto() {	
	var table = document.getElementById("myTable");
	if (table.rows.length < 9) {
		var row = table.insertRow(table.rows.length);
		for (var i = 0; i < 4; i++) {
			if (i != 3) {
				row.insertCell(i).contentEditable = true;
			} else {
				row.insertCell(i).className = "importe";
			}
		}
	}
	comprobarNumeroConceptos();
}
function eliminarConcepto() {
	var table = document.getElementById("myTable");
	if (table.rows.length > 2) {
		table.rows[table.rows.length - 1].remove();
	}
	comprobarNumeroConceptos();
}

function comprobarNumeroConceptos() {
	var table = document.getElementById("myTable");
	if (table.rows.length > 2) {
		document.getElementById("btnEliminar").disabled = false;
	}else {
		document.getElementById("btnEliminar").disabled = true;
	}
	if(table.rows.length == 8){
		document.getElementById("btnAniadir").disabled = false;
	}
	if(table.rows.length == 9){
		document.getElementById("btnAniadir").disabled = true;
	}
}
