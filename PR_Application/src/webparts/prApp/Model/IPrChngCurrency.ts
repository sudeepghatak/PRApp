export class IprChngCurrency{
    From:string|undefined;
    To:string|undefined;
    Exchange_Rate:string|undefined;
    Exchange_Rate_Date:string|undefined;

    constructor(From:string,To:string,Exchange_Rate:string,Exchange_Rate_Date:string){
        this.From=From;
        this.To=To;
        this.Exchange_Rate=Exchange_Rate;
        this.Exchange_Rate_Date=Exchange_Rate_Date;
    }
}