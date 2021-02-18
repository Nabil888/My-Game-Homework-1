var gameState = 0;
var player,ground;
var start;
var bullet,bGroup;
var shootBullet,sBulletGroup;
var bulletNum = 5;
var gEnemy,gEnemyGroup;
var sEnemy,sEnemyGroup;
var playerLife = 3;
var score = 0;
var mat;
function setup() {
  createCanvas(800,400);
  player = createSprite(100, 200, 30, 30);
  player.shapeColor = "white";
  ground = createSprite(400,375,800,50);
  ground.shapeColor = "brown";
  mat = createSprite(100,220,50,20);
  mat.shapeColor = "purple";
  start = createButton('start');
  start.position(400,300);
  start.style('background-color','lightgreen');
  start.style('color','purple');
  sBulletGroup = createGroup();
  bGroup = createGroup();
  gEnemyGroup = createGroup();
  sEnemyGroup = createGroup();
}

function draw() {
  background("blue");
  
  mat.y = mouseY;
  player.y = mat.y;
  player.collide(mat);
  mat.collide(ground);
  if(gameState === 0){
    mat.visible = false;
    player.visible = false;
    ground.visible = false;
    start.mousePressed(()=>{
      gameState = 1;
      start.hide();
    })
  }
  if(gameState === 1){
    fill("white");
    text("Bullets left: "+bulletNum,20,20);
    spawnBullet();
    spawnSEnemies();
    spawnGEnemies();
    mat.visible = true;
    player.visible = true;
    ground.visible = true;
  player.velocityY = 8;
  player.collide(ground);  
  
  if(keyDown(UP_ARROW)){
    player.velocityY = -10;
  }
  if(player.isTouching(bGroup)){
    bGroup[0].destroy();
    bulletNum +=5;
  }
  if(keyWentDown("space")&&bulletNum>0){
    shootBullets();
    bulletNum-=1;
  }
  for(var i = 0;i<sEnemyGroup.length;i+=1){
    for(var b = 0;b<sBulletGroup.length;b+=1){
  if(sEnemyGroup.isTouching(sBulletGroup)){
    sBulletGroup[b].destroy();
    sEnemyGroup[i].destroy();
    score+=1;
    }
  }
}
  for(var i = 0;i<gEnemyGroup.length;i+=1){
      for(var b = 0;b<sBulletGroup.length;b+=1){
      if(sBulletGroup.isTouching(gEnemyGroup)){
        sBulletGroup[b].destroy();
        gEnemyGroup[i].destroy();
        score+=1;
      }
      }
    }
  if(sEnemyGroup.isTouching(player)){
    playerLife-=1;
    sEnemyGroup[0].destroy();
  }
  if(gEnemyGroup.isTouching(player)){
    playerLife-=1;
    gEnemyGroup[0].destroy();
  }
}
  
  drawSprites();
  textSize(20);
  fill("white");
  text("Score: "+score,400,20);
  fill("red");
  text("Player Lives: "+playerLife,660,20);
}
function spawnBullet(){
  if(frameCount%300=== 0){
    bullet = createSprite(800,Math.round(random(75,350)),20,20);
    bullet.lifetime = 200;
    bullet.velocityX = -4;
    bullet.shapeColor = "yellow";
    bGroup.add(bullet);
  }
}
function shootBullets(){
  shootBullet = createSprite(player.x,player.y,8,8);
  shootBullet.velocityX = 10;
  sBulletGroup.add(shootBullet);
}
function spawnSEnemies(){
  if(frameCount%100 === 0){
    sEnemy = createSprite(800,Math.round(random(10,300)),40,40);
    sEnemy.shapeColor = "red";
    sEnemy.velocityX = -(5+score/20);
    sEnemyGroup.add(sEnemy);
    sEnemy.lifetime = 160;
  }
}
function spawnGEnemies(){
  if(frameCount%80 === 0){
    gEnemy = createSprite(800,330,40,40);
    gEnemy.shapeColor = "brown";
    gEnemy.velocityX = -(5+score/20);
    gEnemyGroup.add(gEnemy);
    gEnemy.lifetime = 160;
  }
}
