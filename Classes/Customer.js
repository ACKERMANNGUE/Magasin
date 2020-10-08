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
        fill(255);
        ellipse(this.positionX, this.positionY, this.width, this.height);
    }

    DecreaseTimeInShop() {
        var counters = this.counters;
        var actualTime = millis();
        if (actualTime > this.timeInShop * MILLISEC && !this.IsWalkingTowardACounter) {
            for (let i = 0; i < counters.length; i++) {
                if (counters[i].IsCounterOpenAndQueueIsNotFull()) {

                    //Calcule la vitesse du vecteur 1
                    var v1 = Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));

                    //Définir le cadran 
                    var cadran;
                    if (this.speed.x >= 0 && this.speed.y >= 0) {
                        cadran = 0;
                    } else if (this.speed.x <= 0 && this.speed.y > 0) {
                        cadran = 90;
                    } else if (this.speed.x < 0 && this.speed.y <= 0) {
                        cadran = 180;
                    } else if (this.speed.x > 0 && this.speed.y < 0) {
                        cadran = 270;
                    }
                    //Calculer l'angle du nouveau vecteur
                    var newAngle = Math.atan2(counters[i].positionY, this.positionX) * 180 / Math.PI;
                    //Calculer les vitesses X et Y
                    var v2x = v1 * Math.cos(cadran - newAngle);
                    var v2y = v1 * Math.sin(cadran - newAngle);
                    this.IsWalkingTowardACounter = true;
                    break;
                }
            }
            //Remplacer le vecteur 1 par le nouveau
            this.speed = this.speed.add(createVector(v2x, v2y));

        }
    }

    /**
     * Move the customer in the specified direction
     * @param {*} direction The direction code
     */
    Move(direction) {
        switch (direction) {
            case MOVE_RIGHT:
                this.orientation = EAST;
                this.speed.mult(createVector(-1, 1));
                break;
            case MOVE_DOWN:
                this.orientation = SOUTH;
                this.speed.mult(createVector(1, -1));
                break;
            case MOVE_LEFT:
                this.orientation = WEST;
                this.speed.mult(createVector(-1, 1));
                break;
            case MOVE_UP:
                this.orientation = NORTH;
                this.speed.mult(createVector(1, -1));
                break;
            default:
                this.speed.mult(createVector(1, 1));
        }
        this.positionX += this.speed.x;
        this.positionY += this.speed.y;
    }

}