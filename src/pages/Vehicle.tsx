import {useDispatch, useSelector} from "react-redux";
import {updateFormData} from "../reducers/FormSlice.ts";
import {Inputs} from "../components/Inputs.tsx";
import {AddButton} from "../components/AddButton.tsx";

export function Vehicle() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Vehicle</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Vehicle ID"
                        placeholder="Enter Vehicle ID"
                        name="vehicleId"
                        value={formData.vehicleId || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crop Common Name"
                        placeholder="Enter crop common name"
                        name="commonName"
                        value={formData.commonName || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crop Scientific Name"
                        placeholder="Enter crop scientific name"
                        name="scientificName"
                        value={formData.scientificName || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crop Season"
                        placeholder="Enter crop season"
                        name="season"
                        value={formData.season || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crop Category"
                        placeholder="Enter crop category"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Field"
                        placeholder="Select a field"
                        name="field"
                        value={formData.field || ''}
                        onChange={handleChange}
                    />
                </div>
                <AddButton/>

            </form>
        </>
    );
}