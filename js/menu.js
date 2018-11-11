	var menuOptsContainer = document.getElementById('menuOpcionesContainer').clientHeight;

  function openNav() {
    console.log(menuOptsContainer);
    document.getElementById("menuprincipal_js").style.width = "100%";
	}

	function closeNav() {
    document.getElementById("menuprincipal_js").style.width = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
	}

  /*Solo la mano...*/

  function openHand() {
    console.log(menuOptsContainer);
    if(window.innerHeight < (menuOptsContainer-10) && document.getElementById("mano").style.display != "block"){
      document.getElementById("mano").style.display = "block";
    }
    else if(window.innerHeight > (menuOptsContainer-10) && document.getElementById("mano").style.display == "block"){
      document.getElementById("mano").style.display = "none";
    }
    else if(window.innerHeight < (menuOptsContainer-10) && document.getElementById("mano").style.display == "block"){
      document.getElementById("mano").style.display = "none";
      setTimeout(function(){
        document.getElementById('mano').style.display = "block";
      },190);
    }
  }

  function closeHand() {
    document.getElementById("mano").style.display = "none";
  }

  window.onresize = function(){
    console.log(menuOptsContainer);
    if(window.innerHeight < (menuOptsContainer-10)){
      document.getElementById("mano").style.display = "block";
    }else{
      document.getElementById("mano").style.display = "none";
    }
  }

  // PARA QUE CIERRE TODO
  // function closeNav_fondo() {
  //   document.getElementById("menuprincipal_js").style.width = "0";
  //   document.body.style.backgroundColor = "rgba(0,0,0,0)";
  // }

  var perfiles = document.getElementById('pestanaperfil');
var formperfil = document.getElementsByClassName('formperfil');
var flechita = document.getElementsByClassName('flechita');

/*FUNCIONES*/

// var formnuevoperfil = document.getElementsByClassName('formnuevoperfil');
// function desplieganuevo(){
//  formnuevoperfil[0].classList.toggle('despliegaform');
// }
function despliega(line){
  formperfil[line].classList.toggle('despliegaform');
  flechita[line].classList.toggle('gira');
}