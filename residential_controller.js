class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this._id = _id; 
        this._amountOfFloors = _amountOfFloors;
        this._amountOfElevators = _amountOfElevators;


    };

    requestELevator(currentFloor, direction){

    }
    findBestElevator(requestedFloor, requestedDirection){
        let bestElevator = 0;
        let bestScore = 0;
        let floorDistanceList = [];
        let diference = 0;

    }
    

}

class Elevator {
    constructor(_id, _amountOfFloors) {
        this._id = _id;
        this._amountOfFloors = _amountOfFloors;
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
    }
}

class Door {
    constructor(_id) {
        this._id = _id;
        
        

    }

    openDoors(){
        let status = 'Opened';
        
        console.log('doors are open');
        console.log('wait 15 seconds');
        this.closeDoors();
    }

    closeDoors(){
        let status = 'Closed';
        console.log('doors are closed');
    }

}

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }