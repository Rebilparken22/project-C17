
var monkey,monkey_running,monkey_still;

var banana,bananaImage,obstacle,obstacleImage

var ground;

let timer = 10;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_still = loadAnimation("sprite_0.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}

function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(40,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1; 
  
  ground = createSprite(200,350,1000000,10);
  ground.velocityX = -4;
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
}


function draw() {
background("white");
  

  
  if(gameState === PLAY){
    
    monkey.velocityY = monkey.velocityY +0.8;
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }

    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
   
   if(obstaclesGroup.isTouching(monkey)){
     gameState = END;
     
   }
    
  obstacles ();
    fruits();
    monkey.debug = true
  
    
  }
  if(gameState === END){
    monkey.addAnimation("monkey", monkey_still);
    obstaclesGroup.destroyEach();
    bananasGroup.destroyEach();
    ground.velocityX = 0;
  }
  monkey.collide(ground);
//   survival countdown to reach the goal of game
//   survive till the end
   if(frameCount % 30 === 0 && timer > 0){
     timer --;
   }
  if (timer == 0) {
    gameState = END;
  }
  drawSprites();
  text(timer, 200, 20);
  
  
}

function fruits(){

   if(frameCount % 40 === 0){
      banana = createSprite(400,random(80,250),20,20);
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -4;
      banana.lifetime = 100;
      bananasGroup.add(banana);
  }
  
 
  
  
}

function obstacles(){
  
  if(frameCount % 60 === 0){
  obstacle = createSprite(400,326,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -4;
  obstacle.lifetime = 100; 
  obstaclesGroup.add(obstacle);
  }
  
}