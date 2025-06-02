function setup() {
  createCanvas(500, 600);
  tocarMusicaAleatoria();
  tempoInicial = millis(); 
///////////////// Configurações.
  function IniciarDialogos() {
    
    geraldSpeech = "Oi, eu sou o Gerald!";
    showSpeech = true;

    setTimeout(() => {
      showSpeech = false; 
      geraldSpeech = "Vamos plantar uma árvore!";
      showSpeech = true;

      setTimeout(() => {
        showSpeech = false; 
      }, 3000);
    }, 3000); 
  }
}
let numArvoresPlantadas = 0;
let geraldSpeech = "";
let showSpeech = false;
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
let musicas = [];
let musicAtual;
let indexAtual = -1;
let creditLines = [
  "Musicas Adicionadas:",
  "Baseplate 2021 - Item Asylum",
  "Twig - Item asylum",  
  "Fresh Air - Item asylum",  
  "Towny - Item Asylum",
  "Sprites:",
  "Eu desenhei todos os sprites."
];
let mostrarCreditos = false;
let creditX = -300;
let avisoY = -100; 
let mostrarAviso = true;
let tempoInicial;
let tempoMaximoAviso = 10000; 

/////////////////// Musicas

function tocarMusicaAleatoria() {
  let novoIndex;
  do {
    novoIndex = floor(random(musicas.length));
  } while (novoIndex === indexAtual);

  indexAtual = novoIndex;
  musicAtual = musicas[indexAtual];

  musicAtual.play();
  musicAtual.onended(tocarMusicaAleatoria);
}
////////////// End


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
    image(img, this.x, this.y - 100, 180, 180);
  }
}
//////////// End

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
  treefinal = loadImage("tree.png");
  tree1 = loadImage("TreeFrame1.png");
  tree2 = loadImage("TreeFrame2.png");
  tree3 = loadImage("TreeFrame3.png");
  GeraldWalk = loadImage("GeraldWalking.png");
  Grass = loadImage("Grass.png");
  fundo4 = loadImage("fundo4.png");
  frente = loadImage("fronttree.png");
  //box = loadImage("dialogo.png");
  musicas.push(loadSound("Baseplate.mp3"));
  musicas.push(loadSound("Towny.mp3"));
  musicas.push(loadSound("Fresh Air.mp3"));
  musicas.push(loadSound("Twig.mp3"));
}
////// End

/////////////////////// Musica

function load() {
  song.loop();
}

function draw() {
  background(220, 500, 300);
//////////// End

  /////////////////////// céu e fundo

  image(céu, 0, 0);

  image(fundo4, 0, 50);

  image(fundo, 0, 52);

  image(fundo3, 0, 52);

  image(sol, 0, 0);

///// end
  /////////////////////// Nuvems

  xNuvem -= 0.2;
  if (xNuvem <= -width) {
    xNuvem = 0;
  }
  image(nuvems, xNuvem, 0);
  image(nuvems, xNuvem + width, 0);

  image(fundo2, 0, 330);
///// End
  ////////////////////// Gerald e as configurações de movimento.
  ///// Layer das arvores.
  for (let tree of plantedTrees) {
    tree.update();
    tree.show();
  }
  //////// Dialogo
  if (showSpeech) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    let larguraCaixa = textWidth(geraldSpeech) + 20;
    let alturaCaixa = 30;
    rect(xGerald - 10, 330, larguraCaixa, alturaCaixa, 8);
    fill(0);
    noStroke();
    textSize(12);
    text(geraldSpeech, xGerald, 350);
  }
  ///////////

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
  image(frente, 0, 50);

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

  /////////////////////// Slide de Aviso

  if (mostrarAviso) {
    let tempoAtual = millis();
    
    if (tempoAtual - tempoInicial > tempoMaximoAviso) {
      mostrarAviso = false; // 
    } else {
     
      if (avisoY < 162) {
        avisoY += 5; // Velocidade do slide
      }

      fill("white");
      rect(61, avisoY, 260, 80);
      fill("black");
      rect(66, avisoY + 5, 250, 70);
      fill("white");
      textSize(12);
      text('Aperte "O" para ver os creditos.', 100, avisoY + 25);
      text('Aperte "T" Para plantar.', 100, avisoY + 40);
      text('Apertando "E" faz Gerald se repetir.', 100, avisoY + 55);
    }
  }

//////////// Configurações de creditos.


if (mostrarCreditos && creditX < 60) {
  creditX += 10; // Velocidade
} else if (!mostrarCreditos && creditX > -300) {
  creditX -= 10;
}

let creditBoxHeight = creditLines.length * 20 + 20;

if (creditX > -250) {  // Só desenha quando estiver visível
  fill("white");
  rect(creditX, 160, 270, creditBoxHeight);
  fill("black");
  rect(creditX + 5, 165, 260, creditBoxHeight - 10);

  fill("white");
  textSize(12);
  for (let i = 0; i < creditLines.length; i++) {
    text(creditLines[i], creditX + 20, 185 + i * 20);
  }
}
}
///////////////////// Funções de teclas.

function keyPressed() {
  if (key === 'o' || key === 'O') {
  mostrarCreditos = !mostrarCreditos; // Alterna visibilidade
}

  if (key === "e" || key === "E") {
    geraldSpeech = "Esqueceu? Eu sou o Gerald!";
    showSpeech = true;

    setTimeout(() => {
      showSpeech = false;
    }, 3000);
  }

  if (key === "t" || key === "T") {
    plantedTrees.push(new plantedTree(xGerald, yGerald));
    numArvoresPlantadas++; // Valor de arvores

    // Falas do Gerald
    if (numArvoresPlantadas % 5 === 0) {
      if (numArvoresPlantadas === 25) {
        geraldSpeech = "Boa! Você plantou 5 árvores!";
      } else if (numArvoresPlantadas === 50) {
        geraldSpeech = "Ótimo! 10 árvores plantadas!";
      } else if (numArvoresPlantadas === 75) {
        geraldSpeech = "Estamos indo bem! 15 árvores!";
      } else if (numArvoresPlantadas === 100) {
        geraldSpeech = "Incrível! Você plantou 20 árvores!";
      } else if (numArvoresPlantadas === 125) {
        geraldSpeech = "Você é um mestre das árvores! 25 plantadas!";
      } else {
        geraldSpeech = "Continua assim! Muitas árvores já plantadas!";
      }
      showSpeech = true;
      setTimeout(() => {
        showSpeech = false;
      }, 3000);
    }
  }
}