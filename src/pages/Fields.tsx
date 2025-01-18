import {useDispatch, useSelector} from "react-redux";
import {Inputs} from "../components/Inputs.tsx";
import {resetFormData, updateFormData} from "../reducers/FormSlice.ts";
import {AddButton} from "../components/AddButton.tsx";
import {useState} from "react";
import {Field} from "../models/Field.ts";
import {addField, deleteField, updateField} from "../reducers/FieldSlice.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";
import "../style/Table.css"
import {addCrop, deleteCrop, updateCrop} from "../reducers/CropSlice.ts";
import {Crop} from "../models/Crop.ts";

export function Fields() {

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const fields = useSelector((state) => state.field );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editFieldId, setEditFieldId] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview_2, setImagePreview_2] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editFieldId) {
            const updatedFields = { ...formData, crop_code: editFieldId };
            dispatch(updateField(updatedFields));
            setIsEditing(false);
            setEditFieldId(null);
            setImagePreview(null);
            setImagePreview_2(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            setImagePreview(null);
            setImagePreview_2(null);
            dispatch(addField(formData));
        }
    };

    function handleDelete(e, field: Field) {

        e.preventDefault();
        e.stopPropagation();

        if (!field.fieldCode) {
            alert("Field code is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete field "${field.fieldName}" (${field.fieldCode})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteField(field));
            } catch (error) {
                console.log(error)
                alert('Failed to delete field. Please try again.');
            }

        }

    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                dispatch(updateFormData({name: "image1", value: reader.result}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload_2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview_2(reader.result);
                dispatch(updateFormData({name: "image2", value: reader.result}));
            }
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = (e: React.MouseEvent, field: Field) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Starting edit process for field:', field.fieldCode);

        setIsEditing(true);
        setEditFieldId(field.fieldCode);

        setTimeout(() => {
            const fieldFields = [
                "fieldCode",
                "fieldName",
                "location",
                "extentSize",
                "image1",
                "image2",
            ];

            fieldFields.forEach(data => {
                dispatch(updateFormData({
                    name: data,
                    value: field[data] || ''
                }));
            });

            setImagePreview(field.image1 || null);
            setImagePreview_2(field.image2 || null);
        }, 0);
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Fields</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Fields ID"
                        placeholder="Enter field ID"
                        name="fieldCode"
                        value={formData.fieldCode || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Fields Name"
                        placeholder="Enter field name"
                        name="fieldName"
                        value={formData.fieldName || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Fields Location"
                        placeholder="Enter field loaction"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Extend Size of the Fields"
                        placeholder="Enter the size of the field"
                        name="extentSize"
                        value={formData.extentSize || ''}
                        onChange={handleChange}
                    />

                    <div className="flex flex-col w-full mt-4">
                        <label htmlFor="image" className="block text-[12px] font-medium text-gray-700 mb-3 font-bold">
                            Fields Image 1
                        </label>
                        <div
                            className="border border-gray-300 rounded-[10px] text-center cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-[#026664af] focus:border-[#026664af] text-[12px] flex justify-between items-center w-full h-[38px] px-3 py-2 bg-[transparent]"
                            onClick={() => document.getElementById('image').click()}
                        >
                            Click to upload or drag and drop (Max Size 10MB)
                            <img
                                src="/assets/photo.png"
                                alt="photo-icon"
                                className="w-[18px] h-[18px] float-right"
                            />
                        </div>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={handleImageUpload}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="mt-4 border rounded-lg max-w-[250px] h-auto max-h-[250px]"
                            />
                        )}
                    </div>

                    <div className="flex flex-col w-full mt-4">
                        <label htmlFor="image" className="block text-[12px] font-medium text-gray-700 mb-3 font-bold">
                            Fields Image 2
                        </label>
                        <div
                            className="border border-gray-300 rounded-[10px] text-center cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-[#026664af] focus:border-[#026664af] text-[12px] flex justify-between items-center w-full h-[38px] px-3 py-2 bg-[transparent]"
                            onClick={() => document.getElementById('image_2').click()}
                        >
                            Click to upload or drag and drop (Max Size 10MB)
                            <img
                                src="/assets/photo.png"
                                alt="photo-icon"
                                className="w-[18px] h-[18px] float-right"
                            />
                        </div>
                        <input
                            type="file"
                            id="image_2"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={handleImageUpload_2}
                        />
                        {imagePreview_2 && (
                            <img
                                src={imagePreview_2}
                                alt="Image Preview 2"
                                className="mt-4 border rounded-lg max-w-[250px] h-auto max-h-[250px]"
                            />
                        )}
                    </div>

                </div>

                <AddButton name={isEditing ? "Update" : "Register"}/>

                <section className="filed-table-sec">
                    <div className="field-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th className="custom-table-th">Field ID</th>
                                <th className="custom-table-th">Field Name</th>
                                <th className="custom-table-th">Location</th>
                                <th className="custom-table-th">Extend Size</th>
                                <th className="custom-table-th">Image 1</th>
                                <th className="custom-table-th">Image 2</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {fields.map((field: Field) => (
                                <tr>
                                    <td className="custom-table-td">{field.fieldCode}</td>
                                    <td className="custom-table-td">
                                        {field.fieldName}
                                    </td>
                                    <td className="custom-table-td">{field.location}</td>
                                    <td className="custom-table-td">{field.extentSize}</td>
                                    <td className="custom-table-td">
                                        {field.image1 ? (
                                            <img
                                                src={field.image1}
                                                alt="field_1"
                                                className="w-20 h-20 object-cover"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td className="custom-table-td">
                                        {field.image2 ? (
                                            <img
                                                src={field.image2}
                                                alt="field_2"
                                                className="w-20 h-20 object-cover"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, field)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, field)}
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