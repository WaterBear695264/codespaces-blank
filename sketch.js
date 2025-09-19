class Food{
    constructor(pos, radius, saturation){
        this.pos = pos;
        this.saturation = saturation;
        this.radius = radius;
        this.color = color(random(255), random(255), random(255))
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

class Organism{
    constructor(pos, vel, radius, fperc, power, health, speed, color){
        this.pos = pos;
        this.vel = vel;
        this.radius = radius
        this.fperc = fperc;
        this.power = power;
        this.health = health;
        this.speed = speed;
        this.target;
        this.color = color;
        this.alive = true;
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
    
    show(img){
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        // beginClip();
        // circle(this.pos.x, this.pos.y, this.width)
        // endClip();
        // image(img, this.pos.x, this.pos.y, this.width, this.width)
    }

    move(vec){
        this.vel = vec;
    }

    addVel(vec){
        this.vel = this.vel.add(vec)
    }


    goToFood(arr){
        let ran = random(0, 200)
        if(arr[this.target] !== undefined && Math.floor(ran) === 55){
            // console.log(this.target, arr[this.target])
            let direction = arr[this.target].pos.subtract(this.pos).normalize().scale(this.speed);
            this.move(direction);
        }

    }

    dead(cellArr){
        if(this.fperc <= 0 || this.health <= 0){
            this.color = color(0, 0, 0)
            this.speed = 0;
            this.alive = false;
        }
    }

}

class Prokaryotic extends Organism{
    constructor(pos, vel, radius, fperc, power, health, speed, color){
        super(pos, vel, radius, fperc, power, health, speed, color);
    }

    divide(arr){
        if(this.fperc === 100){
            this.fperc = 50;
            let rand= random(-10, 10)
            console.log("yah", rand)
            let rad = Math.max(1, this.radius + (rand/5))
            let zoom = this.speed - rand/10
            let pow = this.power+rand


            let prok = new Prokaryotic(new Vector(this.pos.x + this.radius, this.pos.y), this.vel.scale(-1), rad, 50, pow, 50, zoom, this.color)
            arr.push(prok)
        }

    }


    detectFood(arr){
        // console.log("asdf", arr[this.target].pos, this.pos, arr[this.target].pos.distance(this.pos))
        // console.log("fghj", arr[this.target].pos.distance(this.pos), (this.width/2 + arr[this.target].radius))
        // console.log(arr[0] !== undefined)
        if(arr[0] !== undefined){
            if(arr[this.target].pos.distance(this.pos) < (this.radius + arr[this.target].radius)/2){
            this.fperc += arr[this.target].saturation;
            let foodRemoved = foodArray.splice(this.target, 1)
            // console.log(this.target, arr, arr1.concat(arr2))
            }
        }

    }
    
    fixStuff(foodArr, CellArr){
        // console.log(this.target)
        this.pos.x = clamp(this.pos.x, 0, 800);
        this.pos.y = clamp(this.pos.y, 0, 800);
        this.fperc = Math.min(100, this.fperc)
        this.vel = this.vel.scale(0.98)
        if(foodArr[this.target] === undefined){
            this.findFood(foodArr)
        }
    }

    update(foodArr, prokaryoticArray, img){
        // console.log(this.pos)
        this.fperc-=0.01
        this.fixStuff(foodArr, prokaryoticArray);
        this.findFood(foodArr);
        this.goToFood(foodArr);
        this.detectFood(foodArr);
        // this.cellCollision(prokaryoticArray)
        this.divide(prokaryoticArray);
        this.pos = this.pos.add(this.vel)
        this.dead(prokaryoticArray);
        this.show(img);
    }

}

class ProkHunter extends Organism{
    constructor(pos, vel, radius, fperc, power, health, speed, color){
        super(pos, vel, radius, fperc, power, health, speed, color)
    }

    detectFood(arr){
        // console.log("asdf", arr[this.target].pos, this.pos, arr[this.target].pos.distance(this.pos))
        // console.log("fghj", arr[this.target].pos.distance(this.pos), (this.width/2 + arr[this.target].radius))
        // console.log(arr[0] !== undefined)
        if(arr[0] !== undefined){
            if(arr[this.target].pos.distance(this.pos) < (this.radius + arr[this.target].radius)/2 && this.power>arr[this.target].power){
            this.fperc += arr[this.target].fperc/5;
            // let arr1 = arr.slice(0, this.target);
            // let arr2 = arr.slice(this.target+1);
            let removedHunters = cellArray.splice(this.target, 1);
            // cellArray = arr.splice(this.target, 1);
            // console.log(this.target, arr, arr1.concat(arr2))
            }
        }

    }

    fixStuff(foodArr, CellArr){
        // console.log(this.target)
        this.pos.x = clamp(this.pos.x, 0, 800);
        this.pos.y = clamp(this.pos.y, 0, 800);
        this.fperc = Math.min(100, this.fperc)
        this.vel = this.vel.scale(0.98)
        if(foodArr[this.target] === undefined){
            this.findFood(foodArr)
        }
    }

    divide(arr){
        if(this.fperc === 100){
            this.fperc = 50;
            let rand= random(-10, 10)
            console.log("yah", rand)
            let rad = Math.max(1, this.radius + (rand/5))
            let zoom = this.speed - rand/10
            let pow = this.power+rand


            let prok = new ProkHunter(new Vector(this.pos.x + this.radius, this.pos.y), this.vel.scale(-1), rad, 50, pow, 50, zoom, this.color)
            arr.push(prok)
        }

    }

    update(foodArr, hunterArray, img){
        // console.log(this.pos)

        this.fperc-=0.02
        if(this.alive){
            this.health += 0.01
        }

        this.fixStuff(foodArr, hunterArray);
        this.findFood(foodArr);
        this.goToFood(foodArr);
        this.detectFood(foodArr);
        // this.cellCollision(prokaryoticArray)
        this.divide(hunterArray);
        this.pos = this.pos.add(this.vel)
        this.dead(hunterArray);
        this.show(img);
    }

}

class Terminator extends Organism{
    constructor(pos, vel, radius, fperc, power, health, speed, color){
        super(pos, vel, radius, fperc, power, health, speed, color);
    }

    detectFood(arr){
        // console.log("asdf", arr[this.target].pos, this.pos, arr[this.target].pos.distance(this.pos))
        // console.log("fghj", arr[this.target].pos.distance(this.pos), (this.width/2 + arr[this.target].radius))
        // console.log(arr[0] !== undefined)
        if(arr[0] !== undefined){
            if(arr[this.target].pos.distance(this.pos) < (this.radius + arr[this.target].radius)/2 && this.power>arr[this.target].power){
            console.log("myyyyy hearts a sterio")
            this.fperc += arr[this.target].fperc/5;
            this.health -= arr[this.target].power/10
            // let arr1 = arr.slice(0, this.target);
            // let arr2 = arr.slice(this.target+1);
            let ProkHunterRemoved = prokHunterArray.splice(this.target, 1);
            // cellArray = arr.splice(this.target, 1);
            // console.log(this.target, arr, arr1.concat(arr2))
            }
        }

    }

    fixStuff(foodArr, CellArr){
        // console.log(this.target)
        this.pos.x = clamp(this.pos.x, 0, 800);
        this.pos.y = clamp(this.pos.y, 0, 800);
        this.fperc = Math.min(100, this.fperc)
        this.vel = this.vel.scale(0.98)
        if(foodArr[this.target] === undefined){
            this.findFood(foodArr)
        }
    }

    divide(arr){
        if(this.fperc === 100){
            this.fperc = 50;
            let rand= random(-10, 10)
            console.log("yah", rand)
            let rad = Math.max(1, this.radius + (rand/5))
            let zoom = this.speed - rand/10
            let pow = this.power+rand


            let prok = new Terminator(new Vector(this.pos.x + this.radius, this.pos.y), this.vel.scale(-1), rad, 50, pow, 50, zoom, this.color)
            arr.push(prok)
        }

    }

    update(foodArr, hunterArray, img){
        // console.log(this.pos)

        this.fperc-=0.005
        this.fixStuff(foodArr, hunterArray);
        this.findFood(foodArr);
        this.goToFood(foodArr);
        this.detectFood(foodArr);
        // this.cellCollision(prokaryoticArray)
        this.divide(hunterArray);
        this.pos = this.pos.add(this.vel)
        this.dead(hunterArray);
        this.show(img);
    }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};


let foodArray = [];
let cellArray = [];
let prokHunterArray = [];
let terminatorArray = [];

function startingFood(x){
    let tempArray = [];
    for(let i = 0; i < x; i++){
        tempArray.push(new Food(new Vector(random(0, 800), random(0, 800)), 10, 3))
    }
    return tempArray
}

function drawFood(arr){
    for(let i = 0; i < arr.length; i++){
        arr[i].show();
    }
}

function startingCells(x, radius, speed){
    let tempArray = [];
    for(let i = 0; i < x; i++){
        tempArray.push(new Prokaryotic(new Vector(random(0, 800), random(0, 800)), new Vector(0, 0), radius, 50, 50, 50, speed, color(103, 65, 8)));
    }
    return tempArray
}

function startingPreds(x, radius, speed){
    let tempArray = [];
    for(let i = 0; i < x; i++){
        tempArray.push(new ProkHunter(new Vector(random(0, 800), random(0, 800)), new Vector(0, 0), radius, 50, 100, 50, speed, color(57, 255, 20)));
    }
    return tempArray
}

function startingTerms(x, radius, speed){
    let tempArray = [];
    for(let i = 0; i < x; i++){
        tempArray.push(new Terminator(new Vector(random(0, 800), random(0, 800)), new Vector(0, 0), radius, 50, 200, 50, speed, color(136, 8, 8)));
    }
    return tempArray
}


function updateCells(prokArr, fArr, img){
    for(let i = 0; i < prokArr.length; i++){
        prokArr[i].update(fArr, prokArr, img);
    }
}

function addFood(fArr, x, amount){
    
    if(Math.floor(random(x)) === x/2){
        console.log("yoyoyo waht time is it")
        for(let i = 0; i < amount; i++){
            fArr.push(new Food(new Vector(random(0, 800), random(0, 800)), 10, 3))
        }
    }
}

let img;
// Load the image.
function preload() {
  img = loadImage('asdf.jpeg');

}

function setup(){
    createCanvas(800, 800);
    imageMode(CENTER);
    // foodArray = startingFood(1000);
    cellArray = startingCells(10, 20, 5)
    prokHunterArray = startingPreds(2, 50, 2)
    terminatorArray = startingTerms(1, 70, 0.3)
    // cell = new Prokaryotic(new Vector(100, 100), new Vector(0, 0), 50, 50, 50, 50, 50, 2);
    // cell2 = new Prokaryotic(new Vector(400, 400), new Vector(0, 0), 50, 50, 50, 50, 50, 2);
}

function draw(){
    background(255);
    push();
    console.log("check", prokHunterArray)
    // cell.update(foodArray, cellArray, img);
    // cell2.update(foodArray, cellArray, img);
    addFood(foodArray, 10, 3);
    console.log(foodArray)
    updateCells(cellArray, foodArray, img);
    drawFood(foodArray);
    updateCells(prokHunterArray, cellArray, img);
    updateCells(terminatorArray, prokHunterArray, img);
    pop();
}
