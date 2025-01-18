export class Log {
    log_code: string;
    log_date: string;
    log_details: string;
    observed_image: string;
    field_code: string;
    crop_code: string;
    id: string;

    constructor(log_code: string, log_date: string, log_details: string, observed_image: string, field_code: string, crop_code: string, id: string) {
        this.log_code = log_code;
        this.log_date = log_date;
        this.log_details = log_details;
        this.observed_image = observed_image;
        this.field_code = field_code;
        this.crop_code = crop_code;
        this.id = id;
    }
}