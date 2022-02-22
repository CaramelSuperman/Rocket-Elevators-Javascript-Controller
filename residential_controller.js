const { curry } = require("prelude-ls");

class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this._id = ID; 
        this._amountOfFloors = _amountOfFloors;
        this._amountOfElevators = _amountOfElevators;
        let ID = 1;
        let status = true;
        let elevatorList = [];
        let CallButtonList = [];
        

    }
    

    createElevator(){

    }

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
        let _id = 1;
        let status;
        let direction;
        let currentFloor = 0;
        'Door goes here'
        let floorRequestButtonList = [];
        let floorRequestList = [];
    }
requestFloor(direction, floorRequestList, _id ){

}
move(_id){
while(floorRequestList > 0){
    for (var i = 0; i < floorRequestList.length;){
        if (currentFloor < floorRequestList[0] ){
           direction = 'up';
           closeDoors(); 
        }
        //status = 'moving';
        while(currentFloor < floorRequestList[0]){
            currentFloor++
          }
          openDoors();
           if(currentFloor > floorRequestList[0]){
              direction = 'down';
              closeDoors();
            } 
            //status - 'moving';

            while (currentFloor > floorRequestList[0]){
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
        this._id = ID;
        ID = 1;
        this.status = "idle";
        

    }

    openDoors(){
        this.status = "open"

}
        

    closeDoors(){
        this.status = "close"
    }
    


        
}     
    



module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }