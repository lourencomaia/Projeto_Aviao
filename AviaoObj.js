class Aviao extends AnimatedSprite {
    constructor(sx, sy, width, height) {
        super(sx, sy, width, height);
        this.speed = 5;
        this.frameCounter = 0;
        this.shootDelay = 30; //1s
        this.balaAviao = [];
        this.vida = 100;
        this.dano = 25;
    }

    update() {
        super.update()

    }

    draw() {

        ctx.drawImage(this.imagem,
            this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width * 1.2, this.height * 1.2);
    }

    atirar() {
        this.balaAviao.push(new Bala(aviaoInimigo.x + aviaoInimigo.width + 1, aviaoInimigo.y + aviaoInimigo.height, 477 / 7, 78 / 2, 10));
        this.balaAviao[this.balaAviao.length - 1].load("./assets/bala1.png", 13, 7, 1)
    }
}