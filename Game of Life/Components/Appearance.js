function appearance(params) {
  // Appearance specifies data for color and size
  params = params || {};

  if(!params.colors) {
    // generate random color if not passed in (get 6 random hex values)
    params.colors = {
      r: 255,
      g: 0,
      b: 0
    };
  }

  params.size = 32
  
  return params;
};

export default appearance;