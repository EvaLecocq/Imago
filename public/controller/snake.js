//Snake

const boardBackground = "#222";

const snakeColor = "white";
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

// detect arrow keys
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

// startGame function called repeatedly to keep the game running
function startGame() {
  if (endGame()) return;

  setTimeout(()=> {
    clearBoard();
    drawFood();
    moveSnake();
    drawSnake();
    // Repeat
    startGame();
  }, 100);
}

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

function endGame() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeCanv.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeCanv.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
  // Generate a random number the food x-coordinate
  food_x = randomFood(0, snakeCanv.width - 10);
  // Generate a random number for the food y-coordinate
  food_y = randomFood(0, snakeCanv.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) generateFood();
  });
}

function moveSnake() {
  // Create the new Snake's head
  const head = { x: snake[0].x + pos_x, y: snake[0].y + pos_y };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const eatFood = snake[0].x === food_x && snake[0].y === food_y;
  if (eatFood) {
    // Increase score
    score += 10;
    // Display score on screen
    document.querySelector(".score").innerHTML = score;
    // Generate new food location
    generateFood();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}
