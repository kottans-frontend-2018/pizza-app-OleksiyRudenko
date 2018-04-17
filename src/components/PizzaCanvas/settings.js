export const CANVAS = {
  px: {
    width: 320,
    height: 320,
  },
  inch: {
    width: 60,
    height: 60,
  },
  pxInch: 0, // pixels per inch
  ingredient: {
    width: 20,
    height: 20,
  },
  areas: {
    30: {
      maxRadius: 0, // max px radius allowed
      nodes: [], // nodes list of {r, asimuth}...
      maxIngredients: 14, // max ingredients allowed
    },
    45: {
      maxRadius: 0,
      nodes: [],
      maxIngredients: 14,
    },
    60: {
      maxRadius: 0,
      nodes: [],
      maxIngredients: 14,
    },
  }
};
CANVAS['pxInch'] = Math.floor(CANVAS.px.width / CANVAS.inch.width);
CANVAS.center = {
  x: Math.floor(CANVAS.px.width / 2),
  y: Math.floor(CANVAS.px.height / 2),
};
Object.keys(CANVAS.areas).forEach(r => {
  CANVAS.areas[r].maxRadius = Math.round(r * CANVAS.pxInch / 2 - r / 3 - 5);
});

/* Build nodes (placeholders) for every radius at step 10px
 At r=150 degreeStep=10deg
 At r=5 degreeStep=45deg
 */
const targetR = CANVAS.pxInch * CANVAS.inch.height;
const radii = Object.keys(CANVAS.areas);
const nodes = {
  30: [],
  45: [],
  60: [],
};

for(let r = 10; r < targetR; r += 10) {
  const itemsOnCircle = Math.floor(Math.PI * 2 * r / (CANVAS.ingredient.width * 1.6));
  const degStep = 360 / itemsOnCircle;
  for(let deg = 0; deg < 360; deg += degStep * 0.7) {
    const pair = {
      r: r + (-Math.random() * 4 + 3),
      asimuth: deg + (-Math.random() * 15 + 7.5),
    };
    radii.forEach(inches => {
      if (CANVAS.areas[inches].maxRadius > r) {
        nodes[inches].push(pair);
      }
    });
  }
}

// copy nodes to CANVAS
radii.forEach(inches => {
  CANVAS.areas[inches].nodes = nodes[inches];
});

/* For each area distribute nodes evenly across maxIngredients node subsets
   When drawing choose subset wisely.
   Given 12 subsets use those dep on ingredients count:
   1: 0
   2: 0, 6
   3: 0, 4, 8
   4: 0, 3, 6, 9
   5: 0, 2, 5, 7, 10 -- i.e. every round(12/n)
*/
/*
radii.forEach(inches => {
  const maxIngredients = CANVAS.areas[inches].maxIngredients;
  const len = nodes[inches].length;
  const times = Math.ceil(len / maxIngredients);
  for (let i = 0; i < maxIngredients; i++) {
    CANVAS.areas[inches].nodes[i] = [];
    for (let j = 0; j < times; j++) {
      if (j*maxIngredients+i < len) {
        CANVAS.areas[inches].nodes[i].push(nodes[inches][j*maxIngredients+i]);
      }
    }
  }
}); */

/* In the end of the day we draw
   per each .areas[]
   .areas[].maxIngredients ingredients
   each .areas[].ingredientInstancesPerArea times
   at .areas[].nodes[]
   max .areas[].length sprites
 */

// console.log('CANVAS SETTINGS', CANVAS);
