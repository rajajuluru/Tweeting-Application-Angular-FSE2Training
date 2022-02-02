export class JWTResponseHelperClass {

    status:boolean;
    jwtToken:string;

    constructor(statuscode:boolean,jwt:string)
    {
        this.status=statuscode;
        this.jwtToken=jwt;

    }
}
