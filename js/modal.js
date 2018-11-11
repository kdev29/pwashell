$('.closeModalBox').click(function(){
	$('.modalbox').fadeOut();
	$('.blur').removeClass('active');
});

$('#btn_generar').click(function(){
	$('#lista_generada').fadeIn();
	$('.blur').addClass('active');
});