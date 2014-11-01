var fechaActual = new Date();

function cargarDatosIniciales() {
	// Chart.defaults.global.responsive = true;
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
				table.rows[table.rows.length - 1].cells[i].setAttribute(
						'onkeyup', "calcularImporte(this)");
				// Importe
			} else if (i == 3) {
				row.insertCell(i).className = "importe";
				// Eliminar
			} else {
				row.insertCell(i).innerHTML = "<button class=\"btnEliminar\" type=\"button\" onclick=\"eliminarConcepto(this)\">x</button>";
			}
		}
	}
	comprobarNumeroConceptos();
}
function eliminarConcepto(miBoton) {
	miBoton.parentNode.parentNode.remove();
	comprobarNumeroConceptos();
	generarGrafica();
}

function eliminarTodosConcepto() {
	var table = document.getElementById("myTable");
	if (table.rows.length > 2) {
		for (var index = table.rows.length - 1; index >= 2; index--) {
			table.deleteRow(index);
		}
	}
	comprobarNumeroConceptos();
	generarGrafica();
}

function comprobarNumeroConceptos() {
	// activa o desactiva los botones de eliminar y/o aniadir
	var table = document.getElementById("myTable");
	if (table.rows.length > 2) {
		document.getElementById("btnEliminarTodo").disabled = false;
	} else {
		document.getElementById("btnEliminarTodo").disabled = true;
	}
	if (table.rows.length == 8 || table.rows.length == 2) {
		document.getElementById("btnAniadir").disabled = false;
	}
	if (table.rows.length == 9) {
		document.getElementById("btnAniadir").disabled = true;
	}
	calcularTotales();
}

function calcularImporte(miTd) {

	var precioUnidad = miTd.parentNode.cells[1].innerHTML;
	var cantidad = miTd.parentNode.cells[2].innerHTML;

	if (camposRellenados(miTd)) {

		miTd.parentNode.cells[3].innerHTML = parseInt(precioUnidad)
				* parseInt(cantidad);
		calcularTotales();
		generarGrafica();
		
	
	}
}

function camposRellenados(miTd) {
	if (miTd.parentNode.cells[1].innerHTML != ""
			&& miTd.parentNode.cells[2].innerHTML != ""
			&& miTd.parentNode.cells[0].innerHTML != ""
			&& /^\d+$/.test(miTd.parentNode.cells[1].innerHTML)
			&& /^\d+$/.test(miTd.parentNode.cells[2].innerHTML)) {
		return true;
	} else {
		return false;
	}
}

function generarGrafica() {
	var table = document.getElementById("myTable");
	var importe;
	var data = [
	];
	var subtotal = document.getElementById("subtotal").value;	
	for (var index = 1; index < table.rows.length; index++) {
		importe = table.rows[index].cells[3].innerHTML;
		var randomColor = getRandomColor();
		if (importe != "") {
			data.push({
				value : parseInt(100 * (importe/subtotal)),
				color : randomColor,
				highlight : randomColor,
				label : table.rows[index].cells[0].innerHTML
			});
		}
	}
	document.getElementById("contenedorCanvas").removeChild(document.getElementById("myChart"));
	var canvas = document.createElement("canvas");
	canvas.setAttribute("id","myChart");
	canvas.setAttribute("height",300);
	canvas.setAttribute("width",300);
	document.getElementById("contenedorCanvas").appendChild(canvas);
	var ctx = document.getElementById("myChart").getContext("2d");
	
	var myNewChart = new Chart(ctx).Doughnut(data);

	
}

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function calcularTotales() {
	var importes = document.getElementsByClassName("importe");
	var total = 0;

	for (var i = 0; i < importes.length; i++) {
		if (importes[i].innerHTML != "" && importes[i].innerHTML != "undefined") {
			total += parseInt(importes[i].innerHTML);
		}
	}

	var subtotal = document.getElementById("subtotal").value = total;
	var iva = document.getElementById("iva").value = (total * 21) / 100;
	document.getElementById("total").value = subtotal + iva;
	
	

}
