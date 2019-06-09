/// <reference path="gameobject.ts" />


class Phone extends GameObject {
        
    constructor() {
        super()
        this.width = 50
        this.height = 92
        this.x = Math.random() * (window.innerWidth - 50)
        this.y = Math.random() * (window.innerHeight - 220)

        this.update()
    }

    public message(){
        console.log("insta post liked <3 ")   //phone notified of like
    }

}

window.customElements.define("phone-component", Phone)