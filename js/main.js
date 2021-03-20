const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let btn = false;
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let ballsNumb = 0;//balls do not appear instantly, therefore a separate counter is made
let counter = 0;//ball counter
let mouse = {
x : width/2,//mouse coordinates
y : height/2,
press : false
}


let devourer = new Ball(//separate user ball declaration
  100,
  100,
  0,
  0,
  'red',
  25
)

setPos = ({x,y}) =>{ 
 mouse.x = x//
 mouse.y = y 
}

setBtn =()=>{
btn = !btn
}

setPress = ()=>{
mouse.press= !mouse.press  //
}

Ball.prototype.move = function(){//
  let dx = mouse.x - devourer.x
  let dy = mouse.y - devourer.y
  let leng = 4;
  if(dx<=leng){devourer.x=mouse.x}else{
  devourer.x += dx/leng}
  if(dy<=leng){devourer.y=mouse.y}else{
  devourer.y += dy/leng}
  if(devourer.x-devourer.size<0)(devourer.x=devourer.size)//
  if(devourer.x+devourer.size>width)(devourer.x=width-devourer.size)
  if(devourer.y-devourer.size<0)(devourer.y=devourer.size)
  if(devourer.y+devourer.size>height)(devourer.y=height-devourer.size)
}

point = ()=>{//
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.font = "italic 30pt Arial";
  ctx.strokeText(counter, width-80, height-30);
  ctx.fill();
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}



Ball.prototype.drawDevourer = function() {
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}


Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {

      
      if (!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
          
          let summVX = random(-4,4)+(Math.abs(this.velX)+Math.abs(balls[j].velX))/2//idea in uniting into one impulse and then dividing it
          let summVY = random(-4,4)+(Math.abs(this.velY)+Math.abs(balls[j].velY))/2//random to destabilize the speed, without this, over time, all speeds will come to the same value
          if(this.x>balls[j].x){
            this.velX= summVX
          }else{
            this.velX = 0-summVX
          }

          if(this.y>balls[j].y){
            this.velY= summVY
          }else{
            this.velY = 0-summVY
          }
          
        //old collision system, works with bugs
        //    if(!(this.velX === 7 || this.velX === -7)){ 
        //    this.velX = -(this.velX)+1;
        //    }else{
        //        if(this.velX === 7){this.velX = -(this.velX)+1}
        //       if(this.velX === -7){this.velX = -(this.velX)-1}
        //    } 
          
        //    if(!(this.velY === 7 || this.velY === -7)){
        //      this.velY = -(this.velY)+1;
        //      }else{
        //          if(this.velY === 7){this.velX = -(this.velY)+1}
        //          if(this.velY === -7){this.velX = -(this.velY)-1}
        //      }
            
        // }
        //  if(this.velX === 0 & this.x <= 0){this.velX === 2}
        //  if(this.velX === 0 & this.x >= width){this.velX === -2}
        //  if(this.velY === 0){this.velY === 2}
      }
    }
  }
}



Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {//pushing away from the wall
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
}

function devouring (obj,i){//user eating other balls
  let dDx = obj.x - devourer.x
  let dDy = obj.y - devourer.y
  let distanceD = Math.sqrt(dDx*dDx+dDy*dDy)
  if(distanceD < obj.size + devourer.size){
    balls.splice(i, 1)
    counter++
    ballsNumb--
  }
}



function loop() {
    ctx.fillStyle = 'rgba(0, 0, 50, 0.6)';
    ctx.fillRect(0, 0, width, height);
    
    while (ballsNumb < 25) {
      ballsNumb++
      setTimeout(() => {
        let ball = new Ball(
        random(20,width-20),
        random(20,height-20),
        random(-9,9),
        random(-9,9),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        random(10,20)
      );
      balls.push(ball);
      }, random(300,4000));
    }
  
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect()
      devouring (balls[i],i)
    }
    if(btn){
    devourer.drawDevourer()
    devourer.move()
    point()}
    requestAnimationFrame(loop);
}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}
canvas.addEventListener('mousemove',setPos)
window.addEventListener('keydown',setBtn)

let balls = []
for(let i =0;i<15;i++){
  let ball = new Ball(
    random(20,width-20),
    random(20,height-20),
    random(-9,9),
    random(-9,9),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    random(10,20)
  );
  balls.push(ball);
  ballsNumb++
}

loop();//GO
