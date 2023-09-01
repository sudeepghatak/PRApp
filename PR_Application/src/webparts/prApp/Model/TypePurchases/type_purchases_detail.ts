export class TypeofPurchaseDetail{
        typeofPurchaseName:string;
        engprojectCodeList:ProjectCodeList;
        markprojectCodeList:ProjectCodeList;
        costCenterList:string[];
    
    constructor(typeofPurchaseName:string){
            this.typeofPurchaseName=typeofPurchaseName;
            this.engprojectCodeList = new ProjectCodeList(); // Initialize engprojectCodeList
        this.markprojectCodeList = new ProjectCodeList(); 
            
            this.costCenterList=[];
         }
        saveintoProjectCode(name:string,item:string){
            if(name==="Engineering"){
                this.engprojectCodeList.projectCodeName="Engineering";
                this.engprojectCodeList.projectCodeList.push(item);

            }else if(name==="Marketing"){
                this.markprojectCodeList.projectCodeName="Marketing";
                this.markprojectCodeList.projectCodeList.push(item);
            }

        }

        fetchProjectCodelastIndex(name:string){
            if(name==="Engineering"){
                return this.engprojectCodeList.projectCodeList[this.engprojectCodeList.projectCodeList.length-1];

            }else if(name==="Marketing"){
                return this.markprojectCodeList.projectCodeList[this.markprojectCodeList.projectCodeList.length-1];;

            }

        }
        

        //  public projectCodelastIndex():string{
        //     let projectCode:string=this.projectCodeList[this.projectCodeList.length-1];
        //     return projectCode;
        //  }
         public costCenterlastIndex():string{
            let costCenter:string=this.costCenterList[this.costCenterList.length-1];
            return costCenter;
         }
}

class ProjectCodeList{
    projectCodeName:string;
    projectCodeList:string[];
    constructor() {
        this.projectCodeName = ""; // Initialize projectCodeName
        this.projectCodeList = []; // Initialize projectCodeList
    }
}