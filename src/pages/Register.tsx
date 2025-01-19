import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateFormData} from "../reducers/FormSlice.ts";
import {Inputs} from "../components/Inputs.tsx";
import {addCrop} from "../reducers/CropSlice.ts";

export function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const formData = useSelector((state) => state.formData);
    const user = useSelector((state) => state.user );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    function createAcc() {
        dispatch(addCrop(formData));
        localStorage.setItem("email", formData.email);
        localStorage.setItem("password", formData.password);
        localStorage.setItem("name", formData.name);
        navigate('/');
    }

    function login() {
        navigate('/');
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex rounded-lg shadow-lg overflow-hidden bg-white w-[1280px] h-[832px]">

                    <div className="flex-1 p-12">
                        <img
                            src="/assets/Logo.png"
                            alt="Green Shadow Logo"
                            className="w-36 mb-[30px]"
                        />

                        <div className="py-4 px-[10px]">
                            <h1 className="text-[32px] font-semibold text-gray-800">Create an Account</h1>
                            <p className="text-gray-600">Let's Make Magic Happen</p>

                            {/* Social Login */}
                            <div className="flex gap-4 my-8 mt-[45px]">
                                <button
                                    className="flex items-center justify-center w-full py-2 border rounded-lg text-sm font-medium gap-2">
                                    <img src="/assets/google.png" alt="Google" className="w-5"/>
                                    Login with Google
                                </button>
                                <button
                                    className="flex items-center justify-center w-full py-2 border rounded-lg text-sm font-medium gap-2">
                                    <img src="/assets/apple.png" alt="Apple" className="w-5"/>
                                    Login with Apple
                                </button>
                            </div>

                            <div className="flex items-center gap-2 my-6">
                                <div className="flex-grow h-px bg-gray-300"></div>
                                <h5 className="text-xs text-gray-500">or</h5>
                                <div className="flex-grow h-px bg-gray-300"></div>
                            </div>

                            <form className="flex flex-col ">

                                <Inputs
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                />

                                <Inputs
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />

                                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                                    <Inputs
                                        label="Password"
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                    />
                                    <Inputs
                                        label=" Confirm Password"
                                        placeholder="Confirm your password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="mt-[50px] px-4 bg-[#162635] text-white rounded-[10px] hover:bg-[#004463] w-full h-[40px] flex items-center justify-center text-[15px] float-right"
                                    onClick={createAcc}>
                                    Create Account
                                </button>
                            </form>

                            <p className="mt-6 text-xs text-gray-500 text-center">
                                Have an account?{" "}
                                <span className="text-[#162635] hover:underline cursor-pointer" onClick={login}>
                                Login now.
                            </span>
                            </p>
                        </div>

                    </div>

                    <div className="hidden lg:flex flex-1 items-center justify-center bg-white p-[10px]">
                        <img
                            src="/assets/Registration.png"
                            alt="Scenic Image"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}