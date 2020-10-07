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

const EAST = 0;
const SOUTH = 1;
const WEST = 2;
const NORTH = 3;

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

        Math.floor(this.timeInShop / MILLISEC - 1);

        var actualTime = millis();

        if (actualTime > this.timeInShop * MILLISEC) {
            for (let i = 0; i < counters.length; i++) {
                if (counters[i].IsCounterOpenAndQueueIsNotFull()) {
                    //rotation mais à revoir
                    // this.speed.x *= Math.cos(this.orientation * 90) + Math.sin(this.orientation * 90);
                    // this.speed.y *= -Math.sin(this.orientation * 90) + Math.cos(this.orientation * 90);


                    //Reprendre notre position
                    this.positionX;
                    this.positionY;

                    //Où est la caisse
                    counters[i].positionX;
                    counters[i].positionY;

                    //Trajectoir du client à la caisse 

                    //racine de (vitesse x^2 + vitesse y^2)
                    let distanceBetweenCustomerAndCounter = Math.sqrt(Math.pow(this.positionX - counters[i].positionX, 2) + Math.pow(this.positionY - counters[i].positionY, 2))
                    this.speed = this.speed.add(this.positionX - counters[i].positionX / actualTime, this.positionY - counters[i].positionY / actualTime);
                    //Établir un vecteur y allant
                }
            }
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
        }
        this.positionX += this.speed.x;
        this.positionY += this.speed.y;
    }

}