import { log } from "sp-pnp-js";
import { IPRPrepaidGLLoc } from "../webparts/prApp/Model/IPrGLAccountLoc";
import { IPRTitleData } from "../webparts/prApp/Model/IprTitleData";

export class GlobalStore{
    static dispatch(arg0: { payload: string; type: "reducers/deleteFileDoc"; }) {
      throw new Error("Method not implemented.");
    }
    private static  Email:string ;
    private static Name:string;
    private static mainEmail:string;
    private static mainName:string;
    private static connetPrId:string;
    private static Tooldata={};

    private static uishowmode:string;
    private static connectPRID:string;
    private static viewmodeOn=false;
    private static enterMainpage=false;
    private static Totalamount:number;
    private static currencyChngTotalamount: number;
    private static changeCurr:string;
    private static DefaultCurr:string;


    private static titledata:IPRTitleData={
        name: "",
        countryKey: "",
        currencyKey: "",
        costCenter: "",
        TypeofbuyOption: "",
        IsPrepaidCapital: "",
        LegacyCompany:"",
    };
    private static randomNumber:number=0;
    static incrementRandomNumber(){
        this.randomNumber++;
    }
    static getRandomNumber(){
        return this.randomNumber;
    }
    //Total amount
    static setTotal(amount:number){
        this.Totalamount=amount;
    }
    static getTotal(){
        return this.Totalamount;
    }

    //currency change Total amount
    static setChangCurrTotalAmount(curr:number){
        this.currencyChngTotalamount=curr;
    }
    static getChangCurrTotalAmount(){
        console.log("currency",this.currencyChngTotalamount);
        return this.currencyChngTotalamount;     
    }
    //currency change Currency
    static setChngCurr(Curr:string){
        this.changeCurr=Curr;
    }
    static getChngCurr(){
        return this.changeCurr;
    }
    //Default Currency-----------------
    static getDefaultCurr(){
        this.DefaultCurr="USD";
        console.log("DefaultCurr..DefaultCurr:",this.DefaultCurr);  
        return this.DefaultCurr;
    }

    static changeEnterMainpage(changeMainpage:boolean){
        this.enterMainpage=changeMainpage

    }
    static getEnterMainpage(){
        return this.enterMainpage
    }
    static changeviewmodeOn(modeValue:boolean){
        this.viewmodeOn=modeValue
    }
    static getviewmodeOn(){
        return this.viewmodeOn
    }

    // static storeconnectPRID(cId:string){
    //     this.connectPRID=cId;
    // }
    // static getconnectPRID(){
    //     return this.connectPRID;

    // }

    static storeUishowMode(uimode:string){
        localStorage.setItem("uimode",uimode);
        this.uishowmode=uimode;
    }
    static getUishowMode(){
        let uishowmode:string;
        if(localStorage.getItem('uimode')==null){
            uishowmode=null;
        }else{
            uishowmode=localStorage.getItem('uimode')
        }
        return uishowmode;
    }
    static storeEmail(email:string,status:boolean){
         console.log("email",email);
         
            this.Email=email;
            if(status){
                this.mainEmail=email;

            }
            console.log("this.Email",this.Email);
            
    }
    
    
    static storeName(Name:string,status:boolean){
        console.log("Name",Name);
        this.Name=Name;
        if(status){
            this.mainName=Name

        }
        
    }
    static storePrId(connetPrId){
        this.connetPrId=connetPrId;
        console.log("storePrId--storePrId ;;",connetPrId);
    }

    static getPrId(){
        console.log("getPrId--getPrId ;;",this.connetPrId);
        return this.connetPrId;
        
    }
    
    

    static getEmail(){
        return this.Email;
    }

    static getName(){
        return this.Name;
    }
    static getmainEmail(){
        return this.mainEmail;
    }
    static getmainName(){
        return this.mainName;
    }
    static storeTitledata(titleData){
        this.titledata=titleData,
        console.log("storeTitledata titledata-- ",this.titledata);
    }
    static getTitledata(){   
        console.log("getTitledata titledata-- ",this.titledata);
        return this.titledata;
        
    }
    static storeTooltipData(prType:string,ebuy:string,tooltipName:string,data:IPRPrepaidGLLoc[]){//SAP,prepaid,Enginner,data
        if(this.Tooldata[prType]!==undefined){
            if(this.Tooldata[prType][ebuy] ==undefined){
                this.Tooldata[prType][ebuy] =[]
                let newtooltip={
                [tooltipName]:data
            }
            this.Tooldata[prType][ebuy]={...this.Tooldata[prType][ebuy],...newtooltip};
            }else{
                let newtooltip={
                [tooltipName]:data
            }
            this.Tooldata[prType][ebuy]={...this.Tooldata[prType][ebuy],...newtooltip};

            }

        }else if(this.Tooldata[prType]===undefined){
            this.Tooldata[prType]=[];

            this.Tooldata[prType][ebuy]=[];
            let newtooltip={
                [tooltipName]:data
            }
            this.Tooldata[prType][ebuy]={...newtooltip};


        }
        // console.log("all data for pr Doc save file-------------------- ",this.Tooldata)

    }
    static getToolData(prType:string,ebuy:string,toolName:string){
        console.log(" all data ----------------- ")
        console.log(prType,ebuy,toolName)
        console.log(this.Tooldata[prType])
        console.log(this.Tooldata[prType][ebuy])
        console.log("toolName::",this.Tooldata[prType][ebuy][toolName])

        return this.Tooldata[prType][ebuy][toolName];
    }

}