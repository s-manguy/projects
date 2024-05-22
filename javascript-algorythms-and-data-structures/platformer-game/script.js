// const startBtn = document.getElementById("start-btn");
// const canvas = document.getElementById("canvas");
// const startScreen = document.querySelector(".start-screen");
// const checkpointScreen = document.querySelector(".checkpoint-screen");
// const checkpointMessage = document.querySelector(".checkpoint-screen > p");
// const ctx = canvas.getContext("2d");
// canvas.width = innerWidth;
// canvas.height = innerHeight;
// const gravity = 0.5;
// let isCheckpointCollisionDetectionActive = true;

// const proportionalSize = (size) => {
//   return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
// }

// class Player {
//   constructor() {
//     this.position = {
//       x: proportionalSize(10),
//       y: proportionalSize(400),
//     };
//     this.velocity = {
//       x: 0,
//       y: 0,
//     };
//     this.width = proportionalSize(40);
//     this.height = proportionalSize(40);
//   }
//   draw() {
//     ctx.fillStyle = "#99c9ff";
//     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }
  
//   update() {
//     this.draw();
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     if (this.position.y + this.height + this.velocity.y <= canvas.height) {
//       if (this.position.y < 0) {
//         this.position.y = 0;
//         this.velocity.y = gravity;
//       }
//       this.velocity.y += gravity;
//     } else {
//       this.velocity.y = 0;
//     }

//     if (this.position.x < this.width) {
//       this.position.x = this.width;
//     }

//     if (this.position.x >= canvas.width - 2 * this.width) {
//       this.position.x = canvas.width - 2 * this.width;
//     }
//   }
// }

// class Platform {
//   constructor(x, y) {
//     this.position = {
//       x,
//       y,
//     };
//     this.width = 200;
//     this.height = proportionalSize(40);
//   }
//   draw() {
//     ctx.fillStyle = "#acd157";
//     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }
// }

// class CheckPoint {
//   constructor(x, y, z) {
//     this.position = {
//       x,
//       y,
//     };
//     this.width = proportionalSize(40);
//     this.height = proportionalSize(70);
//     this.claimed = false;
//   };

//   draw() {
//     ctx.fillStyle = "#f1be32";
//     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }
//   claim() {
//     this.width = 0;
//     this.height = 0;
//     this.position.y = Infinity;
//     this.claimed = true;
//   }
// };

// const player = new Player();

// const platformPositions = [
//   { x: 500, y: proportionalSize(450) },
//   { x: 700, y: proportionalSize(400) },
//   { x: 850, y: proportionalSize(350) },
//   { x: 900, y: proportionalSize(350) },
//   { x: 1050, y: proportionalSize(150) },
//   { x: 2500, y: proportionalSize(450) },
//   { x: 2900, y: proportionalSize(400) },
//   { x: 3150, y: proportionalSize(350) },
//   { x: 3900, y: proportionalSize(450) },
//   { x: 4200, y: proportionalSize(400) },
//   { x: 4400, y: proportionalSize(200) },
//   { x: 4700, y: proportionalSize(150) },
// ];

// const platforms = platformPositions.map(
//   (platform) => new Platform(platform.x, platform.y)
// );

// const checkpointPositions = [
//   { x: 1170, y: proportionalSize(80), z: 1 },
//   { x: 2900, y: proportionalSize(330), z: 2 },
//   { x: 4800, y: proportionalSize(80), z: 3 },
// ];

// const checkpoints = checkpointPositions.map(
//   (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
// );

// const animate = () => {
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   platforms.forEach((platform) => {
//     platform.draw();
//   });

//   checkpoints.forEach(checkpoint => {
//     checkpoint.draw();
//   });

//   player.update();

//   if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
//     player.velocity.x = 5;
//   } else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
//     player.velocity.x = -5;
//   } else {
//     player.velocity.x = 0;

//     if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
//       platforms.forEach((platform) => {
//         platform.position.x -= 5;
//       });

//       checkpoints.forEach((checkpoint) => {
//         checkpoint.position.x -= 5;
//       });
    
//     } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
//       platforms.forEach((platform) => {
//         platform.position.x += 5;
//       });

//       checkpoints.forEach((checkpoint) => {
//         checkpoint.position.x += 5;
//       });
//     }
//   }

//   platforms.forEach((platform) => {
//     const collisionDetectionRules = [
//       player.position.y + player.height <= platform.position.y,
//       player.position.y + player.height + player.velocity.y >= platform.position.y,
//       player.position.x >= platform.position.x - player.width / 2,
//       player.position.x <=
//         platform.position.x + platform.width - player.width / 3,
//     ];

//     if (collisionDetectionRules.every((rule) => rule)) {
//       player.velocity.y = 0;
//       return;
//     }

//     const platformDetectionRules = [
//       player.position.x >= platform.position.x - player.width / 2,
//       player.position.x <=
//         platform.position.x + platform.width - player.width / 3,
//       player.position.y + player.height >= platform.position.y,
//       player.position.y <= platform.position.y + platform.height,
//     ];

//     if (platformDetectionRules.every(rule => rule)) {
//       player.position.y = platform.position.y + player.height;
//       player.velocity.y = gravity;
//     };
//   });

//   checkpoints.forEach((checkpoint, index, checkpoints) => {
//     const checkpointDetectionRules = [
//       player.position.x >= checkpoint.position.x,
//       player.position.y >= checkpoint.position.y,
//       player.position.y + player.height <=
//         checkpoint.position.y + checkpoint.height,
//       isCheckpointCollisionDetectionActive,
//       player.position.x - player.width <=
//         checkpoint.position.x - checkpoint.width + player.width * 0.9,
//       index === 0 || checkpoints[index - 1].claimed === true,
//     ];

//     if (checkpointDetectionRules.every((rule) => rule)) {
//       checkpoint.claim();


//       if (index === checkpoints.length - 1) {
//         isCheckpointCollisionDetectionActive = false;
//         showCheckpointScreen("You reached the final checkpoint!");
//         movePlayer("ArrowRight", 0, false);
//       } else if (player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40) {
//                 showCheckpointScreen('You reached a checkpoint!');
//             }


//     };
//   });
// }


// const keys = {
//   rightKey: {
//     pressed: false
//   },
//   leftKey: {
//     pressed: false
//   }
// };

// const movePlayer = (key, xVelocity, isPressed) => {
//   if (!isCheckpointCollisionDetectionActive) {
//     player.velocity.x = 0;
//     player.velocity.y = 0;
//     return;
//   }

//   switch (key) {
//     case "ArrowLeft":
//       keys.leftKey.pressed = isPressed;
//       if (xVelocity === 0) {
//         player.velocity.x = xVelocity;
//       }
//       player.velocity.x -= xVelocity;
//       break;
//     case "ArrowUp":
//     case " ":
//     case "Spacebar":
//       player.velocity.y -= 8;
//       break;
//     case "ArrowRight":
//       keys.rightKey.pressed = isPressed;
//       if (xVelocity === 0) {
//         player.velocity.x = xVelocity;
//       }
//       player.velocity.x += xVelocity;
//   }
// }

// const startGame = () => {
//   canvas.style.display = "block";
//   startScreen.style.display = "none";
//   animate();
// }

// const showCheckpointScreen = (msg) => {
//   checkpointScreen.style.display = "block";
//   checkpointMessage.textContent = msg;
//   if (isCheckpointCollisionDetectionActive) {
//     setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
//   }
// };

// startBtn.addEventListener("click", startGame);

// window.addEventListener("keydown", ({ key }) => {
//   movePlayer(key, 8, true);
// });

// window.addEventListener("keyup", ({ key }) => {
//   movePlayer(key, 0, false);
// });


const startBtn  = document.getElementById('start-btn');
const canvas = document.getElementById('canvas');
const startScreen = document.querySelector('.start-screen');
const checkpointScreen = document.querySelector('.checkpoint-screen');
const checkpointMessage = document.querySelector('.checkpoint-screen > p');// use the combinator

const ctx = canvas.getContext("2d");// Canvas API can be used to create graphics in games using JavaScript and the HTML canvas element.
canvas.width = innerWidth;  // The innerWidth property is a number that represents the interior width of the browser window.
canvas.height = innerHeight; //The innerHeight property is a number that represents the interior height of the browser window.

const gravity = 0.5; // When the player jumps, you will need to apply gravity to bring them back down.

let isCheckpointCollisionDetectionActive = true; // keep track of the status for the checkpoint collision detection

const proportionalSize = (size) => {
    return innerHeight < 500 
    ? Math.ceil((size / 500) * innerHeight) 
    : size;
}; // make sure that the size of the elements in the game are responsive and adapt to different screen sizes. The width and the height of the main player, platforms and checkpoints will be proportional sized relative to the innerHeight of the browser screen. The goal is to make the game responsive and visually consistent across different screen sizes.

class Player {
    constructor() {
        this.position = {
            x: proportionalSize(10),
            y: proportionalSize(400),
        }; // You need to use the proportionalSize function here to make sure that the player's position is always proportional to the screen size. This is important because you want the player to be able to move around the screen regardless of the screen size.
        this.velocity = {
            x: 0,
            y: 0,
        }; //he velocity property will be used to store the player's speed in the x and y directions.
        this.width = proportionalSize(40);
        this.height = proportionalSize(40);
        // You are using the proportionalSize() function here to set the width and height properties of your class to be proportional to the height of the screen.
    }

    draw() {
        ctx.fillStyle = "#99c9ff"; // API CANVAS color code
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height); //API CANVAS rectangular shape code fillRect(x, y, width, height)
    }; // will be responsible for creating the player's width, height, position, and fill color.

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            if (this.position.y < 0 ) {
                this.position.y = 0;
                this.velocity.y = gravity;
            }
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }

        if (this.position.x < this.width) {
            this.position.x = this.width;
        } // will ensure that the player stays within the boundaries of the canvas screen and doesn't move too far off to the left.


        if (this.position.x >= canvas.width - 2 * this.width) {
            this.position.x = canvas.width - 2 * this.width;
        }; // will ensure that the player's x position will never exceed the right edge of the canvas.
    }; // will be  responsible for updating the player's position and velocity as it moves throughout the game.
}

