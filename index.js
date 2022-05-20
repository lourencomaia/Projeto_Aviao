let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.height=800;
canvas.width=1700;

let keys=[];
let balaAviao=[];

let rato={
    x:0,
    y:0
}

/*class Aviao extends Sprite{
    constructor(sx, sy, width, height) {
        super(sx, sy, width, height);
    }
}*/

class Aviao extends AnimatedSprite{
    constructor(sx, sy, width, height) {
        super(sx, sy, width, height);
        this.speed=5;
        this.frameCounter = 0;
        this.shootDelay = 120; //2s
    }

    update(){
        super.update()

        if (keys['ArrowUp']) {
            this.y -= this.speed;
        }

        if (keys['ArrowDown']) {
            this.y += this.speed;
        }
        if (this.frameCounter < this.shootDelay) {
            this.frameCounter++;
        }
        if (keys[' '] && this.frameCounter === this.shootDelay) {
            this.atirar();
            this.frameCounter =0;

        }

    }
    draw() {
        ctx.drawImage(this.imagem, this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width*1.2, this.height*1.2);
    }

    atirar() {
       balaAviao.push(new Bala(aviao1.x+aviao1.width/2,aviao1.y+aviao1.height,477/7,78/2));
       balaAviao[balaAviao.length-1].load("/assets/bala.png",13,7,1)
    }
}

class Bala extends AnimatedSprite{
    constructor(sx, sy, width, height) {
        super(sx, sy, width, height);
        this.speed=5;
    }
    update() {
        super.update();

        this.x-=10;
    }
    draw() {
        ctx.drawImage(this.imagem, this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width*0.25, this.height*0.25);
    }

}



window.addEventListener('load',startGame);


//let aviao = new Aviao(200,400,454,44);
//aviao.load("aviao.png");
let fundo= new Sprite(0,0,1708,853);
fundo.load("/assets/fundo.png");

let aviao1 = new Aviao(1200,200,410/5,44);
aviao1.load("/assets/aviao.png",5,5,10);



//console.log(aviao1);




function startGame() {
    animated();
}
function animated() {

    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animated);
    fundo.draw();

    aviao1.update()
    aviao1.draw();
    console.log(aviao1)

    //desenhar as balas
    for(let bala of balaAviao){
        bala.update();
        bala.draw();
    }
}
//Eventos do teclado
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    console.log(e.key)
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});





