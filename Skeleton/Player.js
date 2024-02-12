import {Gun} from "./Gun.js";
export class Player{
    constructor(game){
        this.game=game;
        this.x=0;
        this.y=0;
        this.size=40*this.game.size;
        this.shot={x:0,y:0};
        this.gun=new Gun(this);
        this.life=2;
        this.score=0;
        this.rotate=0;
        this.show=true;
        this.position();
    }
    position(){
        this.x=this.game.width/2;
        this.y=this.game.height-this.size*1.5;
    }
    update(){
        this.rotate-=5;
        this.gun.update();
        if(!this.show && this.game.frameCnt%20==0)
            this.show=true;
    }
    draw(ctx){
    }
    drawM(ctx){
        ctx.beginPath();
        ctx.strokeStyle="Green";
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.stroke();
        this.gun.drawM(ctx);
    }
    knock(){
        if(this.life)
            this.life--;
        else
            this.game.gameOver();
    }
}