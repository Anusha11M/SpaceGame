var bg, bgImg
var bottomGround
var topGround
var rocket, rocketImg;
var asteroid,asteroidImg;
var mars, marsImg;
var neptune, neptuneImg;
var restart,restartImg, satellite, satelliteImg;
var Saturn, SaturnImg;
var r;
var gameState;
gameState=0;
var obstacleGroup;
var score=0;

function preload(){
rocketImg = loadImage("Rocket.png")
asteroidImg = loadImage("asteroid.png")
marsImg = loadImage("mars.png")
neptuneImg = loadImage("neptune.png")
restartImg = loadImage("restart.png")
satelliteImg = loadImage("satellite.png")
SaturnImg = loadImage("Saturn.png")
bgImg = loadImage("Space.png")
}

function setup(){

  canvas = createCanvas(1200,800);
 
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
     
rocket = createSprite(1100 ,200,20,50);
rocket.addImage(rocketImg);
rocket.scale = 0.2;

obstacleGroup = new Group ();


}

function draw() {
  
  
  
  if(gameState===0){
    
  background("black");
  rocket.visible=false;
  bg.visible=false;
  
  fill ("White");
  textSize(22);
  text("Welcome Player" ,520,350);
  text("Press SPACE to start the game" ,470,400);
  
  if(keyIsDown(32)){
  gameState=1;
  }
  score=0;
  }
  
  if(gameState===1){

  score = score + Math.round(getFrameRate()/60);
 console.log(score);
    rocket.visible=true;
    bg.visible=true;
    bg.velocityX=-4;
    rocket.velocityX=-4;
    
  if (bg.x<440){

    bg.x=bg.width/2;

  } 
          //making the hot air balloon jump
       if(keyIsDown(UP_ARROW)){
         rocket.y-=14;
       }
       if(keyIsDown(DOWN_ARROW)){
        rocket.y+=14;
      }
      if(keyIsDown(LEFT_ARROW)){
        rocket.x-=14;
      }
      if(keyIsDown(RIGHT_ARROW)){
        rocket.x+=14;
      }

          //adding gravity
       if(frameCount%80==0){
         Spawn();
        }
       
        if(obstacleGroup.isTouching(rocket)||rocket.x<=0||rocket.x>1200){
          gameState=2;
        }
      }
 
      if(gameState==2){

        gameState=0;
        obstacleGroup.destroyEach();
        rocket.x=1100;
        
        } 
        

      drawSprites(); 
      textSize(18);
      text ("Score : " +score, 600,100); 
}

function Spawn()
{

var a = createSprite(10,Math.round(random(20,700))) ; 

r=Math.round(random(1,5));
switch(r){
  case 1 :
    a.addImage(asteroidImg) ;
    break;

    case 2 :
    a.addImage(marsImg) ;
    break;
    case 3 :
    a.addImage(satelliteImg) ;
    break;
    case 4 :
    a.addImage(SaturnImg) ;
    break;
    case 5:
    a.addImage(neptuneImg) ;
    break;
}

a.velocityX=6;
a.lifeTime=200;
a.scale =0.5;
obstacleGroup.add(a);
}
