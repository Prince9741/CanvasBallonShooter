import {Player} from "./Player.js";
import {Enemy} from "./Enemy.js";
import {Background} from "./Background.js";
import {Text} from "./Text.js";
export default class Game{
    constructor(sound=0){
        this.newGame(sound);
    }
    newGame(sound){
        this.sound=sound;
        this.play=true;
        this.updation=true;
        this.dL=1;//Difficulty Level
        this.maxDL=6;
        this.frameCnt=0;
        this.size=1;
        this.entities={//create a class with update, draw, and poisition function
            backgroud:new Background(this),
            player:new Player(this),
            enemies:new Enemy(this),
            text:new Text(this)
        };
        this.control=new Control(this);
        console.log("Game Start");
    }
    levelUp(){
        if(this.dL<this.maxDL)
            this.dL++;
    }
    levelDown(){
        if(this.dL>1)
            this.dL--;
    }
    frame(ctx){
        if(this.updation && ++this.frameCnt%400==0)
            this.levelUp();
        for(let a in this.entities){
            this.entities[a].draw(ctx);//call drawM for masking and draw for Images
            this.updation && this.entities[a].update();
        }
    }
    position(w,h){
        this.width=w,this.height=h;
        for(let a in this.entities)
            this.entities[a].position();
    }
    gameOver(){
        this.pausePlay();
        this.play=false;
        console.log("Game Over");
    }
    pausePlay(){
        if(this.play)
            this.updation=!this.updation;
    }
    getSec(){
        return parseInt(this.frameCnt*0.018);
    }
}

class Control{//control input from here
    constructor(game){
        this.game=game;
        this.mouse={x:0,y:0};
        this.position = canvas.getBoundingClientRect();
        window.addEventListener("mousemove",e=>{
            this.mouse.x=e.x-this.position.left;
            this.mouse.y=e.y-this.position.top;
        });
        window.addEventListener("keypress",(e)=>{  //Gaming Control
            if(e.key=="Enter" && !this.game.play)  //start new Game
                this.game.newGame(this.game.sound);
            else if(e.code=="Space")               //Pause and Play
                this.game.pausePlay();
        });
        window.addEventListener("mousedown",()=>{
            if(this.game.updation)
                this.game.entities.player && this.game.entities.player.gun.shoot();
        });
        window.addEventListener("keypress",(e)=>{ // Cheat Code
            if(e.code=="KeyE" && e.shiftKey)
                this.game.entities.enemies && this.game.entities.enemies.killAll();
            else if(e.code=="KeyR" && e.shiftKey)  // Reverse Backgrouned
                this.game.entities.backgroud && this.game.entities.backgroud.reverse();
            else if(e.code=="KeyL" && e.shiftKey) 
                this.game.entities.player && this.game.entities.player.life++;   
        });
    }
}
