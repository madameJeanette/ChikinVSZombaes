# PRG08 Week 5 Oefening 1

## Chickens versus Zombies

![Chickens](docs/images/runchickenrun.png?raw=true "Run chicken, run")

## Startcode

- Er is een game met zombies, telefoons en een kip
- Als je in het scherm klikt beweegt de kip naar die locatie
- De zombies bewegen richting de kip
- De collision detection functie kijkt of een kip een gameobject raakt

## Opdracht -  Observer Pattern 

- Maak van de chicken een Subject, zie UML
- Maak van de zombies Observers, zie UML
- De zombies abbonneren zich op de chicken zodra ze aangemaakt worden
- De notify functie van de zombie toont een `console.log` bericht

## Opdracht 

- Gebruik de collision detection functie om te zien of de kip een zombie of een telefoontje raakt
- Als je een zombie raakt zet je `gameOver` op `true`
- Als je een telefoontje raakt stuur je alle observers een bericht! Check of de zombies hun console.log tonen.
- Als je een telefoontje raakt haal je die telefoon uit de gameobjects array en uit de DOM.

## Opdracht - Strategy Pattern

- Als de zombies een notificatie krijgen stoppen ze met bewegen en krijgen ze de andere zombie texture
- De zombies gaan na een pauze weer bewegen, en krijgen dan ook weer de beweging texture
- Hiervoor kan je de strategy pattern gebruiken

## Bonus opdracht

- Als een zombie vijf notificaties heeft gehad unsubscribed hij zich van de feed. 
- Je krijgt een punt voor elk telefoontje dat je oppakt.
- Als je alle telefoontjes hebt opgepakt is het ook Game Over.
- De kip toont ook een ander texture als hij net een telefoontje heeft opgepakt. (kip met telefoon)

## Observer Pattern

```
interface Observer {
    notify():void
}

interface Subject {
    observers:Observer[]
    subscribe(o:Observer):void
    unsubscribe(o:Observer):void
}

class User implements Observer {
    constructor(s:Subject){
        s.subscribe(this)
    }
    public notify(){
        console.log("I got an update!")
    }
}

class Shop implements Subject {
    private observers:Observer[]
    public subscribe(o:Observer):void {
        // toevoegen aan array
    }
    public unsubscribe(o:Observer):void {
        // verwijderen uit array
    }
    
}
```
## UML Observer pattern

![UML](docs/images/observer.png?raw=true "UML")


### Code snippets

```
// Texture veranderen
this.style.backgroundImage = "url('images/zombie.png')";

// item uit array halen
this.itemsArray.splice(this.itemsArray.indexOf(itemToRemove), 1)

// web component uit DOM halen
zombie.remove()
```

