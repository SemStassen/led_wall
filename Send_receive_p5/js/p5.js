
const rows = 10;
const columns = 10;
const leds = 100;
const rectWidth = 100;
const rectHeight = 100;
const marginLeft = 500;

let ledsJson

// import json file
function preload() {
  ledsJson = loadJSON('json/leds.json');
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
  drawGrid();
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

function prepareJSON() {
  // PREPARE JSON - adds object to array for every led;
  let ledCounter = 0;
  loop1: 
   for(i = 0; i < rows; i++) {
     loop2:
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

function drawGrid() {
  let ledCounter = 0;
 loop1: 
  for(i = 0; i < rows; i++) {
    loop2:
    for(j = 0; j < columns; j++) {
      fill(ledsJson[ledCounter].value * 255);
      rect((j * rectWidth) + marginLeft, (i * rectHeight), rectWidth, rectHeight);
      text(ledCounter, (j * rectWidth) + marginLeft, (i * rectHeight) + rectHeight);
      ledCounter++;
      if (ledCounter == leds) { 
        ledCounter = 0; 
        break loop1; 
      }
    }
  }
}

function mousePressed() {
  let ledCounter = 0;
  loop1:
  for(i = 0; i < rows; i++) {
    for(j = 0; j < columns; j++) {
      if (mouseX > (j * rectWidth) + marginLeft && mouseX < (j * rectWidth) + marginLeft + rectWidth && mouseY > (i * rectHeight) && mouseY < (i * rectHeight) + rectHeight) {
        if(ledsJson[ledCounter].value == 1) {
          ledsJson[ledCounter].value = 0
        } else {
          ledsJson[ledCounter].value = 1
        };
        drawGrid();
        break loop1;
      };
      ledCounter++;
      }
    }
  }




