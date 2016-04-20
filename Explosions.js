/*
 * Create Nuke 
 * Position: the position the nuke gets created  at
 * StartScale: starting scale of nuke

*/
function CreateNuke(position, scaleSpeeds)
{
    var nuke = new Nuke(imageSrc);
    nuke.velocity = new Vector2(0, 0);
    nuke.position = new Vector2(position.x, position.y);
    nuke.scaleSpeed = scaleSpeed;
    nuke.GetWidth = function ()
    {
        return (this.radius * 2) * this.scale;
    }
    nuke.GetHeight = function ()
    {
        return (this.radius * 2) * this.scale;
    };

    
    nuke.Draw = function ()
    {
        if (this.isVisible)
        {
            //Save context
            context.save()
            //Draw the element. I.e, as a box, circle or image
            //1. Translate to disired position
            context.translate(this.position.x, this.position.y);

            //2. Scale the object 
            context.scale(this.scale, this.scale);

            //3. Rotate the object 
            context.rotate(this.rotation);

            //4.  Draw the object in center pivot
            context.fillStyle = this.color;

            context.beginPath();
            context.arc(-this.radius / 4 - this.radius / 4, this.radius, 0, Math.PI * 2);
            context.closePath();

            context.fill();

            // Restore the context to the last save 
            context.restore();
        }
    }
}

/*
 * Nuke
 */
function Nuke(ImageSrc)
{
    var nuke = new GameObject(ImageSrc);
    nuke.scaleSpeed = 2.0;
    nuke.explosionDuration = 2.0;
    nuke.explosionTimer = 0.0;
    nuke.Update = function (deltaTime)
    {
        // Scale up the explosion over time
        this.scale += this.scaleSpeed * deltaTime;
        //Count up time for explosion
        this.explosionTimer += deltaTime;
        //Check if explosion timer reaches duration
        if (this.explosionTimer >= this.explosionDuration)
        {
            //Destroy the explosion
            Destroy(this);
        }

    };

    nuke.OnCollisionStay = function (col)
    {
        // Check if the collider is of tag "Enemy"
        if (col.tag == "Enemy")
        {
            // Play an explosion sound here
            PlayRandomSound(explosionSounds);
            // Adding 1 to score variables
            var score = new Text('score');
            // Destory both objects (col & this)
            Destroy(col);
        }

        return nuke;
    }
}


/*
 Explosions
 Position: Is the position of spawning particles 
 Count: Amount of particle to spawn
 Speed:  Speed of the particles
 Color: Color of the particle
 */
function CreateExplosion(position, count, speed, color)
{
    //Create a loop that loops through 'count' amount of
    //times

    for (var i = 0; i < count; i++)
    {
        //Create a new particle 
        var particle = new Particle();
        particle.speed = speed;
        particle.color = color;
        // Change particle velocity to random direction
        particle.position = new Vector2(position.x, position.y);
        particle.velocity.x = Random(-particle.speed, particle.speed);
        particle.velocity.y = Random(-particle.speed, particle.speed);
    }

}
/* Particles
 */

function Particle()
{
    var particle = new GameObject();
    particle.scaleSpeed = 1.0;
    particle.speed = 200.0;
    particle.scale = 1.0;
    particle.Update = function (deltaTime)
    {
        //Shink the particle over speed & time
        this.scale -= this.scaleSpeed * deltaTime;
        //Check if scale is less than or equal to 0
        if (this.scale <= 0)
        {
            // Destroy this particle
            Destroy(this);

        }



        // Move particle in direction with velocity & deltaTime
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    };

    particle.Draw = function ()
    {
        if (this.isVisible)
        {
            //Save context
            context.save()
            //Draw the element. I.e, as a box, circle or image
            //1. Translate to disired position
            context.translate(this.position.x, this.position.y);

            //2. Scale the object 
            context.scale(this.scale, this.scale);

            //3. Rotate the object 
            context.rotate(this.rotation);

            //4.  Draw the object in center pivot
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(-this.width / 2, -this.height / 2, 32, 0, Math.PI * 2);
            context.closePath();

            context.fillStyle = this.color;
            context.fill();

            // Restore the context to the last save 
            context.restore();

        }

    };
    return particle;
}