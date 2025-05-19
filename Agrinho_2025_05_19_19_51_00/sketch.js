function setup() {
  createCanvas(500, 600);
  song = loadSound("Baseplate.mp3", load)
  
}
let PosiçãoY = 320;
let PosiçãoX = 370;
let xGerald = 240; 
let yGerald = 367;
let gerald, chao, fundo, fundo2, nuvems;
let img;
let viradoParaDireita = true;
let xNuvem = 0;
let plantedTrees = [];
let tree1, tree2, tree3, treefinal; 

///// Comentario. 
///// Eu tenho o costume de deixar tudo em inglês, por que é mais facil de lembrar.

/////////////////////// Arvores

class plantedTree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.timer = 0;
  }

  update() {
    this.timer++;
    if (this.timer % 30 === 0 && this.frame < 2) {
      this.frame++;
    }
  }

  show() {
    let img;
    if (this.frame === 0) img = tree1;
    else if (this.frame === 1) img = tree2;
    else img = treefinal;
    image(img, this.x, this.y, 180, 180);
  }
}

/////////////////////// Imagens.

function preload() {
  gerald = loadImage("gerald.png");
  chao = loadImage("chao.png");
  fundo = loadImage("fundo.png");
  fundo2 = loadImage("fundo 2.png");
  nuvems = loadImage("nuvems.png");
  céu = loadImage("ceu.png");
  fundo3 = loadImage("BetterBackGround.png");
  sol = loadImage("TheSun.png");
  treefinal = loadImage('tree.png');
  tree1 = loadImage('TreeFrame1.png');
  tree2 = loadImage('TreeFrame2.png');
  tree3 = loadImage("TreeFrame3.png");
  GeraldWalk = loadImage("GeraldWalking.png")
  Grass = loadImage("Grass.png");
}
/////////////////////// Musica

function load() { 
song.loop();
}


function draw() {
  background(220, 500, 300);

/////////////////////// céu e fundo

  image(céu, 0, 0)

  image(fundo, 0, 52);
  
  image(fundo3, 0, 52)
  
  image(sol, 0, 0)

/////////////////////// Nuvems

  xNuvem -= 0.2; 
  if (xNuvem <= -width) {
    xNuvem = 0;
   }
image(nuvems, xNuvem, 0);
image(nuvems, xNuvem + width, 0);

  image(fundo2, 0, 330)

////////////////////// Gerald e as configurações de movimento.
///// Layer das arvores.
for (let tree of plantedTrees) {
  tree.update();
  tree.show();
}
/////

push();

let imgGerald;

if (keyIsDown(65) || keyIsDown(68)) {
  imgGerald = GeraldWalk; 
} else {
  imgGerald = gerald; 
}

if (viradoParaDireita) {
  image(imgGerald, xGerald, 367, 80, 60);
} else {
  translate(xGerald + 80, 0); 
  scale(-1, 1);
  image(imgGerald, 0, 367, 80, 60);
}

pop();

/////////////////////// Chão

  image(chao, 0, 50);
  image(Grass, 0, 50);
  image(Grass, -20, 60);

/////////////////////// Movimento com A e D

  if (keyIsDown(65)) {
    xGerald -= 1.5;
    viradoParaDireita = false;
  }
  if (keyIsDown(68)) {
    xGerald += 1.5;
    viradoParaDireita = true;
  }

/////////////////////// Limita a posição

 xGerald = constrain(xGerald, 0, width - 75);

/////////////////////// X, Y

  if (mouseIsPressed) {
    console.log(mouseX, mouseY)  
    fill('white')
    rect(61, 162, 260, 80)
    fill('black')
    rect(66, 167, 250, 70,)
    fill('white')
    text('Aperte "O" para ver os creditos.', 100, 200)
  }
  if (key == "o"){  
    fill('white')
    rect(61, 162, 260, 80)
    fill('black')
    rect(66, 167, 250, 70,)
    fill('white')
    text('Musica: BaseaPlate 2021 - Item Asylum', 80, 200)
    text('Eu desenhei todos os sprites.', 100, 220)
   }
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    plantedTrees.push(new plantedTree(xGerald, yGerald - 90));
  }
}
