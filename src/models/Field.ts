import {Crop} from "./Crop.ts";
import {Log} from "./Log.ts";
import {Staff} from "./Staff.ts";
import {Equipment} from "./Equipment.ts";

export class Field {
    fieldCode: string;
    fieldName: string;
    location: string;
    extentSize: number;
    image1: string;
    image2: string;
    cropDTOS: Crop[];
    staffDTOS: Staff[];
    logsDTOS: Log[];
    equipmentDTOS: Equipment[];


    constructor(fieldCode: string, fieldName: string, location: string, extentSize: number, image1: string, image2: string, cropDTOS: Crop[], staffDTOS: Staff[], logsDTOS: Log[], equipmentDTOS: Equipment[]) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.image1 = image1;
        this.image2 = image2;
        this.cropDTOS = cropDTOS;
        this.staffDTOS = staffDTOS;
        this.logsDTOS = logsDTOS;
        this.equipmentDTOS = equipmentDTOS;
    }

}