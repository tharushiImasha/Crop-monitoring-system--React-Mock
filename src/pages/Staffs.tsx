import {Inputs} from "../components/Inputs.tsx";
import {resetFormData, updateFormData} from "../reducers/FormSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {AddButton} from "../components/AddButton.tsx";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";
import {SelectField} from "../components/SelectField.tsx";
import {Gender, Role, Staff} from "../models/Staff.ts";
import {addStaff, deleteStaff, updateStaff} from "../reducers/StaffSlice.ts";

export function Staffs() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const staff = useSelector((state) => state.staff );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editStaffId, setEditStaffId] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedGender, setSelectedGender] = useState<Gender | "">("");

    const genders: Gender[] = ["Male", "Female"];

    const roles: Role[] = ["Admin", "User", "Manager"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editStaffId) {
            const updatedStaff = { ...formData, id: editStaffId };
            dispatch(updateStaff(updatedStaff));
            setIsEditing(false);
            setEditStaffId(null);
            setSelectedGender("");
            setSelectedValue("");
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            setSelectedGender("");
            setSelectedValue("");
            dispatch(addStaff(formData));
        }

    };

    function handleDelete(e, staff: Staff) {

        e.preventDefault();
        e.stopPropagation();

        if (!staff.id) {
            alert("Staffs id is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete staff "${staff.firstName}" (${staff.id})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteStaff(staff));
            } catch (error) {
                console.log(error)
                alert('Failed to delete staff. Please try again.');
            }

        }

    }

    const handleEditClick = (e: React.MouseEvent, staff: Staff) => {
        e.preventDefault();
        e.stopPropagation();

        setIsEditing(true);
        setEditStaffId(staff.id);

        setTimeout(() => {
            const staffFields = [
                "id",
                "firstName",
                "lastName",
                "email",
                "contactNo",
                "address",
                "designation",
                "role",
                "gender",
                "dob",
                "joinedDate"
            ];

            staffFields.forEach(field => {
                dispatch(updateFormData({
                    name: field,
                    value: staff[field] || ''
                }));
            });
            setSelectedValue(staff.role || "");
            setSelectedGender(staff.gender || "");

        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Staff</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="ID"
                        placeholder="Enter your ID"
                        name="id"
                        value={formData.id || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="First Name"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Last Name"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Contact Number"
                        placeholder="Enter your contact number"
                        type="number"
                        name="contactNo"
                        value={formData.contactNo || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Address"
                        placeholder="Enter your address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Designation"
                        placeholder="Enter your designation"
                        name="designation"
                        value={formData.designation || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Date of Birth"
                        placeholder="Enter your dob"
                        type="date"
                        name="dob"
                        value={formData.dob || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Joined Date"
                        placeholder="Enter your joined date"
                        type="date"
                        name="joinedDate"
                        value={formData.joinedDate || ''}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Role"
                        name="exampleSelect"
                        value={selectedValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSelectedValue(value);
                            dispatch(updateFormData({ name: "role", value }));
                        }}
                        options={roles.map((role) => ({
                            value: role,
                            label: role,
                        }))}
                    />

                    <div className="mb-4">
                        <label className="block text-[12px] font-medium text-gray-700 mb-3 font-bold">
                            Gender
                        </label>
                        <div className="flex gap-[20px] space-x-6">
                            {genders.map((gender) => (
                                <label key={gender} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={selectedGender === gender}
                                        onChange={(e) => {
                                            const value = e.target.value as Gender;
                                            setSelectedGender(value);
                                            dispatch(updateFormData({ name: "gender", value })); // Update Redux state
                                        }}
                                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-[#026664af] checked:border-[#004463] focus:ring-2 focus:ring-[#004463] cursor-pointer"
                                    />
                                    <span className="text-[12px] font-medium text-gray-700">{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <AddButton name={isEditing ? "Update" : "Register"}/>

                <section className="crops-table-sec">
                    <div className="crop-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                            <tr>
                                <th className="custom-table-th">ID</th>
                                <th className="custom-table-th">First name</th>
                                <th className="custom-table-th">Last Name</th>
                                <th className="custom-table-th">Email</th>
                                <th className="custom-table-th">Contact Number</th>
                                <th className="custom-table-th">Address</th>
                                <th className="custom-table-th">Designation</th>
                                <th className="custom-table-th">Role</th>
                                <th className="custom-table-th">Gender</th>
                                <th className="custom-table-th">DOB</th>
                                <th className="custom-table-th">Joined Date</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {staff.map((staffs: Staff) => (
                                <tr>
                                    <td className="custom-table-td">{staffs.id}</td>
                                    <td className="custom-table-td">{staffs.firstName}</td>
                                    <td className="custom-table-td">{staffs.lastName}</td>
                                    <td className="custom-table-td">{staffs.email}</td>
                                    <td className="custom-table-td">{staffs.contactNo}</td>
                                    <td className="custom-table-td">{staffs.address}</td>
                                    <td className="custom-table-td">{staffs.designation}</td>
                                    <td className="custom-table-td">{staffs.role}</td>
                                    <td className="custom-table-td">{staffs.gender}</td>
                                    <td className="custom-table-td">{staffs.dob}</td>
                                    <td className="custom-table-td">{staffs.joinedDate}</td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, staffs)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, staffs)}
                                            className="bg-[#ef4444] text-black px-4 py-2 mt-1 rounded hover:bg-[#f87171]"
                                        >
                                            <TrashIcon className="w-5 h-5 "/>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </section>

            </form>
        </>
    );

}