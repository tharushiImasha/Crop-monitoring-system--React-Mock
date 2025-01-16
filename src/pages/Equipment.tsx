import {Inputs} from "../components/Inputs.tsx";
import {AddButton} from "../components/AddButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {updateFormData} from "../reducers/FormSlice.ts";

export function Equipment() {

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
                <h2 className="text-[25px] font-bold mb-10">Equipment</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Equipment ID"
                        placeholder="Enter Equipment ID"
                        name="equipmentId"
                        value={formData.equipmentId || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Name"
                        placeholder="Enter equipment name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Crops Type"
                        placeholder="Enter Equipment Type"
                        name="type"
                        value={formData.type || ''}
                        onChange={handleChange}
                    />
                </div>
                <AddButton/>

            </form>
        </>
    );
}