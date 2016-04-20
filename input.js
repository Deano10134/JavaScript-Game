//Dictionary of keycodes 

//key - value

var keys = {};

keys['w'] = 87;
keys['a'] = 65;
keys['s'] = 83;
keys['d'] = 68;
keys['x'] = 88;
keys['space'] = 32;


//Dictionary of mouse buttons
var mouseButtons = {};
mouseButtons['left'] = 1;
mouseButtons['middle'] = 2;
mouseButtons['right'] = 3;

// Input object that handles input throughout 
// our game engine
var Input = {
    _keysDown: [],
    _mousePosition: new Vector2(),
    _mouseButtonsDown: [],

    // Returns the mouse position internal variable 
    GetMousePosition: function () {
        return this._mousePosition;

    },


    // Function that checks if a mouse button is
    // down and return true/false
    GetMouseButtonDown: function (buttonName) {
        // Try and obtain the button from the
        //list of buttons defined 
        var findButtonCode = mouseButtons[buttonName];
        // Check if the button code exists in the 
        // list 
        if (findButtonCode != undefined) {
            // Check if the button is in the list of 
            // mouse buttons down 
            if (this._mouseButtonsDown.includes(findButtonCode)) {
                return true;
            }
        }

        return false;  //The button is NOT down! 


    },

    // Function that checks if akey is down and return true/false
    GetKeyDown: function (keyName) {
        // Try and obtain the keycode from the list of keys defined
        var findKeyCode = keys[keyName];
        //Check if the keycode exists in the list
        if (findKeyCode != undefined) {
            // Check if the key is in the list of keys down
            if (this._keysDown.includes(findKeyCode)) {
                // the key is down!
                return true;
            }
        }
        // The key is NOT done
        return false;
    }
};
/* Document events 
 */
var canvasElement = document.getElementById('GameCanvas');
$(canvasElement).mousemove(function (event) {
    //Obtain the offsets
    var offset = $(this).offset();
    // Set the mouse positions
    Input._mousePosition.x = event.pageX - offset.left;
    Input._mousePosition.y = event.pageY - offset.top;

});


// Add an event to the document that gets the mouse buttons down

$(document).mousedown(function (event) {
    // push button into mouse button down list
    Input._mouseButtonsDown.push(event.which);
});

// Add an event to the document that gets the mouse Button up
$(document).mouseup(function (event) {

    // Remove the mouse button that is up from the mouse buttons
    Input._mouseButtonsDown = Input._mouseButtonsDown.filter(function (button) {
        return button != event.which;

    });
});

// Add a keydown event to test for keys that are down

$(document).keydown(function (event) {
    Input._keysDown.push(event.keyCode);
});

// Add a keyup event to test for the keys that are up
$(document).keyup(function (event) {
    Input._keysDown = Input._keysDown.filter(function (keyCode) {
        return keyCode != event.keyCode;
    });
});

