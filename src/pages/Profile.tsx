import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {updateUser} from "../reducers/ProfileSlice.ts";
import {Inputs} from "../components/Inputs.tsx";
import {updateFormData} from "../reducers/FormSlice.ts";
import {AddButton} from "../components/AddButton.tsx";

export function Profile() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            dispatch(updateUser({ name, currentPassword, newPassword }));
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <main className="content" id="profile">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Profile</h2>
                <div className="profile-group flex items-center gap-12 mb-[50px]">
                    <img
                        src="/assets/profilPic.png"
                        alt=""
                        className="pro_img w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <h2 id="user_name" className="text-[30px] font-bold">
                            {localStorage.getItem("name")}
                        </h2>
                        <h5 id="userEmail" className="text-[16px] text-gray-500">
                            {localStorage.getItem("email")}
                        </h5>
                    </div>
                </div>
                <div className="flex flex-col gap-6 mb-[30px]">
                    <Inputs
                        label="Current Password"
                        placeholder="Enter current password"
                        name="password"
                        value={formData.password || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                        <Inputs
                            label="New Password"
                            placeholder="Enter new password"
                            type="password"
                            name="password"
                            value={formData.password || ''}
                            onChange={handleChange}
                        />
                        <Inputs
                            label="Confirm Password"
                            placeholder="Confirm password"
                            type="password"
                            name="password"
                            value={formData.password || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <AddButton name="Change" />
            </form>
        </main>
);
}