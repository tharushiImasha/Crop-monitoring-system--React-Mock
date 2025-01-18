import {useDispatch, useSelector} from "react-redux";
import {resetFormData, updateFormData} from "../reducers/FormSlice.ts";
import {Inputs} from "../components/Inputs.tsx";
import {AddButton} from "../components/AddButton.tsx";
import {addCrop, deleteCrop, updateCrop} from "../reducers/CropSlice.ts";
import {useState} from "react";
import {addVehicle, deleteVehicle, updateVehicle} from "../reducers/VehicleSlice.ts";
import {Crop} from "../models/Crop.ts";
import {Vehicle} from "../models/Vehicle.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";

export function Vehicles() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const vehicle = useSelector((state) => state.vehicle );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editVehicleId, setEditVehicleId] = useState<string | null>(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editVehicleId) {
            const updatedVehicle = { ...formData, vehicle_code: editVehicleId };
            dispatch(updateVehicle(updatedVehicle));
            setIsEditing(false);
            setEditVehicleId(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            dispatch(addVehicle(formData));
        }
    };

    function handleDelete(e, vehicles: Vehicle) {

        e.preventDefault();
        e.stopPropagation();

        if (!vehicles.vehicle_code) {
            alert("Vehicles code is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete vehicle "${vehicles.category}" (${vehicles.vehicle_code})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteVehicle(vehicles));
            } catch (error) {
                console.log(error)
                alert('Failed to delete vehicle. Please try again.');
            }

        }

    }

    const handleEditClick = (e: React.MouseEvent, vehicles: Vehicle) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Starting edit process for vehicle:', vehicles.vehicle_code);

        setIsEditing(true);
        setEditVehicleId(vehicles.vehicle_code);

        setTimeout(() => {
            const vehicleFields = [
                "vehicle_code",
                "license_plate_number",
                "category",
                "fuel_type",
                "remark"
            ];

            vehicleFields.forEach(field => {
                dispatch(updateFormData({
                    name: field,
                    value: vehicles[field] || ''
                }));
            });

        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Vehicles</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Vehicles ID"
                        placeholder="Enter Vehicles ID"
                        name="vehicle_code"
                        value={formData.vehicle_code || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="License Plate Number"
                        placeholder="Enter license plate number"
                        name="license_plate_number"
                        value={formData.license_plate_number || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Fuel Type"
                        placeholder="Enter fuel type"
                        name="fuel_type"
                        value={formData.fuel_type || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Vehicles Category"
                        placeholder="Enter category"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Remark"
                        placeholder="Enter special remark if you have"
                        name="remark"
                        value={formData.remark || ''}
                        onChange={handleChange}
                    />

                </div>
                <AddButton name={isEditing ? "Update" : "Register"}/>

                <section className="crops-table-sec">
                    <div className="crop-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                            <tr>
                                <th className="custom-table-th">Vehicles ID</th>
                                <th className="custom-table-th">License Plate Number</th>
                                <th className="custom-table-th">Fuel Type</th>
                                <th className="custom-table-th">Category</th>
                                <th className="custom-table-th">Remark</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {vehicle.map((vehicles: Vehicle) => (
                                <tr>
                                    <td className="custom-table-td">{vehicles.vehicle_code}</td>
                                    <td className="custom-table-td">{vehicles.license_plate_number}</td>
                                    <td className="custom-table-td">{vehicles.fuel_type}</td>
                                    <td className="custom-table-td">{vehicles.category}</td>
                                    <td className="custom-table-td">{vehicles.remark}</td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, vehicles)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, vehicles)}
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