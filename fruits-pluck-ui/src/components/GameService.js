import fruitPopMusic from '../resources/Plop.ogg';
import titleMusic from '../resources/MarimbaBoy.wav';
import basket from '../resources/basket.gif';
import apple from '../resources/apple.png';
import orange from '../resources/orange.png';
import strawberry from '../resources/strawberry.png';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const game = () => {

    //background music
    const backgroundMusic = document.createElement('audio');
    backgroundMusic.src = titleMusic;
    backgroundMusic.play();
    backgroundMusic.loop = true;   //loop music

    //timer
    var timer;
    let start = Date.now();


    const canvas = document.getElementById("gameregion");
    const ctx = canvas.getContext('2d'); //method returns a 2d drawing context on the canvas
    canvas.width = 600;    
    canvas.height = 500;

    let score = 0;
    let gameFrame = 0;
    ctx.font = '50px Georgia';

    //Mouse Interactivity
    let canvasPosition = canvas.getBoundingClientRect(); //returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
    const mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        click: false
    }

    canvas.addEventListener('mousedown', function (event) {  //mouse 
        mouse.x = event.x - canvasPosition.left;
        mouse.y = event.y - canvasPosition.top;
        console.log(mouse.x, mouse.y);
    });
    canvas.addEventListener('mouseup', function () {
        mouse.click = false;
    })

    //Player (basket)
    const basketImage = new Image();
    basketImage.src = basket;
    class Player {
        constructor() {
            this.radius = 50;
            this.angle = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.frame = 0;
            this.spriteWidth = 498;
            this.spriteHeight = 327;
            this.x = canvas.width / 2;
            this.y = canvas.height - this.spriteHeight;
            this.gameOver = false;
        }

        update() {
            if(player.gameOver == true) {   //stop
                return;
            }

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            if (mouse.x != this.x) {
                this.x -= dx / 20;        //horizontal speed
            }
            if (mouse.y != this.y) {
                this.y -= dy / 20;        //vertical speed
            }
        }

        draw() {   //draw line from mouse to player
            if (mouse.click) {
                ctx.lineWidth = 0.2;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();   //conext these two points
            }
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();  //to draw circle
            ctx.closePath();
            // ctx.fillRect(this.x,this.y,this.radius,10);

            ctx.drawImage(basketImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight + 10,
                this.spriteWidth, this.spriteHeight + 20, this.x - 59, this.y - 108,
                this.spriteWidth / 1.7, this.spriteHeight / 1.0);  //image setting to circle, cropout
        }
    }
    const player = new Player();

    //Fruits
    const appleImage = new Image();
    appleImage.src = apple;
    const orangeImage = new Image();
    orangeImage.src = orange;
    // const pineappleImage = new Image();
    // pineappleImage.src = pineapple;
    const strawberryImage = new Image();
    strawberryImage.src = strawberry;

    const fruitsArray = [];
    const fruits = ["apple", "orange", "strawberry"];
    class Fruit {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;  //for falling from top
            this.radius = 28; //fruit size
            this.speed = Math.random() * 5 + 1;  //fruit speed
            this.distance = 1000000; //dummy max distance
            this.spriteWidth = 498;
            this.spriteHeight = 327;
            this.fruit = fruits[Math.floor(Math.random() * fruits.length)];  //for fixing fruit to fruit
        }
        update() {
            this.y += this.speed; //move fruits down(+), up(-)
            //distance between fruit and player
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            //hypotenuse distance (longest)
            this.distance = Math.sqrt(dx * dx + dy * dy);
        }
        draw(fruit) {
            ctx.fillStyle = ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.stroke();
            // const randomFruit = Math.floor(Math.random() * 3) + 1;  //random no from 1 to 3
            switch (fruit) {
                case "apple": {
                    ctx.drawImage(appleImage, this.x - 38, this.y - 36,
                        this.spriteWidth / 6, this.spriteHeight / 5);  //horiz,vert,size of image
                    break;
                }
                case "orange": {
                    ctx.drawImage(orangeImage, this.x - 38, this.y - 32,
                        this.spriteWidth / 6, this.spriteHeight / 5);  //horiz,vert,size of image
                    break;
                }
                default: {
                    ctx.drawImage(strawberryImage, this.x - 40, this.y - 50,
                        this.spriteWidth / 6, this.spriteHeight / 4);  //horiz,vert,size of image
                    break;
                }
            }


        }
    }

    const fruitPop = document.createElement('audio');
    fruitPop.src = fruitPopMusic;

    function handlefruits() {  
        if(player.gameOver == true) {   //stop fruits falling
            return;
        }
        
        //every 50frames new fruit added
        if (gameFrame % 50 == 0) {
            fruitsArray.push(new Fruit());
        }
        for (let i = 0; i < fruitsArray.length; i++) { //fruits creating
            fruitsArray[i].update();
            fruitsArray[i].draw(fruitsArray[i].fruit);
        }
        for (let i = 0; i < fruitsArray.length; i++) {

            if (fruitsArray[i].distance < fruitsArray[i].radius + player.radius) {
                // console.log('collision');
                fruitPop.play();  //music play
                switch (fruitsArray[i].fruit) {
                    case "orange": {
                        score += 1;
                        break;
                    }
                    case "apple": {
                        score += 2;
                        break;
                    }
                    default: {
                        score += 3;
                    }
                }
                fruitsArray.splice(i, 1);  //removing fruit
            }
        }
    }

    //Animation Loop
    function animate() {
        if(player.gameOver == true) {   //stop
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handlefruits();
        player.update();
        player.draw();
        // Create gradient
        var gradient = ctx.createLinearGradient(0, 0, 500, 0);  //linear width
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "white");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText('score: ' + score, 10, 50);
        gameFrame++;

        // Timer
        let seconds = Math.floor((Date.now() - start) / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds %= 60;
        // ctx.strokeStyle = gradient;
        ctx.fillText(minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0"), 450, 50);
        // Tells the browser that you wish to perform an animation and requests that the 
        // browser call a specified function to update an animation before the next repaint.
        requestAnimationFrame(animate);
    }
    function endGame() {
        console.log("end game");
        player.gameOver = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       // window.requestAnimationFrame(endGame);
       ctx.fillText("Game End !", 150,230);
       ctx.fillText('Your Score: ' + score, 150, 280);
       backgroundMusic.pause();
       sendScore();
    }
    function sendScore() {
        const currentUser = AuthService.getCurrentUser();
        let id = currentUser.id;
        UserService.sendScoresOfCurrentUser(id,score);
        const element = document.getElementById("end");
        element.style.display = "block";
    }
    timer = setTimeout(endGame, 30000);
    animate();
}

const GameService = {
    game,
};

export default GameService;