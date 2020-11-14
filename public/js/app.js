let started = false;

class Point {
  constructor({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
  }

  updatePoint({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor(initialState = [new Point({ x: 0, y: 0 })]) {
    this.direction = directions.right;
    this.locked = false;
    this.segments = [...initialState];
  }

  add(segment = new Point()) {
    this.segments.push(segment);
  }

  remove() {
    this.segments = this.segments.slice(1);
  }

  lockDirection() {
    this.locked = true;
  }

  unlockDirection() {
    this.locked = false;
  }

  setDirection(direction = '') {
    this.direction = direction;
  }
}

// create snake
const snake = new Snake([
  new Point({
    x: 0,
    y: 0,
  }),
  new Point({
    x: 0 + size,
    y: 0,
  }),
  new Point({
    x: 0 + (size * 2),
    y: 0,
  }),
]);

let timer;

let interval = 100;

let score = 0;

const foodPosition = new Point({
  x: 0,
  y: 0,
});

/**
 * Draw food square
 * @param {CanvasRenderingContext2D} context - canvas context
 * @param {Snake} snake - snake segments
 * @returns {void}
 */
function drawFood(context, snake) {
  const { x =  0, y = 0 } = generateFoodPosition(snake.segments);

  foodPosition.updatePoint({
    x: x * size,
    y: y * size,
  });

  return context.fillRect(
    foodPosition.x,
    foodPosition.y,
    size,
    size,
  );
}

/**
 * Draw food square
 * @param {CanvasRenderingContext2D} context - canvas context
 * @param {Snake} snake - snake segments
 * @returns {void}
 */
function drawSnake(context, snake) {
  return snake.segments.forEach((square) => context.fillRect(
    square.x,
    square.y,
    size,
    size,
  ));
}

/**
 * Update score count in DOM
 * @param {number} score - game score
 * @returns {void}
 */
const updateScore = (score = 0) => $('#score').empty().append(score);

/**
 * Run the game
 * @param {CanvasRenderingContext2D} context - canvas context
 * @returns {void}
 */
function runGame(context) {
  timer = setInterval(() => {
    drawSnake(context, snake);
    const { segments } = snake;
    const head = new Point({
      x: segments[segments.length - 1].x,
      y: segments[segments.length - 1].y,
    });
    
    // check snake body collision
    segments.slice(0, segments.length - 2).forEach((square) => {
      if (head.x === square.x && head.y === square.y) {
        clearInterval(timer);
        timer = null;
        crash(score);
      }
    });

    if (snake.direction === directions.right) {
      head.x = head.x + size;
    }
    if (snake.direction === directions.down) {
      head.y = head.y + size;
    }
    if (snake.direction === directions.left) {
      head.x = head.x - size;
    }
    if (snake.direction === directions.up) {
      head.y = head.y - size;
    }
    snake.add(head);

    // check field border collision
    if (head.x > (fieldSize.width - 1) * size
      || head.x < 0
      || head.y > (fieldSize.height - 1) * size
      || head.y < 0) {
      clearInterval(timer);
      timer = null;
      crash(score);
    }

    context.clearRect(
      segments[0].x,
      segments[0].y,
      size,
      size,
    );

    // check if food is eaten
    if (!(head.x === foodPosition.x && head.y === foodPosition.y)) {
      snake.remove();
    } else {
      score += 1;
      updateScore(score);
      drawFood(context, snake);
    }

    snake.unlockDirection();
  }, interval);
}

/**
 * Handle keys
 * @param {{ keyCode: number }} keyCode - key code  
 * @param {CanvasRenderingContext2D} context - canvas context
 * @returns {*}
 */
function handleKeys({ keyCode = 0 }, context) {
  if (keyCode === 32) {
    if (!started) {
      context.clearRect(
        0,
        0,
        fieldSize.height * size,
        fieldSize.width * size,
      );
      started = true;
      drawFood(context, snake);
      return runGame(context);
    }
    if (!timer) {
      $('#is-paused').empty();
      return runGame(context);
    }
    clearInterval(timer);
    timer = null;
    $('#is-paused').empty().append('The game is paused');
  }
  if (!snake.locked) {
    if (keyCode === 37 && snake.direction !== directions.right) {
      snake.setDirection(directions.left);
      snake.lockDirection();
    }
    if (keyCode === 38 && snake.direction !== directions.down) {
      snake.setDirection(directions.up);
      snake.lockDirection();
    }
    if (keyCode === 39 && snake.direction !== directions.left) {
      snake.setDirection(directions.right);
      snake.lockDirection();
    }
    if (keyCode === 40 && snake.direction !== directions.up) {
      snake.setDirection(directions.down);
      snake.lockDirection();
    }
  }
}

/**
 * Show the start message
 * @param {CanvasRenderingContext2D} context - canvas context
 * @returns {void}
 */
function showStart(context) {
  context.font = "30px bold";
  context.textAlign = 'center';
  context.fillText('Press "Space" to start', canvas.width / 2, canvas.height / 2);
}

/**
 * Handle page loading
 */
$(document).ready(() => {
  const context = $('#canvas')[0].getContext('2d');

  context.canvas.height = fieldSize.height * size;
  context.canvas.width = fieldSize.width * size;

  context.fillStyle = 'green';
  showStart(context);

  $(document).on('keydown', (event) => handleKeys(event, context));
  $('#highscores').on('click', () => {
    highscores();
    clearInterval(timer);
    timer = null;
  });
  $('#about').on('click', () => {
    highscores();
    clearInterval(timer);
    timer = null;
  });
});
