import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {resetFormData, updateFormData} from "../reducers/FormSlice.ts";
import {Inputs} from "../components/Inputs.tsx";
import {AddButton} from "../components/AddButton.tsx";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";
import {addLog, deleteLog, updateLog} from "../reducers/LogSlice.ts";
import {Log} from "../models/Log.ts";

export function Logs() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const logs = useSelector((state) => state.logs );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editLogId, setEditLogId] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editLogId) {
            const updatedLog = { ...formData, log_code: editLogId };
            dispatch(updateLog(updatedLog));
            setIsEditing(false);
            setEditLogId(null);
            setImagePreview(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            setImagePreview(null);
            dispatch(addLog(formData));
        }

    };

    function handleDelete(e, logs: Log) {

        e.preventDefault();
        e.stopPropagation();

        if (!logs.log_code) {
            alert("Log code is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete log "(${logs.log_code})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteLog(logs));
            } catch (error) {
                console.log(error)
                alert('Failed to delete log. Please try again.');
            }

        }

    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                dispatch(updateFormData({ name: "observed_image", value: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = (e: React.MouseEvent, logs: Log) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Starting edit process for log:', logs.log_code);

        setIsEditing(true);
        setEditLogId(logs.log_code);

        setTimeout(() => {
            const logFields = [
                "log_code",
                "log_date",
                "log_details",
                "observed_image",
                "field_code",
                "crop_code",
                "id"
            ];

            logFields.forEach(field => {
                dispatch(updateFormData({
                    name: field,
                    value: logs[field] || ''
                }));
            });

            setImagePreview(logs.observed_image || null);
        }, 0);
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Logs</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Log ID"
                        placeholder="Enter log ID"
                        name="log_code"
                        value={formData.log_code || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Date"
                        placeholder="Enter date"
                        type="date"
                        name="log_date"
                        value={formData.log_date || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Log deatils"
                        placeholder="Enter log details"
                        name="log_details"
                        value={formData.log_details || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Field Code"
                        placeholder="Enter field code"
                        name="field_code"
                        value={formData.field_code || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Code"
                        placeholder="Enter crop code"
                        name="crop_code"
                        value={formData.crop_code || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Staff"
                        placeholder="Select a staff"
                        name="id"
                        value={formData.id || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col w-full mt-6">
                    <label htmlFor="image" className="block text-[12px] font-medium text-gray-700 mb-3 font-bold">
                        Log Image
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
                                <th className="custom-table-th">Log ID</th>
                                <th className="custom-table-th">Date</th>
                                <th className="custom-table-th">Log Details</th>
                                <th className="custom-table-th">Image</th>
                                <th className="custom-table-th">Field Code</th>
                                <th className="custom-table-th">Crop Code</th>
                                <th className="custom-table-th">Staff</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {logs.map((logs: Log) => (
                                <tr>
                                    <td className="custom-table-td">{logs.log_code}</td>
                                    <td className="custom-table-td">{logs.log_date}</td>
                                    <td className="custom-table-td">{logs.log_details}</td>
                                    <td className="custom-table-td">
                                        {logs.observed_image ? (
                                            <img
                                                src={logs.observed_image}
                                                alt="Log"
                                                className="w-20 h-20 object-cover"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td className="custom-table-td">{logs.field_code}</td>
                                    <td className="custom-table-td">{logs.crop_code}</td>
                                    <td className="custom-table-td">{logs.id}</td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, logs)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, logs)}
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