const { curry } = require("prelude-ls");


let elevatorId = 1;
let callButtonId = 1;
let floorRequestButtonId = 1;
let doorId = 1

class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        
        this.elevatorList = [];
        this.callButtonList = [];
        this.ID = _id;
        this.status = "online"
        this.createElevators(_amountOfElevators)
        this.createCallButtons(_amountOfFloors)
        
    }  

     


    requestlevator(){

    }

    createElevators(amountOfElevators) {
        
        for (let i = 1; i <= amountOfElevators; i++) {
            this.elevatorList.push(new Elevator(i, this._amountOfFloors));
        }

    }

    createCallButtons(amountOfFloors) {
        let buttonFloor = 1;
        let CallButtonId = 1;

        for (let i = 1; i <= amountOfFloors ; i++) {
            if (buttonFloor < amountOfFloors){ 
            this.callButtonList.push(new CallButton(i, i, 'up'));
            CallButtonId++; 
              }
              if (buttonFloor > 1 ){
                this.callButtonList.push(new CallButton(i, i, 'down'));
                CallButtonId++;

              } 
              buttonFloor++; 

        }
    }
    

    requestElevator(currentFloor, direction) {

    }

    findBestElevator(requestedFloor, requestedDirection) {
        let bestElevator = 0;
        let bestScore = 0;
        let floorDistanceList = [];
        let diference = 0;

    }
}


class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id;
        this.amountOfFloors = _amountOfFloors;
        this.status = 'idle';
        this.direction = null;
        this.currentFloor = 1;
        this.floorRequestButtonList = [];
        this.floorRequestList = [];
        this.createFloorRequestButtons(_amountOfFloors)
        this.door = new Door(doorId++);
        
        
    }
    

    requestFloor(requestedFloor, direction) {

    }

    move() {
        while (this.floorRequestList > 0) {
            for (var i = 0; i < this.floorRequestList.length;) {
                if (this.currentFloor < this.floorRequestList[0]) {
                    this.direction = 'up';
                    this.door.closeDoors();
                }
                //status = 'moving';
                while (this.currentFloor < this.floorRequestList[0]) {
                    this.currentFloor++
                }
                this.door.openDoors();
                if (this.currentFloor > this.floorRequestList[0]) {
                    this.direction = 'down';
                    this.door.closeDoors();
                }
                //status - 'moving';

                while (this.currentFloor > this.floorRequestList[0]) {
                    this.currentFloor--
                }

                this.door.openDoors();
                //status = 'stopped';
                this.door.closeDoors();
            }

            this.floorRequestList.shift();
        }

    }
    status = 'idle';

    createFloorRequestButtons(amountOfFloors) {
        for (let i = 1; i <= amountOfFloors; i++) {
            this.floorRequestButtonList.push(new FloorRequestButton(callButtonId++, i)); 
        }
    }

}  
class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id;
        this.floor = _floor;
        this.direction = _direction;
        
    }
    floor = 1;
    direction = "up";
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id;
        this.floor = _floor;
        this.status = 'off';
    }   floor = 1;
}

class Door {
    constructor(_id) {
        this.ID = _id;
        this.status = "idle";
              


    }

    openDoors() {
        this.status = "open"
        console.log(statuts);
    }


    closeDoors() {
        this.status = "close"
    }




}


module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }