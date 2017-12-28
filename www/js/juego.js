var canvasElement = document.getElementById("miCanvas");
var canvas = canvasElement.getContext("2d");

var mouseClicked = {
  x: 0,
  y: 0,
}

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


  // Ac&aacute; vamos a ir guardando la posición vacía
  posicionVacia : {
    fila: 2,
    columna: 2
  }

}

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
Juego.chequearSiGano = function() {
  var gano = true;

  //console.log("|| Checkeando Posiciones de Piezas:");
  loop1:
  for (var y = 0; y < Juego.grilla.length; y++) {
    for (var x = 0; x < Juego.grilla[y].length; x++) {
      var coordsPieza = ((Juego.grilla[0].length * y) + x);
      //console.log("=> " + coordsPieza);
      if (Juego.grilla[y][x] != coordsPieza) {
        //console.log("-|| Todavia No ganaste");
        gano = false;
        break loop1;
      }
    }
  }
  //console.log(gano ? "GANASTE" : "TE FALTAN ALGUNOS MOVIMIENTOS PARA GANAR");

  if (gano) {
    setTimeout(function () {
      Juego.mostrarCartel("WIN");
     }, 20);
  }

}

Juego.checkearMovimientosRestantes = function(){
  //console.log("-|| Movs restantes: " + Juego.contadorDeMovimientos);
  if(Juego.contadorDeMovimientos <= 0){
    setTimeout(function () {
      Juego.mostrarCartel("LOSE");
     }, 50);
  }
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
Juego.mostrarCartel = function (estado) {
  if(estado === "WIN"){
    //alert("GANASTE");
    swal("GANASTE!", "Bien por ti!", "success");
  } else {
    swal("PERDISTE!", "Mal por ti!", "error");
  }
}

Juego.actualizarPiezas = function (){
  for(let y=0; y<Juego.grilla.length; y++){
    for(let x=0; x<Juego.grilla[0].length; x++){
      var posX = x * Juego.anchoPiezas;
      var posY = y * Juego.altoPiezas;
      Juego.piezas[Juego.grilla[y][x]].x = posX;
      Juego.piezas[Juego.grilla[y][x]].y = posY;
    }
  }
}

// Intercambia posiciones grilla y en el DOM
Juego.intercambiarPosiciones = function (fila1, columna1, fila2, columna2) {

  var valorAnterior = Juego.grilla[fila1][columna1];
  Juego.grilla[fila1][columna1] = Juego.grilla[fila2][columna2];
  Juego.grilla[fila2][columna2] = valorAnterior;
  //console.log(grilla);

  Juego.actualizarPiezas();

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
    if(!Juego.mezclando){
      Juego.setContadorDeMovimientos(Juego.contadorDeMovimientos-=1);
    }
    return true;
  }

}

