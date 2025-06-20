function setup() {
  createCanvas(500, 600);
  tocarMusicaAleatoria();
  tempoInicial = millis();
  IniciarDialogos(); 
///////////////// Configurações.
  function IniciarDialogos() {
    
    geraldSpeech = "Oi, eu sou o Sr.Gerald!";
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
let dialogueActive = false; // se está numa pergunta
let dialogueQuestion = "";  // texto da pergunta
let dialogueOptions = [];   // array com duas opções
let selectedOption = -1;    // -1 enquanto nada foi selecionado
let pergunta30Respondida = false;
let pergunta60Respondida = false;
let pergunta120Respondida = false;
let pergunta180Respondida = false;
let ultimaPergunta = 0; // Para saber qual foi a última pergunta feita
// Novas variáveis para diálogo melhorado
let dialogueResponse = ""; // resposta do Gerald
let showDialogueResponse = false;
let dialogueResponseTimer = 0;
let hoveredOption = -1; // para highlight da opção

// ✅ NOVAS VARIÁVEIS PARA O FINAL
let gameEnded = false;
let fadeAlpha = 0;
let fadeSpeed = 2;
let endingStarted = false;
let finalDialogueShown = false;
let finalDialogueTimer = 0;
let endingPhase = 0; // 0: fade out, 1: diálogo final, 2: tela final
let restartPrompt = false;

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
  dialogue = loadImage("dialogo.png");
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

  // ✅ SE O JOGO TERMINOU, MOSTRAR APENAS A TELA FINAL
  if (gameEnded) {
    drawEndingScreen();
    return;
  }

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
  //////// Dialogo normal do Gerald
  if (showSpeech && !dialogueActive) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    let larguraCaixa = textWidth(geraldSpeech) + 20;
    let alturaCaixa = 30;
    rect(xGerald - 10, 330, larguraCaixa, alturaCaixa, 8);
    fill(0);
    noStroke();
    textAlign(LEFT); // Garantir alinhamento
    textSize(12);
    text(geraldSpeech, xGerald, 350);
  }
  

  
  /////////// Gerald

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
      textAlign(LEFT); // Resetar alinhamento
      textSize(12);
      text('Aperte "O" para ver os creditos.', 100, avisoY + 25);
      text('Aperte "T" Para plantar.', 100, avisoY + 40);
      text('Apertando "E" faz Gerald se repetir.', 100, avisoY + 55);
    }
  }

  //////////// Caixa de diálogo melhorada
  if (dialogueActive) {
    // Fundo escuro semi-transparente
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
    
    // Caixa principal do diálogo
    fill(250, 250, 250);
    stroke(100, 100, 100);
    strokeWeight(4);
    rect(60, 250, 380, 200, 20);
    
    // Sombra da caixa
    fill(0, 0, 0, 80);
    noStroke();
    rect(65, 255, 380, 200, 20);
    
    // Header da caixa
    fill(100, 150, 200);
    rect(60, 250, 380, 40, 20, 20, 0, 0);
    
    // Texto do header
    fill(255);
    textAlign(CENTER);
    textSize(16);
    textStyle(BOLD);
    text("Gerald tem uma pergunta!", 250, 275);
    
    // Pergunta principal
    fill(40, 40, 40);
    textAlign(LEFT);
    textSize(14);
    textStyle(NORMAL);
    text(dialogueQuestion, 80, 320);
    
    // Atualiza qual opção está sendo hovereada
    hoveredOption = -1;
    for (let i = 0; i < dialogueOptions.length; i++) {
      let x = 80;
      let y = 350 + i * 60;
      let w = 320;
      let h = 40;
      if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        hoveredOption = i;
      }
    }
    
    // Opções de resposta
    for (let i = 0; i < dialogueOptions.length; i++) {
      let x = 80;
      let y = 350 + i * 50;
      let w = 320;
      let h = 40;
      
      // Cor da opção (muda se estiver hovereada)
      if (hoveredOption === i) {
        fill(150, 200, 255); // azul claro quando hovereada
        stroke(100, 150, 200);
      } else {
        fill(220, 220, 220); // cinza claro normal
        stroke(150, 150, 150);
      }
      
      strokeWeight(2);
      rect(x, y, w, h, 10);
      
      // Texto da opção
      fill(40, 40, 40);
      textAlign(LEFT);
      textSize(13);
      textStyle(NORMAL);
      text(`${i + 1}. ${dialogueOptions[i]}`, x + 15, y + 25);
    }
    
    // Instrução
    fill(0);
    textAlign(CENTER);
    textSize(11);
    text("Clique em uma opção para responder", 250, 200);
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
  textAlign(LEFT); // Resetar alinhamento
  textSize(12);
  for (let i = 0; i < creditLines.length; i++) {
    text(creditLines[i], creditX + 20, 185 + i * 20);
  }
}

  // ✅ FADE OUT PARA O FINAL
  if (endingStarted && !gameEnded) {
    fill(0, 0, 0, fadeAlpha);
    rect(0, 0, width, height);
    
    fadeAlpha += fadeSpeed;
    
    if (fadeAlpha >= 255) {
      gameEnded = true;
      fadeAlpha = 255;
    }
  }
}

