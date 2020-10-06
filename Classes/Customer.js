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

class Customer {

    /**
     * Constructor of a customer
     * @param {*} positionX Position X of the customer
     * @param {*} positionY Position Y of the customer
     * @param {*} width Width of the customer
     * @param {*} height Height of the customer
     * @param {*} speed Displacement speed of the customer
     * @param {*} color Color of the customer
     */
    constructor(positionX, positionY, width, height, speed) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color(255, 255, 255);
    }

    /**
     * Display the customer
     */
    Display() {
        fill(255);
        ellipse(this.positionX, this.positionY, this.width, this.height);
    }


    /**
     * Move the customer in the specified direction
     * @param {*} direction The direction code
     */
    Move(direction){
        switch (direction) {
            case MOVE_RIGHT:
                this.speed.mult(createVector(-1, 1));
                break;
            case MOVE_DOWN:
                this.speed.mult(createVector(1, -1));
                break;
            case MOVE_LEFT:
                this.speed.mult(createVector(-1, 1));
                    break;
            case MOVE_UP:
                this.speed.mult(createVector(1, -1));
                    break;
        }
        this.positionX += this.speed.x;
        this.positionY += this.speed.y;
    }

}