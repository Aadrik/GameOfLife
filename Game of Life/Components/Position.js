export default function position({ 
  x = 0, //(20 + Math.random() * (ECS.$canvas.width - 20) | 0),
  y = 0, //(20 + Math.random() * (ECS.$canvas.width - 20) | 0) 
} = {}) {
  return ({
    x,
    y
  })  
}
