const cvs = document.getElementById("snake"); //1
const ctx = cvs.getContext("2d"); //1

//create the unit
const box = 32; //2

//load the images                                   //3
const ground = new Image();
ground.src = "img/ground3.png";

const foodImg = new Image();
foodImg.src = "img/food2.png";

//load audio files                       //23
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

//create snake                                     //4
let snake = [];

snake[0] = {
  x: 9 * box, //9 units from x axis
  y: 10 * box,
};

//create food                                     //5
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

//create the score                              //6
let score = 0;

//control snakes
let d; //14

document.addEventListener("keydown", direction); //12

function direction(event) {
  //13
  if (event.keyCode == 37 && d != "RIGHT") {
    //to prevent snake from going opposite direction
    left.play();
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

//collision function                                  //22
 function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}


//draw everything to the canvas
function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    //7
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box); //9
    //draw a stroke
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  //draw the food
  ctx.drawImage(foodImg, food.x, food.y); //the food takes random places   //10

  //draw the score                                        //11
  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);

  //old head position                                     //15
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //remove the tail                                       //16
  //snake.pop();

  //which direction to go                                 //17
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // add new head                                         //18
  let newHead = {
    x : snakeX,
    y : snakeY
}

  //increase snake size when it eats                     //20
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  // //game over rules                                     //21
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    dead.play();
    clearInterval(game);
  }

  snake.unshift(newHead); //19

}

//call draw function after a set of interval                    //8

let game = setInterval(draw, 300); //the movement of snake is determined here
