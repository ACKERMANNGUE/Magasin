/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

const WIDTH_CANVAS = 1200;
const HEIGHT_CANVAS = 800;

const DEFAULT_X_POSITION_COUNTER = 100;
const DEFAULT_Y_POSITION_COUNTER = 725;
const OFFSET_BETWEEN_COUNTERS = 10;
const DEFAULT_NUMBER_CUSTOMERS_AT_COUNTER = 5;
const DEFAULT_NUMBER_COUNTERS = 8;

const DEFAULT_NUMBER_CUSTOMERS = 1;

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
        this.InitCounters(DEFAULT_X_POSITION_COUNTER, DEFAULT_Y_POSITION_COUNTER, this.nbCounters, customers);
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
                this.counters.push(new Counter(x + (width + OFFSET_BETWEEN_COUNTERS) * i, y, width, height, customers, DEFAULT_NUMBER_CUSTOMERS_AT_COUNTER, 30, 30));
            }
        }
        /**
         * Check if the customer is against a wall and change the displacement of the customer
         */
    CustomerIsAgainstAWall() {
        for (let i = 0; i < this.customers.length; i++) {

            if (this.customers[i].positionX - this.customers[i].width / 2 < 0) {
                this.customers[i].Move(EAST);
            }
            if (this.customers[i].positionY - this.customers[i].height / 2 < 0) {
                this.customers[i].Move(SOUTH);
            }
            if (this.customers[i].positionX + this.customers[i].width / 2 > WIDTH_CANVAS) {
                this.customers[i].Move(WEST);
            }
            if (this.customers[i].positionY + this.customers[i].height / 2 > HEIGHT_CANVAS - 100) {
                this.customers[i].Move(NORTH);
            }
        }
    }

    /**
     * Display the shop setted up
     */
    Display() {
        background(233, 200, 45);
    }

    DisplayCounters() {
        for (let i = 0; i < shop.counters.length; i++) {
            shop.counters[i].Display();
        }
    }
}