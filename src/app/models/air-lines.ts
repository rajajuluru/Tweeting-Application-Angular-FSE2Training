
export class AirLines {
    
	  airLineId:string;

	  airLineName:string;

	  airLineDescription:string;
	
	  date:Date;
	  ipAddress:string;
	  lockStatus:number;
    


      constructor(AirLineId:string,

        AirLineName:string,
  
        AirLineDescription:string,
      
        date:Date,
        ipAddress:string,
        LockStatus:number)
        {
            this.airLineId=AirLineId;

            this.airLineName=AirLineName;
      
            this.airLineDescription=AirLineDescription;
          
           this.date=date;
            this.ipAddress=ipAddress;
            this.lockStatus=LockStatus;
        }
}
