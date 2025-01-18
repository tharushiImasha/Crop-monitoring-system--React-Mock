import {Equipment} from "./Equipment.ts";
import {Log} from "./Log.ts";
import {Field} from "./Field.ts";
import {Vehicle} from "./Vehicle.ts";

export class Staff {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
    address: string;
    designation: string;
    role: Role;
    gender: Gender;
    dob: string;
    joinedDate: string;
    vehicleDTOs: Vehicle[];
    fieldDTOs: Field[];
    logsDTOs: Log[];
    equipmentDTOs: Equipment[];


    constructor(id: string, firstName: string, lastName: string, email: string, contactNo: string, address: string, designation: string, role: Role, gender: Gender, dob: string, joinedDate: string, vehicleDTOs: Vehicle[], fieldDTOs: Field[], logsDTOs: Log[], equipmentDTOs: Equipment[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNo = contactNo;
        this.address = address;
        this.designation = designation;
        this.role = role;
        this.gender = gender;
        this.dob = dob;
        this.joinedDate = joinedDate;
        this.vehicleDTOs = vehicleDTOs;
        this.fieldDTOs = fieldDTOs;
        this.logsDTOs = logsDTOs;
        this.equipmentDTOs = equipmentDTOs;
    }
}

export type Role = "Admin" | "User" | "Manager";

export type Gender = "Male" | "Female";