// ✅ FUNÇÃO PARA DESENHAR A TELA FINAL
function drawEndingScreen() {
  background(0); // Fundo preto
  
  if (endingPhase === 0) {
    // Fase inicial - apenas preto
    endingPhase = 1;
    finalDialogueTimer = millis();
  } else if (endingPhase === 1) {
    // Mostrar diálogo final do Gerald
    if (millis() - finalDialogueTimer > 1000 && !finalDialogueShown) {
      finalDialogueShown = true;
    }
    
    if (finalDialogueShown) {
      // Caixa de diálogo final
      fill(250, 250, 250);
      stroke(100, 100, 100);
      strokeWeight(4);
      rect(50, 200, 400, 200, 20);
      
      // Header
      fill(100, 150, 100);
      rect(50, 200, 400, 40, 20, 20, 0, 0);
      
      fill(255);
      textAlign(CENTER);
      textSize(16);
      textStyle(BOLD);
      text("Gerald se despede!", 250, 225);
      
      // Mensagem final
      fill(40, 40, 40);
      textAlign(CENTER);
      textSize(14);
      textStyle(NORMAL);
      text("Parabéns! Você plantou 230 árvores!", 250, 260);
      text("Você fez uma grande diferença para o planeta!", 250, 280);
      text("Obrigado por ajudar a reflorestar nossa floresta!", 250, 300);
      text("", 250, 320);
      text("- Sr. Gerald", 250, 340);
      
      // Aguardar um pouco antes de mostrar opção de reiniciar
      if (millis() - finalDialogueTimer > 5000 && !restartPrompt) {
        restartPrompt = true;
      }
      
      if (restartPrompt) {
        fill(150, 150, 150);
        textAlign(CENTER);
        textSize(12);
        text("Pressione ESPAÇO para jogar novamente", 250, 380);
      }
    }
  }
}

// ✅ FUNÇÃO PARA REINICIAR O JOGO
function resetGame() {
  numArvoresPlantadas = 0;
  plantedTrees = [];
  gameEnded = false;
  fadeAlpha = 0;
  endingStarted = false;
  finalDialogueShown = false;
  restartPrompt = false;
  endingPhase = 0;
  
  // Resetar todas as perguntas
  pergunta30Respondida = false;
  pergunta60Respondida = false;
  pergunta120Respondida = false;
  pergunta180Respondida = false;
  
  // Resetar posição do Gerald
  xGerald = 240;
  
  // Reiniciar diálogo inicial
  IniciarDialogos();
}

