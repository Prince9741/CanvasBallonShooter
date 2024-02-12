export class Gun{
    constructor(player){
        this.player=player;
        this.speed=30;
        this.x=0;
        this.y=0;
        this.bulletArr=[];
        this.shooting=false;
    }
    update(){
        for(let a of this.bulletArr)
            a.update();
        let angle=Math.atan2(this.player.x-this.player.game.control.mouse.x,this.player.y-this.player.game.control.mouse.y);
        this.x=this.player.x-this.speed*Math.sin(angle);
        this.y=this.player.y-this.speed*Math.sin((Math.PI/2)-angle);
        this.bulletArr=this.bulletArr.filter((a)=>a.life);
    }
    draw(ctx){ 
        for(let a of this.bulletArr)
            a.draw(ctx);
    }
    drawM(ctx){
        ctx.beginPath();
        ctx.strokeStyle="blue";
        ctx.arc(this.x,this.y,this.player.size,0,Math.PI*2);
        ctx.stroke();
        for(let a of this.bulletArr)
            a.drawM(ctx);
    }
    shoot(){
        this.bulletArr.push(new Bullet(this));
    }
}
class Bullet{
    constructor(gun){
        this.gun=gun;
        this.size=this.gun.player.size;
        this.x=this.gun.x;
        this.y=this.gun.y;
        this.endX=this.gun.player.x;
        this.endY=this.gun.player.y;
        this.disX=this.x-this.endX;
        this.disY=this.y-this.endY;
        this.life=true;
    }
    update(){
        this.x+=this.disX;
        this.y+=this.disY;
        if(this.x<-this.size || this.x>this.gun.player.game.width+this.size ||
            this.y<-this.size || this.y>this.gun.player.game.height+this.size)
            this.life=false;
        this.collision();
    }
    draw(ctx){
    }
    drawM(ctx){
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
    collision(){
        if(this.gun.player.game.entities.enemies)
            for(let e of this.gun.player.game.entities.enemies.enemyArr)
                if(!e.explosion){
                    let dX=this.x-e.x;
                    let dY=this.y-e.y;
                    if(Math.sqrt(dX*dX+dY*dY)<this.size+e.size){
                        e.explode();
                        this.score++;
                    }
                }
    }
}