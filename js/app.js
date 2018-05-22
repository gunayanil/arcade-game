const score = document.getElementById('score');
const getLevel = document.getElementById('level');
let breakpoint = true;
let point = 0;
let level = 0;
let allEnemies = [];

let Enemy = function(x, y, speed) {
    this.x = x; //horizontal
    this.y = y; // vertical
    this.speed = Math.floor(Math.random() * 110) + 55;
    this.sprite = 'images/enemy-bug.png';
};

for(let i=0; i<3; i++) {
	let enemy = new Enemy(-300, 40+i*90);
	allEnemies.push(enemy);
}


Enemy.prototype.update = function(dt) {
 if(this.x <= 505) {  //canvas.width = 505
 	this.x = this.x + this.speed * dt;
 } else {
 	this.x = -10;
 }
};


Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function(x, y, hearts) {
	this.sprite = 'images/char-horn-girl.png';
	this.x = 200;
	this.y = 400;
	this.hearts = 3;
};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	ctx.font = '700 23pt Open Sans';
	ctx.fillStyle = '#F94900';
	ctx.fillText(`${player.hearts} x`, 410, 35);


};

Player.prototype.update = function(){
	var player = this;
	allEnemies.forEach(function(enemy) {
		if(player.y === enemy.y) {
			if(player.x >= enemy.x - 60 && player.x <= enemy.x + 60){
				{
					player.hearts -= 1;
					ctx.fillText(`${player.hearts} x`, 410, 35);
					player.x= 200;
					player.y = 400;

				}
			}
		}
	});

	if(player.hearts === 0) {
		point = 0;
		score.textContent = point;
		breakpoint = false;
		player.reset();
	}

	if(breakpoint && player.y < 40) { // reaches the water
		point += 100;
		levelUpdate();
		score.textContent = point;
		player.x = 200;
		player.y = 400;
	}
};

Player.prototype.reset = function() {
	level = 0;
	getLevel.textContent = level;
	breakpoint= true;
	player.hearts = 3;
	player.x = 200;
	player.y = 400;
	allEnemies.forEach(function(enemy){
		enemy.speed = Math.floor(Math.random() * 110) + 55;

	});

};

function levelUpdate() {
	level++;
	allEnemies.forEach(function(enemy){
		enemy.speed *= 1.25;
	});
	getLevel.textContent = level;

}

Player.prototype.handleInput = function(key) {
	if(key === "up" && this.y > 0){
		this.y -= 90;
	}

	if(key === "down" && this.y < 400){
		this.y += 90;
	}

	if(key === "right" && this.x < 400){
		this.x += 100;
	}

	if(key === "left" && this.x > 0) {
		this.x -= 100;
	}
};


let player = new Player();

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});