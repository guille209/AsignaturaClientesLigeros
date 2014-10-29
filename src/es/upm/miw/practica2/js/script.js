var fechaActual = new Date();
function cargarFecha() {
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