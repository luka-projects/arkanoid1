const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 600

let brickRowNum = 6
let brickColumnNum = 12
let brickHeight = 20
let brickWidth = 78
let brickPadding = 5
const brickOffsetTop = 5
const brickOffsetLeft = 5
// brick color

let ballRadius = 7
let ballX = 300
let ballY = 300
let speedVert = -2
let speedHori = 2
let ballAngle = 0

let paddleX = 300
let paddleY = 380
let pWidth = 70
let pHeight = 10
let pColor = '#FFFFFF'
let pSpeed = 5

let keys = {}
let bricks = {}

for (let i = 0; i < brickColumnNum; i++) {
  bricks[i] = {}
  for (let j = 0; j < brickRowNum; j++) {
    bricks[i][j] = { x: 0, y: 0, status: 1}
  }
}

window.addEventListener('keydown', function(e) {
  keys[e.keyCode] = true
  e.preventDefault()
})

window.addEventListener('keyup', function(e) {
  delete keys[e.keyCode]
})

function drawBall () {
  context.beginPath()
  context.arc(ballX, ballY, ballRadius, 0, 2*Math.PI)
  context.fillStyle = '#9966CC'
  context.fill()
  context.closePath()
}

function drawPaddle () {
  context.beginPath()
  context.rect(paddleX,paddleY,pWidth,pHeight)
  context.fillStyle = '#FF0000'
  context.fill()
  context.closePath()
}

function drawBricks () {
  for (let i = 0; i < brickColumnNum; i++) {
    for (let j = 0; j < brickRowNum; j++) {
      if (bricks[i][j].status == 1) {
        let brickX = (i*(brickWidth + brickPadding) + brickOffsetLeft)
        let brickY = (j*(brickHeight + brickPadding) + brickOffsetTop)
        bricks[i][j].x = brickX
        bricks[i][j].y = brickY
        context.beginPath()
        context.rect(brickX, brickY, brickWidth, brickHeight)
        context.fillStyle = '#FFDF00'
        context.fill()
        context.closePath()
      }
    }
  }
}

function collisionDet () {
  for (let i = 0; i < brickColumnNum; i++) {
    for (let j = 0; j < brickRowNum; j++) {
      let b = bricks[i][j]
      if (b.status == 1) {
        if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight)
        speedVert = -speedVert
        b.status = 0
      }
    }
  }
}

function draw () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawPaddle()
  drawBall()
  collisionDet()
  if (ballX + speedHori > canvas.width - ballRadius || ballX + speedHori < ballRadius) {
    speedHori = -speedHori
  }
  if (ballY + speedVert < ballRadius) {
    speedVert = -speedVert
  } else if (ballY + speedVert > paddleY - ballRadius) { // 107 i 108 proverava da li loptica udara u paddle
    if (ballX + ballRadius > paddleX && ballX - ballRadius < paddleX - pWidth) {
      if (ballY = ballY - pHeight) {
        ballAngle = ((paddleX + pWidth / 2) - ballX) * 0.05
        speedHori = speedHori + ballAngle
        speedVert = -speedVert
      }
    }
    else {
      alert ('Game over!')
      document.location.reload()
    }
  }

  if (37 in keys) {
    if (paddleX + pSpeed > 0) {
      paddleX -= pSpeed
    }
  } else if (39 in keys) {
    if (paddleX + pWidth + pSpeed > canvas.width) {
      paddleX += pSpeed
    }
  }
  ballX += speedHori
  ballY += speedVert
}

function animation () {
  draw()
  window.requestAnimationFrame(animation)
}

animation()
