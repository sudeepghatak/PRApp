
import { CipNumberDetails } from "../Model/cip_numbers";
export class CipData{
    static  fetchCpiDetails (cipcompanyCode:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            let cipDetailsList=[];
            import('../assets/p1.json').then((newcipData)=>{
                let filtercipData=[];
                filtercipData=newcipData["default"].filter((cipdata)=>cipdata.CompanyCode ===cipcompanyCode )

                for(let i:number=0;i<filtercipData.length;i++){
                    console.log(filtercipData[i].CompanyCode);
                    let cipDetails=new CipNumberDetails(filtercipData[i].MainAssetNumber,filtercipData[i].Assetdescription,filtercipData[i].CompanyCode);
                    cipDetailsList.push(cipDetails)
                }
                resolve(cipDetailsList)

            })
        })

    }

}