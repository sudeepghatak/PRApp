import {EmployeeDetails} from '../Model/employee_details';
export class EmployeeData{
    static  fetchEmployeeDetails ():Promise<any>{
        return new Promise((resolve,reject)=>{
            let employeeDetailsList=[];
            import('../assets/e1.json').then((newemployeeData)=>{

                for(let i:number=0;i<newemployeeData['default'].length;i++){
                    let fullName: string = newemployeeData['default'][i].FirstName + " " + newemployeeData['default'][i].LastName;

                    let employeeDetail=new EmployeeDetails(newemployeeData['default'][i].EmployeeID,fullName,newemployeeData['default'][i].CompanyCode,newemployeeData['default'][i].CostCenter)
                    employeeDetailsList.push(employeeDetail)
                }
                resolve(employeeDetailsList)

            })
        })

    }

}