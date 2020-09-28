// setting initial values and constants
let curPos = {
  x: 0,
  y: 0,
};
let nextPos;

const directions = ["up", "right", "down", "left"];
let direction = "right";

const rows = 10;
const cells = 12;
const cellsArr = [];

// create pointer image element
const pointer = document.createElement("img");
pointer.src = "pointer.png";
pointer.id = "pointer";
pointer.classList.add(direction);

// creating table and storing cells in a 2D array
function createTable() {
  for (let y = 0; y < rows; y++) {
    let r = document.getElementById("myTable").insertRow(y);
    cellsArr[y] = [];

    for (let x = 0; x < cells; x++) {
      let c = r.insertCell(x);
      cellsArr[y][x] = c;
    }
  }
  // put image inside initial cell
  const initialCell = cellsArr[curPos.y][curPos.x];
  initialCell.appendChild(pointer);
}

function moveForward() {
  if (direction === "up") {
    if (curPos.y !== 0) {
      nextPos = { ...curPos, y: curPos.y - 1 };
      changePosition();
    } else {
      turnRight();
    }
  } else if (direction === "right") {
    if (curPos.x !== cells - 1) {
      nextPos = { ...curPos, x: curPos.x + 1 };
      changePosition();
    } else {
      turnRight();
    }
  } else if (direction === "down") {
    if (curPos.y !== rows - 1) {
      nextPos = { ...curPos, y: curPos.y + 1 };
      changePosition();
    } else {
      turnRight();
    }
  } else if (direction === "left") {
    if (curPos.x !== 0) {
      nextPos = { ...curPos, x: curPos.x - 1 };
      changePosition();
    } else {
      turnRight();
    }
  }
}

function changePosition() {
  const nextCell = cellsArr[nextPos.y][nextPos.x];
  nextCell.appendChild(pointer);

  console.log(
    `moved from ${curPos.x},${curPos.y} to ${nextPos.x},${nextPos.y}`
  );
  // set current position to the new one
  curPos = nextPos;
}

function turnRight() {
  const curDirectionIdx = directions.indexOf(direction);
  const newDirection =
    direction === "left" ? "up" : directions[curDirectionIdx + 1];

  pointer.classList.replace(direction, newDirection);

  direction = newDirection;
}

// select buttons and add click listeners
const turnBtn = document.querySelector(".turn");
const moveBtn = document.querySelector(".move");

turnBtn.addEventListener("click", turnRight);
moveBtn.addEventListener("click", moveForward);

createTable();
