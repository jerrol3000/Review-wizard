import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../redux/slices/authSlice";

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        businessName: "",
        industry: "",
        contactDetails: {
            phone: "",
            address: "",
        },
    });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("contactDetails.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                contactDetails: {
                    ...formData.contactDetails,
                    [field]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Validation for email and password
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
        setSuccessMessage("");

        // Validate required fields
        if (!formData.email || !formData.password) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const userData = {
            email: formData.email,
            password: formData.password,
            businessName: formData.businessName,
            industry: formData.industry,
            contactDetails: {
                phone: formData.contactDetails.phone,
                address: formData.contactDetails.address,
            },
        };

        try {
            if (isLogin) {
                await dispatch(loginUser(userData)).unwrap();
                setSuccessMessage("Login successful! ✅");
            } else {
                await dispatch(registerUser(userData)).unwrap();
                setSuccessMessage("Account created successfully! ✅");
                setFormData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    businessName: "",
                    industry: "",
                    contactDetails: {
                        phone: "",
                        address: "",
                    },
                });
            }
        } catch (error) {
            alert(error.message || "Authentication failed. Please try again.");
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setSuccessMessage("");
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg text-center bg-white">
            <h3 className="text-xl font-semibold mb-4">{isLogin ? "Log In" : "Sign Up"}</h3>
            <p className="mb-6 text-gray-600">
                {isLogin ? "Enter your email and password:" : "Create a new account:"}
            </p>

            {successMessage && (
                <div className="mb-4 text-green-600 font-medium">{successMessage}</div>
            )}

            {error && <div className="mb-4 text-red-500 font-medium">{error}</div>}

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
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {!isLogin && (
                    <div className="relative">
                        <input
                            type="text"
                            name="businessName"
                            placeholder="Business Name"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {!isLogin && (
                    <div className="relative">
                        <input
                            type="text"
                            name="industry"
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {!isLogin && (
                    <div className="relative">
                        <input
                            type="text"
                            name="contactDetails.phone"
                            placeholder="Phone Number"
                            value={formData.contactDetails.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {!isLogin && (
                    <div className="relative">
                        <input
                            type="text"
                            name="contactDetails.address"
                            placeholder="Address"
                            value={formData.contactDetails.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 text-white font-semibold rounded-md transition duration-300 ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
                </button>
            </form>

            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
            )}

            {/* Google Sign-In Button */}
            <div className="mt-4">
                <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300">
                    Sign in with Google
                </button>
            </div>

            {/* Toggle Between Login and Sign Up */}
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