Juego.setContadorDeMovimientos = function(contador){
  Juego.contadorDeMovimientos = contador;
  if(!Juego.mezclando){
    $("#contadorDeMovimientos").val(Juego.contadorDeMovimientos);
  } else {
    $("#contadorDeMovimientos").val("MEZCLANDO"); 
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
    //console.log("|| HACIA ARRIBA /\\");
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = Juego.posicionVacia.fila + 1;
    nuevaColumnaPiezaVacia = Juego.posicionVacia.columna;
    //console.log("|| HACIA ABAJO \\/");
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
    nuevaColumnaPiezaVacia = Juego.posicionVacia.columna - 1;
    //console.log("|| HACIA IZQUIERDA <");
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
    nuevaColumnaPiezaVacia = Juego.posicionVacia.columna + 1;
    //console.log("|| HACIA DERECHA >");

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
  if (veces <= 0) {
    Juego.mezclando = false;
    //Juego.setContadorDeMovimientos(Juego.maxMovimientos); 
    return;
  }
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  Juego.moverEnDireccion(direccion);

  console.log("=> ", veces);


  setTimeout(function () {
    Juego.mezclarPiezas(veces - 1);
  },5);
}

//window.onload = Juego.capturarTeclas();

Juego.capturarTeclas = function() {
  document.onkeydown = (function (evento) {
    //debugger;
    console.log("==============");
    if (evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37) {
      Juego.moverEnDireccion(evento.which);

      Juego.chequearSiGano();
      Juego.checkearMovimientosRestantes();
      
      evento.preventDefault();
    }
  })
}

Juego.capturarMouse = function(){
  document.onmousedown = (function(evento){
    var canvasBox = canvasElement.getBoundingClientRect();
    mouseClicked.x = evento.clientX - canvasBox.left;
    mouseClicked.y = evento.clientY - canvasBox.top;

    var piezaSize = Juego.piezas[0].width;
    var piezaPos = {
      x: Juego.piezas[Juego.piezas.length - 1].x,
      y: Juego.piezas[Juego.piezas.length - 1].y,
    }

    //console.log("-|| mX = " + mouseClicked.x + " | mY = " + mouseClicked.y);

    // IF CLICKING INSIDE THE CANVAS
    if(mouseClicked.x > 0 && mouseClicked.x < canvasElement.width && mouseClicked.y > 0 && mouseClicked.y < canvasElement.height){

      // LEFT
      if(mouseClicked.x < piezaPos.x && mouseClicked.x > piezaPos.x - piezaSize && mouseClicked.y > piezaPos.y && mouseClicked.y < piezaPos.y + piezaSize){
        Juego.moverEnDireccion(39);
      }
      
      // UP
      if(mouseClicked.x > piezaPos.x && mouseClicked.x < piezaPos.x + piezaSize && mouseClicked.y < piezaPos.y && mouseClicked.y > piezaPos.y - piezaSize){
        Juego.moverEnDireccion(40);
      }

      // RIGHT
      if(mouseClicked.x > piezaPos.x + piezaSize && mouseClicked.x < piezaPos.x + piezaSize * 2 && mouseClicked.y > piezaPos.y && mouseClicked.y < piezaPos.y + piezaSize){
        Juego.moverEnDireccion(37);
      }

      // DOWN
      if(mouseClicked.x > piezaPos.x && mouseClicked.x < piezaPos.x + piezaSize && mouseClicked.y > piezaPos.y + piezaSize && mouseClicked.y < piezaPos.y + piezaSize * 2){
        Juego.moverEnDireccion(38);
      }
      
      Juego.chequearSiGano();
      Juego.checkearMovimientosRestantes();
    }
  });
}


Juego.crearGrilla = function(piezasPorLado){
  
  
  Juego.grilla = new Array();

  // for (var i = 0; i < piezasPorLado * piezasPorLado; i++) {
  //   var piezaActual = new  
    
  //   //Juego.grilla[y][x] = (y * piezasPorLado) + x;
  // }

    for (var y = 0; y < piezasPorLado; y++) {
      Juego.grilla[y] = new Array(piezasPorLado);
      for (var x = 0; x < piezasPorLado; x++) {
        Juego.grilla[y][x] = (y * piezasPorLado) + x;
      }      
    }

    Juego.posicionVacia.fila = piezasPorLado - 1;
    Juego.posicionVacia.columna = piezasPorLado - 1;

}

//se carga la imagen del rompecabezas
Juego.cargarImagen = function (e) {
  //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600). 
  this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
  this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
  //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
  this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
  this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
  this.configurarCanvas();
}

//funcion que carga la imagen
Juego.iniciarImagen = function (callback) {
  this.imagen = new Image();
  var self = this;
  //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
  this.imagen.addEventListener('load', function () {
    self.cargarImagen.call(self);
    callback();
  }, false);
  this.imagen.src = "images/imagen.jpg";
}

Juego.configurarCanvas = function(){
  canvas.fillStyle = "teal";
  canvas.fillRect(0,0,canvasElement.width,canvasElement.height);
}

Juego.construirPiezas = function (){

  Juego.piezas = new Array();

  for(let y=0; y<Juego.grilla.length; y++){
    for(let x=0; x<Juego.grilla[0].length; x++){
      var posX = x * Juego.anchoPiezas;
      var posY = y * Juego.altoPiezas;
      var cropX = posX;
      var cropY = posY;
      var nuevaPieza = new Pieza(Juego.grilla[y][x],posX, posY, Juego.anchoPiezas, Juego.altoPiezas);
      nuevaPieza.setImageURL(this.imagen.src);
      nuevaPieza.setImageCrop(cropX, cropY);
      Juego.piezas.push(nuevaPieza);
    }
  }

}

//una vez elegido el nivel, se inicia el juego
Juego.iniciar = function (cantMovimientos) {
  this.movimientosTotales = cantMovimientos;
  Juego.contadorDeMovimientos = cantMovimientos;
  Juego.maxMovimientos = 0;
  Juego.mezclando = true;
  this.piezas = [];
  this.grilla = [];

  
  //this.cantidadDePiezasPorLado = document.getElementById("cantidadPiezasPorLado").value;
  var nivelDificultad = $("input[type='radio'][name='nivel']:checked").val();
  console.log("-|| Nivel: " + nivelDificultad);
  Juego.setNivel(nivelDificultad);
  $("#cantidadPiezasPorLado").val(Juego.cantidadDePiezasPorLado);
  //$("#contadorDeMovimientos").html = "Movimientos Restantes => "+ Juego.contadorDeMovimientos;



  //document.getElementById("contadorDeMovimientos").innerHTML = Juego.contadorDeMovimientos;
  $("#botonReIniciar").click(function(){
    Juego.iniciar(Juego.contadorDeMovimientos);
  });

  $("#botonMezclar").click(function(){
    Juego.mezclando = true;  
    Juego.mezclarPiezas(20);
  });
  

  
  //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
  var self = this;
  this.crearGrilla(this.cantidadDePiezasPorLado);
  //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
  this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
  this.iniciarImagen(function () {
    self.construirPiezas();
    //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
    var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
    //var cantidadDeMezclas = 2;

    Juego.capturarTeclas();
    Juego.capturarMouse();
    self.mezclarPiezas(cantidadDeMezclas);
  });
}

Juego.setNivel = function(nivel){
  var piezas = 0;
  var movimientos = 0;

  nivel = nivel == undefined ? "facil" : nivel;
  
  if(nivel == "facil"){
    piezas = 3;
    movimientos = 30;
  } else if(nivel == "medio"){
    piezas = 6;
    movimientos = 60;
  } else if(nivel == "dificil"){
    piezas = 10;
    movimientos = 100;
  } else {
    // CUSTOM
    piezas = Math.abs($("#cantidadPiezasPorLado").val());
    movimientos = Math.abs($("#contadorDeMovimientos").val());
  }

  Juego.cantidadDePiezasPorLado = piezas;
  Juego.maxMovimientos = movimientos;
  Juego.contadorDeMovimientos = Juego.maxMovimientos;
  $("#contadorDeMovimientos").val(Juego.maxMovimientos);


}


setInterval(function() {
     canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

    
     Juego.piezas.forEach(function(pieza) {
      canvas.drawImage(pieza.image, pieza.xCrop, pieza.yCrop, pieza.width, pieza.height, pieza.x, pieza.y, pieza.width, pieza.height);
      //canvas.drawImage(pieza.image, pieza.x, pieza.y);
      
      canvas.fillStyle = "teal";
      canvas.fillRect(pieza.x, pieza.y, 20,20);
      canvas.fillStyle = "white";
      canvas.fillText(pieza.id, pieza.x + 5, pieza.y + 13);
     });

     // RESALTAR LA PIEZA MOVIBLE
     // begin/closePath es necesario debido a que clearRect se comporta raro sin esto.
     canvas.beginPath();
     canvas.strokeStyle = "black";
     canvas.rect(Juego.piezas[Juego.piezas.length - 1].x, Juego.piezas[Juego.piezas.length - 1].y, Juego.piezas[0].width, Juego.piezas[0].height);
     canvas.stroke();
     canvas.closePath();

}, 1000 / 30);

Juego.iniciar(10);