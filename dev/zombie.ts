/// <reference path="gameobject.ts" />

class Zombie extends GameObject implements Observer {
        
    private subject:Chicken

    constructor(s:Chicken) {
        super()
       
        this.width = 67
        this.height = 119
        this.x = Math.random() * (window.innerWidth - 67)
        this.y = Math.random() * (window.innerHeight/2) + (window.innerHeight/2-67)
        this.speedmultiplier = Math.random() * 2
        this.subject = s
        this.subject.subscribe(this)

    }

    public update(){
        this.moveToChicken()
        super.update()
    }

    private moveToChicken(){
        // deze regel code geeft de zombie de snelheid waarmee hij naar de kip beweegt
        Util.setSpeed(this, this.subject.x - this.x, this.subject.y - this.y)

        // nu passen we de x en y positie aan met de snelheid
        this.x += this.xspeed
        this.y += this.yspeed
    }
    public notify(){
        console.log("Zombie got an update!")   //zombie notified of subscripton update
    }
}

window.customElements.define("zombie-component", Zombie)