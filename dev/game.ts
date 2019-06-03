class Game {
    
    private chicken:Chicken
    private gameObjects: GameObject[] = [] 
    private gameOver:boolean = false
    public observers:Observer[]
    public subject:Subject
 
    constructor() {
        this.chicken = new Chicken()
  
        for(let c = 0; c<10; c++){
            this.gameObjects.push(new Zombie(this.chicken))
            this.gameObjects.push(new Phone())
        }
 
        this.gameLoop()
    }
    
    private gameLoop(){
        // beweging
        this.chicken.update()

        // check collision
        for (let go of this.gameObjects){
            go.update()
            if(Util.checkCollision(go, this.chicken)){
                console.log("Een object raakt de chicken!")
            }
        }

        // loop aanroepen zo lang het geen game over is
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop())
        }
    }
    
} 

window.addEventListener("load", () => new Game())