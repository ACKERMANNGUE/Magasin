/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

const WIDTH_CANVAS = 1200;
const HEIGHT_CANVAS = 800;
const DEFAULT_NUMBER_COUNTERS = 8;
const DEFAULT_NUMBER_CUSTOMERS = 3;
const DEFAULT_NUMBER_CUSTOMERS_AT_COUNTER = 5;

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
        this.InitCounters(100, 725, this.nbCounters);
    }

    /**
     * Set the array of customers in the shop
     * @param {*} customers Customers in the shop
     */
    SetCustomers(customers){
        this.customers = customers;
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
                let width = 75;
                let height = 75;
                this.counters.push(new Counter(x+(width + 10) * i, y, width, height, this.customers ,DEFAULT_NUMBER_CUSTOMERS_AT_COUNTER, 30, 30));
            }
    }

    CustomerIsAgainstAWall(){
        for (let i = 0; i < this.customers.length; i++) {
            let realXCoordinate = this.customers[i].positionX + this.customers[i].width;
            let realYCoordinate = this.customers[i].positionY + this.customers[i].height;

            if(realXCoordinate < 0){
                this.customers[i].Move(0);
            }
            if(realYCoordinate < 0){ 
                this.customers[i].Move(1);
            }
            if(realXCoordinate > WIDTH_CANVAS){
                this.customers[i].Move(2);
            }
            if(realYCoordinate > HEIGHT_CANVAS - 100){
                this.customers[i].Move(3);
            }
        }
    }
        
    /**
    * Display the shop setted up
    */
    Display() {
        background(233, 200, 45);
    }

    DisplayCounters(){
        for (let i = 0; i < shop.counters.length; i++) {
            shop.counters[i].Display();
        }
    }
}