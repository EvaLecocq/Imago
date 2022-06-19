const boardBackground = "#222";

const snakeColor = "white";
// coordinates of each body part of the snake
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

const foodColor = "#babecc";
let food_x;
let food_y;

let score = 0;

// Pos x & y snake
let pos_x = 10;
let pos_y = 0;

// canvas element in 2D
const snakeCanv = document.querySelector(".snakeCanv");
const snakeCanv_ctx = snakeCanv.getContext("2d");
// Start game
startGame();
generateFood();

///DETECT ARROW KEYS///
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    pos_x = -10;
    pos_y = 0;
  }
  if (event.key === "ArrowUp") {
    pos_x = 0;
    pos_y = -10;
  }
  if (event.key === "ArrowRight") {
    pos_x = 10;
    pos_y = 0;
  }
  if (event.key === "ArrowDown") {
    pos_x = 0;
    pos_y = 10;
  }
});

///END GAME WITH COLLISIONS///
function endGame() {
  //Check collision with body parts
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  //Check collision with walls
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeCanv.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeCanv.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

///START GAME AND REPEAT///
function startGame() {
  if (endGame()) return;

  setTimeout(()=> {
    clearBoard();
    drawSnake();
    drawFood();
    moveSnake();
    startGame();
  }, 100);
}

///DRAW IN CANVAS///
function clearBoard() {
  // Color background & // Draw a "filled" rectangle
  snakeCanv_ctx.fillStyle = boardBackground;
  snakeCanv_ctx.fillRect(0, 0, snakeCanv.width, snakeCanv.height);
}

function drawSnake() {
  snake.forEach((snakePart)=> {
    // Color snake
    snakeCanv_ctx.fillStyle = snakeColor;
    // Draw a "filled" rectangle
    snakeCanv_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Border snake
    snakeCanv_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  });
}

function drawFood() {
  snakeCanv_ctx.fillStyle = foodColor;
  snakeCanv_ctx.fillRect(food_x, food_y, 10, 10);
  snakeCanv_ctx.strokeRect(food_x, food_y, 10, 10);
}

///FOOD RANDOM GENERATOR///
function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
  // Generate random food x
  food_x = randomFood(0, snakeCanv.width - 10);
  // Generate random food y
  food_y = randomFood(0, snakeCanv.height - 10);
  // Generate new food location if is snake location
  snake.forEach((part)=> {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) generateFood();
  });
}

///MOVE SNAKE + SCORE///
function moveSnake() {
  // x+ 10px = right // & x-10px = left idem y
  const head = { x: snake[0].x + pos_x, y: snake[0].y + pos_y };
  // Add the new rectangle of snake body
  snake.unshift(head);
  //Head snake same pos food
  const eatFood = snake[0].x === food_x && snake[0].y === food_y;

  if (eatFood) {
    // Increase score in screen
    score += 10;
    document.querySelector(".score").innerHTML = score;
    // Generate new food location
    generateFood();
  } else {
    // Delete the last rectangle of snake body
    snake.pop();
  }
}
