const canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let ballPositionX = canvas.width / 2 // Ball's X position
let ballPositionY = canvas.height - 50 // Ball's Y position on canvas

let score = 0
let lives = 3

// ball

let ballMoveX = 3
let ballMoveY = -3
let ballRadius = 10
let ballAngle = 0

//bat

let batWidth = 90
let batHeight = 15
let batX = (canvas.width - batWidth) / 2
let batY = canvas.height - 35
let rightArrowPressed = false
let leftArrowPressed = false
let spacePressed = false

//bricks

let brickWidth = 70
let brickHeight = 20
let brickRows = 5
let brickColumns = 8
let brickPadding = 12
let brickOffsetTop = 40
let brickOffsetLeft = 25

let bricks = []
for (let i = 0; i < brickColumns; i++) {
  bricks[i] = []
  for (let j = 0; j < brickRows; j++) {
    bricks[i][j] = { x: 0, y: 0, status: 1 }
  }
}

function drawBricks() {
  for (let i = 0; i < brickColumns; i++) {
    for (let j = 0; j < brickRows; j++) {
      if (bricks[i][j].status == 1) {
        let brickPositionX = (i * (brickWidth + brickPadding)) + brickOffsetLeft
        let brickPositionY = (j * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[i][j].x = brickPositionX
        bricks[i][j].y = brickPositionY
        context.beginPath()
        context.rect(brickPositionX, brickPositionY, brickWidth, brickHeight)
        context.fillStyle = '#FFD700'
        context.fill()
        context.closePath()
      }
    }
  }
}

function drawBall() {
  context.beginPath()
  context.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2)
  context.fillStyle = '#FF0000'
  context.fill()
  context.closePath()
}
function drawBat() {
  context.beginPath()
  context.rect(batX, batY, batWidth, batHeight)
  context.fillStyle = '#808080'
  context.fill()
  context.closePath()
}
function batMove() {
  if (rightArrowPressed) {
    batX += 5
    if (batX + batWidth > canvas.width) {
      batX = canvas.width - batWidth
    }
  } else if (leftArrowPressed) {
    batX -= 5
    if (batX < 0) {
      batX = 0
    }
  }
}
function ballCanvasCollision() {
  let leftSideCanvas = ballPositionX + ballMoveX < ballRadius
  let rightSideCanvas = ballPositionX + ballMoveX > canvas.width - ballRadius
  let topSideCanvas = ballPositionY + ballMoveY < ballRadius
  let bottomSideCanvas = ballPositionY + ballMoveY > canvas.height - ballRadius

  if (rightSideCanvas || leftSideCanvas) {
    ballMoveX = - ballMoveX
  }
  if (topSideCanvas) {
    ballMoveY = - ballMoveY

  } else if (bottomSideCanvas) {
    lives--
    if (lives === 0) {
      gameOver()
    } else { // starting canvas positions of ball and bat
      ballPositionX = canvas.width / 2
      ballPositionY = canvas.height - 50

      // loptica se rola po bat, ne znam sto za sada


      batX = (canvas.width - batWidth) / 2
      batY = (canvas.height - 50)
    }
  }
}
function ballBatCollision() {
  if (ballPositionY + ballMoveY > batY - ballRadius) {
    if (ballPositionX + ballRadius > batX && ballPositionX - ballRadius < batX + batWidth) {
      ballMoveY = -ballMoveY
    }
  }
}

function ballBrickCollision() {
  for (let i = 0; i < brickColumns; i++) {
    for (let j = 0; j < brickRows; j++) {
      let b = bricks[i][j]
      let brickPositionX = b.x
      let brickPositionY = b.y
      if (b.status == 1) {
        if (ballPositionX > brickPositionX - ballRadius && ballPositionX < brickPositionX + brickWidth && ballPositionY > brickPositionY - ballRadius && ballPositionY < brickPositionY + brickHeight) {
          ballMoveY = -ballMoveY
          b.status = 0
          score++
        }
      }
    }
  }
}



function drawScore () {
  context.font = '18px Times New Roman'
  context.fillStyle = '#000000'
  context.fillText('Score is: '+score, 10, 20)
}
function drawLives () {
  context.font = '18px Times New Roman'
  context.fillStyle = '#000000'
  context.fillText ('Lives: '+lives, canvas.width - 70, 20)
}

function gameOver() {
  alert(`Game over, you don't have anymore lives.`)
  document.location.reload()
  clearInterval(interval)
}
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawBat()
  batMove()
  ballCanvasCollision()
  ballBatCollision()
  ballBrickCollision()
  drawScore()
  drawLives()
  ballPositionX += ballMoveX
  ballPositionY += ballMoveY
}

document.addEventListener('keydown', keyDown, false)
document.addEventListener('keyup', keyUp, false)

document.addEventListener('keydown',spaceKeyDown, false)
document.addEventListener('keyup',spaceKeyUp,false)

function spaceKeyDown(event) {
  if (event.key == ' ' || event.key == 'Spacebar') {
    spacePressed = true
    ballPositionX = canvas.width / 2
    ballPositionY = canvas.height - 50

    ballMoveY = - ballMoveY

    batX = (canvas.width - batWidth) / 2
    batY = (canvas.height - 50)
  }
}
function spaceKeyUp(event) {
  if (event.key == ' ' || event.key == 'Spacebar') {
    spacePressed = false
  }
}


function keyDown(event) {
  if (event.key == 'ArrowRight') {
    rightArrowPressed = true
  } else if (event.key == 'ArrowLeft') {
    leftArrowPressed = true
  }
}
function keyUp(event) {
  if (event.key == 'ArrowRight') {
    rightArrowPressed = false
  } else if (event.key == 'ArrowLeft') {
    leftArrowPressed = false
  }
}
let interval = setInterval(draw, 10)


