var fechaActual;

$(document).ready(function() {
	fechaActual = new Date();
	//Datepicker
	$("#datepicker").datepicker({
        showAnim: "slide",
        dateFormat : 'dd-mm-yy'
    }).datepicker("setDate", fechaActual);
	//Lista sortable
	$( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    //Slider tamanio letra
    $( "#slider" ).slider();

});
