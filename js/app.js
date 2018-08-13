// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
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
// a handleInput() method. 
//Lines 37-42 are taken from a post on discussions.udacity.com
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

Player.prototype.handleCollision = function(enemy) {
    
    function detectCollision(enemy, player){
        var rect1 = {x: enemy.x, y: enemy.y, width: 50, height: 50} //enemy 1 or enemy 2 or enemy 3
        var rect2 = {x: player.x, y: player.y, width: 10, height: 10} //the player

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y)   {
                return true;

        }

        let collision = detectCollision(enemy, player) || detectCollision(player, enemy);
        if (collision) {
            reset();
        }
    }
}


Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player. 
var enemy1 = new Enemy(0, 100, 100); 
var enemy2 = new Enemy(0, 150, 120);
var enemy3 = new Enemy(0, 75, 80);
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();

let pause; 

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
