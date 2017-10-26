var expect = chai.expect;

describe('Creación', function () {
  'use strict';

  describe('Juego', function () {
    it('El Objeto Juego está definido', function (done) {
      if (!window.Juego) {
        done(err);
      }
      else {
        done();
      }
    });
  });

  describe('Tamaño de la grilla', function () {
    it('La grilla tiene el tamaño correcto', function () {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Juego.crearGrilla(Juego.cantidadDePiezasPorLado);
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.grilla.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.grilla[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });
});

describe('Durante el juego', function () {
  'use strict';

  describe("Testear Movimientos Validos", function () {
    it('Movimientos Negativos', function () {
      expect(Juego.posicionValida(-1, -1)).to.equal(false);
    });
    it('Ningun Movimiento => (0,0)', function () {
      expect(Juego.posicionValida(0, 0)).to.equal(true);
    });
    it('Movimiento fuera de limites', function () {
      expect(Juego.posicionValida(Juego.grilla[0].length, Juego.grilla.length)).to.equal(false);
    });
  });


  describe("Actualizacion de PosicionVacia despues de mover", function () {
    describe("Dentro de Limites (desde el centro)", function () {

      beforeEach('ReInicializamos La Grilla', function () {
        Juego.crearGrilla(5);
        Juego.posicionVacia.columna = 4;
        Juego.posicionVacia.fila = 4;
        //console.log(this.currentTest.fullTitle());
      });

      it("Mover hacia la izquierda", function () {
        Juego.moverEnDireccion(39);
        expect(Juego.posicionVacia.columna).to.equal(3);
      });

      it("Mover hacia la derecha", function () {
        Juego.moverEnDireccion(39);
        Juego.moverEnDireccion(40);
        Juego.moverEnDireccion(37);

        expect(Juego.posicionVacia.columna).to.equal(4);
        expect(Juego.posicionVacia.fila).to.equal(3);

      });


      it("Mover hacia arriba", function () {
        Juego.moverEnDireccion(39);
        Juego.moverEnDireccion(40);

        expect(Juego.posicionVacia.columna).to.equal(3);
        expect(Juego.posicionVacia.fila).to.equal(3);

      });

      it("Mover hacia abajo", function () {
        Juego.moverEnDireccion(39);
        Juego.moverEnDireccion(40);
        Juego.moverEnDireccion(38);

        expect(Juego.posicionVacia.columna).to.equal(3);
        expect(Juego.posicionVacia.fila).to.equal(4);
      });

    });

    describe("Fuera de Limites (desde algun Borde)", function () {

      beforeEach('ReInicializamos La Grilla', function () {
        Juego.crearGrilla(5);
        Juego.posicionVacia.columna = 4;
        Juego.posicionVacia.fila = 4;
        //console.log(this.currentTest.fullTitle());
      });

      it("Mover hacia la izquierda", function () {
        for (var i = 0; i < Juego.cantidadDePiezasPorLado; i++) {
          Juego.moverEnDireccion(39);
        }

        expect(Juego.posicionVacia.columna).to.equal(0);
      });

      it("Mover hacia la derecha", function () {
        Juego.moverEnDireccion(37);

        expect(Juego.posicionVacia.columna).to.equal(4);
      });


      it("Mover hacia arriba", function () {
        for (var i = 0; i < Juego.cantidadDePiezasPorLado; i++) {
          Juego.moverEnDireccion(40);
        }

        expect(Juego.posicionVacia.fila).to.equal(0);

      });

      it("Mover hacia abajo", function () {
        Juego.moverEnDireccion(38);

        expect(Juego.posicionVacia.fila).to.equal(4);
      });

    });
  });

});


