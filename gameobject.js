/*
 * Extra Math Functions
 */

var instanceId = 0;

function GameObject(imageSrc)
{
    var gameObject = {
        name: 'GameObject' + instanceId,
        tag: 'null',
        position: new Vector2(),
        velocity: new Vector2(),
        rotation: 0,
        radius: 5,
        width: 30,
        height: 50,
        scale: 1.0,
        color: 'red',
        isVisible: true,
        player:Text,
        image: new Image(),
        isImageLoaded: false,
        GetWidth: function ()
        {
            return this.width * this.scale;
        },
        GetHeight: function ()
        {
            return this.height * this.scale;
        },
        Update: function (deltaTime)
        {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;


        },

        Draw: function ()
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
            context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            context.strokeStyle = this.color;
            /*
            if (this.isImageLoaded)
            {
                context.drawImage(this.image, -this.width / 2, -this.height / 2);
            }
            else
            {
                context.fillRect(-this.width / 2, -this.height / 2, -this.width, this.height)
            }
            context.drawImage(this.image, -this.width / 2, -this.height / 2);

            */


            // Restore the context to the last save 
            context.restore();

        },
        //  Use this function to handle collision response 
        OnCollisionStay: function (col)
        {


        }

    };

    //gameObject.width = gameObject.image.width;
    // gameObject.height = gameObject.image.height;

    //if (imageSrc != undefined)
    //  {
    /*  gameObject.image.src = imageSrc;
      gameObject.image.onload = function ()
      {
          gameObject.isImageLoaded = true;
          gameObject.width = gameObject.image.width;
          gameObject.height = gameObject.image.height;

      }
      */

    instanceId++;
        gameObjects.push(gameObject);

        return gameObject;

    };

function Destroy(gameObject)
{  // Filter the gameObjects, removing the game objects passed in 
    //from the list

    gameObjects = gameObjects.filter(function (object)
    {
        //If the object is NOT the same, return true
        return Object.is(gameObject, object) == false;
    });
}