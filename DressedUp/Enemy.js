export class Enemy{
    constructor(game){
        this.game=game;
        this.size=[40,20];//40-60
        this.speed=[1,5];//1-6
        this.density=180;
        this.enemyArr=[];
        this.x;
        this.y;
        this.img=new Image();
        this.img.src="Images/Enemy.png";
        this.position();
    }
    position(){
        this.y=this.game.height;
    }
    update(){
        if(this.game.frameCnt%parseInt(this.density/this.game.dL)==0)
            this.makeEnemy();
        for(let a of this.enemyArr)
            a.update();
        this.enemyArr=this.enemyArr.filter((a)=>a.life);
    }
    draw(ctx){
        for(let a of this.enemyArr)
            a.draw(ctx);
    }
    drawM(ctx){
        for(let a of this.enemyArr)
            a.drawM(ctx);
    }
    killAll(){
        for(let e of this.enemyArr)
            e.explode();
    }
    makeEnemy(){
        this.enemyArr.push(new Ballon(this));
    }
}
class Ballon{
    constructor(e){
        this.e=e;
        this.size=Math.random()*e.size[1]+e.size[0];
        this.speed=Math.random()*e.speed[1]+e.speed[0];
        this.x=(this.e.game.width-this.size*6)*Math.random()+this.size*3;
        this.y=e.y+this.size;
        this.life=true;
        this.explosion=false;
        this.fp={
            x:0,
            y:parseInt(Math.random()*4),
            maxX:6,
            maxY:4,
            sizeX:100,
            sizeY:100
        };
        this.popSound=document.createElement('audio');
        this.popSound.src = 'Images/pop.mp3';
        this.shake=parseInt(Math.random()*3+1);
        this.color=["Blue","Green","Red","Yellow"];
    }
    update(){
        this.y-=this.speed;
        if(this.explosion){
            if(this.e.game.frameCnt%5==0)
                this.fp.x++;
            if(this.fp.x==this.fp.maxX)
                this.#die();
        }
        else{
            this.x+=this.shake*Math.sin(this.y*Math.PI/180);
            if(this.y<-this.size){
                this.#die();
                this.e.game.entities.player && this.e.game.entities.player.knock();
            }
        }
    }
    draw(ctx){
        ctx.drawImage(this.e.img,this.fp.x*this.fp.sizeX,this.fp.y*this.fp.sizeY,this.fp.sizeX,this.fp.sizeY,this.x-this.size*1.5,this.y-this.size*1.5,this.size*3,this.size*3);
    }
    drawM(ctx){
        if(this.explosion){
            ctx.beginPath();
            ctx.strokeStyle=this.color[this.fp.y];
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.stroke();
        }
        else{
            ctx.beginPath();
            ctx.fillStyle=this.color[this.fp.y];
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.fill();
        }
    }
    explode(){
        this.e.game.sound && this.popSound.play();
        this.explosion=true;
    }
    #die(){
        this.life=false;
    }
}