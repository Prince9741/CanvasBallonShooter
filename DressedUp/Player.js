import {Gun} from "./Gun.js";
export class Player{
    constructor(game){
        this.game=game;
        this.x=0;
        this.y=0;
        this.size=0;
        this.position();
        this.shot={x:0,y:0};
        this.gun=new Gun(this);
        this.life=2;
        this.score=0;
        this.rotate=0;
        this.show=true;
        this.img=new Image();
        this.img.src="Images/star.png";
    }
    position(){
        this.size=40*this.game.size;
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
        this.gun.draw(ctx);
        if(this.show){
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.rotate*Math.PI/180);
            ctx.drawImage(this.img,-this.size,-this.size,this.size*2,this.size*2);
            ctx.restore();
        }   
    }
    drawM(ctx){
        ctx.beginPath();
        ctx.strokeStyle="Green";
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.stroke();
        this.gun.drawM(ctx);
    }
    knock(){
        this.show=false;
        this.game.levelDown();
        if(this.life)
            this.life--;
        else
            this.game.gameOver();
    }
}