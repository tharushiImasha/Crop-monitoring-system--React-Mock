import {Logs} from "./Logs.ts";

export class Crop {
    crop_code: string;
    common_name: string;
    specific_name: string;
    crop_image: string;
    category: string;
    crop_season: string;
    field_code: string;
    logsDTOS: Logs[];

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