function IniciarDialogos() {
  geraldSpeech = "Oi, eu sou o Sr.Gerald!";
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

///////////////////// Funções de teclas.
function mousePressed() {
  if (dialogueActive) {
    console.log("Clique detectado no diálogo"); // Debug
    for (let i = 0; i < dialogueOptions.length; i++) {
      let x = 80;
      let y = 350 + i * 50;
      let w = 320;
      let h = 40;
      if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        console.log("Opção clicada:", i); // Debug
        selectedOption = i;
        handleDialogueOption(i); // função para tratar a resposta
        dialogueActive = false;  // fecha o diálogo
        return; // Evitar múltiplos cliques
      }
    }
  }
}

////////////////////
function handleDialogueOption(optionIndex) {
  console.log("Opção selecionada:", optionIndex, "Última pergunta:", ultimaPergunta); // Debug
  
  if (ultimaPergunta === 30) {
    if (optionIndex === 0) {
      geraldSpeech = "Ótimo! É verdade que as árvores têm uma grande-";
      setTimeout(() => {
        geraldSpeech = "-importância para a vida, e para o planeta!";
      }, 1500);
    } else {
      geraldSpeech = "Tudo bem! Mas posso te ensinar, só continue plantando!";
    }
    showSpeech = true;
    setTimeout(() => {
      showSpeech = false;
    }, 3000);
  }
  
  if (ultimaPergunta === 60) {
    if (optionIndex === 0) {
      geraldSpeech = "Perfeito! Você está correto!";
    } else {
      geraldSpeech = "Ok! Mesmo assim, eu posso explicar!";
    }
    showSpeech = true;
    setTimeout(() => {
      showSpeech = false;
    }, 3000);
  }
  
  if (ultimaPergunta === 120) {
    if (optionIndex === 0) {
      geraldSpeech = "Perfeito! Você já tem um conhecido sobre o assunto!";
    } else {
      geraldSpeech = "Tudo bem! Árvores permitem a vida no nosso planeta!";
    }
    showSpeech = true;
    setTimeout(() => {
      showSpeech = false;
    }, 3000);
  }

  if (ultimaPergunta === 180) {
    if (optionIndex === 0) {
      geraldSpeech = "Correto! São as celulas presentes nos vegetais e árvores! ";
    } else {
      geraldSpeech = "Incorreto! Mas é bom saber que tentou";
    }
    showSpeech = true;
    setTimeout(() => {
      showSpeech = false;
    }, 3000);
  }
}

////////////////////
function falarComGerald(mensagens, delay = 2000) {
  let i = 0;
  showSpeech = true;

  function mostrarMensagem() {
    if (i < mensagens.length) {
      geraldSpeech = mensagens[i];
      i++;
      setTimeout(mostrarMensagem, delay);
    } else {
      showSpeech = false;
    }
  }

  mostrarMensagem();
}

