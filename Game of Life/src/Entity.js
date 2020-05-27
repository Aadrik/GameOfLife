let entityUtil = {
  entityCount: 0,
  addComponent: function(component, name) {
    this.components[name] = component;
    return this;
  },
  getId: function() {
    this.entityCount++;
    return (
      (+new Date()).toString(16) +
      (Math.random() * 100000000 | 0).toString(16) + this.entityCount
    )
  },
  removeComponent: function(name) {
    delete this.component[name];
    return this;
  },
  print: function() {
    console.log(JSON.stringify(this, null, 4));
    return this;
  }
}

export default function Entity() {
  // Generate a pseudo random ID

  return (
    Object.assign(
      {
        id: entityUtil.getId(),
        components: {}
      }, 
    entityUtil))
};
