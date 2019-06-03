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

}

window.customElements.define("phone-component", Phone)