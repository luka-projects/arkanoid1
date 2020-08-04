const canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let ballPositionX = canvas.width / 2 // Ball's X position
let ballPositionY = canvas.height - 50 // Ball's Y position on canvas


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
    // ballMoveY = -ballMoveY
    livesChange(-1)
  }
}
function ballBatCollision() {
  if (ballPositionY + ballMoveY > batY - ballRadius) {
    if (ballPositionX + ballRadius > batX && ballPositionX - ballRadius < batX + batWidth) {
      ballMoveY = -ballMoveY
    }
  }
}



function livesChange(num) {
  lives += num
  if (lives === 0) gameOver()
}
function gameOver() {
  alert(`Game over, you don't have anymore lives.`)
  document.location.reload()
  clearInterval(interval)
}
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawBat()
  batMove()
  ballCanvasCollision()
  ballBatCollision()
  ballPositionX += ballMoveX
  ballPositionY += ballMoveY
}

document.addEventListener('keydown', keyDown, false)
document.addEventListener('keyup', keyUp, false)

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


