//Snake

const board_border = "black";
const board_background = "#222";
const snake_col = 'white';

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]

let score = 0;

// snake direction // true = move direction
//let changing_direction = false;

// Pos x & y food
//let food_x;
//let food_y;

// Pos x & y snake
let pos_x = 10;
let pos_y = 0;


// canvas element in 2D
const snakeCanv = document.querySelector(".snakeCanv");
const snakeCanv_ctx = snakeCanv.getContext("2d");
// Start game
main();
gen_food();

// detect arrow keys
document.addEventListener("keydown", (event)=> {

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

// main function called repeatedly to keep the game running
function main() {

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();
    // Repeat
    main();
  }, 100)
}

// draw a border around the canvas
function clear_board() {
  //  Select the colour to fill the drawing
  snakeCanv_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeCanv_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeCanv_ctx.fillRect(0, 0, snakeCanv.width, snakeCanv.height);
  // Draw a "border" around the entire canvas
  snakeCanv_ctx.strokeRect(0, 0, snakeCanv.width, snakeCanv.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

function drawFood() {
  snakeCanv_ctx.fillStyle = '#babecc';
  snakeCanv_ctx.fillRect(food_x, food_y, 10, 10);
  snakeCanv_ctx.strokeRect(food_x, food_y, 10, 10);
}

// Draw one snake part
function drawSnakePart(snakePart) {

  // Set the colour of the snake part
  snakeCanv_ctx.fillStyle = snake_col;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeCanv_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Draw a border around the snake part
  snakeCanv_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeCanv.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeCanv.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  // Generate a random number the food x-coordinate
  food_x = random_food(0, snakeCanv.width - 10);
  // Generate a random number for the food y-coordinate
  food_y = random_food(0, snakeCanv.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}



function move_snake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + pos_x, y: snake[0].y + pos_y};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    // Increase score
    score += 10;
    // Display score on screen
    document.querySelector('.score').innerHTML = score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}