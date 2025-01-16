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
                        label="License Plate Number"
                        placeholder="Enter license plate number"
                        name="licenseNumber"
                        value={formData.licenseNumber || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Fuel Type"
                        placeholder="Enter fuel type"
                        name="fuelType"
                        value={formData.fuelType || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Vehicle Catrgory"
                        placeholder="Enter category"
                        name="vehicleCaegory"
                        value={formData.vehicleCaegory || ''}
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
                <AddButton/>

            </form>
        </>
    );
}