import {Inputs} from "../components/Inputs.tsx";
import {AddButton} from "../components/AddButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {resetFormData, updateFormData} from "../reducers/FormSlice.ts";
import {SelectField} from "../components/SelectField.tsx";
import {useState} from "react";
import {Equipment, Type} from "../models/Equipment.ts";
import {addEquipment, deleteEquipment, updateEquipment} from "../reducers/EquipmentSlice.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";

export function Equipments() {

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const equipment = useSelector((state) => state.equipment);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editEqId, setEditEqId] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState('');
    const types: Type[] = ["Electrical", "Mechanical"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editEqId) {
            const updatedEq = { ...formData, id: editEqId };
            dispatch(updateEquipment(updatedEq));
            setIsEditing(false);
            setEditEqId(null);
            setSelectedValue("");
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            setSelectedValue("");
            dispatch(addEquipment(formData));
        }
    };

    function handleDelete(e, eq: Equipment) {

        e.preventDefault();
        e.stopPropagation();

        if (!eq.equipment_id) {
            alert("Equipments id is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete equipment "${eq.name}" (${eq.equipment_id})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteEquipment(eq));
            } catch (error) {
                console.log(error)
                alert('Failed to delete equipment. Please try again.');
            }

        }

    }

    const handleEditClick = (e: React.MouseEvent, eq: Equipment) => {
        e.preventDefault();
        e.stopPropagation();

        setIsEditing(true);
        setEditEqId(eq.equipment_id);

        setTimeout(() => {
            const eqFields = [
                "equipment_id",
                "name",
                "type"
            ];

            eqFields.forEach(field => {
                dispatch(updateFormData({
                    name: field,
                    value: eq[field] || ''
                }));
            });
            setSelectedValue(eq.type || "");

        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Equipments</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Equipments ID"
                        placeholder="Enter Equipments ID"
                        name="equipment_id"
                        value={formData.equipment_id || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Name"
                        placeholder="Enter equipment name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Type"
                        name="type"
                        value={selectedValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSelectedValue(value);
                            dispatch(updateFormData({ name: "type", value }));
                        }}
                        options={types.map((type) => ({
                            value: type,
                            label: type,
                        }))}
                    />
                </div>

                <AddButton name={isEditing ? "Update" : "Register"}/>

                <section className="crops-table-sec">
                    <div className="crop-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                            <tr>
                                <th className="custom-table-th">Equipments ID</th>
                                <th className="custom-table-th">Name</th>
                                <th className="custom-table-th">Type</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {equipment.map((eq: Equipment) => (
                                <tr>
                                    <td className="custom-table-td">{eq.equipment_id}</td>
                                    <td className="custom-table-td">{eq.name}</td>
                                    <td className="custom-table-td">{eq.type}</td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, eq)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, eq)}
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