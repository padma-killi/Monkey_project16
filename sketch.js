
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score,survivalTime;
var gameState;

function preload(){
  monkey_running =                            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(900,400);
  gameState="PLAY";
  score = 0;
  survivalTime = 0;
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
   
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.X=ground.width/2;
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  
}

function spawnObstacles(){
  if (frameCount % 60 === 0){ 
    obstacle = createSprite(600,325,10,40);
    obstacle.velocityX = -6 ;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime = -1;
    
    
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnFood(){
  if (frameCount % 60 === 0){ 
    banana = createSprite(600,230,10,40);
    banana.velocityX = -6 ;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime = -1;
    
    
   //add each obstacle to the group
    foodGroup.add(banana);
  }
}

function draw() {
  background("skyblue");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+score, 350,50);
  
  stroke("darkred");
  textSize(20);
  fill("darkred");
  if(gameState === "PLAY"){
    survivalTime=Math.ceil(frameCount/frameRate());
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  }
  text("SurvivalTime: "+survivalTime, 300,70);
  
  if (ground.x < 350){
      ground.x = ground.width/2;
    }
  
  
    
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;  
  monkey.collide(ground);
  
  
   if(monkey.isTouching(foodGroup)){
     score=(score+1);
                          
    }
    
  spawnObstacles();
  spawnFood();
    
    if(obstacleGroup.isTouching(monkey)){
        obstacleGroup.setVelocityXEach(0);  
        foodGroup.setVelocityXEach(0);
        gameState="END";
    }
   
  
  
  
  drawSprites();
  
}






