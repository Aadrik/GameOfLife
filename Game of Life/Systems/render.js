/* ===================================
*
* render.js
*
* This script contrains the game logic acts as a controller for the Entity
* Component System
*
* ===================================== */

function clearCanvas() {
  // Store the current transformation matrix
  ECS.context.save();

  // Use the identity matrix while clearing the canvas
  ECS.context.setTransform(1, 0, 0, 1, 0, 0);
  ECS.context.clearRect(0, 0, ECS.$canvas.width, ECS.$canvas.height);

  // Restore the transform
  ECS.context.restore();
}

// ECS - System - Render
// ------------------------------------
export default function systemRender(entities) {


  // This happens each tick, so we need to clear out the previous rendered
  // state
  clearCanvas();

  // iterate over all entities
  for (var entityId in entities) {
    let curEntity = entities[entityId];

    // Only run logic if entity has relevant components
    // For rendering, we need appearance and position. 
    if (curEntity.components.appearance && curEntity.components.position) {

      if (curEntity.components.condition.isAlive) {
        curEntity.components.appearance.colors = {r: 150, g: 150, b: 150};
      }

      if (!curEntity.components.condition.isAlive) {
        curEntity.components.appearance.colors = {r: 255, g: 255, b: 255};
      }

      if (curEntity.components.condition.isSick && curEntity.components.condition.isAlive) {
        curEntity.components.appearance.colors = {r: 0, g: 150, b: 0};
      }

      // Build up the fill style based on the entity's color data
      let fillStyle = 'rgba(' + [
        curEntity.components.appearance.colors.r,
        curEntity.components.appearance.colors.g,
        curEntity.components.appearance.colors.b,
      ] + ',1)';


      // TODO 
      // UNCOUPLE
      // THIS IS COUPLED TO HAVING AN ECS OBJECT!
      ECS.context.fillStyle = fillStyle;

      // draw a little black line around every rect
      ECS.context.strokeStyle = 'rgba(0, 0, 0, 1)';

      // draw the rect
      ECS.context.fillRect(
        curEntity.components.position.x * 32,
        curEntity.components.position.y * 32,
        curEntity.components.appearance.size,
        curEntity.components.appearance.size
      );
      // stroke it
      ECS.context.strokeRect(
        curEntity.components.position.x * 32,
        curEntity.components.position.y * 32,
        curEntity.components.appearance.size,
        curEntity.components.appearance.size
      );
    }
  }
}