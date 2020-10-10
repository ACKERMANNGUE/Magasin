/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

const MOVE_RIGHT = 0;
const MOVE_DOWN = 1;
const MOVE_LEFT = 2;
const MOVE_UP = 3;

const MILLISEC = 1000;

class Customer {

    /**
     * Constructor of a customer
     * @param {*} positionX Position X of the customer
     * @param {*} positionY Position Y of the customer
     * @param {*} width Width of the customer
     * @param {*} height Height of the customer
     * @param {*} speed Displacement speed of the customer
     * @param {*} counters Counter existing the shop
     * @param {*} color Color of the customer
     */
    constructor(positionX, positionY, width, height, speed, counters) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color(255, 255, 255);
        this.counters = counters;
        this.timeInShop = random(2, 4);
        this.orientation = NORTH;
        this.IsWalkingTowardACounter = false;
    }

    SetCounters(counters) {
        this.counters = counters;
    }

    /**
     * Display the customer
     */
    Display() {
        fill(this.color);
        rect(this.positionX, this.positionY, 100, 1);
        fill(this.color);
        ellipse(this.positionX, this.positionY, this.width, this.height);
    }

    DecreaseTimeInShop() {
        var counters = this.counters;
        var actualTime = millis();
        if (actualTime > this.timeInShop * MILLISEC && !this.IsWalkingTowardACounter) {
            for (let i = 0; i < counters.length; i++) {
                if (counters[i].IsCounterOpenAndQueueIsNotFull()) {

                    this.Toward(counters[i]);
                    break;
                }
            }
            
        }
    }

    Toward(counter) {
        //tant que this.position n'est pas égale à la position du comptoir
        while (this.positionX != counter.positionX && this.positionY != counter.positionY) {
            //déplacer vers
            //Calcule la vitesse du vecteur 1
            var v1 = Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));

            //Définir le cadran 
            var cadran;
            if (this.speed.x >= 0 && this.speed.y >= 0) {
                cadran = 0;
            } if (this.speed.x <= 0 && this.speed.y > 0) {
                cadran = 90;
            } if (this.speed.x < 0 && this.speed.y <= 0) {
                cadran = 180;
            } if (this.speed.x >= 0 && this.speed.y < 0) {
                cadran = 270;
            }
            //Calculer l'angle du nouveau vecteur
            var newAngle = cadran + Math.atan2(counter.positionY, this.positionX) * 180 / Math.PI;
            //Calculer les vitesses X et Y
            var v2x = Math.cos(newAngle) * v1;
            var v2y = Math.sin(newAngle) * v1;
            this.IsWalkingTowardACounter = true;
            //Remplacer le vecteur 1 par le nouveau
        }
        this.speed = createVector(v2x, v2y);
    }

    /**
     * Move the customer in the specified direction
     * @param {*} direction The direction code
     */
    Move(direction) {
        let angle;
        switch (direction) {
            case MOVE_RIGHT:
                angle = 0;
                this.orientation = EAST;
                this.speed.mult(createVector(-1, 1));
                break;
            case MOVE_DOWN:
                angle = 270;
                this.orientation = SOUTH;
                this.speed.mult(createVector(1, -1));
                break;
            case MOVE_LEFT:
                angle = 180;
                this.orientation = WEST;
                this.speed.mult(createVector(-1, 1));
                break;
            case MOVE_UP:
                angle = 90;
                this.orientation = NORTH;
                this.speed.mult(createVector(1, -1));
                break;
            default:
                angle = 0;
                this.speed.mult(createVector(1, 1));
        }
        var a = Math.atan2(this.speed.y, this.speed.x) * 180 / Math.PI;
        rotate(a + angle);
        this.positionX += this.speed.x;
        this.positionY += this.speed.y;
    }
}