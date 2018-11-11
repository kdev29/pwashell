        var load = document.getElementById('loading');
    var btn = document.getElementById("botonload");
    
        btn.onclick = function() {
            load.style.display = "block";
        }
    window.onclick = function(event) {
        if (event.target == load) {
            load.style.display = "none";
        }
    }