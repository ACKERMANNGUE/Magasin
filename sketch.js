/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

var customers = [];

/**
 * Launched at the startup of the program
 */
function setup() {

    createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);

    /* Init the customers */
    for (let i = 0; i < DEFAULT_NUMBER_CUSTOMERS; i++) {
        // customers.push(new Customer(WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2,
        //     30, 30, createVector(3, 0)));
        customers.push(new Customer(WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2,
            30, 30, createVector(Math.floor(random(-5, 5)), Math.floor(random(-5, 5)))));
        customers[i].Display();
        customers[i].DecreaseTimeInShop();
    }

    shop = new Shop(WIDTH_CANVAS, HEIGHT_CANVAS, DEFAULT_NUMBER_COUNTERS, customers);

    for (let i = 0; i < customers.length; i++) {
        customers[i].SetCounters(shop.counters);
    }

}
/**
 * Launched at every frame
 */
function draw() {

    shop.Display();
    shop.DisplayCounters();

    for (let i = 0; i < customers.length; i++) {
        customers[i].Display();
        if (!customers[i].IsWalkingTowardACounter) {
            customers[i].DecreaseTimeInShop();
        }
        customers[i].Move();
    }

    for (let i = 0; i < shop.counters.length; i++) {
        shop.counters[i].DecreaseTimeAtCounter();        
    }
    shop.CustomerIsAgainstAWall();
    shop.GetActualTime();
    shop.OpenNewCounter();
}