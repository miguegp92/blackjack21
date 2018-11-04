
$(inicializar);

var probabilidad = [4, 4, 4, 4, 4, 4, 4, 4, 4, 16];
var mazo = [];
var valores = [];
var puntosJugador = 0;
var puntosMaquina = 0;
var plantarse = false;
var turnos = 0;
var contaCartas = 4;
var comprobacion = true;
var dinero = 200;
var cash;


function nuevoJuego() {
    var nodo, nodo2, panelCroupier, panelJugador;

    var total = total = document.getElementById("total");

    if (total.value <= 0) {
        alert("Lo sentimos, se te han acabado los créditos para apostar, te haremos un préstamo de 200 créditos para seguir jugando");
        document.getElementById("total").value = 200;
        nuevoJuego();
    } else {
        panelCroupier = document.getElementById("cartasMaquina");
        panelJugador = document.getElementById("cartasJugador");
        nodo = panelJugador.firstChild;
        nodo2 = panelCroupier.firstChild;
        while (nodo !== null) {
            panelJugador.removeChild(nodo);
            nodo = panelJugador.firstChild;
        }

        while (nodo2 !== null) {
            panelCroupier.removeChild(nodo2);
            nodo2 = panelCroupier.firstChild;
        }
        $("#cartaoculta").show();
        $("#boton").show();
        puntosJugador.value = 0;
        puntosMaquina.value = 0;
        turnos = 0;
        plantarse = false;
        document.getElementById("numero").value = 0;
        probabilidad = [4, 4, 4, 4, 4, 4, 4, 4, 4, 16];
        $("#button").hide();
        $("#button2").hide();
        clearInterval(play);
        
    }

}

function crearMazo() {
    var palos = ["corazones", "picas", "treboles", "rombos"];
    var valor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for (var i = 0; i < palos.length; i++) {
        for (var j = 0; j < valor.length; j++) {
            mazo.push(valor[j] + palos[i] + ".png");
            if (valor[j] === 1) {
                valores.push(11);
            } else if (valor[j] === 11 || valor[j] === 12 || valor[j] === 13) {
                valores.push(10);
            } else {
                valores.push(valor[j]);
            }
        }
    }



    document.getElementById("total").value = 200;
    document.getElementById("numero").value = 0;
    
    $("#button").hide();
    $("#button2").hide();

}

function barajar() {

    $("#button").show();
    $("#button2").show();
    

    var pos1, pos2, aux;
    var zonaM, zonaJ, res;

    res = document.getElementById("numero").value;
    zonaJ = document.getElementById("cartasJugador");
    zonaM = document.getElementById("cartasMaquina");
    puntosMaquina = document.getElementById("puntosMaquina");
    puntosJugador = document.getElementById("puntosJugador");
    for (var i = 0; i < mazo.length; i++) {
        pos1 = Math.floor(Math.random() * mazo.length);
        pos2 = Math.floor(Math.random() * mazo.length);

        mazo[aux] = mazo[pos1];
        mazo[pos1] = mazo[pos2];
        mazo[pos2] = mazo[aux];

        valores[aux] = valores[pos1];
        valores[pos1] = valores[pos2];
        valores[pos2] = valores[aux];
    }

    if (res > 0) {
        
        añadirCarta(zonaJ, mazo[0], 0);
        añadirCarta(zonaJ, mazo[1], 1);
        
        añadirCarta(zonaM, mazo[2], 2);
        añadirCarta(zonaM, mazo[3], 3);
        $("#carta3").hide();
        añadirCarta(zonaM, "mazo.png", "oculta");

        puntosJugador.value = valores[0] + valores[1];
        puntosJugador.value = parseInt(puntosJugador.value);
        $("#boton").hide();
        player = setInterval(function () {
            comprobar();
        }, 1500);


        ganar = setInterval(function () {
            blakjak();
        }, 1500);


    } else {
        alert("Error, para poder jugar, debes apostar un minimo de 10.");
        nuevoJuego();
    }
}
function blakjak() {
    var total = total = document.getElementById("total");
    if (Number(puntosJugador.value) === 21) {
        alert("¡¡¡Enhorabuena!!! Has conseguido un Black Jack, ganas directamente");
        total.value = parseInt(dinero) + (parseInt(cash) * 3);
        nuevoJuego();
    }
}

function reiniciar(){
    nuevoJuego();
    crearMazo();
}

function plantar() {

    if (turnos < 1) {
        plantarse = true;
        turnos++;
        $("#cartaoculta").hide();
        $("#carta3").show();
        puntosMaquina.value = valores[2] + valores[3];
        play = setInterval(function () {
            juegaMaquina();
        }, 1000);
    } else {
        ganador();
        nuevoJuego();
    }

}
function ganador() {

    var apuestas;
    apuestas = document.getElementById("numero");
    if (puntosMaquina.value > puntosJugador.value && puntosMaquina.value <= 21 || puntosMaquina.value === puntosJugador.value) {
        alert("Has perdido!! Prueba otra vez");
        nuevoJuego();

    } else {
        alert("Has ganado!!");
        document.getElementById("total").value = parseInt(dinero) + (parseInt(cash) * 2);
        nuevoJuego();

    }
}

