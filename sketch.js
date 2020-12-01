var tower,towerImg;
var door,doorImg;
var doorsGroup, climbersGroup;
var ghost,ghostImg;
var climber, climberImg;
var invBlock,invBlockGroup;
var gameState = "play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  ghostImg=loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(260,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.5;
  
  
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invBlockGroup = new Group();
}

function draw(){
  background(0);
  
 
  
  if (gameState === "play"){
    
    spawnDoors();
    
     if (tower.y>400){
    tower.y = 300;
  }
  
  if (keyDown("w")){
    ghost.velocityY = -5;
    
  }
  
  ghost.velocityY = ghost.velocityY +0.9;
  
  if (keyDown("a")){
  ghost.x = ghost.x - 5;
  }
  
  if (keyDown("d")){
    ghost.x = ghost.x +5;
  }
  
  if (ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0;
  }
  
  if (ghost.isTouching(invBlockGroup) ||ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  drawSprites();
  }
  if (gameState === "end"){
    
    stroke("yellow");
    textSize(30);
    fill("yellow");
    text("GAME OVER",230,250);
    
  }
  
}

function spawnDoors(){
  if (frameCount%150===0){
    var door = createSprite(300,0);
    door.x=Math.round(random(100,400));
    door.addImage("moving_door",doorImg);
    door.velocityY = 3;
    door.lifetime = 200;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    doorsGroup.add(door);
    
    var climber = createSprite(300,50);
    climber.addImage("moving_climber",climberImg);
    climber.velocityY = 3;
    climber.x = door.x;
    climber.lifetime = 200;
    climbersGroup.add(climber);
    
    var invBlock = createSprite(300,60);
    invBlock.velocityY = 3;
    invBlock.width = climber.width;
    invBlock.height = 2;
    invBlock.lifetime = 200;
    invBlock.x = door.x;
    invBlockGroup.add(invBlock);
    invBlock.debug = true;
    
    
    
  }
  
  
  
  
}