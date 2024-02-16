export default class Animation{
    constructor(canvas,sound=false){//pass the panel object and canvas Element
        this.canvas=canvas;
        this.sound=sound;
        this.ctx=this.canvas.getContext('2d');
        this.obj;
        this.position();
        window.onresize=()=>this.position();//change dimension here
        window.addEventListener("keypress",(e)=>{
            if(e.code=="KeyF") {
                if (!document.fullscreenElement)
                    document.documentElement.requestFullscreen();
                else if (document.exitFullscreen)
                    document.exitFullscreen();
            }
            if(e.code=="KeyM"){
                this.sound=!this.sound;
                this.obj && this.putSoundOnObj();
                console.log("Sound:",this.sound);
            }
        })
        this.animate();
    }
    start(obj){//call this function to show the object
        this.obj=obj;
        this.putSoundOnObj();
        this.position();
    }
    position(){
        this.canvas.width=window.innerWidth;
        this.canvas.height=window.innerHeight-4;
        this.obj && this.obj.position(this.canvas.width,this.canvas.height);
    }
    putSoundOnObj(){
        this.obj.sound=this.sound;
    }
    animate(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.obj && this.obj.frame(this.ctx);//create frame function in object file
        requestAnimationFrame(this.animate.bind(this));
    }
}