class Game {
    
    private chicken:Chicken
    private gameObjects: GameObject[] = [] 
    private gameOver:boolean = false
    public observers:Observer[]
    public subject:Subject
    public zombie:Zombie
    public phone:Phone

 
    constructor() {
        this.observers = this.observers
        this.chicken = new Chicken()
        this.zombie =  new Zombie(this.chicken)
        this.phone =  new Phone()
  
        for(let c = 0; c<10; c++){
           this.gameObjects.push(new Zombie(this.chicken))
           this.gameObjects.push(new Phone())
        }
 
        this.gameLoop()
    }
    
    private gameLoop(){
        // beweging
        this.chicken.update()
        this.zombie.update()
        this.phone.update()
       
        // check collision
        for (let go of this.gameObjects){
                          
         go.update()
         
         if (Util.checkCollision(this.phone, this.chicken)) {
                
           
            this.phone.message() 
            console.log("The chicken used the phone!")
            this.zombie.message()
       
            // telefoon uit array halen
       
            this.gameObjects.splice(this.gameObjects.indexOf(this.phone), 1)
       
            console.log("remove phone from array")
       
            // web component uit DOM halen
                 
            this.phone.remove() 
            console.log("remove phone from dom")
            this.phone.update() 
            this.zombie.update()                   
            }   

         else if(Util.checkCollision(this.zombie, this.chicken)){
            console.log("A zombie caught the chicken!")
            this.gameOver = true
            console.log("OOF")
            this.zombie.update()
                             
            }     
                     
    }
                
        // loop aanroepen zo lang het geen game over is
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop())
        }
            
      
           
    }
    
    
} 

window.addEventListener("load", () => new Game())