/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

const WIDTH_CANVAS = 1200;
const HEIGHT_CANVAS = 800;
const DEFAULT_NUMBER_COUNTERS = 5;

/**
 * Launched at the startup of the program
 */
function setup() {
    background(51);
    createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);
    shop = new Shop(WIDTH_CANVAS, HEIGHT_CANVAS, DEFAULT_NUMBER_COUNTERS);
    for (let i = 0; i < shop.counters.length; i++) {
        shop.counters[i].Display();
    }
}
/**
 * Launched at every frame
 */
function draw() {}

class Shop {
    /**
     * Constructor of the shop
     * @param {*} width Width of the canvas
     * @param {*} height Height of the canvas
     * @param {*} nbCounters The number of checkouts desks
     * @param {*} counters The checkouts desks
     */
    constructor(width, height, nbCounters) {
        this.width = width;
        this.height = height;
        this.counters = [];
        this.nbCounters = nbCounters;
        this.InitCounters(0, 0, this.nbCounters);
    }

    /**
     * Initialize the counters
     * @param {*} positionX Position X of the start counter
     * @param {*} positionY Position Y of the start counter
     * @param {*} nbCounters Number of the counters
     */
    InitCounters(positionX, positionY, nbCounters) {
            let x = positionX;
            let y = positionY;

            for (let i = 0; i < nbCounters; i++) {
                let width = 50;
                let height = 50;
                this.counters.push(new Counter((width + 10) * i, y, width, height, 5, 30, 30));
            }
        }
        /**
         * Display the shop setted up
         */
    Display() {
        for (let i = 0; i < nbCounters; i++) {
            this.counters[i].Display();
        }
    }
}

class Counter {
    /**
     * Constructor of a counter
     * @param {*} positionX Position X of the counter 
     * @param {*} positionY Position X of the counter
     * @param {*} width Width of the counter
     * @param {*} height Height of the counter
     * @param {*} nbMaxCustomersInQueue Maximum number of customers accepted in the queue 
     * @param {*} timeOpen The time before a new counter is opened
     * @param {*} timeClosed The time before a counter is closed in the absence of customers
     * @param {*} color The color of the counter
     */
    constructor(positionX, positionY, width, height, nbMaxCustomersInQueue, timeOpen, timeClosed) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.nbMaxCustomersInQueue = nbMaxCustomersInQueue;
        this.color = color(0, 0, 255);
        this.timeOpen = timeOpen;
        this.timeClosed = timeClosed;
    }

    /**
     * Display the counter
     */
    Display() {
        noStroke();
        fill(this.color);
        rect(this.positionX, this.positionY, this.width, this.height);
    }
}

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
        noStroke();
        fill(this.color);
        ellipse(this.positionX, this.positionY, this.width, this.height);
    }
}