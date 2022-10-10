import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import EventBus from "../common/EventBus";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
      </div>
        );
    }
};

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
      </div>
        );
    }
};

const ChangePassword = () => {
    const form = useRef();
    const checkBtn = useRef();
    let navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [shake, setShake] = useState(false);
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeConfirmPassword = (e) => {
        const confirm_password = e.target.value;
        setConfirmPassword(confirm_password);
    };

    const handleConfirm = (e) => {
        if(password === confirmPassword) {
        e.preventDefault();

        setShake(true);
        
        // Buttons stops to shake after 2 seconds
        setTimeout(() => setShake(false), 2000);
       

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            console.log(password);
            AuthService.update(password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    // setTimeout(AuthService.logout(), 1000);
                    AuthService.logout();
                    navigate("/");
                    window.location.reload(false);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    } else {
        alert("password mismatch");
    }
}

    return (
        <div className="register">
            <Helmet>
                <style>{"body { background: url('https://i.pinimg.com/originals/b1/a2/bd/b1a2bd0212d3036d54a6f93dc131e12b.png');background-position: center;background-repeat: no-repeat;background-size: cover; }"}</style>
            </Helmet>
            <h1 className="centertitle"> Change Password </h1>
            <div className="card card-container">
                <img
                    src="https://www.pngitem.com/pimgs/m/375-3755176_transparent-cartoon-lemon-png-kawaii-lemon-png-png.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleConfirm} ref={form}>
                    {!successful && (
                        <div>

                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, validPassword]}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="confirmpassword">Confirm Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChangeConfirmPassword}
                                    validations={[required, validPassword]}
                                />
                            </div>

                            <br />

                            <div className="form-group">
                                <button className = {shake ? `shake` : null}>Submit</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};



export default ChangePassword;


