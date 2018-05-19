let Enemy = function(x, y, speed) {
    this.x = x; //horizontal
    this.y = y; // vertical
    this.speed = Math.floor(Math.random() * 20) + 10;
    this.sprite = 'images/enemy-bug.png';
 };

 let enemy1 = new Enemy(-300, 40);
 let enemy2 = new Enemy(-300, 130);
 let enemy3 = new Enemy(-300, 220);


 Enemy.prototype.update = function(dt) {
 if(this.x <= 505) {  //canvas.width = 505
 	this.x = this.x + this.speed * dt;
 } else {
 	this.x = -2;
 }
};


Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function(x, y) {
	this.sprite = 'images/char-horn-girl.png';
	this.x = 200;
	this.y = 400;
}


let Gem = function(x, y) {
   this.x = x;
   this.y = y;
}

Gem.prototype.render = function() {

}

Gem.prototype.update = function() {
  if(gem.x === player.x){
   if(player.y >= gem.y - 40 && player.y <= gem.y + 40) {
      gem.x = -150;
      gem.y = -150;
   }
}
}

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function(){

	var player = this;
	allEnemies.forEach(function(enemy) {
		if(player.y === enemy.y) {
			if(player.x >= enemy.x - 60 && player.x <= enemy.x + 60){
				{
					player.x= 200;
					player.y = 400;

				}
			}
		}
	});

	if(player.y < 40) { 
		setTimeout(function() {
			player.x = 200;
			player.y = 400;
		}, 800);

	}


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
}


let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(50, 10);
let gem = new Gem(200, 130);

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
