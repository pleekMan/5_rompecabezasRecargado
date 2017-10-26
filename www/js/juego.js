
var Juego = {
// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
  /*
  grilla : [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  */

  //grilla:[],


  // Ac&aacute; vamos a ir guardando la posición vacía
  posicionVacia : {
    fila: 2,
    columna: 2
  }

}

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
Juego.chequearSiGano = function() {
  //var gano = true;

  console.log("|| Checkeando Posiciones de Piezas:");
  for (var y = 0; y < Juego.grilla.length; y++) {
    for (var x = 0; x < Juego.grilla[y].length; x++) {
      var coordsPieza = ((Juego.grilla[0].length * y) + x) + 1;
      console.log("=> " + coordsPieza);
      if (Juego.grilla[y][x] != coordsPieza) {
        return false
      }
    }
  }
  //console.log(gano ? "GANASTE" : "TE FALTAN ALGUNOS MOVIMIENTOS PARA GANAR");
  return true;
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
Juego.mostrarCartelGanador = function () {
  alert("GANASTE");
}

// Intercambia posiciones grilla y en el DOM
Juego.intercambiarPosiciones = function (fila1, columna1, fila2, columna2) {

  var valorAnterior = Juego.grilla[fila1][columna1];
  Juego.grilla[fila1][columna1] = Juego.grilla[fila2][columna2];
  Juego.grilla[fila2][columna2] = valorAnterior;
  //console.log(grilla);

  // CODIGO PARA MODIFICAR LOS DIVS DE LAS PIEZAS EN EL DOM
  /*
  var padre = document.getElementById("_9").parentNode;

  var idPiezaVacia = "_9";
  var idPiezaNoVacia = "_" + Juego.grilla[fila1][columna1];

  var piezaVacia = document.getElementById(idPiezaVacia).cloneNode(true);
  var piezaNoVacia = document.getElementById(idPiezaNoVacia).cloneNode(true);


  padre.replaceChild(piezaVacia, document.getElementById(idPiezaNoVacia));
  console.log(padre);
  var piezaANoVaciarEnDOM = (fila1 * Juego.grilla[0].length) + columna1;
  padre.insertBefore(piezaNoVacia, padre.children[piezaANoVaciarEnDOM]);
  padre.removeChild(padre.children[piezaANoVaciarEnDOM + 1]);
  //console.log(padre);
  */

}

// Actualiza la posición de la pieza vacía
Juego.actualizarPosicionVacia = function (nuevaFila, nuevaColumna) {
  Juego.posicionVacia.fila = nuevaFila;
  Juego.posicionVacia.columna = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
Juego.posicionValida = function (fila, columna) {
  if (fila < 0 || fila >= Juego.grilla.length || columna < 0 || columna >= Juego.grilla[0].length) {
    console.log("|| MOVIMIENTO INVALIDO");
    return false;
  } else {
    return true;
  }

}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
Juego.moverEnDireccion = function (direccion) {

  //left = 37
  //up = 38
  //right = 39
  //down = 40

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if (direccion == 40) {
    nuevaFilaPiezaVacia = Juego.posicionVacia.fila - 1;
    nuevaColumnaPiezaVacia = Juego.posicionVacia.columna;
    console.log("|| HACIA ARRIBA /\\");
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = Juego.posicionVacia.fila + 1;
    nuevaColumnaPiezaVacia = Juego.posicionVacia.columna;
    console.log("|| HACIA ABAJO \\/");
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
    nuevaColumnaPiezaVacia = Juego.posicionVacia.columna - 1;
    console.log("|| HACIA IZQUIERDA <");
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
    nuevaColumnaPiezaVacia = Juego.posicionVacia.columna + 1;
    console.log("|| HACIA DERECHA >");

  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (Juego.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    Juego.intercambiarPosiciones(Juego.posicionVacia.fila, Juego.posicionVacia.columna, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    Juego.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);        
  }

}



// Extras, ya vienen dadas

Juego.mezclarPiezas = function(veces) {
  console.log("|| SHUFFLING:");
  if (veces <= 0) { return; }
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  Juego.moverEnDireccion(direccion);

  console.log("=> ", veces);

  setTimeout(function () {
    Juego.mezclarPiezas(veces - 1);
  },50);
}

//window.onload = Juego.capturarTeclas();

Juego.capturarTeclas = function() {
  document.onkeydown = (function (evento) {
    //debugger;
    console.log("==============");
    if (evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37) {
      Juego.moverEnDireccion(evento.which);

      var gano = Juego.chequearSiGano();
      if (gano) {
        setTimeout(function () {
          Juego.mostrarCartelGanador();
      }, 20);
      }
      evento.preventDefault();
    }
  })
}


Juego.crearGrilla = function(piezasPorLado){
  
  Juego.grilla = new Array(piezasPorLado);
    for (var y = 0; y < piezasPorLado; y++) {
    Juego.grilla[y] = new Array(piezasPorLado);
    for (var x = 0; x < piezasPorLado; x++) {
      Juego.grilla[y][x] = (y * piezasPorLado) + x;
    }      
  }

}

Juego.iniciar = function() {
  
  Juego.crearGrilla(5);

  //Juego.mezclarPiezas(10);

  /*
  if(chequearSiGano()){
     mostrarCartelGanador();
  } else {
  }
  */
  Juego.capturarTeclas();

}

Juego.iniciar();

