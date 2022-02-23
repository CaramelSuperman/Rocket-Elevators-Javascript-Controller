const { curry } = require("prelude-ls");


let elevatorId = 1;
let callButtonId = 1;
let floorRequestButtonId = 1;
let doorId = 1

                        // this is our clolumn class.//
class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        
        this.elevatorList = [];
        this.callButtonList = [];
        this.ID = _id;
        this.status = "online"
        this.createElevators(_amountOfElevators)
        this.createCallButtons(_amountOfFloors)
        
    }  

     

        //  this method help us request the elevator.//
    requestlevator(floor, direction){
        this.elevator  = findElevator(floor, direction);
        this.floorRequestList.push(floor);
        Elevator.move(elevator);
        //Elevator.operateDoors(this.elevator);

        // return elevator;
    }


        //for (let elevator of this.elevatorList){
            //if (requestedFloor = currentFloor && elevator.status == "stopped" && requestedDirection == elevator.direction){
                //let bestElevatorInformations = 

            //} 



        //}

        checkIfElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor){
            let bestElevatorInformations = {
                bestElevator: null,
                bestScore: null,
                referenceGap: null
            }
            if(scoreToCheck < bestScore) {
                bestElevatorInformations.bestScore = scoreToCheck
                bestElevatorInformations.bestElevator = newElevator
                bestElevatorInformations.referenceGap = Math.abs(newElevator.currentFloor - floor)
            } else if(bestScore == scoreToCheck) {
                let gap = Math.abs(newElevator.currentFloor - floor)
                if(referenceGap > gap){
                    bestElevatorInformations.bestElevator = newElevator
                    bestElevatorInformations.referenceGap = gap
                }
            }
            return bestElevatorInformation

        }
        


    
                    //this method help us find our best elevator//
         findElevator(requestedFloor, requestedDirection){
            let bestElevator = null
            let bestScore = 5
            let referenceGap = 10000000
            let bestElevatorInformations = null
                        //
                for(let i = 0; i < this.elevatorList.length; ++i) {
                     let elevator = this.elevatorList[i]
                            if(requestedFloor == elevator.currentFloor && elevator.status == "stopped" && requestedDirection == elevator.direction){
                                bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                            }else if(requestedFloor > elevator.currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction){
                                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                            }else if(requestedFloor > elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction){
                                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                            }else if(elevator.status === "idle"){
                                bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                            }else {
                                bestElevatorInformations = this.checkIfElevatorIsBetter(4, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                            }
                            bestElevator = bestElevatorInformations.bestElevator
                            bestScore = bestElevatorInformations.bestScore
                            referenceGap = bestElevatorInformations.referenceGap
                        }
                        return bestElevator
                    }

    createElevators(amountOfElevators) {
        
        for (let i = 1; i <= amountOfElevators; i++) {
            this.elevatorList.push(new Elevator(i, this._amountOfFloors));
        }

    }
                // this class creates our buttons//
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
    
                    // Here we request our elevator in the column//
    requestElevator(currentFloor, direction) {

    }

    
}

                // This is the Elevator class//
class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id;
        this.amountOfFloors = _amountOfFloors;
        this.status = 'stopped';
        this.direction = null;
        this.currentFloor = 1;
        this.floorRequestButtonList = [];
        this.floorRequestList = [];
        this.createFloorRequestButtons(_amountOfFloors)
        this.door = new Door(doorId++);
        
        
    }
    
            //Our method to request the floor//
    requestFloor(requestedFloor) {
        this.floorRequestList.push(requestedFloor);
        this.move();
        //
    }


            // This class move the elevator//
    move() {
        while (this.floorRequestList > 0) {
            for (var i = 0; i < this.floorRequestList.length;) {
                if (this.currentFloor < this.floorRequestList[0]) {
                    this.direction = 'up';
                    this.door.closeDoors();
                    this.status = "moving";
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
            this.status = "stopped";
            this.floorRequestList.shift();
        }
    }

        operateDoors(){
            Door.openDoors();
            Door.closeDoors();

        
    
    }
    

            //This method creates the buttons inside the elevator//
    createFloorRequestButtons(amountOfFloors) {
        for (let i = 1; i <= amountOfFloors; i++) {
            this.floorRequestButtonList.push(new FloorRequestButton(callButtonId++, i)); 
        }
    }

}
            // This class creates the buttons on each floor//
class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id;
        this.floor = _floor;
        this.direction = _direction;
        
    }
    floor = 1;
    direction = "up";
}


            // this class creates the buttons inside the elevator//
class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id;
        this.floor = _floor;
        this.status = 'off';
    }   floor = 1;
}

            // This class creates the Door objects//
class Door {
    constructor(_id) {
        this.ID = _id;
        this.status = "idle";
              


    }

        // open door method//
    openDoors() {
        this.status = "open"
        console.log(statuts);
    }

        // this method closes the door//
    closeDoors() {
        this.status = "close"
    }




}


module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }