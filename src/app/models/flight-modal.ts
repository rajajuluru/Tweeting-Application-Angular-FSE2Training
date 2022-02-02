import { AirLines } from "./air-lines";

export class FlightModal {
    constructor(){
        
    }
    fromLocation!:string;
    toLocation!:string;
    lockstatus!:number;
    date!:Date;
    ipaddress!:string;
    price!:number;
    airlineDetails!:AirLines;
    airLineId!:string;
    seatsCount!:number;
    remarks!:string;
    flightID!:string;

}
