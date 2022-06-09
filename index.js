    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.height=740;
    canvas.width=1600;

    window.addEventListener('load',startGame,false);

    let continueAnimating = true;

    let btnStop = document.getElementById("stop");
    btnStop.addEventListener("click", function () {
        continueAnimating = !continueAnimating;
    })

    vida1 = document.getElementById("aviao1");
    vida2 = document.getElementById("aviao2");

    let keys = [];
    let explosaoAviao = [];


    let rato = {
        x: 0,
        y: 0
    }
    //Class do aviao da Direita
    class Aviao extends AnimatedSprite {
        constructor(sx, sy, width, height) {
            super(sx, sy, width, height);
            this.speed = 5;
            this.frameCounter = 0;
            this.shootDelay = 60; //2s
            this.balaAviao = [];
            this.vida = 100;
            this.dano = 25;
        }

        update() {
            super.update()

            if (keys['w']) {
                if (this.y > 0 && this.y <= 650)
                    this.y -= this.speed;
            }

            if (keys['s']) {
                if (this.y >= 0 && this.y < 650)
                    this.y += this.speed;
            }
            if (this.frameCounter < this.shootDelay) {
                this.frameCounter++;
            }
            if (keys[' '] && this.frameCounter === this.shootDelay) {
                this.atirar();
                this.frameCounter = 0;
            }

        }

        draw() {
            ctx.drawImage(this.imagem, this.sx, this.sy, this.slice.width, this.slice.height,
                this.x, this.y, this.width * 1.2, this.height * 1.2);
        }

        atirar() {
            this.balaAviao.push(new Bala(aviao1.x, aviao1.y + aviaoInimigo.height , 477 / 7, 78 / 2, -10));
            this.balaAviao[this.balaAviao.length - 1].load("./assets/bala.png", 13, 7, 1)
        }
    }
    //Class do aviao da Esquerda
    class AviaoInimigo extends AnimatedSprite {
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

            if (keys['ArrowUp']) {
                if (this.y > 0 && this.y <= 650)
                    this.y -= this.speed;
            }

            if (keys['ArrowDown']) {
                if (this.y >= 0 && this.y < 650)
                    this.y += this.speed;
            }
            if (this.frameCounter < this.shootDelay) {
                this.frameCounter++;
            }
            if (keys['q'] && this.frameCounter === this.shootDelay) {
                this.atirar();
                this.frameCounter = 0;
            }

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

    class Bala extends AnimatedSprite {
        constructor(sx, sy, width, height, speed) {
            super(sx, sy, width, height);
            this.speed = speed;
        }

        update() {
            super.update();
            this.x += this.speed;

            /*if (collision(this, aviaoInimigo)) {
                console.log("acertou")
                this.explode(aviaoInimigo)
                this.eleminaBala(aviaoInimigo)

            }
            if (collision(this, aviao1)) {
                console.log("acertou")
                this.explode(aviao1)
                this.eleminaBala(aviao1)

            }*/
        }
        draw() {
            ctx.drawImage(this.imagem, this.sx, this.sy, this.slice.width, this.slice.height,
                this.x, this.y, this.width * 0.3, this.height * 0.3);
        }

    }

    function explode(aviao) {
        explosaoAviao.push(new Explosao(aviao.x - 50, aviao.y - 50))
        explosaoAviao[explosaoAviao.length - 1].load("./assets/explosao.png")
    }
    function eleminaBala(aviao,bala) {
        for (let i = 0; i < aviao.balaAviao.length; i++) {
            if (aviao.balaAviao[i] === bala) {
                aviao.balaAviao.splice(i, 1);
            }
        }
    }

    function collision(bala, aviao) {

        if (bala.x+bala.width > aviao.x &&
            bala.x < aviao.x + aviao.width&&
            bala.y + bala.height > aviao.y &&
            bala.y < aviao.y+aviao.height) {
            //console.log("acertou aviao");
            aviao.vida -= aviao.dano;

            return true
        } else {
            return false
        }

    }

    class Explosao extends Sprite {

        constructor(x, y,) {
            super(x, y, 140, 147);
            setTimeout(() => {
                this.clear();
            }, 3 * 60);
        }

        clear() {
            for (let i = 0; i < explosaoAviao.length; i++) {
                if (explosaoAviao[i] === this) {
                    explosaoAviao.splice(i, 1);
                }
            }
        }
    }
    // aviao animado que passa no fundo
    class AviaoFundo extends Sprite {
        constructor(sx, sy, width, height) {
            super(sx, sy, width, height);
        }

        update() {
            super.update()
            this.x -= 5;

            if (this.x === -200) {
                this.x = canvas.width + 200
                this.sx = (Math.random() * 200) + 200;

            }
        }
    }

    class Tank extends AnimatedSprite{
        constructor(x, y, width, height) {
            super(x, y, width, height);
            this.balas=[];
            setInterval(dipararBala,
                10000);
        }

        draw() {
            ctx.drawImage(this.imagem,
                this.sx, this.sy, this.slice.width, this.slice.height,
                this.x, this.y, this.width , this.height);
        }

    }

    //class do projetil do robo
    class BalaTank extends AnimatedSprite{
        constructor(x,y,width,height,velocityX,velocityY) {
            super(x,y,width,height);

            this.position = {
                x: x,
                y: y
            }

            this.velocity={
                x:velocityX,
                y:velocityY
            }
        }

        draw() {
            ctx.drawImage(this.imagem,
                this.sx, this.sy, this.slice.width, this.slice.height,
                this.x, this.y, this.width , this.height);
        }
        update() {
            super.update();
            this.x += this.velocity.x * 10
            this.y += this.velocity.y * 10
        }
    }

    // metodo para disparar um projetil na direçao de um alvo
    function dipararBala() {
        console.log("teste1")
        const angle = Math.atan2(aviaoInimigo.y - tankDir.y, aviaoInimigo.x - tankDir.x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        // cria um novo objeto Projectile
        tankDir.balas.push(new BalaTank(tankDir.x, tankDir.y,464/20,30, velocity.x, velocity.y))
        tankDir.balas[tankDir.balas.length-1].load("./assets/tank_bala.png",20,20,10)





    }

    function dipararBala1() {
        console.log("teste2")


    }

//============================================================================================================================

    let fundo = new Sprite(0, 0, 1708, 853);
    fundo.load("./assets/fundo.png");

    let aviaoFundo = new AviaoFundo(canvas.width + 200, 100, 87, 42);
    aviaoFundo.load("./assets/aviaoPaisagem.png")

    let aviao1 = new AviaoInimigo(1200, 200, 410 / 5, 44);
    aviao1.load("./assets/aviao.png", 5, 5, 10);

    let aviaoInimigo = new Aviao(200, 200, 410 / 5, 44);
    aviaoInimigo.load("./assets/aviao1.png", 5, 5, 10);

    let tankDir = new Tank(1300, 675, 450/5, 66)
    tankDir.load("./assets/tank.png",5,5,10);

    let tankEsq = new Tank(200, 675, 450/5, 66)
    tankEsq.load("./assets/tankEsq.png",5,5,10);

    function startGame() {
        animated();
    }
    function animated() {

        if (continueAnimating)
            requestAnimationFrame(animated);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fundo.draw();

        aviao1.update()
        if (aviao1.vida > 0) {
            aviao1.draw();
            paraJogo()
        }

        aviaoInimigo.update();
        if (aviaoInimigo.vida > 0) {
            aviaoInimigo.draw();
           paraJogo()
        }

        tankDir.update();
        tankDir.draw();

        tankEsq.update();
        tankEsq.draw();

        aviaoFundo.update();
        aviaoFundo.draw();

        // desenhar explosao do aviao
        for (let explosao of explosaoAviao) {
            explosao.update();
            explosao.draw();
        }
        //desenhar as balas
        for (let bala of aviao1.balaAviao) {
            if ( collision(bala, aviao1)){
                explode(aviao1)
                eleminaBala(aviao1,bala)

            }
            bala.update();
            bala.draw();
        }
        for (let bala of aviaoInimigo.balaAviao) {
            if ( collision(bala, aviaoInimigo)){
                explode(aviaoInimigo)
                eleminaBala(aviaoInimigo,bala)

            }
            bala.update();
            bala.draw();
        }

        // desenhar balas tank
        for(let bala of tankDir.balas){
            bala.update()
            bala.draw()
        }

        vida1.innerHTML = "Aviao 1: " + aviaoInimigo.vida;
        vida2.innerHTML = "Aviao 2: " + aviao1.vida;

        updateVida();


    }

    //Eventos do teclado
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;

    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    function paraJogo() {
        setTimeout(function () {
            continueAnimating = !continueAnimating;
        }, 1000)
    }

    function updateVida() {
        var element = document.getElementById("myprogressBar");
        var element1= document.getElementById("myprogressBar1");


        element.style.width = aviao1.vida + '%';
        element1.style.width = aviaoInimigo.vida + '%';

    }





