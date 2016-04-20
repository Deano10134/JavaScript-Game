
/*
 * Method Helpers
 */
function  PlayRandomSound(soundList)
{
    //Generate random index into sound list
    var randomIndex = Random(0, soundList.length);
    //Round the random index (from float to int)
    randomIndex = Math.round(randomIndex);
    //Create the new audio using randomIndex
    var sound = new Audio(soundList[randomIndex]);
    // Play the audio
    sound.play();
}
//Checks if position is within bounds of canvas 
//and returns true/false
function IsWithinBounds (position)
{
    // Checks if positions argument  is within
    //canvas bounds
    if(position.x >= 0 && position.x <= canvas.clientWidth && 
        position.y >= 0 && position.y <= canvas.clientHeight)
    {
        // position is within canvas bounds 
        return true;
    }
    //position is NOT within canvas bounds
    return false;
}

// Gets the direction between two vectors and returns it normalized
function GetNormalDirection(posA, posB)
{
    var result = Vector2.Subtract(posA, posB);
    result.Normalize();
    return result;
}

/*
 * Extra Math Function 
 */
function Random(min, max) {
    return min + Math.random() * (max - min);
}
/*
 * List of sounds
 */
var explosionSounds = [];
explosionSounds[0] = "resources/RicochetofABullet.wav";


/* 
 * Player
 */
var player = new GameObject();
player.name = "Player 1";
player.tag = "Player";
player.position = new Vector2(canvas.clientHeight /2,
                               canvas.clientHeight/ 2);
player.health = 100.0;
player.shootRate = 0.5;
player.shootTimer = 0.0;
player.shootSpeed= 500;
player.Shoot= function(speed)
{
    // Calculate direction from mouse to play
    var mousePos = Input.GetMousePosition();
    var direction = GetNormalDirection(mousePos, this.position);
    // Create a new bullet
    var bullet = new Bullet();
    bullet.position = new Vector2(this. position.x,this.position.y)
    bullet.rotation = this.rotation;
    bullet.scale = 0.5;
    bullet.velocity.x = direction.x * speed;
    bullet.velocity.y = direction.y * speed;
};
//Get bullet sound
var fireSound = new Audio('resources/RicochetofABullet.wav');
fireSound.play();


// Calculate direction from mouse to player 
player.Update = function (deltaTime) {

    var speed = 90;

    //Try moving the player

    if (Input.GetKeyDown('w')) {
        this.position.y -= speed * deltaTime;
    }

    //Try rotating the player 
    if (Input.GetKeyDown('d')) {
        //Rotate clockwise
        this.position.x += speed * deltaTime;
    }
    if (Input.GetKeyDown('a')) {
        // Rotate anti-clockwise 
        this.position.x -= speed * deltaTime;
    }
    var direction = GetNormalDirection(Input.GetMousePosition(), this.position);
    this.rotation = Vector2.ToAngle(direction);

    // Count up shootTimer
    this.shootTimer += deltaTime;
    if (this.shootTimer >= this.shootRate) {

        //Check if the left mouse button was
        // pressed (LMB)
        if (Input.GetMouseButtonDown('left')) {
            this.Shoot(this.shootSpeed);
            this.shootTimer = 0;
        }
    }
    if (Input.GetKeyDown('s')) {
        this.position.y += speed * deltaTime;

    }

    if (Input.GetKeyDown('x')) {
        this.rotation += speed * deltaTime;
    }
};
/*
 * Bullet
 */
function Bullet() {
    var bullet = new GameObject();
    bullet.Update = function (deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        if (IsWithinBounds(this.position) == false) {
            CreateExplosion(this.position, 5, 40, "#525252")
            CreateExplosion(this.position, 5, 80, "#FFA112")


            // Play an explosion sound
            PlayRandomSound(explosionSounds);
            // Destroy this bullet
            Destroy(this);
        };
    };
    bullet.OnCollisionStay = function (col)
    {
        // Check if the collider is of tag "Enemy"
        if (col.tag == "Enemy")
        {
            // Create explosion
            var CreateNuke= (this.position, 4.0);
            // Play an explosion sound here
            PlayRandomSound(explosionSounds);
            // Adding 1 to score variables
            Debug.Log("Hit Enemy");
            // Destory both objects (col & this)
            Destroy(col);
        }
    }
    return bullet;
}
/* Enemy Objects
 
 */

function FollowPlayer(deltaTime) {
    // 1.  Get the direction vector between the player & this enemy GameObject 
    var direction = Vector2.Subtract(player.position, this.position);
    direction.Normalize();

    // 2. Set the rotation of Game Object to be that direction
    this.rotation = Vector2.ToAngle(direction);

    // 3. Move this position in that direction via speed + deltaTime
    this.position.x += direction.x * this.speed * deltaTime;
    this.position.y += direction.y * this.speed * deltaTime;

    // 4. Count up attack time;
    this.attackTimer += deltaTime;
}
/* Enemy
 */
var enemyCount = 0;
function Enemy() {
    var enemy = new GameObject();

    enemy.name = "Enemy" + enemyCount;
    //Count up the enemy count by 1
    enemyCount++;

    enemy.tag = "Enemy";
    enemy.color = "green";

    // Enemy specific parameters
    enemy.speed = 9.0;
    enemy.damage = 3.0;
    enemy.attackRate = 1.0;
    enemy.attackTimer = 0.1;
    enemy.Update = FollowPlayer;
    enemy.OnCollisionStay = function (col) {
        //Check if the collider that was hit
        //is of type "Player" using it's tag
        if (col.tag == "Player") {

            //Check if attackTimer is>= attackRate
            if (this.attackTimer >= this.attackRate) {

                //Decrease health of player 
                col.health -= this.damage;

                CreateExplosion(this.position, 10, 20, "orange");

                // Reset attackTimer
                this.attackTimer = 0.0;
            }

        }
    }


    return enemy;
}
/*
 Enemy Manager
 */
var enemyManager = new GameObject();
enemyManager.name = "Enemy Manager";
enemyManager.isVisible = false;
enemyManager.spawnRate = 1.0;
enemyManager.spawnTimer = 0.0;
enemyManager.Update = function (deltaTime) {
    this.spawnTimer += deltaTime;
    // If the timer reaches the spawn rate
    if (this.spawnTimer >= this.spawnRate) {
        //Spawn enemies

        //1. Generate a random position to spawn 
        // enemy in
        var randomPosition = new Vector2();
        randomPosition.x = Random(0, canvas.clientWidth);
        randomPosition.y = Random(0, canvas.clientHeight);

        //2. Create a new enemy and position 
        //it to random position generated 

        var enemy = new Enemy();
        enemy.position = randomPosition;

        // 3. Reset the timer (spawnTimer)
        this.spawnTimer = 0.0;

    }
}
