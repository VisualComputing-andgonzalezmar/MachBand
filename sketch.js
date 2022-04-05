var columnas, filas;
var escala = 30;
var largoTerreno = 5000;
var anchoTerreno = 5000;

var terreno = [];

function setup() {
  createCanvas(700, 700, WEBGL);
  background(0);
  columnas = largoTerreno / escala;
  filas = anchoTerreno / escala;
  for (var x = 0; x < columnas; x++) {
    terreno[x] = [];
    for (var y = 0; y < filas; y++) {
      terreno[x][y] = 0;
    }
  }
}

function draw() {

  rotateX(PI/3);
  translate(-largoTerreno / 2, -anchoTerreno / 2);

  var suavizarY = 0;
  for (var y = 0; y < filas; y++) {
    var suavizarX = 0;
    for (var x = 0; x < columnas; x++) {
      terreno[x][y] = map(noise(suavizarX, suavizarY), 0, 1, -350, 350);
      suavizarX += 0.1;
    }
    suavizarY += 0.1;
  }

  for (var x = 0; x < filas - 1; x++) {
    beginShape(TRIANGLE_STRIP);
    for (var y = 0; y < columnas; y++) {
      vertex(x * escala, y * escala, terreno[x][y]);
      if(terreno[x][y] >= 200){fill(255);}//Blanco
      if(terreno[x][y] < 200 && terreno[x][y] >= 100){fill(255,0,0);}//Rojo
      if(terreno[x][y] < 100 && terreno[x][y] >= 0){fill(255,255,0);}//Amarillo
      if(terreno[x][y] < 0 && terreno[x][y] >= -100){fill(0,255,0);}//Verde
      if(terreno[x][y] < -100){fill(0,0,250);}//Azul
      vertex((x+1) * escala, y * escala, terreno[x+1][y]);
      if(terreno[x][y] >= 200){fill(255);}//Blanco
      if(terreno[x][y] < 200 && terreno[x][y] >= 100){fill(255,0,0);}//Rojo
      if(terreno[x][y] < 100 && terreno[x][y] >= 0){fill(255,255,0);}//Amarillo
      if(terreno[x][y] < 0 && terreno[x][y] >= -100){fill(0,255,0);}//Verde
      if(terreno[x][y] < -100){fill(0,0,250);}//Azul
    }
    endShape();
  }
}