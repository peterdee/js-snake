/**
 * Generate random coordinate position
 */
const generateRandomPosition = () => Math.round((Math.random() * 100) / 2);

/**
 * Generate food position (recursive)
 * @param {Point[]} segments - array of Points
 * @returns {{ x: number, y: number}}
 */
const generateFoodPosition = (segments = [new Point({ x: 0, y: 0 })]) => {
  const X = generateRandomPosition();
  const Y = generateRandomPosition();
  const foodPositionX = X === 50 ? 49 : X;
  const foodPositionY = Y === 50 ? 49 : Y;
  let reroll = false;
  console.log('food', foodPositionX, foodPositionY, snake.segments.slice(-1));
  segments.forEach((segment) => {
    if (foodPositionX === segment.x && foodPositionY === segment.y) {
      console.log('reroll', snake.segments);
      reroll = true;
    }
  });
  if (reroll) {
    return generateFoodPosition(segments);
  }
  return {
    x: foodPositionX,
    y: foodPositionY,
  };
}
