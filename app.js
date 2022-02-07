import {
    Ball
} from './ball.js';
import {
    Block
} from './block.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
        
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        this.block = new Block(700, 30, 300, 450);
        this.ball = new Ball(this.stageWidth, this.stageHeight, 50, 6);
        
        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
/* 공이 브라우저 벽면에 튕기는 애니메이션을 할 경우 canvas.width가 아니라 stageWidth에 튕기도록 해줘야 한다.
canvas.width에 튕기게 하면 공이 밖으로 삐져나가버린다
캔버스의 width와 height를 가각 두 배 해주면 캔버스를 브라우저 창에 다 담지 못하게 된다
스크롤하면 볼 수 있다
따라서 캔버스를 브라우저 내에 담아내도록 해야한다*/
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2); /*하지만 ctx로 그린 공의 크기가 너무 작아졌다. 
        캔버스의 크기가 커진만큼 ctx의 크기도 키워줘야 처음에 의도했던 비율대로 그림이 그려지게 된다*/ 
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight); /*이전 프레임 지우기 */
        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
        
    }
}
window.onload = () => {
    new App();
}
