// square size
const size = 10;

// play field size
const fieldSize = {
  height: 40,
  width: 50,
};

// movement direction
const directions = {
  down: 'down',
  left: 'left',
  right: 'right',
  up: 'up',
};
let direction = directions.right;

// snake
let snake = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0 + size,
    y: 0,
  },
  {
    x: 0 + (size * 2),
    y: 0,
  },
];

let timer;

const foodPosition = {
  x: 400,
  y: 400,
};

let moveLocked = false;

function drawFood(context, snake = []) {
  const foodPositionX = Math.round((Math.random() * 10));
  const foodPositionY = Math.round((Math.random() * 10));

  foodPosition.x = foodPositionX * size;
  foodPosition.y = foodPositionY * size;

  context.fillStyle = 'green';
  context.fillRect(
    foodPosition.x,
    foodPosition.y,
    size,
    size,
  );
}

function drawSnake(context) {
  context.canvas.height = fieldSize.height * size;
  context.canvas.width = fieldSize.width * size;

  context.fillStyle = 'green';

  let interval = 100;
  timer = setInterval(() => {
    snake.forEach((square) => context.fillRect(
      square.x,
      square.y,
      size,
      size,
    ));
    const head = { ...snake[snake.length - 1] };
    
    // check snake body collision
    snake.slice(0, snake.length - 2).forEach((square) => {
      if (head.x === square.x && head.y === square.y) {
        clearInterval(timer);
      }
    });

    if (direction === directions.right) {
      head.x = head.x + size;
    }
    if (direction === directions.down) {
      head.y = head.y + size;
    }
    if (direction === directions.left) {
      head.x = head.x - size;
    }
    if (direction === directions.up) {
      head.y = head.y - size;
    }
    snake.push(head);

    // check field border collision
    if (head.x > fieldSize.width * size
      || head.x < 0
      || head.y > fieldSize.height * size
      || head.y < 0) {
      clearInterval(timer);
    }

    context.clearRect(
      snake[0].x,
      snake[0].y,
      size,
      size,
    );

    // check if food is eaten
    if (!(head.x === foodPosition.x && head.y === foodPosition.y)) {
      snake = snake.splice(1);
    } else {
      console.log('eating')
      drawFood(context, snake);
    }

    moveLocked = false;
  }, interval);
}

function handleKeys({ keyCode = 0 }) {
  // TODO: remove this
  if (keyCode === 32) {
    clearInterval(timer);
  }
  if (!moveLocked) {
    if (keyCode === 37 && direction !== directions.right) {
      direction = directions.left;
      moveLocked = true;
    }
    if (keyCode === 38 && direction !== directions.down) {
      direction = directions.up;
      moveLocked = true;
    }
    if (keyCode === 39 && direction !== directions.left) {
      direction = directions.right;
      moveLocked = true;
    }
    if (keyCode === 40 && direction !== directions.up) {
      direction = directions.down;
      moveLocked = true;
    }
  }
}

$(document).ready(() => {
  const context = $('#canvas')[0].getContext('2d');
  drawSnake(context);
  drawFood(context);
  $(document).on('keydown', handleKeys);
});
