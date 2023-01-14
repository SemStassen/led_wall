

// Variables for editing interface
const rows = 10;
const columns = 10;
const leds = 100;
const rectWidth = 100;
const rectHeight = 100;
const marginLeft = 500;

let ledsJson;
let x;
let y;
let prevLedCounter;
let ledCounterDraw;

// import json file
function preload() {
  ledsJson = loadJSON('json/leds.json');
}

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 100);
  background(200);
  
  addButtons();

  // Create json object for leds
  if (!ledsJson) {
    ledsJson = [];
    prepareJSON();
  }
  
  // Draw grid (also used to update grid)
  drawStartingGrid();
}

function addButtons() {
  // ADD BUTTON TO DOWNLOAD JSON
  let exportButton = createButton('Download JSON');
  exportButton.position(50, 100);
  exportButton.mousePressed(exportJSON);
  
  // ADD POST REQUEST BUTTON
  let postButton = createButton('POST JSON');
  postButton.position(50, 130);
  postButton.mousePressed(postJSON);
}

function exportJSON() {
  saveJSON(ledsJson, 'leds.json');
}

function postJSON() {
  let url = 'localhost:5500';
  httpPost(url , 'json', ledsJson, function(result) {
    console.log(result);
  });
}

// Make a blank json file if none is imported
function prepareJSON() {
  // PREPARE JSON - adds object to array for every led;
  let ledCounter = 0;
  loop1: 
   for(i = 0; i < rows; i++) {
     for(j = 0; j < columns; j++) {
        ledsJson.push({
          "id": ledCounter,
          "value": 0,
        })
        ledCounter++;
       if (ledCounter == leds) { 
         break loop1; 
       }
     }
   }
}

// Makes initial grid based on json file
function drawStartingGrid() {
  let ledCounter = 0;
 loop1: 
  for(i = 0; i < rows; i++) {
    for(j = 0; j < columns; j++) {
      fill(ledsJson[ledCounter].value * 255);
      rect((j * rectWidth) + marginLeft, (i * rectHeight), rectWidth, rectHeight);
      fill(255, 0, 0);
      text(ledCounter, (j * rectWidth) + marginLeft, (i * rectHeight) + rectHeight);
      ledCounter++;
      if (ledCounter == leds) { 
        ledCounter = 0; 
        break loop1; 
      }
    }
  }
}

function draw() {
  if (mouseIsPressed) {
     x = Math.floor((mouseX - marginLeft) / rectWidth);
     y = Math.floor(mouseY / rectHeight);
    //  Check of je in het grid klikt (voorkomt negatieve getallen)
        if (x < 0 || x > columns - 1 || y < 0 || y > rows - 1) {
          return;
       }
  ledCounterDraw = x + (y * columns);

  if (ledCounterDraw != prevLedCounter || prevLedCounter == null) {
    // Flips led value
    if(ledsJson[ledCounterDraw].value == 1) {
      ledsJson[ledCounterDraw].value = 0
    } else {
      ledsJson[ledCounterDraw].value = 1
    };

     // update pressed led
      fill(ledsJson[ledCounterDraw].value * 255);
      rect((x * rectWidth) + marginLeft, (y * rectHeight), rectWidth, rectHeight);

      // Add led number
      fill(255, 0, 0);
      text(ledCounterDraw, (x * rectWidth) + marginLeft, (y * rectHeight) + rectHeight);
     }
      prevLedCounter = ledCounterDraw;
  }
}