class Platform {
    constructor(x, y) {
        this.position = {
            x, 
            y,
        };
        this.width = 200;
        this.height = proportionalSize(40);
    }

    draw() {
        ctx.fillStyle = "#acd157"; // Canvas API
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
}

class CheckPoint {
    constructor(x, y, z) {
        this.position = {x, y};
        this.width = proportionalSize(40);
        this.height = proportionalSize(70);
        this.claimed = false; // his property will be used to check if the player has reached the checkpoint.
    }

    draw() {
        ctx.fillStyle = "#f1be32";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    claim() {
        this.width = 0;
        this.height = 0;
        this.position.y = Infinity;
        this.claimed = true;
    };
}

const player = new Player();

const platformPositions = [
    { x: 500, y: proportionalSize(450) },
    { x: 700, y: proportionalSize(400) },
    { x: 850, y: proportionalSize(350) },
    { x: 900, y: proportionalSize(350) },
    { x: 1050, y: proportionalSize(150) },
    { x: 2500, y: proportionalSize(450) },
    { x: 2900, y: proportionalSize(400) },
    { x: 3150, y: proportionalSize(350) },
    { x: 3900, y: proportionalSize(450) },
    { x: 4200, y: proportionalSize(400) },
    { x: 4400, y: proportionalSize(200) },
    { x: 4700, y: proportionalSize(150) },
];

const platforms = platformPositions.map(
    (platform) => new Platform(platform.x, platform.y)
); //create a list of new platform instances using the Platform class.

const checkpointPositions = [
    { x: 1170, y: proportionalSize(80), z: 1 },
    { x: 2900, y: proportionalSize(330), z: 2 },
    { x: 4800, y: proportionalSize(80), z: 3 },
];

const checkpoints = checkpointPositions.map(
    (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

const animate = () => {
    requestAnimationFrame(animate); // The requestAnimationFrame() web API, takes in a callback and is used to update the animation on the screen. 
    ctx.clearRect(0, 0, canvas.width, canvas.height); // As the player moves through the game, you will need to clear the canvas before rendering the next frame of the animation. You can use the clearRect() Web API to accomplish this. It takes in an x, y, width, and height arguments.
    
    platforms.forEach((platform) => {
        platform.draw()
    });

    checkpoints.forEach((checkpoint) => {
        checkpoint.draw();
    });

    player.update();// updates the player's position as it moves throughout the game.
    
    if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
        player.velocity.x = 5;
    } else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
            platforms.forEach((platform) => {
                platform.position.x -= 5;
            });

            checkpoints.forEach((checkpoint) => {
                checkpoint.position.x -= 5;
            });

        } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
            platforms.forEach((platform) => {
                platform.position.x += 5;
            });

            checkpoints.forEach((checkpoint) => {
                checkpoint.position.x += 5;
            });
    }

    
    }

