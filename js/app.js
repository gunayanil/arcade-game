'use strict';
const score = document.getElementById('score');
const getLevel = document.getElementById('level');
let breakpoint = true;
const allEnemies = [];
const allHearts = [];

// Sound
let Sound = function(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	};
	this.stop = function(){
		this.sound.pause();
	};
};


let Heart = function(x, y){
	this.x = x;
	this.y = y;
	this.sprite = 'images/Heart.png';
};

Heart.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 70);
};

function putHearts() {
for(let i=0; i<3; i++) {
	const heart = new Heart(380+i*40, -10);
	allHearts.push(heart);
}
}


let Enemy = function(x, y, speed, sound) {
    this.x = x; //horizontal
    this.y = y; //vertical
    this.speed = Math.floor(Math.random() * 110) + 55;
    this.sprite = 'images/enemy-bug.png';
    this.sound = new Sound("sounds/collision.wav");
};

function putEnemies() {
for(let i=0; i<3; i++) {
	const enemy = new Enemy(-300, 40+i*90);
	allEnemies.push(enemy);
}
}

Enemy.prototype.update = function(dt) {
 if(this.x <= 707) {  //canvas.width = 505
 	this.x = this.x + this.speed * dt;
 } else {
 	this.x = -10;
 }
};


Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function(x, y, hearts, point, level, sound) {
	this.sprite = 'images/char-horn-girl.png';
	this.x = 200;
	this.y = 400;
	this.hearts = 3;
	this.point = 0;
	this.level = 0;
	this.sound = new Sound("sounds/step.wav");
};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(){
	allEnemies.forEach(enemy=> {
		if(this.y === enemy.y) {
			if(this.x >= enemy.x - 60 && this.x <= enemy.x + 60){
				{	
					allHearts.shift();
					this.hearts -= 1;
					if(this.hearts !== 0){enemy.sound.play();}
					this.x = 200;
					this.y = 400;
				}
			}
		}
	});

	if(this.hearts === 0) {
		this.point = 0;
		score.textContent = this.point;
		breakpoint = false;
		const gameOver = new Sound("sounds/game-over.wav");
		gameOver.play();
		player.reset();
	}
	// reaches the water
	if(breakpoint && this.y < 40) { 
		this.point += 100;
		levelUpdate();
		score.textContent = this.point;
		this.x = 200;
		this.y = 400;
	}
};

Player.prototype.reset = function() {
	this.level = 0;
	getLevel.textContent = this.level;
	breakpoint= true;
	this.hearts = 3;
	this.x = 200;
	this.y = 400;
	allEnemies.forEach(function(enemy){
		enemy.speed = Math.floor(Math.random() * 110) + 55;
	});
	
	gem = new Gem();
	putHearts();
};

function levelUpdate() {
	player.level++;
	allEnemies.forEach(function(enemy){
		enemy.speed *= 1.25;
	});

	getLevel.textContent = player.level;
	gem = new Gem();
}

Player.prototype.handleInput = function(key) {
	if(key === "up" && this.y > 0){
		this.y -= 90;
		this.sound.play();
	}

	if(key === "down" && this.y < 400){
		this.y += 90;
		this.sound.play();
	}

	if(key === "right" && this.x < 600){
		this.x += 100;
		this.sound.play();
	}

	if(key === "left" && this.x > 0) {
		this.x -= 100;
		this.sound.play();
	}
};

let Gem = function(x, y, sound) {
	let gemImages = ['images/gem-blue.png',
	'images/gem-orange.png',
	'images/gem-green.png'];
	this.sprite = gemImages[Math.floor(Math.random()*3)];
	this.x = Math.floor(Math.random()*6) * 100;
	this.y = Math.floor(Math.random()*3)*80 +70;
	this.sound = new Sound("sounds/won-gem.wav");
};

Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 145);
};

Gem.prototype.update = function() {
	if(this.x === player.x) {
		if(player.y >= this.y - 50 && player.y <= this.y + 50){
			this.sound.play();
			player.point += 200;
			score.textContent = player.point;
			this.x = -200;
			this.y = -200;
		}
	}
};

let gem  = new Gem();
let player = new Player();
putHearts();
putEnemies();

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});