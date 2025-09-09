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
        return Math.sqrt(((vec.x-this.x)**2) + ((vec.y - this.y)**2))
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
        return new Vector(this.x*m, this.y*m);
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
        if(fperc === 100){

        }
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
        if(this.target === undefined){
            this.target = id;
        }

    }

    show(){
        fill(150)
        ellipse(this.pos.x, this.pos.y, this.width, this.height);
    }

    detectFood(arr){
        // console.log("asdf", arr[this.target].pos, this.pos, arr[this.target].pos.distance(this.pos))
        // console.log("fghj", arr[this.target].pos.distance(this.pos), (this.width/2 + arr[this.target].radius))
        console.log(arr[0] !== undefined)
        if(arr[0] !== undefined){
            if(arr[this.target].pos.distance(this.pos) < (this.width/2 + arr[this.target].radius)){
            this.fperc += arr[this.target].saturation;
            let arr1 = arr.slice(0, this.target);
            let arr2 = arr.slice(this.target+1);
            foodArray = arr1.concat(arr2)
            this.target = undefined;
            console.log(this.target, arr, arr1.concat(arr2))
            }
        }

    }

    move(vec){
        this.pos = this.pos.add(this.vel.add(vec))
    }

    goToFood(arr){
        if(arr[this.target] !== undefined){
            console.log(this.target, arr[this.target])
            let direction = arr[this.target].pos.subtract(this.pos).normalize().scale(this.speed);
            this.move(direction);
        }

    }

    fixStuff(foodArr, CellArr){
        console.log(this.target)
        this.fperc = Math.min(100, this.fperc)
        if(foodArr[this.target] === undefined){
            this.findFood(foodArr)
        }
    }

    update(foodArr, prokaryoticArray){
        // console.log(this.pos)
        this.fixStuff(foodArr, prokaryoticArray);
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
    foodArray = startingFood(10);
    cell = new Prokaryotic(new Vector(100, 100), new Vector(0, 0), 50, 50, 50, 50, 50, 2);
    cell2 = new Prokaryotic(new Vector(400, 400), new Vector(0, 0), 50, 50, 50, 50, 50, 2);
}

function draw(){
    console.log("check", foodArray)
    background(255);
    cell.update(foodArray, cellArray)
    cell2.update(foodArray, cellArray)
    drawFood(foodArray);
}
