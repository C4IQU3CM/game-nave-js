var fundoImg, fundo;
var ufoImg, ufo;
var fogueteImg, foguete;
var coinImg, coin;
var explosaoImg, explosao; 

var coinGroup;
var ufoGroup;

var score = 0;
var life = 3;

var gameState = "play";

//carregar imagens
function preload() {
  fundoImg=loadImage("img/fundo6.jpg");
  ufoImg = loadImage("img/ufo.png");
  fogueteImg = loadAnimation("img/nave2.png");
  explosaoImg = loadAnimation("img/explosao1.png")
  coinImg = loadImage("img/coin.png")
}


function setup() {
  createCanvas(1000,1000);

  //criar sprites do plano de fundo
  fundo = createSprite(400,400)
   //adicionar imagem de fundo

  fundo.addImage(fundoImg)
  fundo.scale = 2

  foguete = createSprite(400,680)
  foguete.addAnimation("foguete", fogueteImg)
  foguete.addAnimation("explosão", explosaoImg)
  foguete.scale = 0.1

  coinGroup = new Group()
  ufoGroup = new Group()
}

function draw() {
  background(0);

  drawSprites();

  textSize(25)
  fill("white")
  text("Vidas: " + life, 60,100)

  textSize(25)
  fill("white")
  text("Pontuação: " + score, 60,150)



  
  //criar estado de jogo "play"
  if (gameState == "play") {
    fundo.velocityY = 3;

    if (fundo.y > 800) {
      //Resetar plano de fundo
      fundo.y= 400
    }
    //programar seta direita
    if (keyDown("RIGHT_ARROW")) {
      foguete.x += 5;
    }
    //programar seta esquerda
    if (keyDown("LEFT_ARROW")){
      foguete.x -= 5;
    }
    if (keyDown("UP_ARROW")){
      foguete.y -= 5;
    }
    if (keyDown("DOWN_ARROW")){
      foguete.y += 5; 
    }
    removeLife()
    removeCoins()
    spawnAliens()
    spawnCoins()

    //programar fim de jogo
    if(life == 0){
      gameState = "end"
    }
  }

  //criar estado de jogo "end"
  if (gameState == "end") {
    //remover grupos
    ufo.Group.destroyEach();
    coin.Group.destroyEach();
    //zerar velocidades do foguete
    fundo.velocityY = 0;
    foguete.velocityX = 0;
    foguete.velocityY = 0;
    //mudar animação do foguete para explosao
    foguete.changeAnimation("explosao", explosaoImg)
    textSize(30)
    fill("orange")
    text("GG MEU NOBRE!!!", 300, 400)
  }
  
}

function spawnAliens() {
  if (frameCount % 60 == 0) {
    //criar sprite e velocidades
    ufo = createSprite(random(30 , 770), random(10 , 500))
    ufo.addImage(ufoImg)
    ufo.velocityY = 3;
    ufo.scale = 0.2;
    //tempo de vida do sprite
    ufo.lifetime = 200;
    //add sprite ao grupo
    ufoGroup.add(ufo);
  }
}

function spawnCoins() {
  if (frameCount % 60 == 0) {
    //criar sprite e velocidades
    coin = createSprite(random(33 , 750),random(15 , 550))
    coin.addImage(coinImg)
    coin.scale = 0.1;
    coin.velocityY = 3;
    //tempo de vida do sprite
    coin.lifetime = 200;
    //add sprite ao grupo
    coinGroup.add(coin)
  }
 
}

//função para remover moedas
function removeCoins() {
  foguete.overlap(coinGroup, function(collector, collected){
    score += 1;
    collected.remove();
  });
}

//função para remover vidas
function removeLife() {
  foguete.overlap(ufoGroup, function(collector, collected){
    life -= 1;
    collected.remove();
  });
 }