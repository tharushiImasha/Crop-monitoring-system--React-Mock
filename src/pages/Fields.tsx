import {useDispatch, useSelector} from "react-redux";
import {Inputs} from "../components/Inputs.tsx";
import {updateFormData} from "../reducers/FormSlice.ts";
import {AddButton} from "../components/AddButton.tsx";
import {useState} from "react";
import {Field} from "../models/Field.ts";
import {addField} from "../reducers/FieldSlice.ts";

export function Fields() {

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const fields = useSelector((state) => state.field );

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(addField(formData));
    };

    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview_2, setImagePreview_2] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload_2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview_2(reader.result);
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Fields</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Fields ID"
                        placeholder="Enter field ID"
                        name="fieldId"
                        value={formData.fieldId || ''}
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
                        name="size"
                        value={formData.size || ''}
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

                <AddButton/>

                <section className="filed-table-sec">
                    <div className="field-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th>Fields ID</th>
                                <th>Fields Name</th>
                                <th>Fields Location</th>
                                <th>Extend Size</th>
                                <th>Fields</th>
                                <th>Image 2</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {fields.map((field: Field) => (
                                <tr>
                                    <td className="custom-table-td">{field.fieldCode}</td>
                                    <td className="custom-table-td text-gray-600">
                                        {field.fieldName}
                                    </td>
                                    <td className="custom-table-td">{field.fieldLocation}</td>
                                    <td className="custom-table-td">{field.extentSize}</td>
                                    <td className="custom-table-td">{field.fieldName}</td>
                                    {/*<td className="custom-table-td flex justify-center items-center">*/}
                                    {/*    <button*/}
                                    {/*        onClick={() => handleEditClick(customer)}*/}
                                    {/*        className="bg-cyan-500 text-white px-4 py-2 w-20 rounded hover:bg-cyan-700"*/}
                                    {/*    >*/}
                                    {/*        Edit*/}
                                    {/*    </button>*/}
                                    {/*</td>*/}
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