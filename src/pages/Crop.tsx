import {useState} from "react";
import "../style/Crop.css";

export function Crop() {

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <main className="content bg-[#F1F7F7] mt-[80px]" id="crops">

            <div className="title my-6">
                <h2 className="text-2xl font-semibold">Crops</h2>
            </div>

            <form id="crop_form" className="grid gap-6 mb-10">
                <div className="input-group flex gap-12">
                    <div className="inputs flex-1">
                        <label htmlFor="id" className="input-label">Crop ID</label>
                        <input
                            type="text"
                            placeholder="Enter crop common name"
                            id="crop_id"
                            className="input-field"
                        />
                    </div>
                    <div className="inputs flex-1">
                        <label htmlFor="common" className="input-label">Crop Common Name</label>
                        <input
                            type="text"
                            placeholder="Enter crop common name"
                            id="common_name"
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-1/2 p-4">
                    <label htmlFor="image" className="mb-2 text-gray-700 font-medium">
                        Crop Image
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100"
                        onClick={() => document.getElementById('image').click()}
                    >
                        Click to upload or drag and drop (Max Size 10MB)
                        <img
                            src="/assets/photo.png"
                            alt="photo-icon"
                            className="mx-auto mt-2 w-12 h-12"
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
                            className="mt-4 border rounded-lg w-full h-auto"
                        />
                    )}
                </div>

                <div className="btn-container flex gap-4">
                    <button type="submit" id="crop_add" className="btn-primary">Register</button>
                    <button type="button" id="crop_update" className="btn-primary">Update</button>
                </div>
            </form>

            <section className="crops-table-sec">
                <div className="crop-table-div">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                        <tr>
                            <th>Crop ID</th>
                            <th>Common Name</th>
                            <th>Scientific Name</th>
                            <th>Season</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Field</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody id="my-table"></tbody>
                    </table>
                </div>
            </section>
        </main>
    );

}