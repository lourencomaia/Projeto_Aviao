

class GameObject extends EventTarget {

    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
        // a redefinir nas classes derivadas
    }

    draw() {
        // a redefinir nas classes derivadas

    }
}

// Um Sprite é um GameObject que tem associado uma imagem
class Sprite extends GameObject {

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.imagem = new Image();
    }

    update() {
        // a redefinir nas classes derivadas
    }

    draw() {
        ctx.drawImage(this.imagem, this.x, this.y, this.width, this.height);
    }
    //carregar a imagem
    load(urlImagem) {
        this.imagem.addEventListener("load", () => {
            window.dispatchEvent(new CustomEvent('spriteLoaded', { detail: this }))
        });

        this.imagem.src = urlImagem;
    }
}

// Um AnimatedSprite é um Sprite com a capacidade de Animação
class AnimatedSprite extends Sprite {

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.imagem = new Image;

        this.animationSpeed;
        this.numberFrames;
        this.numberFramesPerRow;
        this.slice = {};

        this.currentImageFrame = 1;
        this.currentCanvaFrame = 0;

        this.sx = 0;
        this.sy = 0;
    }

    update() {
        this.currentCanvaFrame++;

        if (this.currentCanvaFrame === this.animationSpeed) {
            this.currentImageFrame++;
            if (this.currentImageFrame > this.numberFrames)
                this.currentImageFrame = 1;

            let deltaX = (this.currentImageFrame - 1) % this.numberFramesPerRow;
            let deltaY = Math.floor((this.currentImageFrame - 1) / this.numberFramesPerRow);

            this.sx = deltaX * this.slice.width;
            this.sy = deltaY * this.slice.height;

            this.currentCanvaFrame = 0;
        }
    }

    draw() {
        ctx.drawImage(this.imagem, this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width, this.height);
    }

    load(urlImagem, numberFrames, numberFramesPerRow, animationSpeed) {

        this.imagem.src = urlImagem;
        this.animationSpeed = animationSpeed;
        this.imagem.addEventListener('load', () => {

            this.numberFrames = numberFrames;
            this.numberFramesPerRow = numberFramesPerRow;

            this.slice.width = this.imagem.width / numberFramesPerRow;

            let numberRows = Math.ceil(numberFrames / numberFramesPerRow);
            this.slice.height = this.imagem.height / numberRows;

            window.dispatchEvent(new CustomEvent('assetLoad', { detail: this }));
        });

    }


}





