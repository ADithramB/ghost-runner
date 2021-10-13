var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4

  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  climbersGroup = new Group();
  
}

function draw() {
  background(0);
  
 

    if(gameState === "play"){
      if(tower.y > 400){
        tower.y = 300
      }
      spawndoor()
      if(keyDown(RIGHT_ARROW)){
        ghost.x+=3
      }

      if(keyDown(LEFT_ARROW)){
        ghost.x-=3
      }

      if(keyDown("space")){
        ghost.velocityY=-10
      }
      ghost.velocityY+=0.8

      if(ghost.isTouching(invisibleBlockGroup) || ghost.y>600){
        gameState = "end"
      }



    }
    else if(gameState === "end"){
      textSize(30)
      fill("red")
      text("gameover",250,300)

      tower.destroy()
      ghost.destroy()
      doorsGroup.destroyEach()
      climbersGroup.destroyEach()
      invisibleBlockGroup.destroyEach()

    }

  
    drawSprites();



}
function spawndoor(){
  if(frameCount%200===0){
    door = createSprite(200,-50)
    door.addImage(doorImg)
    door.velocityY = 1
    door.x = Math.round(random(50,550))

    climber = createSprite(door.x,10)
    climber.addImage(climberImg)
    climber.velocityY=1

    invisibleBlock = createSprite(door.x,15,climber.width,2)
    invisibleBlock.velocityY=1

    ghost.depth = door.depth
    ghost.depth = ghost.depth+1

    doorsGroup.add(door)
    invisibleBlockGroup.add(invisibleBlock)
    climbersGroup.add(climber)

  }
}