function keyPressed() {
  // ✅ CONTROLE PARA REINICIAR O JOGO
  if (gameEnded && restartPrompt && key === ' ') {
    resetGame();
    return;
  }
  
  // ✅ IMPEDIR AÇÕES SE O JOGO TERMINOU
  if (gameEnded || endingStarted) {
    return;
  }
  
  if (key === 'o' || key === 'O') {
    mostrarCreditos = !mostrarCreditos; // Alterna visibilidade
  }

  if (key === "e" || key === "E") {
    geraldSpeech = "Esqueceu? Eu sou o Sr.Gerald!";
    showSpeech = true;

    setTimeout(() => {
      showSpeech = false;
    }, 3000);
  }

  if (key === "t" || key === "T") {
    plantedTrees.push(new plantedTree(xGerald, yGerald));
    numArvoresPlantadas++; // Valor de arvores

    // ✅ VERIFICAR SE CHEGOU EM 230 ÁRVORES
    if (numArvoresPlantadas === 230) {
      endingStarted = true;
      // Parar a música se estiver tocando
      if (musicAtual && musicAtual.isPlaying()) {
        musicAtual.stop();
      }
      return; // Não executar mais nada
    }

    //////// Falas do Gerald
    // ✅ FALAS NORMAIS
    // Falas normais com múltiplas frases
    if (
      numArvoresPlantadas === 35 ||
      numArvoresPlantadas === 65 ||
      numArvoresPlantadas === 90 ||
      numArvoresPlantadas === 160 ||
      numArvoresPlantadas === 205
    ) {
      if (numArvoresPlantadas === 35) {
        falarComGerald([
          "Boa! Você plantou 35 árvores!",
          "Sabia que árvores ajudam a purificar o ar que respiramos?",
          "Continue assim, a floresta agradece!"
        ]);
      } else if (numArvoresPlantadas === 65) {
        falarComGerald([
          "Ótimo! 65 árvores plantadas!",
          "Sabia que as árvores tem um sistema de comunicação?.",
          "As florestas são o lar de muitos seres vivos também!"
        ]);
      } else if (numArvoresPlantadas === 90) {
        falarComGerald([
          "Estamos indo bem! 90 árvores!",
          "Cada árvore tem seus propio fruto e função no ecossistema!",
          "Reflorestar é salvar o futuro!"
        ]);
      } else if (numArvoresPlantadas === 160) {
        falarComGerald([
          "Incrível! Você plantou 160 árvores!",
          "O desmatamento causa grandes prejuízos à natureza.",
          "Como menos oxigenio sendo produzido, menos plantas e",
          "Menos fontes alimentos para os animais",
          "Com sua ajuda, estamos revertendo esse processo!"
        ]);
      } else if (numArvoresPlantadas === 205) {
        falarComGerald([
          "Maravilha! 205 plantadas!",
          "A floresta está viva novamente graças a você!",
          "Bom trabalho!"
        ]);
      }
      showSpeech = true;
      setTimeout(() => {
        showSpeech = false;
      }, 3000);
    }

    // ✅ PERGUNTA EM 30 ÁRVORES
    if (numArvoresPlantadas === 30 && !pergunta30Respondida) {
      pergunta30Respondida = true;
      ultimaPergunta = 30; // Marcar qual pergunta foi feita
      dialogueActive = true;
      dialogueQuestion = "Você sabe qual é a importancia das arvores para nos?";
      dialogueOptions = ["Sim, geram oxigenio e melhoram a qualidades de ar!", "Não conheço muito sobre."];
    }

    // ✅ NOVA PERGUNTA EM 60 ÁRVORES
    if (numArvoresPlantadas === 60 && !pergunta60Respondida) {
      pergunta60Respondida = true;
      ultimaPergunta = 60; // Marcar qual pergunta foi feita
      dialogueActive = true;
      dialogueQuestion = "Acha que é importante fazer a plantação de árvores?";
      dialogueOptions = ["Sim!, é essencial ao nosso planeta!", "Não, já que não conheço as funções delas."];
    }

    // ✅ NOVA PERGUNTA EM 120 ÁRVORES 
    if (numArvoresPlantadas === 120 && !pergunta120Respondida) {
      pergunta120Respondida = true;
      ultimaPergunta = 120; // Marcar qual pergunta foi feita
      dialogueActive = true;
      dialogueQuestion = "Você conhece os benefícios das florestas para o clima?";
      dialogueOptions = ["Sim! Elas regulam temperatura e umidade!", "Não sei muito sobre isso."];
    }

    // ✅ NOVA PERGUNTA EM 180 ÁRVORES
    if (numArvoresPlantadas === 180 && !pergunta180Respondida) {
      pergunta180Respondida = true;
      ultimaPergunta = 180; // Marcar qual pergunta foi feita
      dialogueActive = true;
      dialogueQuestion = "Sabe qual tipo de celula as árvores tem? Um desafio simples!";
      dialogueOptions = ["Claro! São as Células eucarióticas!", "Sim! são as Celulas procariontes!"];
    }
  }
}