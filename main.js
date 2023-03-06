const canvas = document.getElementById("canvas");
const test = document.getElementById("test");
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = canvas.height = 320
const CANVAS_WIDTH = canvas.width = 500
let gameFrame = 0


class DinoChar {
    constructor(){
        this.char = new Image()
        this.char.src = "cute_dino.png"
        this.width = 106
        this.height = 107

        this.frame = 0
    }

    draw(){
        ctx.drawImage(this.char, this.width * this.frame,0, this.width, this.height, 0,220, 106, 107)
    }

    update(){
        if (this.frame == 5) this.frame = 0
        else this.frame++
    }
}

class Birdie{
    constructor(){
        this.char = new Image()
        this.char.src = "bird_fly.png"
        this.width = 32
        this.height = 32
        this.speed = Math.random() * 2 - 2.5
        this.frame = 0

        this.angle = Math.random() * 2
        this.angleSpeed = Math.random() * 0.2
        this.flapSpeed = Math.floor(Math.random() * 4 + 3)
        this.x = Math.random() * 400
        this.y = Math.random() * 100
    }

    draw(){
        ctx.drawImage(this.char, this.width * this.frame,0, this.width, this.height, this.x,this.y, 40, 40)
    }

    update(){
        this.x += this.speed
        this.y += Math.sin(this.angle);

        this.angle += this.angleSpeed


        if (this.x <= -90) {
            this.x = CANVAS_WIDTH 
        }


        if (gameFrame % this.flapSpeed == 0) {
            if (this.frame == 5) this.frame = 0
            else this.frame++
        }
    
    }
}

class Doggy{
    constructor(){
        this.char = new Image()
        this.char.src = "dog_walk.png"
        this.width = 48
        this.height = 48

        this.frame = 0
    }

    draw(){
        ctx.drawImage(this.char, this.width * this.frame,0, this.width, this.height, 100,240, 70, 70)
    }

    update(){
        if (this.frame == 5) this.frame = 0
        else this.frame++
    }
}

class Helper{
    constructor(){
        this.char = new Image()
        this.char.src = "doghelper/Idle.png"
        this.width = 48
        this.height = 48
        this.x = 576
        this.frame = 0
    }

    draw(){
        this.x <= -576 ? this.x = 576 : this.x -= 1.2

        ctx.drawImage(this.char, this.width * this.frame,0, this.width, this.height, this.x,180, 70, 70)
    }

    update(){
        if (this.frame == 3) this.frame = 0
        else this.frame++
    }
}

class LayerBackground {
    constructor(ctx,img, modifier){
        this.ctx = ctx
        this.img = new Image()
        this.img.src = img
        this.modifier = modifier
        this.position1 = 0
        this.position2 = 576
    }

    draw(){
        this.ctx.drawImage(this.img, this.position1, 0)
        this.ctx.drawImage(this.img, this.position2, 0)

        if (this.position1  <= -576) this.position1 = 0
        else this.position1 -= this.modifier
    
        if (this.position2  <= 0) this.position2 = 576
        else this.position2 -= this.modifier
    }
}


const dino = new DinoChar()

const doggy = new Doggy()
const helper = new Helper()


const layer1 = new LayerBackground(ctx,"layerBG/1.png", 0.4)
const layer2 = new LayerBackground(ctx,"layerBG/2.png", 0.6)
const layer3 = new LayerBackground(ctx,"layerBG/3.png", 0.8)
const layer4 = new LayerBackground(ctx,"layerBG/4.png", 1)
const layer5 = new LayerBackground(ctx,"layerBG/5.png", 1.2)


const layerObjects = [
    layer1,layer2,layer3,layer4,layer5
]

let birdieObject = []


for (let i = 0; i < 10; i++) {
    birdieObject.push(new Birdie())
}

function animate(){
    
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)


    layerObjects.forEach((obj, i) => i != 4 ? obj.draw() : "lah")
    birdieObject.forEach(obj => {
        obj.draw()
        obj.update()
    })


    layerObjects[4].draw()
    helper.draw()
    dino.draw()
    doggy.draw()
    

    ctx.font = "18px Comic Sans MS";
    ctx.fillStyle = "White";
    ctx.fillText("ZuzuStack", 400, 310);


    if (gameFrame % 5 == 0) {
        helper.update()
        dino.update()
        doggy.update()
    }

    gameFrame++


    requestAnimationFrame(animate)
}

function handleKey() {
    window.onkeydown = (e) => {
        if (e.code == 'Space') {
            dinoY -= 85
        }
    }
}

animate()



