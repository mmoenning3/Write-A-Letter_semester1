let socket
let color = "#0000000";
let strokeWidth = 3

function setup() {
	const cv = createCanvas(500, 400)
	cv.position(160, 100)
	
	socket = io.connect('http://localhost:3000')

	socket.on('mouse', data => {
		stroke(data.color)
		strokeWeight(data.strokeWidth)
		line(data.x, data.y, data.px, data.py)
	})
	
}

function mouseDragged() {
	stroke(color)
	strokeWeight(strokeWidth)
	line(mouseX, mouseY, pmouseX, pmouseY)
	sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}

function sendmouse(x, y, pX, pY) {
	color = document.getElementById("colorpicker").value;
	const data = {
		x: x,
		y: y,
		px: pX,
		py: pY,
		color: color,
		strokeWidth: strokeWidth,
	}

	socket.emit('mouse', data)
}

function playAudio() { 
	var audio_button = document.getElementById("audio-button"); 
	audio_button.play(); 
} 