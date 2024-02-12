export class Text {
    constructor(game) {
        this.game=game;
        this.center=false;
        this.position();
    }
    position() {
        this.size=this.game.width/25;
    }
    update() {

    }
    draw(ctx) {
        this.drawM(ctx);
    }
    drawM(ctx) {
        this.game.entities.player && this.rightTopText(ctx,15,0,"Score: "+this.game.entities.player.score,this.size);
        this.game.entities.player && this.leftTopText(ctx,15,0,"Life: "+this.game.entities.player.life,this.size);
        if(!this.game.play){
            this.centerText(ctx,0,-this.size,"Game Over",this.size);
            this.centerText(ctx,0,0,"Press 'Enter' to New-Game",this.size);
        }
        else if(!this.game.updation){
            this.centerText(ctx,0,0,"Pause",this.size);
        }
    }
    centerText(ctx, X, Y, text, fontSize, color = "black") {
        ctx.font = fontSize + "px arial";
        ctx.fillStyle = color;
        let s = ctx.measureText(text).width;
        ctx.fillText(text, this.game.width/2 - s/2 + X, this.game.height/2 + fontSize/4 + Y);
    }
    leftBottomText(ctx, X, Y, text, fontSize, color = "black") {
        ctx.font = fontSize + "px arial";
        ctx.fillStyle = color;
        ctx.fillText(text, X, this.game.height + Y);
    }
    rightBottomText(ctx, X, Y, text, fontSize, color = "black") {
        ctx.font = fontSize + "px arial";
        ctx.fillStyle = color;
        let x = this.game.width - ((fontSize / 1.5) * (text.length) / 1.5) - X;
        ctx.fillText(text, x, this.game.height + Y);
    }
    rightTopText(ctx, X, Y, text, fontSize, color = "black") {
        ctx.font = fontSize + "px arial";
        ctx.fillStyle = color;
        let s = ctx.measureText(text).width;
        ctx.fillText(text, this.game.width-s-X, fontSize + Y);
    }
    leftTopText(ctx, X, Y, text, fontSize, color = "black") {
        ctx.font = fontSize + "px arial";
        ctx.fillStyle = color;
        ctx.fillText(text, X, fontSize + Y);
    }
    midTopText(ctx, X, Y, text, fontSize, color = "black") {
        ctx.font = fontSize + "px arial";
        ctx.fillStyle = color;
        let s = ctx.measureText(text).width;
        ctx.fillText(text, this.game.width/2 - s/2 + X, fontSize + Y);
    }
    midBottomText(ctx, X, Y, text, fontSize, color = "black") {
        ctx.font = fontSize + "px arial";
        ctx.fillStyle = color;
        let s = ctx.measureText(text).width;
        ctx.fillText(text, this.game.width/2 - s/2 + X, this.game.height + Y);
    }
}