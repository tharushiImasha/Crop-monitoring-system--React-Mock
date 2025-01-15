import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoginDetails} from "../models/LoginDetails.ts";
import {checkUser} from "../reducers/LoginSlice.ts";
import React from "react";

export function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state);

    // function handleSubmit(user: LoginDetails) {
    //     alert("Are you sure you want to delete?");
    //     dispatch(checkUser(user.email, user.password));
    //     navigate('/');
    // }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault(); // Prevent form default submission
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        // Dispatch action to check user
        const validUser = dispatch(checkUser({ email, password }));

        if (validUser) {
            alert("Login Successful!");
            navigate("/"); // Navigate to the home page
        } else {
            alert("Invalid credentials. Try again!");
        }
    }

    return (
        <>
            <div className="container" style="max-width: 1280px;">

                <div className="login-form">
                    <img src="/assets/Logo.png" alt="Green Shadow Logo" className="logo"/>

                    <div className="login-inside">

                        <h1>Welcome back!</h1>
                        <p>Let's Make Magic Happen</p>

                        <div className="social-login">
                            <button className="google-login"><img src="/assets/google.png" alt=""/>Login with Google
                            </button>
                            <button className="apple-login"><img src="/assets/apple.png" alt=""/>Login with Apple
                            </button>
                        </div>

                        <div className="or-line">
                            <div className="line"></div>
                            <h5>or</h5>
                            <div className="line"></div>
                        </div>

                        <form style="width: 463px;">
                            <label htmlFor="username">Username or Email</label>
                            <input type="text" id="username" placeholder="Enter your username/email"/>

                            <div className="pw-visible">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter your password"/>
                                <i className="ri-eye-off-line" id="toggle-password"></i>
                            </div>

                            <a href="#" className="forgot-password">Forgot Password?</a>
                            <button type="submit" className="login-btn" id="login">Login</button>
                        </form>

                        <p className="register">Don't have an account? <a href="#" onClick={() => handleSubmit(user)}>Register
                            now.</a></p>
                    </div>

                </div>

                <div className="login-image">
                    <img src="/assets/Login.png" alt="Scenic Image"/>
                </div>
            </div>
        </>
    );
}