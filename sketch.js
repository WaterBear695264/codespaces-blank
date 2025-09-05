class Food{
    constructor(pos, radius, saturation){
        this.pos = pos;
        this.saturation = saturation;
        this.radius = radius;
        this.color = (random(0, 255), random(0, 255), random(0, 255))
    }

    show(){
        fill(this.color)
        circle(this.pos.x, this.pos.y, this.radius);
    }
}

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    distance(vec){
        return Math.sqrt((vec.x-this.x)^2 + (vec.y - this.y)^2)
    }

    add(vec){
        return new Vector(this.x + vec.x, this.y + vec.y)
    }

    subtract(vec){
        return new Vector(this.x - vec.x, this.y - vec.y)
    }

    normalize(){
        let magnitude = Math.hypot(this.x, this.y);
        return new Vector(this.x/magnitude, this.y/magnitude);
    }

    scale(m){
        return new Vector(this.x*m, this.y/m);
    }
}

class Prokaryotic{
    constructor(pos, vel, width, height, fperc, power, health, speed){
        this.pos = pos;
        this.vel = vel;
        this.width = width;
        this.height = height;
        this.fperc = fperc;
        this.power = power;
        this.health = health;
        this.speed = speed;
        this.target;
    }

    divide(arr){
        let baseRand = Math.random();
        let prok = new Prokaryotic(new Vector(this.pos.x + this.radius*2, this.pos.y), this.vel.scale(-1), this.width, this.height, 50, 50, 50, 50)
        arr.push(prok)
    }

    findFood(arr){
        let temp = Infinity;
        let id = 0;
        for(let i = 0; i < arr.length; i++){
            if(arr[i].pos.distance(this.pos) < temp){
                temp = arr[i].pos.distance(this.pos)
                id = i;
            }
        }
        this.target = id;
    }

    show(){
        fill(150)
        ellipse(this.pos.x, this.pos.y, this.width, this.height);
    }

    detectFood(arr){
        if(arr[this.target].pos.distance(this.pos) < (this.radius + arr[this.target].radius)){
            this.fperc += arr[i].saturation;
            arr = arr.slice(0, i) + arr.slice(i+1);
        }
    }

    move(vec){
        this.pos = this.pos.add(this.vel.add(vec))
    }

    goToFood(arr){
        console.log("wheeee", arr[this.target].pos.subtract(this.pos))
        let direction = arr[this.target].pos.subtract(this.pos).normalize().scale(this.speed);
        this.move(direction);
    }

    update(foodArr, prokaryoticArray){
        this.findFood(foodArr);
        this.goToFood(foodArr);
        this.detectFood(foodArr);
        this.show();
    }

}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

let foodArray = [];
let cellArray = [];

function startingFood(x){
    tempArray = [];
    for(let i = 0; i < x; i++){
        tempArray.push(new Food(new Vector(random(0, 800), random(0, 800)), 10, 30))
    }
    return tempArray
}

function drawFood(arr){
    for(let i = 0; i < arr.length; i++){
        foodArray[i].show();
    }
}

function setup(){
    createCanvas(800, 800);
    foodArray = startingFood(10)
    v = new Vector(3, 4);
    cell = new Prokaryotic(new Vector(100, 100), new Vector(0, 0), 50, 50, 50, 50, 50);
}

function draw(){
    background(255);
    cell.update(foodArray, cellArray)
    console.log()
    drawFood(foodArray);
}
