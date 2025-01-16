import {ReactNode} from "react";
import {Fields} from "../pages/Fields.tsx";
import {Logs} from "./Logs.ts";

export class Crop {
    // cropCode: string;
    // commonName: string;
    // scientificName: string;
    // image: File | null;
    // category: string;
    // cropSeason: string;
    // field: Array<Fields>;
    // fieldCode: ReactNode;

    crop_code: string;
    common_name: string;
    specific_name: string;
    crop_image: string;
    category: string;
    crop_season: string;
    field_code: string;
    logsDTOS: Logs[];
//
//     constructor(cropCode: string, commonName: string, scientificName: string, image: File, cropSeason: string, category: string, field: Array<Fields>) {
//         this.cropCode = cropCode;
//         this.commonName = commonName;
//         this.scientificName = scientificName;
//         this.image = image;
//         this.category = category;
//         this.cropSeason = cropSeason;
//         this.field = field;
//
//     }
// }


    constructor(crop_code: string, common_name: string, specific_name: string, crop_image: string, category: string, crop_season: string, field_code: string, logsDTOS: Logs[]) {
        this.crop_code = crop_code;
        this.common_name = common_name;
        this.specific_name = specific_name;
        this.crop_image = crop_image;
        this.category = category;
        this.crop_season = crop_season;
        this.field_code = field_code;
        this.logsDTOS = logsDTOS;
    }
}