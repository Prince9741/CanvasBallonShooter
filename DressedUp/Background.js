export class Background{
    constructor(game){
        this.game=game;
        this.image=new Image; this.image.src="./Images/background.png";//planet
        this.x=0;
        this.y=0;
        this.speed=1;
        this.minSpeed=5;
        this.dir=true;
        this.position();
    }
    position(){
        this.width=this.game.width;
        this.height=this.game.height;
    }
    update(){
        if(this.dir){
            this.x+=this.speed;
            if(this.x>this.image.width-this.speed)
                this.x=0
        }
        else{
            this.x-=this.speed;
            if(this.x<-this.image.width-this.speed)
                this.x=0
        }
    }
    draw(ctx){
        let quantity=parseInt((this.width/this.image.width))+1;
        for(let i=-1;i<=quantity;i++)
            ctx.drawImage(this.image,this.x+this.image.width*i,this.y,this.image.width,this.height);
    }
    drawM(ctx){
       
    }
    reverse(){
        this.dir=!this.dir;
    }
}