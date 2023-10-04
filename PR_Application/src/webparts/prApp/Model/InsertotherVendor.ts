

export class insertOtherVendor{
        Title:string;
        PlantNumber: number;
        StorageLocation: string;
        P2PBuy: string;
        NPIBuy: string;
        IsAvailable: boolean;
        IsAvlblShpToLocation: boolean;
        IsAesyntLocation: boolean;
        Country: string

    constructor(Title:string,PlantNumber: number,StorageLocation: string,P2PBuy: string,
                NPIBuy: string,IsAvailable: boolean,IsAvlblShpToLocation: boolean,
                IsAesyntLocation: boolean,Country: string){
        this.Title=Title;
        this.PlantNumber=PlantNumber;
        this.StorageLocation=StorageLocation;
        this.P2PBuy=P2PBuy;
        this.NPIBuy=NPIBuy;
        this.IsAvailable=IsAvailable;
        this.IsAvlblShpToLocation=IsAvlblShpToLocation;
        this.IsAesyntLocation=IsAesyntLocation;
        this.Country=Country
    }
}