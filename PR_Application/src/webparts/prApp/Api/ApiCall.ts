import axios from 'axios'

export class VendorApi {
    static async vendorDataApi(companyCode) {
          
        let res = await axios.get(`https://spdev365api.omnicell.com/api/getVendorName_Result?compCode=${companyCode}`)
        return res.data
        
    }
}

export class CIPApi {
    static async CIPDataApi(companyCode) {
          
        let res = await axios.get(`https://spdev365api.omnicell.com/api/getPRCIP_Result?compCode=${companyCode}`)
        return res.data
        
    }
}