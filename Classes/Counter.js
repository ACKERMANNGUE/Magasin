/**
 * Author : Ackermann Gawen
 * Date : 05.10.2020
 * Version : 1.0 CFPT-Informatique
 * Brief : Simulation of a shop's traffic
 */

const MIN_TIME_AT_COUNTER = 3;
const MAX_TIME_AT_COUNTER = 10;
const DEFAULT_TIME_AT_COUNTER = (MIN_TIME_AT_COUNTER + MAX_TIME_AT_COUNTER) / 2;


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
    constructor(positionX, positionY, width, height, nbMaxCustomersInQueue, timeOpen, timeClosed) {
        this.position = createVector(positionX, positionY);
        this.width = width;
        this.height = height;
        this.customers = [];
        this.nbMaxCustomersInQueue = nbMaxCustomersInQueue;
        this.color = color(0, 0, 255);
        this.timeOpen = timeOpen * MILLISEC;
        this.timeClosed = timeClosed * MILLISEC;
        this.timeAtCounter = random(MIN_TIME_AT_COUNTER, MAX_TIME_AT_COUNTER) * MILLISEC;
    }
    /**
     * Decrease the time for a customer at a counter
     */
    DecreaseTimeAtCounter() {
        //tant que la file n'est pas vide
        //decrease le timer pour le temps à la caisse

        if (this.customers.length > 0) {
            var actualTime = millis();
            for (let i = 0; i < this.customers.length; i++) {
                // 0 = first customer in the list
                if (actualTime > this.timeAtCounter && this.customers[0].IsAtCounter) {
                    this.customers = this.DeleteElementAndRebuildArray(0, this.customers);
                    this.timeAtCounter = actualTime + DEFAULT_TIME_AT_COUNTER * MILLISEC;
                }
            }
        }
    }
    /**
     * Delete an element of an array and rebuild it with normalized indexes
     * @param {*} index The index of the element that will be deleted
     * @param {*} array The arrray that contains the element
     */
    DeleteElementAndRebuildArray(index, array) {
        console.log(array[index].position);
        delete array[index];
        let tmpArr = array;
        array = [];
        for (let i = 0; i < tmpArr.length; i++) {
            if (tmpArr[i] != null) {
                array.push(tmpArr[i]);
            }
        }
        return array;
    }

    /**
     * Display the counter
     */
    Display() {
        noStroke();
        if (!this.IsItOpened()) {
            this.color = color(0, 0, 255);
        } else {
            this.color = color(100, 200, 0);
        }
        fill(this.color);
        rect(this.position.x, this.position.y, this.width, this.height);
    }

    /**
     * Check if the counter is opened and if the queue isn't full
     */
    IsCounterOpenAndQueueIsNotFull() {
        var result;
        var customers = this.customers;
        if (customers.length + 1 <= this.nbMaxCustomersInQueue && this.IsItOpened()) {
            result = true;
        }
        return result;
    }
    /**
     * Check if the time before opening is ended
     */
    IsItOpened() {
        var open = false;
        var actualTime = millis();

        if (actualTime > this.timeOpen) {
            open = true;
        }
        return open;
    }
}