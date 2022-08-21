
let unit,
	stopAnimation;


let c = document.getElementById("c");

class Board {
	constructor() {
		this.num = {
			x: 50,
			y: 0,
		};

		unit = Math.floor(innerWidth/this.num.x);

		while(this.num.y*unit <= innerHeight) {
			this.num.y++;
		}
		this.num.y--;

		console.log(this.num.x);

		for(let i = 0 ; i <= this.num.x*this.num.y ; i++) {
			let d = document.createElement("div");
			d.className = "square";

			d.style.width = unit + "px";
			d.style.height = unit + "px";

			let c = document.getElementById("c");
			c.appendChild(d);
		}

		/*
		let a = [];
		a = document.getElementsByClassName("square");
		a[0].style.width = unit + "px";
		a[0].style.height = unit + "px";
		*/
	}
}
class Snake {
	constructor(color, x, y, signx, signy) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.sign = {
			x: signx,
			y: signy,
		};
		this.speed = 10;
		this.size = 3;

		this.squares = [];
		this.squares.push(
			{x: 2, y: 5},
			{x: 1, y: 5},
			{x: 0, y: 5},
		);

		this.path = [{x: 10, y: 5, direction: "down"}];
		this.fromPath = 0;
	}
	draw() {
		this.path.forEach(p => {
			// don't know where to go, can't do it alone, i've tried and i don't know why
		});
		let divs = document.getElementById("c").children;
		console.log(divs);

		for(let i=0 ; i<this.squares.length ; i++) {
			let location = board.num.x * (this.squares[i].y - 1) + this.squares[i].x;
			console.log(location);

			divs[location].style.backgroundColor = "lightgreen";
		}
	}
	update() {
		let divs = document.getElementById("c").children;

		for(let i=0 ; i<= this.squares.length ; i++) {
			this.squares[this.squares.length - 1].style.backgroundColor = "purple";
			this.squares.splice(this.squares.length - 1, 1);

			this.squares.fill()

			this.squares[this.squares.length - 1].style.backgroundColor = "purple";
		}
		this.squares[0].x++;
		/*
		for()
		squares[]
		this.x += this.sign.x*speed;
		this.y += this.sign.y*speed;*/
	}/*
	signChanger() {
		if(path[this.fromPath]){
			if(this.sign.x == -1){
				if(this.x < path[this.fromPath].x){
					if(path[this.fromPath].direction == "down"){
						this.sign.y=1;
						this.sign.x=0;
					}
					else if(path[this.fromPath].direction == "up"){
						this.sign.y=-1;
						this.sign.x=0;
					}
					this.fromPath++;
					this.update();
				}
			}
			else if(this.sign.x == 1){
				if(this.x > path[this.fromPath].x){
					if(path[this.fromPath].direction == "down"){
						this.sign.y=1;
						this.sign.x=0;
					}
					else if(path[this.fromPath].direction == "up"){
						this.sign.y=-1;
						this.sign.x=0;
					}
					this.fromPath++;
					this.update();
				}
			}
			else if(this.sign.y == -1){
				if(this.y < path[this.fromPath].y){
					if(path[this.fromPath].direction == "right"){
						this.sign.x=1;
						this.sign.y=0;
					}
					else if(path[this.fromPath].direction == "left"){
						this.sign.x=-1;
						this.sign.y=0;
					}
					this.fromPath++;
					this.update();
				}
			}
			else if(this.sign.y == 1){
				if(this.y > path[this.fromPath].y){
					if(path[this.fromPath].direction == "right"){
						this.sign.x=1;
						this.sign.y=0;
					}
					else if(path[this.fromPath].direction == "left"){
						this.sign.x=-1;
						this.sign.y=0;
					}
					this.fromPath++;
					this.update();
				}
			}
		}
	}

	comeFromBorder(){
		if(this.x <= -half){
			this.x=canvas.width + half;
			this.sign.x = -1;
		}
		else if(this.x >= canvas.width+half){
			this.x=-half;
			this.sign.x = 1;
		}
		else if(this.y <= -half){
			this.y=canvas.height + half;
			this.sign.y = -1;
		}
		else if(this.y >= canvas.height+half){
			this.y=-half;
			this.sign.y = 1;
		}
	}
	/*
	signChanger(){
		if(this.signx==1){
			if(up && this.x>=path[0].x){
				this.signy=-1;
				this.signx=0;
			}
			else if(down && this.x>=path[0].x){
				this.signy=1;
				this.signx=0;
			}
		}
		else if(this.signx==-1){
			if(up && this.x<=path[0].x){
				this.signy=-1;
				this.signx=0;
			}
			else if(down && this.x<=path[0].x){
				this.signy=1;
				this.signx=0;
			}
		}

		if(this.signy==1){
			if(left && this.y>=path[0].y){
				this.signx=-1;
				this.signy=0;
			}
			else if(right && this.y>=path[0].y){
				this.signx=1;
				this.signy=0;
			}
		}
		else if(this.signy==-1){
			if(left && this.y<=path[0].y){
				this.signx=-1;
				this.signy=0;
			}
			else if(right && this.y<=path[0].y){
				this.signx=1;
				this.signy=0;
			}
		}
	}
	*//*
	collisionWithFood() {
		let dx=circles[0].x-food.x;
		let dy=circles[0].y-food.y;
		let collided = 0;

		if(dx*dx + dy*dy <= half*half*4){
			collided = 1; //return 1;
		}
		return collided; //return 0;
	}*/
}
class Food {
	constructor() {
	}
}

let board = new Board();
let snake = new Snake("green", 2, 5, 1, 0);
let food = new Food();


c.style.width = board.num.x*unit + "px";
c.style.height = board.num.y*unit + "px";

//let squares = document.getElementById("c").childNodes;


function addNewPath(d) {
	snake.path.push({x: circles[0].x, y: circles[0].y, direction: d});
}

document.body.addEventListener("keydown", keydownResponse);
function keydownResponse(event) {
	if(event.keyCode == 38) {
		addNewPath("up");
		circles[0].sign.x = 0;
		circles[0].sign.y = -1;
		//up=true;
	}
	if(event.keyCode==40){
		addNewPath("down");
		circles[0].sign.x = 0;
		circles[0].sign.y = 1;
		//down=true;
	}
	if(event.keyCode==37){
		addNewPath("left");
		circles[0].sign.x = -1;
		circles[0].sign.y = 0;
		//left=true;
	}
	if(event.keyCode==39){
		addNewPath("right");
		circles[0].sign.x = 1;
		circles[0].sign.y = 0;
		//right=true;
	}
}

function gameLoop() {
	snake.draw();
	snake.update();
	/*
	//    stop123=requestAnimationFrame(gameLoop);

	let snakeBorderCollided;
	let snakeSnakeCollided;
	let snakeFoodCollided;
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	//drawing food
	ctx.beginPath();
	ctx.arc(food.x,food.y,unit/2,0,Math.PI*2);
	ctx.fillStyle="black";
	ctx.fill();
	
	circles[0].draw();
	circles[0].update();
	//circles[0].comeFromBorder();
	
	for(i=1;i<circles.length;i++){
		circles[i].draw();
		circles[i].update();
		circles[i].signChanger();
		//circles[i].comeFromBorder();
	}
	
	if(snakeBorderCollision()){
		cancelAnimationFrame(stop123);
		return;
	}
	
	if(snakeSnakeCollision()){
		cancelAnimationFrame(stop123);
		return;
	}
	
	if(snakeFoodCollision()){
		addNewCircle();
		relocationOfFood();
	}
	*/
	
	stopAnimation = requestAnimationFrame(gameLoop);
}
gameLoop();



