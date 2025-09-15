class Food{
    constructor(pos, radius, saturation){
        this.pos = pos;
        this.saturation = saturation;
        this.radius = radius;
        this.color = (random(255), random(255), random(255))
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
    }

    divide(arr){
        let baseRand = Math.random();
        if(this.fperc === 100){
            this.fperc = 50;
            let prok = new Prokaryotic(new Vector(this.pos.x + this.radius*2, this.pos.y), this.vel.scale(-1), this.radius, 50, 50, 50, 3, this.color)
            arr.push(prok)
        }

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

    cellCollision(arr){
        for(let i = 0; i < arr.length; i++){
            console.log(arr[i].pos.distance(this.pos), (this.radius + arr[i].radius)/2)
            if(arr[i].pos.distance(this.pos) < (this.radius + arr[i].radius)/2 && arr[i].pos.distance(this.pos) !== 0){
                
            }
        }
    }

    show(img){
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        // beginClip();
        // circle(this.pos.x, this.pos.y, this.width)
        // endClip();
        // image(img, this.pos.x, this.pos.y, this.width, this.width)
    }

    detectFood(arr){
        // console.log("asdf", arr[this.target].pos, this.pos, arr[this.target].pos.distance(this.pos))
        // console.log("fghj", arr[this.target].pos.distance(this.pos), (this.width/2 + arr[this.target].radius))
        // console.log(arr[0] !== undefined)
        if(arr[0] !== undefined){
            if(arr[this.target].pos.distance(this.pos) < (this.radius + arr[this.target].radius)/2){
            this.fperc += arr[this.target].saturation;
            let arr1 = arr.slice(0, this.target);
            let arr2 = arr.slice(this.target+1);
            foodArray = arr1.concat(arr2)
            // console.log(this.target, arr, arr1.concat(arr2))
            }
        }

    }

    move(vec){
        this.vel = vec;
    }

    addVel(vec){
        this.vel.add(vec)
    }


    goToFood(arr){
        let ran = random(0, 300)
        console.log(Math.floor(ran));
        if(arr[this.target] !== undefined && Math.floor(ran) === 55){
            // console.log(this.target, arr[this.target])
            let direction = arr[this.target].pos.subtract(this.pos).normalize().scale(this.speed);
            this.move(direction);
        }

    }

    fixStuff(foodArr, CellArr){
        // console.log(this.target)
        if(this.pos.x > 800){
            this.pos.x = 800
        }else if(this.pos.y > 800){
            this.pos.y = 800
        }else if (this.pos.x < 0){
            this.pos.x = 0
        }else if (this.pos.y < 0){
            this.pos.y = 0
        }
        this.fperc = Math.min(100, this.fperc)
        this.vel = this.vel.scale(0.98)
        if(foodArr[this.target] === undefined){
            this.findFood(foodArr)
        }
    }

    update(foodArr, prokaryoticArray, img){
        // console.log(this.pos)
        this.fixStuff(foodArr, prokaryoticArray);
        this.findFood(foodArr);
        this.goToFood(foodArr);
        this.detectFood(foodArr);
        // this.cellCollision(prokaryoticArray)
        this.divide(prokaryoticArray);
        this.pos = this.pos.add(this.vel)
        this.show(img);
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
    tempArray = [];
    for(let i = 0; i < x; i++){
        tempArray.push(new Prokaryotic(new Vector(random(0, 800), random(0, 800)), new Vector(0, 0), radius, 50, 50, 50, speed, (random(255), random(255), random(255))));
    }
    return tempArray
}

function updateCells(prokArr, fArr, img){
    for(let i = 0; i < prokArr.length; i++){
        prokArr[i].update(fArr, prokArr, img);
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
    foodArray = startingFood(1000);
    cellArray = startingCells(2, 20, 3)
    // cell = new Prokaryotic(new Vector(100, 100), new Vector(0, 0), 50, 50, 50, 50, 50, 2);
    // cell2 = new Prokaryotic(new Vector(400, 400), new Vector(0, 0), 50, 50, 50, 50, 50, 2);
}

function draw(){
    background(255);
    push();
    console.log("check", cellArray)
    // cell.update(foodArray, cellArray, img);
    // cell2.update(foodArray, cellArray, img);
    updateCells(cellArray, foodArray, img);
    drawFood(foodArray);
    pop();
}
