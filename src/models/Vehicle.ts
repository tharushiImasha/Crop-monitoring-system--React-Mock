export class Vehicle {
    vehicle_code: string;
    license_plate_number: string;
    category: string;
    fuel_type: string;
    status: string;
    remark: string;
    id: string;

    constructor(vehicle_code: string, license_plate_number: string, category: string, fuel_type: string, status: string, remark: string, id: string) {
        this.vehicle_code = vehicle_code;
        this.license_plate_number = license_plate_number;
        this.category = category;
        this.fuel_type = fuel_type;
        this.status = status;
        this.remark = remark;
        this.id = id;
    }
}