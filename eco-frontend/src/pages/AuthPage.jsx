










import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout.jsx";
import AuthTabSwitcher from "../components/auth/AuthTabSwitcher.jsx";
import SignInForm from "../components/auth/SignInForm.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";
import AuthSuccessScreen from "../components/auth/AuthSuccessScreen.jsx";

export default function AuthPage({ setUser }) {
    const navigate = useNavigate();
    const [mode, setMode] = useState("signin"); 
    const [successData, setSuccessData] = useState(null);     

    const handleSuccess = (user, isNew = false) => {
        setUser(user);
        setSuccessData({ user, isNew });
    };

    const handleContinue = () => navigate("/");

    return (
        <AuthLayout>
            {successData ? (
                
                <AuthSuccessScreen
                    user={successData.user}
                    isNew={successData.isNew}
                    onContinue={handleContinue}
                />
            ) : (
                <>
                    {}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-[#1a2e1a]">
                            {mode === "signin" ? "Sign in to your account" : "Create your account"}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {mode === "signin"
                                ? "Welcome back! Enter your details below."
                                : "Join 10,000+ businesses packaging sustainably."
                            }
                        </p>
                    </div>

                    {}
                    <AuthTabSwitcher
                        mode={mode}
                        onSwitch={(m) => { setMode(m); }}
                    />

                    {}
                    {mode === "signin" ? (
                        <SignInForm
                            onSuccess={(user) => handleSuccess(user, false)}
                            onSwitch={() => setMode("register")}
                        />
                    ) : (
                        <RegisterForm
                            onSuccess={(user) => handleSuccess(user, true)}
                            onSwitch={() => setMode("signin")}
                        />
                    )}
                </>
            )}
        </AuthLayout>
    );
}