/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

/* Timing */
const TIME_CYCLE_BEFORE_NEW_CUSTOMERS = 2;
const MILLISEC = 1000;

var customers = [];
var newCycle = TIME_CYCLE_BEFORE_NEW_CUSTOMERS * MILLISEC;

/**
 * Launched at the startup of the program
 */
function setup() {
    createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);

    shop = new Shop(WIDTH_CANVAS, HEIGHT_CANVAS, DEFAULT_NUMBER_COUNTERS, customers);
    customers = InitCustomers(DEFAULT_NUMBER_CUSTOMERS, customers, shop.counters);
    
    shop.customers = customers;

}
/**
 * Create customers
 * @param {*} number The number of customers to add
 * @param {*} customers The array of the customers
 * @param {*} counters The array of counters
 */
function InitCustomers(number, customers, counters) {
    if(customers.length == 0){
        customers = [];
    }
    for (let i = 0; i < number; i++) {
        customers.push(new Customer(OFFSET, HEIGHT_CANVAS / 2,
            30, 30, createVector(Math.floor(random(-5, 5)), Math.floor(random(-5, 5)))));
        customers[i].SetCounters(counters);
    }
    return customers;
}

/**
 * Launched at every frame
 */
function draw() {

    var actualTime = millis();
    if (actualTime > newCycle) {
        shop.customers = InitCustomers(DEFAULT_NUMBER_CUSTOMERS, shop.customers, shop.counters);
        
        newCycle += actualTime;
    }

    shop.Display();
    shop.DisplayCounters();
    shop.GetActualTime();
    shop.OpenNewCounter();

    if (shop.customers.length > 0) {

        for (let i = 0; i < shop.customers.length; i++) {
            shop.customers[i].Display();
            if (!shop.customers[i].IsAtCounter) {
                shop.customers[i].DecreaseTimeInShop();
            }
            shop.customers[i].Move();
        }
    }
    if (shop.counters.length > 0) {
        for (let i = 0; i < shop.counters.length; i++) {
            shop.counters[i].DecreaseTimeAtCounter(shop);
        }
    }
    shop.CustomerIsAgainstAWall();

}