// square size
const size = 10;

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
    x: 0,
    y: 0 + size,
  },
  {
    x: 0,
    y: 0 + (size * 2),
  },
];

let timer;

const foodPosition = {
  x: 400,
  y: 400,
};

function drawSnake(context) {
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

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
      drawFood(context, snake);
    }
  }, interval);
}

function handleKeys({ keyCode = 0 }) {
  // TODO: remove this
  if (keyCode === 32) {
    clearInterval(timer);
  }
  if (keyCode === 37) {
    direction = 'left';
  }
  if (keyCode === 38) {
    direction = 'up';
  }
  if (keyCode === 39) {
    direction = 'right';
  }
  if (keyCode === 40) {
    direction = 'down';
  }
}

function drawFood(context, snake = []) {
  const foodPositionX = Math.round((Math.random() * 10));
  const foodPositionY = Math.round((Math.random() * 10));

  foodPosition.x = foodPositionX;
  foodPosition.y = foodPositionY;
  console.log(foodPosition)
  // context.fillStyle = 'red';
  context.fillRect(
    foodPositionX,
    foodPositionY,
    size,
    size,
  );
}

$(document).ready(() => {
  const context = $('#canvas')[0].getContext('2d');
  drawSnake(context);
  drawFood(context);
  $(document).on('keydown', handleKeys);
});
