import gameMap from "../src/gameMap.js";

function xyToIdx({x, y}, mapWidth) {
  return (y * mapWidth) + x 
}

function wrapPos({x, y}, width) {
  let wrap = {x, y};

  if (wrap.x >= width) {
    wrap.x = wrap.x % width; 
  } else if (wrap.x < 0) {
    wrap.x = wrap.x + width;
  }

  if (wrap.y >= width) {
    wrap.y = wrap.y % width; 
  } else if (wrap.y < 0) {
    wrap.y = wrap.y + width;
  }

  return wrap;
}

function up({x, y}) {
  let pos = {x, y};
  pos.y = pos.y - 1;
  return pos;
}

function down({x, y}) {
  let pos = {x, y};
  pos.y = pos.y + 1;
  return pos;
}

function left({x, y}) {
  let pos = {x, y};
  pos.x = pos.x - 1;
  return pos;
}

function right({x, y}) {
  let pos = {x, y};
  pos.x = pos.x + 1;
  return pos;
}

export default function systemLifecycle(entities) {
  // Hardcoded - canvas size / size of each tile
  const TILE_SIZE = 32;
  const BOARD_WIDTH = 1280 / TILE_SIZE;

let nextGeneration = [...gameMap];

  for (var entityId in entities) {
    let curEntity = entities[entityId];

    let pos = curEntity.components.position

    let idx = xyToIdx(pos, BOARD_WIDTH)

    let upNeighbor = xyToIdx(wrapPos(up(pos), BOARD_WIDTH), BOARD_WIDTH);
    let downNeighbor = xyToIdx(wrapPos(down(pos), BOARD_WIDTH), BOARD_WIDTH);
    let leftNeighbor = xyToIdx(wrapPos(left(pos), BOARD_WIDTH), BOARD_WIDTH);
    let rightNeighbor = xyToIdx(wrapPos(right(pos), BOARD_WIDTH), BOARD_WIDTH);

    let upLeftNeighbor = xyToIdx(wrapPos(up(left(pos)), BOARD_WIDTH), BOARD_WIDTH);
    let upRightNeighbor = xyToIdx(wrapPos(up(right(pos)), BOARD_WIDTH), BOARD_WIDTH);
    let downLeftNeighbor = xyToIdx(wrapPos(down(left(pos)), BOARD_WIDTH), BOARD_WIDTH);
    let downRightNeighbor = xyToIdx(wrapPos(down(right(pos)), BOARD_WIDTH), BOARD_WIDTH);

    let neighbors = 0;
    if (gameMap[upNeighbor]) {
      neighbors++
    }
    if (gameMap[downNeighbor]) {
      neighbors++
    }
    if (gameMap[leftNeighbor]) {
      neighbors++
    }
    if (gameMap[rightNeighbor]) {
      neighbors++
    }
    if (gameMap[upLeftNeighbor]) {
      neighbors++
    } 
    if (gameMap[upRightNeighbor]) {
      neighbors++
    } 
    if (gameMap[downLeftNeighbor]) {
      neighbors++
    } 
    if (gameMap[downRightNeighbor]) {
      neighbors++
    }     

    if (curEntity.components.condition.isAlive) {
      // Dies from under/over population
      if (neighbors < 2 || neighbors > 3 ) {
        curEntity.components.condition.isAlive = false;
        // gameMap[idx] = 0;
        nextGeneration[idx] = 0;
      } 
      // Lives to next generation
      if (neighbors == 2 || neighbors == 3) {
        nextGeneration[idx] = 1;
      }
    }

    // Dead cell
    if (!curEntity.components.condition.isAlive) {
      if (neighbors == 3) {
        curEntity.components.condition.isAlive = true;
        nextGeneration[idx] = 1;
      }
    }

  }
  
  for (let i = 0; i < nextGeneration.length; i++) {
    gameMap[i] = nextGeneration[i];
  };

}