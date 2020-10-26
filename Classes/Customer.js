/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

/* Timing */
const TIME_IN_SHOP = 3;
const TIME_RETRY_SEARCH_COUNTER = 5;


class Customer {

    /**
     * Constructor of a customer
     * @param {*} positionX Position X of the customer
     * @param {*} positionY Position Y of the customer
     * @param {*} positionY Start position of the customer
     * @param {*} width Width of the customer
     * @param {*} height Height of the customer
     * @param {*} speed Displacement speed of the customer
     * @param {*} counters Counter existing the shop
     * @param {*} color Color of the customer
     */
    constructor(positionX, positionY, width, height, speed, counters) {
        this.position = createVector(positionX, positionY);
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color(255, 255, 255);
        this.counters = counters;
        this.timeInShop = random(TIME_RETRY_SEARCH_COUNTER * MILLISEC, TIME_IN_SHOP * MILLISEC) + millis();
        this.IsWalkingTowardACounter = false;
        this.IsAtCounter = false;
    }
    /**
     * Set the counters for the customers
     * @param {*} counters The counters
     */
    SetCounters(counters) {
        this.counters = counters;
    }

    /**
     * Display the customer
     */
    Display() {
        this.drawArrow(this.position, createVector(100, 0), this.color);
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.width, this.height);
        textSize(15);
        fill(0);
        text(Math.floor(this.timeInShop / MILLISEC), this.position.x, this.position.y);
        textAlign(CENTER);
    }

    /**
     * Decrease the time of the customer's in shop
     */
    DecreaseTimeInShop() {
        var counters = this.counters;
        var actualTime = millis();
        if (actualTime > this.timeInShop && !this.IsWalkingTowardACounter && counters != null) {
            for (let i = 0; i < counters.length; i++) {
                if (counters[i].IsCounterOpenAndQueueIsNotFull()) {
                    this.IsWalkingTowardACounter = true;
                    this.TowardTP(counters[i]);
                } else {
                    this.timeInShop = actualTime + (TIME_RETRY_SEARCH_COUNTER * MILLISEC);
                }
            }
        }
    }

    /**
    * ALTERNATIVE : Moves the customer in the direction of the counter
    * @param {*} counter The counter
    */
    TowardTP(counter) {
        var offsetY = 0;
        for (let i = 0; i <= counter.customers.length; i++) {
            offsetY += this.height;
        }
        this.position = createVector(counter.position.x + counter.width / 2, (counter.position.y + counter.height / 2) - offsetY);
        this.speed = createVector();
        this.IsAtCounter = true;
        counter.customers.push(this);
        counter.timeAtCounter += millis();
    }



    /**
     * Moves the customer in the direction of the counter
     * @param {*} counter The counter
     */
    Toward(counter) {
        //Important https://p5js.org/reference/#/p5.Vector/rotate

        this.IsWalkingTowardACounter = true;

        //Calcule la vitesse du vecteur 1
        var v1 = Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));

        v.rotate(newAngle);

        //Définir le cadran 
        var cadran;
        if (this.speed.x >= 0 && this.speed.y == 0) {
            cadran = 0;
        } if (this.speed.x <= 0 && this.speed.y > 0) {
            cadran = 90;
        } if (this.speed.x < 0 && this.speed.y <= 0) {
            cadran = 180;
        } if (this.speed.x >= 0 && this.speed.y < 0) {
            cadran = 270;
        }

        console.log("Actual : " + degrees(this.speed.heading()));



        //Reset l'angle
        //Calculer l'angle du nouveau vecteur
        var newAngle = degrees(Math.atan2(counter.positionY, this.positionX)) + cadran;


        console.log("Wanted : " + (newAngle));

        //Modifier l'angle (tema si negatif ou pas)
        //this.speed.rotate(newAngle);


        //Calculer les vitesses X et Y
        var v2x = Math.cos(newAngle) * v1;
        var v2y = Math.sin(newAngle) * v1;
        //Remplacer le vecteur 1 par le nouveau
        this.speed = createVector(v2x, v2y);

        console.log("New one : " + degrees(this.speed.heading()));
        this.speed = vector2D();
    }

    /**
     * Draw an arrow in the facing direction of the customer
     * @param {*} base Customer's position
     * @param {*} vec  Triangle position
     * @param {*} myColor Color of the triangle
     */
    drawArrow(base, vec, myColor) {
        push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        rotate(this.speed.heading());
        let arrowSize = 15;
        translate(arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }

    /**
     * Move the customer in the specified direction
     * @param {*} direction The direction code
     */
    Move(direction) {

        switch (direction) {
            case EAST:
                this.speed.mult(createVector(-1, 1));
                break;
            case SOUTH:
                this.speed.mult(createVector(1, -1));
                break;
            case WEST:
                this.speed.mult(createVector(-1, 1));
                break;
            case NORTH:
                this.speed.mult(createVector(1, -1));
                break;
            default:
                this.speed.mult(createVector(1, 1));
        }
        this.position.add(this.speed);
    }
}