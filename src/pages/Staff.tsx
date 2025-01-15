import {Input} from "postcss";
import {Inputs} from "../components/Inputs.tsx";
import {updateFormData} from "../reducers/FormSlice.ts";
import {useDispatch} from "react-redux";

export function Staff() {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };
    return (
        <>
            <h1 className="text-center">Staff</h1>
        </>
    );
}