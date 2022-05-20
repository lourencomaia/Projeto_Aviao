let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.height=500;
canvas.width=1000;
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
    }
}



window.addEventListener('load',startGame);


//let aviao = new Aviao(200,400,454,44);
//aviao.load("aviao.png");

let aviao1 = new Aviao(200,200,442/5,44);
aviao1.load("pngegg.png",5,5,10);



console.log(aviao1);




function startGame() {
    animated();
}
function animated() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animated);

    //aviao.update()
    //aviao.draw();

    aviao1.update()
    aviao1.draw();
    console.log(aviao1)
}
//Eventos do teclado
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    console.log(e.key)
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});





