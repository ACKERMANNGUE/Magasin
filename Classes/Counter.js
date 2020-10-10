/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */


class Counter {
    /**
     * Constructor of a counter
     * @param {*} positionX Position X of the counter 
     * @param {*} positionY Position X of the counter
     * @param {*} width Width of the counter
     * @param {*} height Height of the counter
     * @param {*} customers The list of all the customers present at the counter 
     * @param {*} nbMaxCustomersInQueue Maximum number of customers accepted in the queue 
     * @param {*} timeOpen The time before a new counter is opened
     * @param {*} timeClosed The time before a counter is closed in the absence of customers
     * @param {*} color The color of the counter
     */
    constructor(positionX, positionY, width, height, customers, nbMaxCustomersInQueue, timeOpen, timeClosed) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.customers = customers;
        this.nbMaxCustomersInQueue = nbMaxCustomersInQueue;
        this.color = color(0, 0, 255);
        /* À revoir car ça doit aller dans Shop */
        this.timeOpen = timeOpen;
        this.timeClosed = timeClosed;
    }

    /**
     * Display the counter
     */
    Display() {
        noStroke();
        if(!this.IsItOpened()){
            this.color = color(0, 0, 255);
        }else{
            this.color = color(100, 200 ,0);
        }
        fill(this.color);
        rect(this.positionX, this.positionY, this.width, this.height);
    }

    /**
     * Check if the counter is opened and if the queue isn't full
     */
    IsCounterOpenAndQueueIsNotFull() {
        var result;
        var customers = this.customers;
        if (customers.length <= this.nbMaxCustomersInQueue && this.IsItOpened()) {
            result = true;
        }
        return result;
    }

    IsItOpened() {
        var open = false;
        var actualTime = millis();

        if (actualTime > this.timeOpen * MILLISEC) {
            open = true;
        }
        return open;
    }
}