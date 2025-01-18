export class Equipment {
    equipment_id: string;
    name: string;
    type: Type;
    status: Status;
    staff_id: string;
    field_code: string;
}

export type Type = "Electrical" | "Mechanical";

export type Status = "Available" | "Not Available";
