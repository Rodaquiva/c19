//1a crear varibles para la torre 
//1b crear variables para las puertas
//1c crear lo mismo para los barandales hasta el 4c
//1d crear variables para el fantasma 
var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
//1F 
var invisibleBlock, invisibleBlock;
//1G variable de estado inicializada en PLAY
var gameState = "play";
//1h variable para el sonido
var spookySound;
//I1 variable para el score
var score = 0;


//2a precargar la imagen de la torre towerImg
//2b precargar las imagen de las puertas doorImg
//2c 
//2d 
//2h cargar sonido
function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);


  //3h reproducir el sonido cíclico


  //3a crear sprite, agregar imagen de la torre y darle una velocidad inicial
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;


  //4b crear grupo para puertas
  doorsGroup = new Group();


  //4c
  climbersGroup = new Group();

  //3F
  invisibleBlockGroup = new Group();



  //3d crear sprite, agregar imágen y escalar el fantastma
  var ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("fantasma", ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background("black");


  //2G estado de PLAY: mover todo a este estado
  if (gameState === "play") {



    //4a regresar la imagen de fondo
    if (tower.y > 400) {
      tower.y = 300;
    }

    //4d Agregar movimiento de salto, izquierda y derecha al fantasma
    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    //4d agregar GRAVEDAD (caída) al fantasma
    ghost.y = ghost.y + 0.8;


    //1e hacer que se caiga el fantasma si toca los barandales
    if (ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0;
    }


    //4F
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();



      //2G-2
      gameState="end";


    }
    //5b invocarla función que crea las puertas
    spawnDoors();


    drawSprites();

    //I2 actualizar score
    score = score+Math.round(getFrameRate()/60);
    text("score"+score,400,100);


  }
  //3G estado de END, generar pantalla nueva y mensaje de GameOver
  if (gameState==="end"){
    fill("yellow");
    textSize(30);
    text("game over",220,250);
    

  }


}

//3b crear función para generar puertas
function spawnDoors() {
  //3b-1 escribir condicional para hacer que las puertas salgan cada ciertos (240) cuadros
  if (frameCount % 240 === 0) {



    //3b-2 crear sprite y agregar imagen
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    //3c-1
    var climber = createSprite(200, 10);
    climber.addImage(climberImg);



    //2F-1
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;


    //3b-3 hacer que la posición de las puertas en x sea random 
    door.x = Math.round(random(120, 400));

    //3b-4 darles una velocidad de bajada a las puertas
    door.velocityY = 2;

    //3c-2 poner los barandales a la par que las puertas
    climber.x = door.x;
    climber.velocityY = 2;



    //2F-2 
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;


    //3b-5 asignar ciclo de vida a la variable
    door.lifetime = 300;

    //3c-3 
    climber.lifetime = 300;

    //2F-3
    invisibleBlock.lifetime = 300;


    //5d
    ghost.depth = door.depth + 2;



    //3b-6 agregar las puertas a un grupo
    doorsGroup.add(door);


    //3c-4
    climbersGroup.add(climber);


    //2F-4
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);


  }
}