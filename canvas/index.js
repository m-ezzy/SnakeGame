/*some canvas element stuff*/
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

let unit = 50;
const half = unit/2; //it is also radius, let radius=unit/2;

canvas.width=Math.abs((innerWidth/100)*97);
canvas.height=Math.abs((innerHeight/100)*97);

/*common in every snake body circles*/
//const color="lightgreen";
let speed=4;
let stop123;

/*user input storing*/
let up=false;
let down=false;
let right=false;
let left=false;

let color=["lightgreen","pink","purple","orange","red","yellow","blue"];
let circles=[];
let path=[];

let food={
    x:300,
    y:300
};

/*
let signx,signy;
let xxx=0;
let yyy=0;

let snakeFoodCollided=false;
let last=0;
/*
const d=new Date();
const duration=100000;

let currentTime=d.getSeconds();
let nextTime=d.getSeconds()+duration;
*/

class Circle {
    constructor(color,x,y,signx,signy,p){
        this.color=color;
        this.x=x;
        this.y=y;
        this.sign = {
            x:signx,
            y:signy
        };
        //this.path=[{x:pathx,y:pathy}];
        this.fromPath=p;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,unit/2,0,Math.PI*2,true);
        ctx.fillStyle=this.color;
        ctx.fill();
    }

    update(){
        this.x += this.sign.x*speed;
        this.y += this.sign.y*speed;
    }

    signChanger(){
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
    */
}

circles.push(new Circle("green",unit*2 + unit/2,unit/2,1,0,0));
circles.push(new Circle("lightgreen",unit + unit/2,unit/2,1,0,0));
circles.push(new Circle("lightgreen",unit/2,unit/2,1,0,0));

//path.push({x:half,y:half,direction:right});
//path.push({x:300,y:600});

document.body.addEventListener("keydown",onKeydown);

function onKeydown(event){
    if(event.keyCode==38){
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

function addNewPath(d){
    path.push({x:circles[0].x,y:circles[0].y,direction:d});
}

//if i put requestAnimationFrame at ending of function then cancelAnimation frame doesn't doesn't work
//cancelAnimationFrame does not work like return statement
function gameLoop(){
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

    stop123=requestAnimationFrame(gameLoop);
}


function snakeSnakeCollision(){
    let dx,dy;
    let collided=0;

    //can't start with 1 beacause first is always colliding with second on turning
    for(i=2;i<circles.length;i++){
        dx=circles[0].x-circles[i].x;
        dy=circles[0].y-circles[i].y;

        if(dx*dx + dy*dy < half*half*4){
            collided = 1; //return 1;
            break;
        }
    }
    return collided; //return 0;
}

function snakeBorderCollision(){
    if(circles[0].x<half || circles[0].x>canvas.width-half || circles[0].y<half || circles[0].y>canvas.height-half){
        return 1;
    }
    return 0;
}

function snakeFoodCollision(){
    let dx=circles[0].x-food.x;
    let dy=circles[0].y-food.y;
    let collided = 0;

    if(dx*dx + dy*dy <= half*half*4){
        collided = 1; //return 1;
    }
    return collided; //return 0;
}

function addNewCircle(){
    let currentColor=Math.abs(circles.length/5);
    let sx = circles[circles.length-1].sign.x;
    let sy = circles[circles.length-1].sign.y;
    let x = circles[circles.length-1].x - sx*unit;
    let y = circles[circles.length-1].y - sy*unit;
    let fp = circles[circles.length-1].fromPath;

    /*
    //x
    if(circles[circles.length-1].sign.x == -1){
        x=circles[circles.length-1].x+unit;
    }
    else if(circles[circles.length-1].sign.x == 0){
        x=circles[circles.length-1].x;
    }
    else{
        x=circles[circles.length-1].x-unit;
    }

    //y
    if(circles[circles.length-1].y == -1){
        y=circles[circles.length-1].y+unit;
    }
    else if(circles[circles.length-1].y == 0){
        y=circles[circles.length-1].y;
    }
    else{
        y=circles[circles.length-1].y-unit;
    }
    */

    circles.push(new Circle(color[currentColor],x,y,sx,sy,fp));
}

function relocationOfFood(){
    food.x=randomInt(half,canvas.width-half);
    food.y=randomInt(half,canvas.height-half);
}

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

gameLoop();

/*
borderSnakeCollision(){
    if(circle1.x<=0 || circle1.x>=canvasWidth || circle1.y<=0 || circle1.y>=canvasHeight){
        return true;
    }
    else{
        return false;
    }
}
*/
/*for clearing the whole canvas
if(i>=1000) ctx.clecirclesect(0,0,canvasWidth,canvasHeight);
*/