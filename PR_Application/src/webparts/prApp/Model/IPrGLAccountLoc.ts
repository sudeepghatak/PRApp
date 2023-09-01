export class IPRExpenseGLLoc{
    Title:number;
    OrderType: string;
    Desc: string;
    // TypeOfPurchase?: string;

  //   constructor(Title:number,OrderType: string,Desc: string,TypeOfPurchase: string){
  //       this.Title=Title;
  //       this.OrderType=OrderType;
  //       this.Desc=Desc;
  //       this.TypeOfPurchase=TypeOfPurchase;
  // }
}

export class IPRPrepaidGLLoc{
    Type_of_Purchase:string;
    GL_Code: number;
    GL_Code_Description: string;
    Documents_Needed: string;

    constructor(Type_of_Purchase:string,GL_Code: number,GL_Code_Description: string,Documents_Needed: string){
        this.Type_of_Purchase=Type_of_Purchase;
        this.GL_Code=GL_Code;
        this.GL_Code_Description=GL_Code_Description;
        this.Documents_Needed=Documents_Needed;
  }
}