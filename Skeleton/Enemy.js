export class Enemy{
    constructor(game){
        this.game=game;
        this.y;
        this.position();
    }
    position(){
    }
    update(){
    }
    draw(ctx){
    }
    drawM(ctx){
    }
    makeEnemy(){
        this.enemyArr.push(new Ballon(this));
    }
}
class Ballon{
    constructor(e){
        this.e=e;
    }
    update(){
    }
    draw(ctx){
        
    }
    drawM(ctx){
    }
}