    platforms.forEach((platform) => {
        const collisionDetectionRules = [
            player.position.y + player.height <= platform.position.y,
            player.position.y + player.height + player.velocity.y >= platform.position.y,
            player.position.x >= platform.position.x - player.width / 2,
            player.position.x <= platform.position.x + platform.width - player.width / 3,
        ];

        if (collisionDetectionRules.every((rule) => rule)) {
            player.velocity.y = 0;
            return;
        }

        const platformDetectionRules = [
            player.position.x >= platform.position.x - player.width / 2,
            player.position.x <= platform.position.x + platform.width - player.width / 3,
            player.position.y + player.height >= platform.position.y,
            player.position.y <= platform.position.y + platform.height,
        ];

        if (platformDetectionRules.every((rule) => rule)) {
            player.position.y = platform.position.y + player.height;
            player.velocity.y = gravity;
        }

    });

    checkpoints.forEach((checkpoint, index, checkpoints) => {
        const checkpointDetectionRules = [
            player.position.x >= checkpoint.position.x,
            player.position.y >= checkpoint.position.y,
            player.position.y + player.height <= checkpoint.position.y + checkpoint.height,
            isCheckpointCollisionDetectionActive,
            player.position.x - player.width <= checkpoint.position.x - checkpoint.width + player.width * 0.9,
            index === 0 || checkpoints[index - 1].claimed === true,
        ];

        if (checkpointDetectionRules.every((rule) => rule)) {
            checkpoint.claim();

            if (index === checkpoints.length - 1) {
                isCheckpointCollisionDetectionActive = false;
                showCheckpointScreen("You reached the final checkpoint!");
                movePlayer("ArrowRight", 0, false);
            } else if (player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40) {
                showCheckpointScreen('You reached a checkpoint!');
            }
        }
    });
}; // the functionality for moving the player across the screen. he animate function will be responsible for updating the player's position and continually drawing it on the canvas.

