const canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let ballPositionX = canvas.width / 2 // Ball's X position
let ballPositionY = canvas.height - 50 // Ball's Y position on canvas

let score = 0
let lives = 3

// ball
let ball = {
  ballMoveX: 3,
  ballMoveY: -3,
  ballRadius: 10,
  ballAngle: 0
}
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
  context.arc(ballPositionX, ballPositionY, ball.ballRadius, 0, Math.PI * 2)
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

// Collisions

function ballCanvasCollision() {
  let leftSideCanvas = ballPositionX + ball.ballMoveX < ball.ballRadius
  let rightSideCanvas = ballPositionX + ball.ballMoveX > canvas.width - ball.ballRadius
  let topSideCanvas = ballPositionY + ball.ballMoveY < ball.ballRadius
  let bottomSideCanvas = ballPositionY + ball.ballMoveY > canvas.height - ball.ballRadius

  if (rightSideCanvas || leftSideCanvas) {
    ball.ballMoveX = - ball.ballMoveX
  }
  if (topSideCanvas) {
    ball.ballMoveY = - ball.ballMoveY

  } else if (bottomSideCanvas) {
    lives--
    if (lives === 0) {
      gameOver()
    } else { // starting canvas positions of ball and bat
      ballPositionX = canvas.width / 2
      ballPositionY = canvas.height - 50

      // ???
      ball.ballMoveY = -ball.ballMoveY
    }
  }
}
function ballBatCollision() {
  if (ballPositionY + ball.ballMoveY > batY - ball.ballRadius) {
    if (ballPositionX + ball.ballRadius > batX && ballPositionX - ball.ballRadius < batX + batWidth) {
      ball.ballMoveY = -ball.ballMoveY
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
        if (ballPositionX - ball.ballRadius > brickPositionX  && ballPositionX - ball.ballRadius < brickPositionX + brickWidth && ballPositionY - ball.ballRadius> brickPositionY  && ballPositionY - ball.ballRadius< brickPositionY + brickHeight) {
          ball.ballMoveY = -ball.ballMoveY
          b.status = 0
          score++
        }
      }
    }
  }
}



function drawScore() {
  context.font = '18px Times New Roman'
  context.fillStyle = '#000000'
  context.fillText('Score is: ' + score, 10, 20)
}
function drawLives() {
  context.font = '18px Times New Roman'
  context.fillStyle = '#000000'
  context.fillText('Lives: ' + lives, canvas.width - 70, 20)
}

function gameOver() {
  alert(`Game over, you don't have anymore lives.`)
  document.location.reload()
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
  ballPositionX += ball.ballMoveX
  ballPositionY += ball.ballMoveY

  requestAnimationFrame(draw)
}

document.addEventListener('keydown', keyDown, false)
document.addEventListener('keyup', keyUp, false)

document.addEventListener('keydown', spaceKeyDown, false)
document.addEventListener('keyup', spaceKeyUp, false)

function spaceKeyDown(event) {
  if (event.key == ' ' || event.key == 'Spacebar') {
    spacePressed = true
    ballPositionX = canvas.width / 2
    ballPositionY = canvas.height - 50

    ball.ballMoveY = - ball.ballMoveY

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
draw()



