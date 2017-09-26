// Establish variables
var w;
var columns; 
var rows;
var grid;
var gridNext;

function setup() {
    // basic setup
    frameRate(5);
    createCanvas(720, 480);
    w = 10;

    // calculate number of rows and columns
    columns = floor(width / w);
    rows = floor(height / w);

    // empty 2D array (current state)
    grid = new Array(columns);
    for (var i = 0; i < columns; i++) {
        grid[i] = new Array(rows);
    }
    // empty 2D array (future state)
    gridNext = new Array(columns);
    for (i = 0; i < columns; i++) {
     gridNext[i] = new Array(rows);
    }

    // randomize grid 50% on/off
    initialize();
}

function draw() {
    background(255);
    // get new state
    generate();
    // loop through elements & draw squares
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            if ((grid[i][j] == 1)) fill(0, 230, 10); // green ON
            else fill(230, 0, 50); // red OFF
            stroke(100);
            rect(i * w, j * w, w - 1, w - 1);
        }
    }
}

// Randomizes the initial state
function initialize() {
    // loop through elements
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            // avoid edges
            if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) grid[i][j] = 0;
            else grid[i][j] = floor(random(2));
            gridNext[i][j] = 0;
        }
    }
}

// Calculate next state based on rules
function generate() {
    // loop through elements
    for (var x = 1; x < columns -1 ; x++) {
        for (var y = 1; y < rows -1 ; y++) {
            // summing surrounding states
            var neighbours = 0;
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    neighbours += grid[x + i][y + j];
                }
            }
            // subtract self
            neighbours -= grid[x][y]
            // rules of game of life
            if      ((grid[x][y] == 1) && (neighbours <  2)) gridNext[x][y] = 0;
            else if ((grid[x][y] == 1) && (neighbours >  3)) gridNext[x][y] = 0;
            else if ((grid[x][y] == 0) && (neighbours == 3)) gridNext[x][y] = 1;
            else                                    gridNext[x][y] = grid[x][y];
        }
    }
    // supply new state (gridNext)
    var temp = grid; 
    grid = gridNext;
    gridNext = temp;
}

// Reset on mouse pressed
function mousePressed(){
    initialize();
}