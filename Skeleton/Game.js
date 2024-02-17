import {Player} from "./Player.js";
import {Enemy} from "./Enemy.js";
import {Background} from "./Background.js";
import {Text} from "./Text.js";
export default class Game{
    constructor(sound=0){
        this.width=canvas.width;
        this.height=canvas.height;
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
            // backgroud:new Background(this),
            // player:new Player(this),
            // enemies:new Enemy(this),
            // text:new Text(this)
        };
        this.switch=false;
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
    frame(ctx){//frame animation
        ++this.frameCnt;
        for(let a in this.entities){
            this.switch?this.entities[a].draw(ctx):this.entities[a].drawM(ctx);//call drawM for masking and draw for Images
            this.updation && this.entities[a].update();
        }
        this.calculaion();
    }
    calculaion(){//Write you collision or computation
    }
    position(w,h){
        this.width=w;
        this.height=h;
        for(let a in this.entities)
            this.entities[a].position();
    }
    gameOver(){//gamve over working
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
        });
        window.addEventListener("keypress",(e)=>{ // Cheat Code
        });
    }
}
