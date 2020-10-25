/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

/* Shop */
const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 800;
const OFFSET = 100;
const DEFAULT_START_DAY = 8;
const DEFAULT_END_DAY = 18;

/* Text actual time */
const DEFAULT_X_POSITION_TEXT_POSITION = WIDTH_CANVAS - OFFSET;
const DEFAULT_Y_POSITION_TEXT_POSITION = HEIGHT_CANVAS / 10;

/* Counters */
const DEFAULT_X_POSITION_COUNTER = 100;
const DEFAULT_Y_POSITION_COUNTER = 725;
const OFFSET_BETWEEN_COUNTERS = 10;
const DEFAULT_NUMBER_CUSTOMERS_AT_COUNTER = 5;
const DEFAULT_NUMBER_COUNTERS = 5;
const TIME_BEFORE_OPENING_A_NEW_COUNTER = 10;
const TIME_BEFORE_CLOSING = 30;

/* Customers */
const DEFAULT_NUMBER_CUSTOMERS = 3;

/* Orientations */
const EAST = 0;
const SOUTH = 1;
const WEST = 2;
const NORTH = 3;

class Shop {
    /**
     * Constructor of the shop
     * @param {*} width Width of the canvas
     * @param {*} height Height of the canvas
     * @param {*} nbCounters The number of checkouts desks
     * @param {*} counters The checkouts desks
     */
    constructor(width, height, nbCounters, customers) {
        this.width = width;
        this.height = height;
        this.customers = customers;
        this.counters = [];
        this.nbCounters = nbCounters;
        this.InitCounters(DEFAULT_X_POSITION_COUNTER, DEFAULT_Y_POSITION_COUNTER, this.nbCounters);
        this.startDay = DEFAULT_START_DAY * 60 * MILLISEC;
        this.endDay = DEFAULT_END_DAY * 60 * MILLISEC;
        this.hours = DEFAULT_START_DAY;
        this.minutes = 0;
    }

    /**
     * Initialize the counters
     * @param {*} positionX Position X of the start counter
     * @param {*} positionY Position Y of the start counter
     * @param {*} nbCounters Number of the counters
     */
    InitCounters(positionX, positionY, nbCounters, customers) {
        let x = positionX;
        let y = positionY;

        for (let i = 0; i < nbCounters; i++) {
            let width = 75;
            let height = 75;
            this.counters.push(
                new Counter(x + (width + OFFSET_BETWEEN_COUNTERS) * i, y, width, height,
                    nbCounters, false, TIME_BEFORE_CLOSING)
            );
        }
        this.counters[0].opened = true;
    }
    /**
     * Check if the customer is against a wall and change the displacement of the customer
     */
    CustomerIsAgainstAWall() {
        if (this.customers.length > 0) {
            for (let i = 0; i < this.customers.length; i++) {
                if (!this.customers[i].IsWalkingTowardACounter) {

                    if (this.customers[i].position.x - this.customers[i].width / 2 < 0) {
                        this.customers[i].Move(EAST);
                    }
                    if (this.customers[i].position.y - this.customers[i].height / 2 < 0) {
                        this.customers[i].Move(SOUTH);
                    }
                    if (this.customers[i].position.x + this.customers[i].width / 2 > WIDTH_CANVAS) {
                        this.customers[i].Move(WEST);
                    }
                    if (this.customers[i].position.y + this.customers[i].height / 2 > HEIGHT_CANVAS - OFFSET) {
                        this.customers[i].Move(NORTH);
                    }
                } else {
                    if (this.customers[i].position.x - this.customers[i].width / 2 < 0) {
                        this.customers[i].Move(EAST);
                    }
                    if (this.customers[i].position.y - this.customers[i].height / 2 < 0) {
                        this.customers[i].Move(SOUTH);
                    }
                    if (this.customers[i].position.x + this.customers[i].width / 2 > WIDTH_CANVAS) {
                        this.customers[i].Move(WEST);
                    }
                    if (this.customers[i].position.y + this.customers[i].height / 2 > HEIGHT_CANVAS) {
                        this.customers[i].speed = createVector(0, 0);
                    }
                }
            }
        }
    }

    /**
     * Display the shop setted up
     */
    Display() {
        background(200, 200, 45);
        textSize(25);
        fill(255);
        text(Math.floor(millis() / MILLISEC), DEFAULT_X_POSITION_TEXT_POSITION, DEFAULT_Y_POSITION_TEXT_POSITION);
        textAlign(CENTER);
    }
    /**
     * Display the existing counters
     */
    DisplayCounters() {
        for (let i = 0; i < shop.counters.length; i++) {
            shop.counters[i].Display();
        }
    }
    /**
     * Get the "real time" of the day | A refaire mais là trop relou
     */
    GetActualTime() {
        let actualTime = Math.floor(millis() / MILLISEC);
        this.minutes = actualTime % 60;

        if (Math.floor(3 / actualTime) == 1) {
            //Because it's called 60 times in a row (because of the framerate)
            this.hours += (1 / 60);
            this.minutes = 0;
        }
        //console.log(this.hours + ":" + this.minutes);
    }
    /**
     * Open a new counter 
     */
    OpenNewCounter() {
        var customersWantToBuy = []
        for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].IsAtCounter) {
                customersWantToBuy.push(this.customers[i]);
            }
        }
        console.log(customersWantToBuy.length);
        if (customersWantToBuy.length / this.customers.length >= 1 / 3) {
            //open new counter
            for (let i = 0; i < this.counters; i++) {
                if (!this.counters[i].opened) {
                    this.counters[i].opened = true;
                    break;
                }
                break;
            }
        }
    }
}