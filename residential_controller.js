const { curry } = require("prelude-ls");

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
        for (let i = 1; i <= this._amountOfElevators; i++) {
            this.elevatorList.push(new Elevator(i, this._amountOfFloors));
        }

    }

    createCallButtons(amountOfFloors) {
        for (let i = 1; i <= this._amountOfFloors; i++) {
            this.callButtonList.push(new CallButton(i, i, 'up')); 

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
        this.id = _id;
        this.amountOfFloors = _amountOfFloors;
        this.status = 'idle';
        this.direction;
        this.currentFloor = 1;
        this.RequestButtonList = [];
        this.floorRequestList = [];
        this.createRequestButtons(_amountOfFloors)
    }


    requestFloor(direction, floorRequestList, _id) {

    }
    move(requestedFloor, ) {
        while (floorRequestList > 0) {
            for (var i = 0; i < floorRequestList.length;) {
                if (currentFloor < floorRequestList[0]) {
                    direction = 'up';
                    closeDoors();
                }
                //status = 'moving';
                while (currentFloor < floorRequestList[0]) {
                    currentFloor++
                }
                openDoors();
                if (currentFloor > floorRequestList[0]) {
                    direction = 'down';
                    closeDoors();
                }
                //status - 'moving';

                while (currentFloor > floorRequestList[0]) {
                    currentFloor--
                }

                openDoors();
                //status = 'stopped';
                closeDoors();
            }
            floorRequestList.shift();
        }

    }
    status = 'idle';

    createRequestButtons(_amountOfFloors) {
        for (let i = 1; i <= this._amountOfFloors; i++) {
            this.RequestButtonList.push(new CallButton(i, floor));


        }
    }

}  
class CallButton {
    constructor(_id, _floor, _direction) {
        this._id = _id;
        this._floor = _floor;
        this._direction = _direction;

    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this._id = _id;
        this._floor = _floor;
        this.status = 'off';
    }
}

class Door {
    constructor(_id) {
        this._id = _id;
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