var fechaActual;
var dniValido = false;
var emailValido = false;

$(document)
		.ready(
				function() {
					fechaActual = new Date();
					// Datepicker
					$("#datepicker").datepicker({
						showAnim : "slide",
						dateFormat : 'dd-mm-yy'
					}).datepicker("setDate", fechaActual);
					// Lista sortable
					$("#sortable").sortable();
					$("#sortable").disableSelection();
					// Slider tamanio letra
					$("#slider").slider({
						min : 20,
						max : 40,
						values : [ 30 ],
						slide : function(event, ui) {
							$('body').css({
								'font-size' : ui.values[0]
							});
							$("input:not([type='radio']), label").css({
								'font-size' : ui.values[0]
							});
						}
					});
					
					$("body").fadeIn(2500);
					// Rellenar provincia acorde al CP
					$("#cp")
							.keyup(
									function() {
										var valor = $("#cp").val();
										$
												.ajax({
													type : "GET",
													url : "http://www.eui.upm.es/~salonso/master/provincia.php",
													crossDomain : true,
													data : "CP=" + valor,
													dataType : 'jsonp',
													success : function(data) {
														$("#provincia").val(
																data);
													}
												});
									});
					//Comprobar dni
					$("#dni").keyup(
							function() {

								var dni = this.value;
								var Letras = new Array('T', 'R', 'W', 'A', 'G',
										'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N',
										'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C',
										'K', 'E', 'T');
								var numero = dni.slice(0, dni.length - 1);
								var letra = dni.slice(dni.length - 1,
										dni.length);
								var posicion = numero % 23;
								$("#dni").css('border-width','3');
								if (letra == Letras[posicion]) {// Correcto
									$("#dni").css('border-color','#00ff1d');
									dniValido = true;
									
								} else {// Incorrecto
									$("#dni").css('border-color','#ff0000');
									dniValido = false;
								}

							});
					//Validar email
					$("#email").keyup(
							function() {
								var patron = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
								if(this.value.match(patron)){
									$("#email").css('border-color','#00ff1d');
									emailValido = true;
								}else{
									$("#email").css('border-color','#ff0000');
									emailValido = false;
								}
							});
					

					$("input[name=metodoEnvio]:radio").change(function () {
						if(this.value == "ordinario"){
							mostrarCorreoOrdinario();
						}else{
							mostrarCorreoElectronico();
						}
					});
					
					
				});

function mostrarCorreoOrdinario() {
	$("#email").hide();
	$("#email").val("");
	$("#direccion").show();
	$("#localidad").show();

}

function mostrarCorreoElectronico() {
	$("#direccion").hide();
	$("#direccion").val("");
	$("#localidad").hide();
	$("#localidad").val("");
	$("#email").show();

}

function validateForm(){
	if($("#email").is(":visible")){
		return dniValido && emailValido;
	}else{
		return dniValido;
	}
		
}