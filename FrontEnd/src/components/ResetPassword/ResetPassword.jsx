import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        fetch(`http://localhost:3000/api/session/resetPassword/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPassword: newPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                Swal.fire({
                    title: "Password Reset Successfully!",
                    text: data.message,
                    icon: "success",
                });
                window.location.href = 'http://localhost:5173/';
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.message,
                    icon: "error",
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to reset password.",
                icon: "error",
            });
        });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Reset Password</h2>
                            <form className='container'>
                                <div className="form-group row justify-content-md-center mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group row justify-content-md-center mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setError('');
                                        }}
                                    />
                                    {error && <small className="text-danger">{error}</small>}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block row justify-content-md-center mb-3"
                                    onClick={handlePasswordChange}
                                >
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
