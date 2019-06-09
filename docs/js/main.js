"use strict";
class GameObject extends HTMLElement {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.direction = 1;
        document.body.appendChild(this);
    }
    update() {
        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.direction + ",1)";
    }
}
class Chicken extends GameObject {
    constructor() {
        super();
        this.observers = [];
        this.width = 67;
        this.height = 110;
        this.speedmultiplier = 4;
        window.addEventListener("click", (e) => this.onWindowClick(e));
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        super.update();
    }
    onWindowClick(e) {
        Util.setSpeed(this, e.clientX - this.x, e.clientY - this.y);
    }
    subscribe(o) {
        this.observers.push(o);
        console.log("zombie subscribed!");
        for (let o of this.observers) {
            o.notify();
        }
    }
    unsubscribe(o) {
        for (let i = this.observers.length; i >= 0; i--) {
            if (this.observers[i] == o) {
                this.observers.splice(i, 1);
                console.log("unsubscribed!");
            }
        }
    }
}
window.customElements.define("chicken-component", Chicken);
class Game {
    constructor() {
        this.gameObjects = [];
        this.gameOver = false;
        this.observers = this.observers;
        this.chicken = new Chicken();
        this.zombie = new Zombie(this.chicken);
        this.phone = new Phone();
        for (let c = 0; c < 10; c++) {
            this.gameObjects.push(new Zombie(this.chicken));
            this.gameObjects.push(new Phone());
        }
        this.gameLoop();
    }
    gameLoop() {
        this.chicken.update();
        this.zombie.update();
        this.phone.update();
        for (let go of this.gameObjects) {
            go.update();
            if (Util.checkCollision(this.phone, this.chicken)) {
                this.phone.message();
                console.log("The chicken used the phone!");
                this.zombie.message();
                this.gameObjects.splice(this.gameObjects.indexOf(this.phone), 1);
                console.log("remove phone from array");
                this.phone.remove();
                console.log("remove phone from dom");
                this.phone.update();
                this.zombie.update();
            }
            else if (Util.checkCollision(this.zombie, this.chicken)) {
                console.log("A zombie caught the chicken!");
                this.gameOver = true;
                console.log("OOF");
                this.zombie.update();
            }
        }
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}
window.addEventListener("load", () => new Game());
class Phone extends GameObject {
    constructor() {
        super();
        this.width = 50;
        this.height = 92;
        this.x = Math.random() * (window.innerWidth - 50);
        this.y = Math.random() * (window.innerHeight - 220);
        this.update();
    }
    message() {
        console.log("insta post liked <3 ");
    }
}
window.customElements.define("phone-component", Phone);
class Util {
    static setSpeed(go, xdist, ydist) {
        let distance = Math.sqrt(xdist * xdist + ydist * ydist);
        go.xspeed = xdist / distance;
        go.yspeed = ydist / distance;
        go.xspeed *= go.speedmultiplier;
        go.yspeed *= go.speedmultiplier;
    }
    static checkCollision(go1, go2) {
        return (go1.x < go2.x + go2.width &&
            go1.x + go1.width > go2.x &&
            go1.y < go2.y + go2.height &&
            go1.height + go1.y > go2.y);
    }
    static removeFromGame(go, arr) {
        go.div.remove();
        let i = arr.indexOf(go);
        if (i != -1) {
            arr.splice(i, 1);
        }
    }
}
class Zombie extends GameObject {
    constructor(s) {
        super();
        this.width = 67;
        this.height = 119;
        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2 - 67);
        this.speedmultiplier = Math.random() * 2;
        this.subject = s;
        this.subject.subscribe(this);
    }
    update() {
        this.moveToChicken();
        super.update();
    }
    moveToChicken() {
        Util.setSpeed(this, this.subject.x - this.x, this.subject.y - this.y);
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    notify() {
        console.log("Zombie got an update!!!");
    }
    message() {
        console.log("Zombie's insta post got liked <3 ");
    }
}
window.customElements.define("zombie-component", Zombie);
//# sourceMappingURL=main.js.map