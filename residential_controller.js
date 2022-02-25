let columnIdCounter = 0;
let elevatorID = 1
let floorRequestButtonID = 1
let callButtonID = 1
let doorID = 1

//****************************************this is our first class the initiates the column***************//
class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.ID = _id
        this.amountOfFloors = _amountOfFloors
        this.amountOfElevators = _amountOfElevators
        this.status = "online"
        this.elevatorList = []
        this.callButtonList = []
        this.createElevators()
        this.createCallButtons()
    };

    //**********************************here we create our elevators in a list ****************************/
    createElevators() {
        for (let i = 0; i < this.amountOfElevators; i++) {
            let elevator = new Elevator(elevatorID++, this.amountOfFloors)
            this.elevatorList.push(elevator)
            
        }
    }

    //***************************here we create the buttons outside the elevator/ on the floors************ */
    createCallButtons() {
        let buttonFloor = 1
        // let direction = ‘’
        for (let i = 1; i <= this.amountOfFloors; i++) {
            // console.log(floor);
            if (buttonFloor < this.amountOfFloors) {
                let callButton = new CallButton(callButtonID++, this.amountOfFloors, "up")
                this.callButtonList.push(callButton)
            } if (buttonFloor > 1) {
                let callButton = new CallButton(callButtonID++, this.amountOfFloors, "down")
                this.callButtonList.push(callButton)
            }
            buttonFloor++
            
        }
    }
    
    //****************************here we request the elevator******************** *********************** */
    requestElevator(floor, direction) {
        let elevator = this.findElevator(floor, direction)
        elevator.floorRequestList.push(floor)
        elevator.door.status = "close"
        elevator.move()
        elevator.door.status = "open"
        return elevator
    }

    //**************************this method helps us find the best elevator***************************** */
    findElevator(requestedFloor, requestedDirection) {
        let bestElevatorInformations = {
            bestElevator: null,
            bestScore: 5,
            referenceGap: 10000000
        }
        for (let i = 0; i < this.elevatorList.length; ++i) {
            let elevator = this.elevatorList[i]
            if (requestedFloor == elevator.currentFloor && elevator.status == "stopped" && requestedDirection == elevator.direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestElevatorInformations, requestedFloor);
            } else if (requestedFloor > elevator.currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor);
            } else if (requestedFloor < elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor);
            } else if (elevator.status == "idle") {
                bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestElevatorInformations, requestedFloor);
            } else {
                bestElevatorInformations = this.checkIfElevatorIsBetter(4, elevator, bestElevatorInformations, requestedFloor);
            }
        }
        return bestElevatorInformations.bestElevator
    }
    //**********************************here we keep up to date wich one is the best elevator*********************** */
    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestElevatorInformations, floor) {
        if (scoreToCheck < bestElevatorInformations.bestScore) {
            bestElevatorInformations.bestScore = scoreToCheck
            bestElevatorInformations.bestElevator = newElevator
            bestElevatorInformations.referenceGap = Math.abs(newElevator.currentFloor - floor)
        } else if (bestElevatorInformations.bestScore == scoreToCheck) {
            let gap = Math.abs(newElevator.currentFloor - floor)
            if (bestElevatorInformations.referenceGap > gap) {
                bestElevatorInformations.bestElevator = newElevator
                bestElevatorInformations.referenceGap = gap
                bestElevatorInformations.bestScore = scoreToCheck
            }
        }
        return bestElevatorInformations
    }
}
// ****************************this is my class elevator class that creates the elevators*************************//
class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id
        this.status = "idle"
        this.amountOfFloors = _amountOfFloors
        this.currentFloor = 1
        this.direction = null
        this.door = new Door(doorID++)
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.createFloorRequestButtons(this.amountOfFloors)
    }
    //********************************here we create the buttons**********************************************//
    createFloorRequestButtons() {
        let buttonFloor = 1
        for (let i = 1; i <= this.amountOfFloors; i++) {
            let floorRequestButton = new FloorRequestButton(floorRequestButtonID++, "off", buttonFloor++)
            this.floorRequestButtonList.push(floorRequestButton)
        }
    }
    //*********************thiss method request the floor and uses the method move elevator to move****************//
    requestFloor(floor) {
        this.floorRequestList.push(floor)
        this.door.status = "closed"
        this.move()
        this.door.status = "open"
    }

    //************************************this methods moves our elevator******************************************//
    move() {
        while (this.floorRequestList.length != 0) {
            let destination = this.floorRequestList.shift()
            this.status = "moving"
            if (this.currentFloor < destination) {
                this.direction = "up"
                this.sortFloorList()
                while (this.currentFloor < destination) {
                    this.currentFloor++
                    this.screenDisplay = this.currentFloor
                }
            } else if (this.currentFloor > destination) {
                this.direction = "down"
                this.sortFloorList()
                while (this.currentFloor > destination) {
                    this.currentFloor--
                    this.screenDisplay = this.currentFloor
                }
            }
            this.status = "stopped"
            
        }
        this.status = "idle"
    }

    //************here we sort the floor list***************************** */
    sortFloorList() {
        if (this.direction == "up") {
            this.floorRequestList.sort()
        } else {
            this.floorRequestList.reverse()
        }
    }
}

//*********************************here we create our  floor buttons**************** */
class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id
        this.status = "off"
        this.floor = _floor
        this.direction = _direction
    }
}

//*******************************here is the class for the buttons inside the elevtor******** */
class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id
        this.status = "off"
        this.floor = _floor
    }
}

//***********************here we create the door******************** */
class Door {
    constructor(_id) {
        this.ID = _id
        this.status = "close"
    }
}

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }
