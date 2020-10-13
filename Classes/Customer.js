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
     * @param {*} positionY Start position of the customer
     * @param {*} width Width of the customer
     * @param {*} height Height of the customer
     * @param {*} speed Displacement speed of the customer
     * @param {*} counters Counter existing the shop
     * @param {*} color Color of the customer
     */
    constructor(positionX, positionY, width, height, speed, counters) {
        this.startPos = createVector(positionX, positionY);
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
        this.drawArrow(createVector(this.positionX, this.positionY), createVector(100, 0), this.color);

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
                }
            }

        }
    }

    Toward(counter) {
        //Important https://p5js.org/reference/#/p5.Vector/rotate

        this.IsWalkingTowardACounter = true;

        //Calcule la vitesse du vecteur 1
        var v1 = this.speed.mag();
        //Calcule l'angle du vecteur 1
        var v1Angle = this.speed.heading();
        //Temps écoulé
        var seconds = millis() / MILLISEC;
        var actualPosition = createVector(this.startPos.x + seconds * this.speed.x, this.startPos.y + seconds * this.speed.y);

        this.startPos = actualPosition;
        //V = vecteur temporaire
        var v = createVector(this.speed.x, this.speed.y);
        //reset à l'angle 0
        v.rotate(-1 * v1Angle);
        //Calcule nouvel angle
        var newAngle = actualPosition.angleBetween(createVector(counter.positionX, counter.positionY));
        // var newAngle = Math.atan2(counter.positionY, actualPosition.x);

        console.log("before " + v.heading());
        //Si > que 180 (Ex : 220, transformer en 130)
        if (newAngle > Math.PI) {
            newAngle = Math.PI - newAngle;
        }

        v.rotate(newAngle);

        console.log("now " + v.heading());
        //Attribuer les modifications
        this.speed = v;
    }

    drawArrow(base, vec, myColor) {
        push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        rotate(this.speed.heading());
        let arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }

    /**
     * Move the customer in the specified direction
     * @param {*} direction The direction code
     */
    Move(direction) {
        console.log(this.speed.heading() * 180 / Math.PI);

        let angle;
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