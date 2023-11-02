export class Functionality{

    static findConnectPrId(ConnectPRIDvalue:number):number{
        let ConnectPRIDvaluestr:String = ConnectPRIDvalue.toString();
        let totalLoop=(10 - ConnectPRIDvaluestr.length);
        for (let i = 0; i <totalLoop;  i++) {
            console.log("This is The Dta Fun --7",ConnectPRIDvaluestr)
            ConnectPRIDvaluestr = "0" + ConnectPRIDvaluestr;
        }
        console.log("This is The Dta Fun --",ConnectPRIDvaluestr)
        let connectID=+ConnectPRIDvaluestr;
        return connectID;
    }

} 