const keys = {
    rightKey: {pressed: false},
    leftKey: {pressed: false},
}; // To manage the player's movement in the game, you will need to monitor when the left and right arrow keys are pressed.

const movePlayer = (key, xVelocity, isPressed) => {
    if (!isCheckpointCollisionDetectionActive) {
        player.velocity.x = 0;
        player.velocity.y = 0;
        return
    }

    switch (key) {
        case "ArrowLeft":
            keys.leftKey.pressed = isPressed;
            if (xVelocity === 0) {
                player.velocity.x = xVelocity;
            }
            player.velocity.x -= xVelocity;
            break;
        case "ArrowUp":
        case " ":
        case "Spacebar":
            player.velocity.y -= 8;
            break;
        case "ArrowRight":
            keys.rightKey.pressed = isPressed;
            if (xVelocity === 0) {
                player.velocity.x = xVelocity;
            }
            player.velocity.x += xVelocity;
            break;
    }
}; // he functionality that will be responsible for moving the player across the screen.

const startGame = () => {
    canvas.style.display = "block"; // display the canvas
    startScreen.style.display = "none";  // hide the startScreen container
    animate(); // visualize the player on the screen
};

const showCheckpointScreen = (msg) => {
    checkpointScreen.style.display = "block";
    checkpointMessage.textContent = msg;

    if (isCheckpointCollisionDetectionActive) {
        setTimeout(() => {checkpointScreen.style.display = "none"}, 2000);
    }
};

startBtn.addEventListener('click', startGame); // if startGame() call the function without wlicking on the button !

window.addEventListener('keydown', ({key}) => {
    movePlayer(key, 8, true);
}); // the event listeners that will be responsible for calling the movePlayer function. For the arguments, pass in the keydown event and an arrow function that uses the destructuring assignment to get the key property from the event object in the event listener parameter.

window.addEventListener('keyup', ({key}) => {
    movePlayer(key, 0, false);
}); // Add another addEventListener to the global window object and pass in the keyup event and use destructuring to pass in the key property from the event.

