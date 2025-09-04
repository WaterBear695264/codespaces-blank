class Food{
    constructor(pos, saturation){
        this.pos = pos;
        this.saturation = saturation;
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
}

class Prokaryotic{
    constructor(pos, vel, width, height, fperc, power, health){
        this.pos = pos;
        this.vel = vel;
        this.width = width;
        this.height = height;
        this.fperc = fperc;
        this.power = power;
        this.health = health;
        this.target;
    }

    divide(arr){
        let baseRand = Math.random();
        let power = 
        prok = new Prokaryotic(new Vector(this.pos.x + this.radius*2, this.pos.y), this.vel, )
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
        this.target = arr[i];
    }

    show(){
        fill(150)
        ellipse(this.pos.x, this.pos.y, this.width, this.height);
    }

    detectFood(arr){

    }

    goToFood(){

    }

    move(vel){

    }

}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

let foodArray = [];
let cellArray = [];

function setup(){
    createCanvas(800, 800);
    cell = new Prokaryotic(new Vector(100, 100), new Vector(0, 0), 50, 50, 50, 50, 50);
}

function draw(){
    background(255)
    cell.show();
}
