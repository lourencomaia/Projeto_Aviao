let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.height=800;
canvas.width=1700;

vida1=document.getElementById("aviao1");
vida2=document.getElementById("aviao2");


let keys=[];


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
        this.shootDelay = 60; //2s
        this.balaAviao=[];
        this.vida=100;
    }
    update(){
        super.update()

        if (keys['w']) {
            this.y -= this.speed;
        }

        if (keys['s']) {
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
       this.balaAviao.push(new Bala(aviao1.x+aviao1.width/2,aviao1.y+aviao1.height,477/7,78/2,-10));
       this.balaAviao[this.balaAviao.length-1].load("/assets/bala.png",13,7,1)
    }
}

class AviaoInimigo extends AnimatedSprite{
    constructor(sx, sy, width, height) {
        super(sx, sy, width, height);
        this.speed=5;
        this.frameCounter = 0;
        this.shootDelay = 60; //2s
        this.balaAviao=[];
        this.vida=100;
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
        if (keys['q'] && this.frameCounter === this.shootDelay) {
            this.atirar();
            this.frameCounter =0;
        }

    }
    draw() {
        ctx.drawImage(this.imagem, this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width*1.2, this.height*1.2);
    }

    atirar() {
        this.balaAviao.push(new Bala(aviaoInimigo.x+aviaoInimigo.width/2,aviaoInimigo.y+aviaoInimigo.height,477/7,78/2,10));
        this.balaAviao[this.balaAviao.length-1].load("/assets/bala.png",13,7,1)
    }
}

class Bala extends AnimatedSprite{
    constructor(sx, sy, width, height,speed) {
        super(sx, sy, width, height);
        this.speed=speed;
    }
    update() {
        super.update();
        this.x+=this.speed;

        collision(this,aviao1)
        collision(this,aviaoInimigo)
    }
    draw() {
        ctx.drawImage(this.imagem, this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width*0.25, this.height*0.25);
    }

}

function collision(bala, aviao) {
    if (bala.x < aviao.x + aviao.width &&
        bala.x + bala.width > aviao.x &&
        bala.y < aviao.y + aviao.height &&
        bala.y + bala.height > aviao.y) {
       console.log("acertou aviao");
       aviao.vida--;
    }

}



window.addEventListener('load',startGame);


//let aviao = new Aviao(200,400,454,44);
//aviao.load("aviao.png");
let fundo= new Sprite(0,0,1708,853);
fundo.load("/assets/fundo.png");

let aviao1 = new AviaoInimigo(1200,200,410/5,44);
aviao1.load("/assets/aviao.png",5,5,10);

let aviaoInimigo = new Aviao(200,200,410/5,44);
aviaoInimigo.load("/assets/aviao1.png",5,5,10);

function startGame() {
    animated();
}
function animated() {

    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animated);
    fundo.draw();

    aviao1.update()
    aviao1.draw();

    aviaoInimigo.update();
    aviaoInimigo.draw();


    //desenhar as balas
    for(let bala of aviao1.balaAviao){
        bala.update();
        bala.draw();
    }
    for(let bala of aviaoInimigo.balaAviao){
        bala.update();
        bala.draw();
    }

    vida1.innerHTML= "Aviao 1: "+ aviaoInimigo.vida;
    vida2.innerHTML= "Aviao 2: "+ aviao1.vida;


}
//Eventos do teclado
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;

});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});





