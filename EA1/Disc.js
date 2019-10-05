var explosionTimer;

function animateExplosion() {
	var xPosition = 0;
	var yPosition = 0;
	var count = 1;
	const interval = 100;
	explosionTimer = setInterval(() => {
		if(count < 40){
			if(count % 8 == 1){
				xPosition = 0;
				yPosition += 128;
			} else {
				xPosition += 128;
			}
			count ++;
		} else {
			xPosition = 0;
			yPosition = 0;
			count = 1;
		}
		document.getElementById("explosionImage").style.backgroundPosition = `-${xPosition}px -${yPosition}px`;
	}, 
	interval);
}
var discTimer;
var discCounter = 1;
var isSpinning = false;
var xPosition = 0;
var yPosition = 0;

function triggerDiscAnimation(){
	isSpinning = !isSpinning;
	if(isSpinning){
		animateDisc();
	} else {
		clearInterval(discTimer);
	}
}
function setDegree(){
 	document.getElementById("degree").innerHTML = `${(discCounter * 9 - 9) % 360}°`
}

function animateDisc(){
	const interval = 40;
	discTimer = setInterval(() => {
		rotateRight();
	}, 
	interval);
}

function rotateLeft(){
	if(discCounter > 1){
		if(discCounter % 8 == 1){
			xPosition = 444 * 7;
			yPosition -= 444;
		} else {
			xPosition -= 444;
		}
		discCounter --;
	} else {
		xPosition = 444 * 7;
		yPosition = 444 * 4;
		discCounter = 40;
	}
	document.getElementById("discImage").style.backgroundPosition = `-${xPosition}px -${yPosition}px`;
	setDegree()
}

function rotateRight(){
	if(discCounter < 40){
		if(discCounter % 8 == 0){
			xPosition = 0;
			yPosition += 444;
		} else {
			xPosition += 444;
		}
		discCounter ++;
	} else {
		xPosition = 0;
		yPosition = 0;
		discCounter = 1;
	}
	document.getElementById("discImage").style.backgroundPosition = `-${xPosition}px -${yPosition}px`;
	setDegree()
}

window.onkeydown = function(evt) {
	var key = evt.which ? evt.which : evt.keyCode;

	var c = String.fromCharCode(key);

	switch(c){
		case('R'):
			rotateRight();
		break;
		case('L'):
			rotateLeft();
		break;
		case('S'):
			triggerDiscAnimation();
			break;
	}
}