export class ReponseHelpeClassMaster {



        status:boolean;
        data:any;
    
        constructor(statuscode:boolean,jwt:any)
        {
            this.status=statuscode;
            this.data=jwt;
    
        }
    
    
}
