import { log } from "sp-pnp-js";
import { IPRPrepaidGLLoc } from "../webparts/prApp/Model/IPrGLAccountLoc";

export class GlobalStore{
    private static  Email:string ;
    private static Name:string;
    private static mainEmail:string;
    private static mainName:string;
    private static connetPrId:string;
    private static Tooldata={};

    private static uishowmode:string;
    private static connectPRID:string;

    static storeconnectPRID(cId:string){
        this.connectPRID=cId;
    }
    static getconnectPRID(){
        return this.connectPRID;

    }

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
        console.log(this.Tooldata[prType][ebuy][toolName])

        return this.Tooldata[prType][ebuy][toolName];
    }

}