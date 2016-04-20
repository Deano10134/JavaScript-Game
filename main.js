var FPS = 60;
// Get the canvas from the document 
var canvas = document.getElementById("GameCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Get the context from the canvas
var context = canvas.getContext('2d');

var gameObjects = [];
var prevTime = Date.now();
var currTime = 0;
var deltaTime = 0;
function calculateDeltaTime()
{
    currTime = Date.now();
    deltaTime = (currTime - prevTime) / 1000;
    prevTime = currTime;
}

function intersects(colA, colB)
{
    // Check if the boxes are intersecting on X
    if (Math.abs(colA.position.x - colB.position.x) <
        colA.GetWidth() / 2 + colB.GetWidth() / 2)
    {
        //Check if the boxes are insecting Y
        if (Math.abs(colA.position.y - colB.position.y) <
        colA.GetWidth() / 2 + colB.GetWidth() / 2)
        {
            // Both boxes are intersecting!
            return true;
        }
    }

    // Both boxes are NOT intersecting 
    return false;

}

function HandleCollision()
{
    // Loop through all GameObject x2
    for (var x = 0; x < gameObjects.length; x++)
    {
        for (var y = 0; y < gameObjects.length; y++)
        {
            // Grab ColX & ColB from list 
            var colA = gameObjects[x];
            var colB = gameObjects[y];

            // Detect if they are NOT the same & they are visible 
            // if (true && true && true )
            // if ( true)

            // if( false && true && true)
            // if(false) 

            //if( false || false || false )
            //if(false)

            if (x != y && colA.isVisible && colB.isVisible)
            {
                // Check if both objects are colliding 
                if (intersects(colA, colB))
                {

                    // Call "onCollusionStay" for both objects 
                    colA.OnCollisionStay(colB);
                    colB.OnCollisionStay(colB);

                }
            }
        }
    }
}
var Debug = new GameObject();
Debug.lineSpacing = 2.0;
Debug.lines = [];
Debug.Log = function (message)
{
    this.lines.push(message);
}
Debug.Clear = function ()
{
    this.lines = [];
}
Debug.Draw = function ()
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

        //4.  Draw the object 
        context.fillStyle = this.color;
        var pos = new Vector2(this.position.x, this.position.y);
    }
    for (var i = 0; i < this.lines.length; i++)
    {
        var text = this.lines[i];

        context.font = "Arial, 24px"
        var height = parseInt(context.font);
        //Move  position along the y using spacing 
        pos.y += this.lineSpacing + height;

        //Drawing each line (of text)
        context.fillText(text, pos.x, pos.y);
    }
    // Restore the context to the last save 
    context.restore();
}
function SortAllGameObjects()
{
    gameObjects = gameObjects.sort(function (objA, onjB)
    {
        if (objA.depth < objB.depth)
        {
            return -1;
        } else if (objA.depth > objB.depth)
        {
            return 1;
        }
        return 0;
    }
)
}
function Update()
{
    // Calculate delta time for GameObjects 
    calculateDeltaTime();
    // Loop through and update all gameObjects
    for (var i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].Update(deltaTime);
    }
    // Perform collision detection math on all GameObjects 
    HandleCollision();

}

function Draw()
{

    // Clearing the buffer
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    //Loop through and draw all GameObjects

    for (var i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].Draw();
    }

    context.fillStyle = "black", "bold";
    context.font = "30px Comic Sans MS";
  
}

setInterval(function ()
{
    Update();
    Draw();
}, 1000 / FPS);


/*var context = canvas.getContext("2d");
//Draw an arc with the content 

var x = 500;
var y = 0;
var width = 100;
var height = 100;

context.save();
$(canvas).mousedown(function (event) {

    var offset =$(this).offset();
    var x = event.pageX- offset.left;
    var y = event.pageY- offset.top;
    context.beginPath();
    context.arc(x, y, 50, 0, Math.PI * 2);
    context.fill ();
    context.closePath();
    context.restore();
});
var update = function ()
{
    //Clear the screen 
   // context.fillStyle = "black";
   // context.fillRect(0, 0, canvas.width, canvas.height)
   // x += 1;
   /// y += 1;
   // angle += 0.01;
    
    //*context.save();

   //* context.translate(width / 2, height / 2);
   // context.rotate(angle);
    //context.translate(width , height / 2);
    
   // context.fillStyle = "black";
   // context.fillRect(0, 0, width, height)


    //Drawing the earth
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(200, 300, 30, 0, Math.PI * 2);
    context.closePath();
    context.fill();

   /*
    //Drawing the sun
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(x, y, 500, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    
    context.fillStyle = "white";
    context.font = "30px Comic Sans MS";
    context.fillText("SCORE", 40, 89);
   
}

setInterval(update, 500 / FPS);\
*/


