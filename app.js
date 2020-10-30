// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact, image) {
  (this.species = species),
    (this.weight = weight),
    (this.height = height),
    (this.diet = diet),
    (this.where = where),
    (this.when = when),
    (this.fact = fact),
    (this.image = image);
}

// Create Dino Objects
const dinos = [
  (trice = new Dino(
    "Triceratops",
    5897,
    3,
    "herbavor",
    "North America",
    "Late Cretaceous",
    "First discovered in 1889 by Othniel Charles Marsh"
  )),
  (rex = new Dino(
    "Tyrannosaurus Rex",
    5400,
    4,
    "carnivore",
    "North America",
    "Late Cretaceous",
    "The largest known skull measures in at 5 feet long."
  )),
  (ank = new Dino(
    "Anklyosaurus",
    4762,
    1.4,
    "herbavor",
    "North America",
    "Late Cretaceous",
    "Anklyosaurus survived for approximately 135 million years."
  )),
  (brachi = new Dino(
    "Brachiosaurus",
    31751,
    9.5,
    "herbavor",
    "North America",
    "Late Jurasic",
    "An asteroid was named 9954 Brachiosaurus in 1991."
  )),
  (stego = new Dino(
    "Stegosaurus",
    5261,
    2,
    "carnivore",
    "North America",
    "Late Cretaceous",
    "The Stegosaurus had between 17 and 22 seperate places and flat spines."
  )),
  (ela = new Dino(
    "Elasmosaurus",
    7257,
    1.5,
    "herbavor",
    "North America",
    "Late Cretaceous",
    "Elasmosaurus was a marine reptile first discovered in Kansas."
  )),
  (ptera = new Dino(
    "Pteranodon",
    20,
    0.5,
    "carnivor",
    "North America",
    "Late Cretaceous",
    "Actually a flying reptile, the Pteranodon is not a dinosaur."
  )),
  (pigeon = new Dino(
    "Pigeon",
    0.2,
    0.2,
    "herbavor",
    "World Wide",
    "Holocene",
    "All birds are living dinosaurs."
  )),
];

const button = document.getElementById("btn");

//Create human object
let human = {};

// Use IIFE to get human data from form
// On button click, remove form from screen and display infographic
button.addEventListener("click", function () {
  (function getHumanData() {
    human.name = document.getElementById("name").value;
    human.height =
      (document.getElementById("meter").value +
        document.getElementById("centimeter").value) /
      100;
    human.weight = document.getElementById("weight").value;
    human.diet = document.getElementById("diet").value;
  })();

  if (inputComplete() === false) {
    alert("Please fill out all fields!");
  } else {
    document.getElementById("dino-compare").hidden = true;
    attachTiles();
  }

});

//validate user input
inputComplete = function () {
  return (
    document.getElementById("name").value !== "" &&
    document.getElementById("meter").value !== "" &&
    document.getElementById("centimeter").value !== "" &&
    document.getElementById("weight").value !== ""
  );
};

//place human in the middle of dino array
dinos.splice(4, 0, human);

// Create Dino Compare Methods 1-3
// NOTE: weight and hght have been converted to kilogramms, meters and centimeters - European style.

compareHeight = function (dino) {
  if (dino.height > human.height) {
    return (
      dino.species +
      " is taller than you by " +
      (dino.height - human.height).toFixed(2) +
      " meter."
    );
  } else {
    return (
      "You are taller than " +
      dino.species +
      " by " +
      (human.height - dino.height).toFixed(2) +
      " meter"
    );
  }
};

compareWeight = function (dino) {
  if (dino.weight > human.weight) {
    return (
      dino.species +
      " is havier than you by " +
      (dino.weight - human.weight).toFixed(2) +
      " kilogramms."
    );
  } else {
    return (
      "You are havier than " +
      dino.species +
      " by " +
      (human.weight - dino.weight).toFixed(2) +
      " kilogramms"
    );
  }
};

compareDiet = function (dino) {
  if (dino.diet === human.diet) {
    return "You and " + dino.species + " are both " + dino.diet;
  } else {
    return (
      "You are " + human.diet + " and " + dino.species + " is " + dino.diet
    );
  }
};

// Create grid UI
createGridUI = function (name, image, fact) {
  grid.innerHTML += `
  <div class= "grid-item" >
  <h3>${name}</h3>
  <img src = "images/${image}.png"/>
  <p>${fact}</p>
</div>`;
};

// Generate Tiles for each Dino in Array and append them to DOM
createTiles = function (dino, index, dinos) {
  const grid = document.querySelector("#grid");
  if (dinos[index] === human) {
    createGridUI(dinos[index].name, "human", "");
  } else if (dinos[index].species === "Pigeon") {
    createGridUI(dinos[index].species, "pigeon", dinos[index].fact);
  } else {
    let random = Math.floor(Math.random() * Math.floor(4));
    switch (random) {
      case 0:
        fact =
          "The " +
          dinos[index].species +
          " lived in what is now " +
          dinos[index].where;
        break;

      case 1:
        fact =
          "The " +
          dinos[index].species +
          " lived during the " +
          dinos[index].when;
        break;

      case 2:
        fact = compareHeight(dinos[index]);
        break;

      case 3:
        fact = compareWeight(dinos[index]);
        break;

      case 4:
        fact = compareDiet(dinos[index]);
        break;

      default:
        fact = dinos[index].fact;
        break;
    }
    createGridUI(
      dinos[index].species,
      dinos[index].species.toLowerCase(),
      fact
    );
  }
};

attachTiles = function () {
  dinos.forEach(createTiles);
};



