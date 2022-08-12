let ball_x, ball_y, ball_d, ball_dx, ball_dy 
let paddle_x, paddle_y, paddle_w, paddle_h, paddle_dx
let bricks = []
let h, w, sc, lives, level

function setup() {
  createCanvas(400, 400);
  ball_dx = -2
  ball_dy = -2
  ball_x = width/2
  ball_y = 300
  ball_d = 20
  paddle_w = 150
  paddle_h = 10
  paddle_x = width/2 - paddle_w/2
  paddle_y = height - paddle_h
  paddle_dx = 15
  
  lives = 4
  
  sc = 0
  
  for(var i = 0; i<4; i++){
    bricks.push([])
    for(var j = 0; j<4; j++){
      bricks[i][j] = {
        x : (j*85) +30,
        y : (i*25) +40,
        status : "show"      
      }
    }
  }
  
  
  h = 20
  w = 80
}

function draw() {
  background("black")
  circle(ball_x, ball_y, ball_d)

  
  rect(paddle_x, paddle_y, paddle_w, paddle_h)
  fill("white")
  text("Score: ", 20, 20)
  text(sc, 70, 20)
  
  text("Lives: ", 100,20)
  text(lives, 150, 20)
  text("Level: ", 200,20)
  text(level, 250,20)
  level = 1
  
  
  for(var i = 0; i<4; i++){
    for(var j = 0; j<4; j++){
      // On the corner
      if(ball_y-ball_d/2 <= bricks[i][j].y + h && ball_x+ball_d/2>= bricks[i][j].x && ball_x-ball_d/2<= bricks[i][j].x + w && ball_y+ball_d/2 >= bricks[i][j].y){
          if((ball_x-ball_d/2<=bricks[i][j].x+w || ball_x+ball_d/2>=bricks[i][j].x)&& (bricks[i][j].status == "show") && (ball_y<=bricks[i][j].y+h && ball_y>=bricks[i][j].y) ){
           // side walls
            ball_dx = -(ball_dx)            
          }
          if((ball_y-ball_d/2<=bricks[i][j].y+h && ball_y+ball_d/2>=bricks[i][j].y) && (ball_x>=bricks[i][j].x && ball_x<=bricks[i][j].x+w) && bricks[i][j].status=="show"){
           // top bottom
            ball_dy = -(ball_dy)
          }
          if(bricks[i][j].status == "show"){
            sc++
            bricks[i][j].status = "hide"  
          }        
      }
      if(bricks[i][j].status == "show")
        rect(bricks[i][j].x, bricks[i][j].y, w, h)
    }
  }
  
  
  
  if(ball_x + ball_dx <=400)
    ball_x += ball_dx
  else
    ball_x = 400
  
  
  if(ball_y + ball_dy > 0 )
    ball_y += ball_dy
  else
    ball_y = 0
  
  if(ball_x >= paddle_x && ball_x <= (paddle_x + paddle_w) && ball_y + ball_d/2 >= height - paddle_h && ball_y-ball_d/2<=paddle_y )
      ball_dy = -(ball_dy)
  
  if(ball_y - ball_d/2 <=0){
    ball_dy = -(ball_dy)
  }
  
  if(ball_x >= 400 - ball_d/2 || ball_x <= ball_d/2){
    ball_dx = -(ball_dx)
  }
  
  if(ball_y+ball_d/2>=height && lives>0){
    ball_x = width/2
    ball_y = 300
    ball_dx = -3
    ball_dy = -2
    lives--
    sc = 0
    
    for(var i = 0; i<4; i++){
    bricks.push([])
      for(var j = 0; j<4; j++){
        bricks[i][j] = {
          x : (j*85) +30,
          y : (i*25) + (5-(lives))*40,
          status : "show"      
        }
      }
    }
  }else if(lives<=0) text("Game Over!", 130, 40)
  
  if(sc==16){
    level+=1
    sc=0
    
    ball_dx > 0 ? ball_dx++ : ball_dx--
    ball_dy > 0 ? ball_dy++ : ball_dy--
    
    if(paddle_w>lives*5)paddle_w -= lives*5
    paddle_x = width/2 - paddle_w/2
    //paddle_y = height - paddle_h
    ball_x = width/2
    ball_y = 300
    for(var i = 0; i<4; i++){
    bricks.push([])
      for(var j = 0; j<4; j++){
        bricks[i][j] = {
          x : (j*85) +30,
          y : (i*25) + (5-(lives))*40,
          status : "show"      
        }
      }
    }
    
  }
  
  if(keyIsDown(LEFT_ARROW)){
    if(paddle_x + paddle_dx > 0)
      paddle_x -= paddle_dx
    else
      paddle_x = 0
  }
  if(keyIsDown(RIGHT_ARROW)){
    if(paddle_x + paddle_w <= width)
      paddle_x += paddle_dx
    else
      paddle_x = width - paddle_w
  }
  
  
}

