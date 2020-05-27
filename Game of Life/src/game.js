/* =========================================================================
 *
 * game.js
 *  This script contains the game logic acts as a controller for the Entity 
 *  Component System
 *
 * ========================================================================= */
import Cell from '../Assemblies/cell.js';
import Render from '../Systems/render.js';
import Lifecycle from '../Systems/Lifecycle.js';
import gameMap from './gameMap.js';

// Returns a list of objects that have the given property
function hasComponentList(componentName, entityArr) {
  let entityList = [];
  for (let entity in entityArr) {
    if (entityArr[entity].components.hasOwnProperty(componentName)) {
      entityList.push(entityArr[entity]);
    }
  }
  return entityList;
}

ECS.Game = function Game (){

  var self = this;

  // Create some entities
  // ----------------------------------
  var entities = {}; 
  
  var entity;

  // Generate entities
  for (let i = 0; i < gameMap.length; i++) {
    entity = Cell();

    if (Math.random() < .1) {
      entity.components.condition.isAlive = true;
      gameMap[i] = 1;
    }

    let idx = (i < 40) ? 0 : Math.floor(i / 40);
    entity.components.position = ({x: (i % 40), y: idx});
    entities[entity.id] = entity;
  }

  ECS.entities = entities;

  // Setup systems
  // ----------------------------------

  ECS.dt = 0;
  let last = 0;
  ECS.t = 0;
  let frames = 0;
  let generations = 0;

  // Game loop
  // ----------------------------------
  function gameLoop(millSec){
    
    ECS.t = millSec /// 1000; // Working in seconds
    ECS.dt = ECS.t - last;
    frames += ECS.dt
    last = ECS.t;

  

      // console.log(frames);
      // Run through the systems
      if (frames > 500 && !paused) {
        frames = 0;

        Render(ECS.entities);
        Lifecycle(ECS.entities);
        generations ++;
        document.getElementById('generations').innerText = generations;

      // Applies lifecycle rules
      }
      if(self._running !== false){
          requestAnimationFrame(gameLoop);
      }
  }
  // Kick off the game loop
  requestAnimationFrame(gameLoop);

  // Lose condition
  // ----------------------------------
  this._running = true; // is the game going?
  this.endGame = function endGame(){ 
      self._running = false;
      document.getElementById('final-score').innerHTML = ECS.score;
      document.getElementById('game-over').className = '';

      // set a small timeout to make sure we set the background
      setTimeout(function(){
          document.getElementById('game-canvas').className = 'game-over';
      }, 100);
  };


  return this;
};

// Kick off the game
let paused = false;

document.getElementById('BTNpause').addEventListener('click', () => { paused = !paused})

ECS.game = new ECS.Game();