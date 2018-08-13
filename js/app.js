// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //this.speed = speed;
    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 2;
    //make sure that enemies won't be hidden behind the canvas
    if (this.x > 500) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method. Lines 27-34 are taken from a post on discussions.udacity.com
var Player = function() {
 this.sprite = 'images/char-boy.png';
 this.x = 200;
 this.y = 350;
};
Player.prototype.update = function(dt) {
    //make sure that the player won't be hidden behind the canvas
    if (this.x > 400 || this.x < 0) {
        this.x = 200;
    }

    if (this.y > 480 || this.y < 0) {
        this.y = 400;
    }
};
Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player. 
var enemyBug1 = new Enemy(150, 100); 
var enemyBug2 = new Enemy(180, 150);
var enemyBug3 = new Enemy(200, 75);
var allEnemies = [enemyBug1, enemyBug2, enemyBug3];

var player = new Player();

Player.prototype.handleInput = function(dt) {
    switch (dt) {
        case "up":
            this.y -= 50;
            break;
        case "down":
            this.y += 50;
            break;
        case "left":
            this.x -= 50;
            break;
        case "right":
            this.x += 50;
            break;
    }
    console.log(dt)
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
