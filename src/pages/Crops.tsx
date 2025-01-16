import {useState} from "react";
import "../style/Crop.css";
import {Inputs} from "../components/Inputs.tsx";
import {AddButton} from "../components/AddButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {Crop} from "../models/Crop.ts";
import {resetFormData, updateFormData} from "../reducers/FormSlice.ts";
import {addCrop, deleteCrop, updateCrop} from "../reducers/CropSlice.ts";
import "../style/Table.css"
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";

export function Crops() {

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const crop = useSelector((state) => state.crop );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editCropId, setEditCropId] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editCropId) {
            const updatedCrop = { ...formData, crop_code: editCropId };
            dispatch(updateCrop(updatedCrop));
            setIsEditing(false);
            setEditCropId(null);
            setImagePreview(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            setImagePreview(null);
            dispatch(addCrop(formData));
        }

    };

    function handleDelete(e, crop: Crop) {

        e.preventDefault();
        e.stopPropagation();

        if (!crop.crop_code) {
            alert("Crop code is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete crop "${crop.common_name}" (${crop.crop_code})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteCrop(crop));
            } catch (error) {
                console.log(error)
                alert('Failed to delete crop. Please try again.');
            }

        }

    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                dispatch(updateFormData({ name: "crop_image", value: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = (e: React.MouseEvent, crops: Crop) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Starting edit process for crop:', crops.crop_code);

        setIsEditing(true);
        setEditCropId(crops.crop_code);

        setTimeout(() => {
            const cropFields = [
                "crop_code",
                "common_name",
                "specific_name",
                "crop_season",
                "category",
                "field_code",
                "crop_image"
            ];

            cropFields.forEach(field => {
                dispatch(updateFormData({
                    name: field,
                    value: crops[field] || ''
                }));
            });

            setImagePreview(crops.crop_image || null);
        }, 0);
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Crops</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Crops ID"
                        placeholder="Enter crop ID"
                        name="crop_code"
                        value={formData.crop_code || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Common Name"
                        placeholder="Enter crop common name"
                        name="common_name"
                        value={formData.common_name || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Scientific Name"
                        placeholder="Enter crop scientific name"
                        name="specific_name"
                        value={formData.specific_name || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Season"
                        placeholder="Enter crop season"
                        name="crop_season"
                        value={formData.crop_season || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Category"
                        placeholder="Enter crop category"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Fields"
                        placeholder="Select a field"
                        name="field_code"
                        value={formData.field_code || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col w-full mt-6">
                    <label htmlFor="image" className="block text-[12px] font-medium text-gray-700 mb-3 font-bold">
                        Crops Image
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
                            className="mt-4 border rounded-lg max-w-[200px] h-auto max-h-[200px]"
                        />
                    )}
                </div>

                <AddButton name={isEditing ? "Update" : "Register"}/>

                <section className="crops-table-sec">
                    <div className="crop-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                            <tr>
                                <th className="custom-table-th">Crops ID</th>
                                <th className="custom-table-th">Season</th>
                                <th className="custom-table-th">Common Name</th>
                                <th className="custom-table-th">Scientific Name</th>
                                <th className="custom-table-th">Category</th>
                                <th className="custom-table-th">Image</th>
                                <th className="custom-table-th">Fields</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {crop.map((crops: Crop) => (
                                <tr>
                                    <td className="custom-table-td">{crops.crop_code}</td>
                                    <td className="custom-table-td">{crops.common_name}</td>
                                    <td className="custom-table-td">{crops.specific_name}</td>
                                    <td className="custom-table-td">{crops.crop_season}</td>
                                    <td className="custom-table-td">{crops.category}</td>
                                    <td className="custom-table-td">
                                        {crops.crop_image ? (
                                            <img
                                                src={crops.crop_image}
                                                alt="Crop"
                                                className="w-20 h-20 object-cover"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td className="custom-table-td">{crops.field_code}</td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, crops)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, crops)}
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