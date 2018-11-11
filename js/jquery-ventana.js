$(document).ready(function(){
			rh($(window).height());

			$('#check_all').click(function(){
				var checkedStatus = this.checked;
				$('.tGeneral tbody tr').find('td:first :checkbox').each(function() {
					$(this).prop('checked', checkedStatus);
				});
			});

			$('.calendario').datepicker({
				inline: true,
				dateFormat: 'dd-M-yy'
			});
		});

		$(window).resize(function(){
			rh($(window).height());
		});

		function rh(h){
			var hEncabezado = $('header').outerHeight(true);
			var hMenuBar = $('nav.menu_bar').outerHeight(true);
			var hTitulo = $('h2.titulo').outerHeight() + 55;
			var hFooter = $('footer').outerHeight(true);
			var hDocument = $(document).outerHeight(true);

			var hS = h - (hEncabezado+hMenuBar+hTitulo+hFooter) - 95;
			$('section.contenido_principal div.contenedor').height(hS);

			if(hDocument>h) {
				$('footer').css('position','relative');
			} else {
				$('footer').css('position','absolute');
			}
		}