function añadirBoton(zona, id) {

    var boton = document.createElement("input");
    boton.setAttribute("type", "text");
    boton.setAttribute("readonly");
    boton.setAttribute("id", id);
    zona.appendChild(zona);

}

function añadirCarta(zona, carta, numero) {
    var points = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var imagen;

    for (var i = 0; i < points.length; i++) {
        if (points[i] === valores[numero]) {
            probabilidad[i]--;
        }
    }


    imagen = document.createElement("img");
    imagen.setAttribute("src", "cartas/" + carta);
    imagen.setAttribute("id", "carta" + numero);
    zona.appendChild(imagen);

}

function otraCarta() {
    clearInterval(ganar);
    var zonaJ, zonaM, nodoJ, nodoM;
    var puntos;
    zonaJ = document.getElementById("cartasJugador");
    zonaM = document.getElementById("cartasMaquina");

    nodoJ = zonaJ.firstChild;
    nodoM = zonaM.firstChild;
    if (nodoJ === null || nodoM === null) {
        alert("Por favor, pulsa el botón Empezar, para poder añadir una carta");
    } else {
        if (plantarse === false && puntosJugador.value <= 21) {

            añadirCarta(zonaJ, mazo[contaCartas]);
            puntos = Number(puntosJugador.value);
            if (puntosJugador.value >= 14 && valores[contaCartas] === 11) {
                puntosJugador.value = puntos + 1;
            } else {
                puntosJugador.value = puntos + valores[contaCartas];
            }


            if (puntos + valores[contaCartas] === 21) {
                alert("Enhorabuena, has obtenido 21!!! Ahora comprobemos que los puntos de la máquina");
                $("#cartaoculta").hide();
                $("#carta3").show();
                puntosMaquina.value = valores[2] + valores[3];
                plantarse === true;
                turnos++;
                plantar();
            }


        }
    }

    contaCartas++;

}

function juegaMaquina() {
    var x, proA, proF, z;
    var zonaM = document.getElementById("cartasMaquina");
    x = 21 - puntosMaquina.value;
    proA = 0;
    proF = 0;
    var puntos = 0;
    if (x > probabilidad.length) {
        for (var i = 0; i < probabilidad.length; i++) {
            proA += probabilidad[i];
        }
        z = (proA / (proA + proF)) * 100;
    } else {
        for (var i = 0; i < x; i++) {
            proA += probabilidad[i];
        }
        for (var i = x; i < probabilidad.length; i++) {
            proF += probabilidad[i];
        }
        z = (proA / (proA + proF)) * 100;
    }
    if (z > 80 || (puntosMaquina.value < puntosJugador.value && puntosMaquina.value < 17)) {
        
        añadirCarta(zonaM, mazo[contaCartas]);
        puntos = Number(puntosMaquina.value);
        if (puntosMaquina.value >= 14 && valores[contaCartas] === 11) {
            puntosMaquina.value = puntos + 1;
        } else {
            puntosMaquina.value = puntos + valores[contaCartas];
        }
        contaCartas++;

    } else {
        alert("La maquina se planta");
        plantar();
    }

}
function comprobar() {
    var total, apuestas;
    total = document.getElementById("total");
    apuestas = document.getElementById("numero");
    if (puntosJugador.value > 21) {
        alert("Gana el Croupier, te has pasado!");
        apuestas.value = 0;
        document.getElementById("total").value = dinero;
        nuevoJuego();
    }


    if (puntosMaquina.value > 21) {
        alert("Gana el Jugador, El croupier se ha pasado!");
        total.value = parseInt(dinero) + (parseInt(cash) * 2);
        nuevoJuego();
    }


}

function apostar(boton) {

    var apuestas, total;
    apuestas = document.getElementById("numero");
    total = document.getElementById("total");

    apuestas.value = eval(apuestas.value + boton.value + 10);
    if (boton.value === "+") {
        total.value = eval(total.value - 10);
    } else {
        total.value = eval(Number(total.value) + 10);
    }
    cash = apuestas.value;
    dinero = parseInt(total.value);
}

function inicializar() {
    $("#button").button();
    $("#subir").button();
    $("#bajar").button();
    $("#button2").button();
    $("#button3").button();
    $("#boton").button();
    $("#instrucciones").button();
    $("#tabs").hide();
    $("#tabs").tabs();
    $("#instrucciones").click(function () {
        $("#tabs").dialog({
            width: "500px",
            autoOpen: true,
            buttons: {
                "Aceptar": function () {
                    $("#tabs").dialog("close");
                }
            }
        });
    });

}