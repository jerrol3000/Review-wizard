import React, { useState } from "react";

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrors({
                ...errors,
                email: emailRegex.test(value) ? "" : "Invalid email format.",
            });
        }

        if (name === "password") {
            setErrors({
                ...errors,
                password:
                    value.length >= 6
                        ? ""
                        : "Password must be at least 6 characters long.",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage("");

        if (!formData.email || !formData.password) {
            setIsLoading(false);
            alert("Please fill in all fields.");
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setIsLoading(false);
            alert("Passwords do not match!");
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage(isLogin ? "Login successful! 🎉" : "Account created! ✅");
            setFormData({ email: "", password: "", confirmPassword: "" });
        }, 2000);
    };

   
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setSuccessMessage("");
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg text-center bg-white">
           
            <h3 className="text-xl font-semibold mb-4">{isLogin ? "Log In" : "Sign Up"}</h3>
            <p className="mb-6 text-gray-600">Enter your email and password:</p>

 
            {successMessage && (
                <div className="mb-4 text-green-600 font-medium">{successMessage}</div>
            )}

          
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoFocus
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                    />
                 
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                {!isLogin && (
                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required={!isLogin}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 text-white font-semibold rounded-md transition duration-300 ${
                        isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
                </button>
            </form>

            {isLoading && (
                <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
            )}

            <div className="mt-4">
                <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300">
                    Sign in with Google
                </button>
            </div>
            
            <p
                onClick={toggleForm}
                className="mt-4 text-blue-600 hover:underline cursor-pointer"
            >
                {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Log in"}
            </p>
        </div>
    );
};

export default Authentication;