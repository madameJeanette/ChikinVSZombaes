/// <reference path="gameobject.ts" />

class Chicken extends GameObject implements Subject {
  public observers:Observer[] = []

    constructor() {
        super()

        this.width = 67
        this.height = 110
        this.speedmultiplier = 4

        window.addEventListener("click", (e:MouseEvent) => this.onWindowClick(e))
    }

    public update(){
        this.x += this.xspeed
        this.y += this.yspeed
        super.update()
    }

    // de beweegrichting aanpassen aan waar in het window is geklikt
    private onWindowClick(e:MouseEvent):void {
        Util.setSpeed(this, e.clientX - this.x, e.clientY - this.y)
    }
    public subscribe(o:Observer):void {
        // toevoegen aan array 
        this.observers.push(o)
        console.log("subscribed!")
        for(let o of this.observers){
                 o.notify();
         }

    }
    public unsubscribe(o:Observer):void {
        // verwijderen uit array
        for(let i = this.observers.length; i>=0; i--){
            if(this.observers[i] == o){
                this.observers.splice(i,1)
                console.log("unsubscribed!");   
            }}
    }


}

window.customElements.define("chicken-component", Chicken)