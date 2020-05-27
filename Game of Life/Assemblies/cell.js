import Entity from '../src/Entity.js';
import Components from '../Components/index.js';
const { Appearance, Condition, Position } = Components;

export default function cell() {
  let cell = Entity();
  cell.addComponent( Appearance({
    colors: {
      r: 150,
      g: 150,
      b: 150
    }
  }), 'appearance');
  cell.addComponent( Position(), 'position');
  cell.addComponent( Condition(), 'condition');

  return cell;
}