let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.height=500;
canvas.width=1000;
let keys=[];

let rato={
    x:0,
    y:0
}









window.addEventListener('load',startGame);





function startGame() {
    animated();
}
function animated() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animated);






}
//Eventos do teclado
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    console.log(e.key)
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});





