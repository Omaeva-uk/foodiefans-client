import { useState, useEffect } from "react";
import { ArrowRight, ChefHat, Star, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/router';
// import axios from 'axios'; // Commented out since we're using hardcoded credentials

interface LoginFormErrors {
email?: string;
password?: string;
}

export default function LoginPage() {
const [formValues, setFormValues] = useState({
email: '',
password: '',
});
const [errors, setErrors] = useState<LoginFormErrors>({});
const [showPassword, setShowPassword] = useState(false);
const [activeTab, setActiveTab] = useState("fan");
const [rememberMe, setRememberMe] = useState(false);
const [isClient, setIsClient] = useState(false);
const router = useRouter();

// Fix hydration issue
useEffect(() => {
setIsClient(true);
}, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setFormValues({ ...formValues, [e.target.name]: e.target.value });
};

const validate = (): LoginFormErrors => {
const newErrors: LoginFormErrors = {};
if (!formValues.email) newErrors.email = 'Email is required';
else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Email is invalid';
if (!formValues.password) newErrors.password = 'Password is required';
return newErrors;
};

// HARDCODED CREDENTIALS LOGIN
const handleSubmit = async (e: React.FormEvent) => {
console.log("Form submission started");
e.preventDefault();

const validationErrors = validate();
console.log("Validation results:", validationErrors);

if (Object.keys(validationErrors).length > 0) {
console.log("Validation failed, setting errors");
setErrors(validationErrors);
} else {
console.log("Validation passed, proceeding with login");
try {
console.log("Checking credentials for:", formValues.email);

let mockResponse;

// SUPER USER / ADMIN CREDENTIALS
if (formValues.email === "admin@foodiefan.com" && formValues.password === "admin123") {
console.log("Super User/Admin credentials matched");
mockResponse = {
data: {
message: 'Login successful',
role: 'admin',
user: {
name: 'Super Admin',
email: formValues.email,
permissions: ['all']
}
}
};
}
// FAN USER CREDENTIALS
else if (formValues.email === "fan@foodiefan.com" && formValues.password === "fan123") {
console.log("Fan credentials matched");
mockResponse = {
data: {
message: 'Login successful',
role: 'fan',
user: {
name: 'Fan User',
email: formValues.email
}
}
};
}
// 👨‍🍳 CREATOR USER CREDENTIALS
else if (formValues.email === "creator@foodiefan.com" && formValues.password === "creator123") {
console.log("Creator credentials matched");
mockResponse = {
data: {
message: 'Login successful',
role: 'creator',
user: {
name: 'Creator User',
email: formValues.email
}
}
};
}
else {
console.log("No credential match found");
throw new Error('Invalid credentials');
}

console.log("Mock response data:", mockResponse.data);

// Store user data in localStorage
console.log("Storing user data in localStorage");
localStorage.setItem('user', JSON.stringify(mockResponse.data.user));
localStorage.setItem('userRole', mockResponse.data.role);

// Redirect based on role
console.log("Redirecting based on role:", mockResponse.data.role);
if (mockResponse.data.role === 'fan') {
console.log("Redirecting to fan dashboard");
router.push('/fan-dashboard');
} else if (mockResponse.data.role === 'creator') {
console.log("Redirecting to creator dashboard");
router.push('/creator-dashboard');
} else if (mockResponse.data.role === 'admin') {
console.log("Redirecting to admin dashboard");
router.push('/admin-dashboard'); // Create this page or redirect to fan-dashboard for now
} else {
console.log("Unknown role:", mockResponse.data.role);
alert('Unknown user role');
}
} catch (error) {
console.log("Error in login process");
console.error(error);
alert('Invalid login credentials');
}
}
};

return (
<div className="h-screen grid grid-cols-1 md:grid-cols-2  relative overflow-hidden  m-0 p-0 w-full">
{/* Left side */}
<div className="relative w-full h-full overflow-hidden p-0 m-0 flex items-center justify-center">
<div
className="w-full h-[90%] aspect-video overflow-hidden"
style={{
maskImage: 'url(/shape1.svg)',
WebkitMaskImage: 'url(/shape1.svg)',
maskSize: '100% 100%',
WebkitMaskSize: '100% 100%',
maskPosition: 'center',
WebkitMaskPosition: 'center',
maskRepeat: 'no-repeat',
WebkitMaskRepeat: 'no-repeat',
boxShadow: '0 5px 25px rgba(0,0,0,0.15)'
}}
>
<div className="relative w-full h-[100%]">
{/* Fixed video element - only render on client */}
{isClient ? (
<video
className="w-full h-full object-cover"
autoPlay
loop
muted
playsInline
suppressHydrationWarning={true}
>
<source src="/login1.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
) : (
// Placeholder for server-side rendering
<div className="w-full h-full bg-gradient-to-br from-primary to-[#02705a] flex items-center justify-center">
<div className="text-white text-lg">Loading...</div>
</div>
)}
<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
<div className="md:pl-8 xl:pl-40 md:pb-20 xl:pb-10 w-full">
  <div className="max-w-xs">
  <h3 className="text-3xl font-bold mb-2 text-white">Welcome Back to FoodieFans!</h3>
  <p className="text-lg  mb-4 leading-snug max-w-[300px] text-white">Access your personalized food content and connect with your favorite creators.</p>
  <div className="flex flex-col flex-wrap gap-2 items-start justify-center">
  <button className="border-2 border-primary font-medium px-4 py-2 rounded-full text-md text-white">Exclusive Content</button>
  <button className="border-2 border-primary font-medium px-4 py-2 rounded-full text-md text-white">Premium Recipes</button>
  </div>
</div>
</div>
</div>
</div>
</div>
</div>

{/* Right side - Login Form */}
<div className="flex flex-col justify-center items-center p-10 relative z-10">
<img src="/logo2.png" alt="FoodieFans Logo" className="w-40 mb-6" />

{/* Add credentials info for testing */}
{/* <div className="mb-4 p-3 bg-blue-100 rounded-lg text-xs text-center">
<p className="font-semibold text-blue-800">Test Credentials:</p>
<p className="text-blue-600">Admin: admin@foodiefan.com / admin123</p>
<p className="text-blue-600">Fan: fan@foodiefan.com / fan123</p>
<p className="text-blue-600">Creator: creator@foodiefan.com / creator123</p>
</div> */}

<div className="flex gap-6 mb-8 bg-gray-200 p-2 rounded-full shadow-inner border border-gray-400">
<button
onClick={() => setActiveTab("fan")}
className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
activeTab === "fan"
? "bg-primary text-white shadow-md"
: "text-gray-700 hover:bg-gray-300"
}`}
>
<Star size={16} /> Fans
</button>
<button
onClick={() => setActiveTab("creator")}
className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
activeTab === "creator"
? "bg-primary text-white shadow-md"
: "text-gray-700 hover:bg-gray-300"
}`}
>
<ChefHat size={16} /> Creator
</button>
</div>

<div className="w-[80vw] md:w-[35vw] lg:w-[35vw] max-h-[70vh] border p-8 rounded-[2rem] bg-white/30 backdrop-blur-xl relative shadow-2xl border-white/30 transition-all duration-700">
<h3 className="text-2xl font-bold mb-3 text-primary text-center">Login to FoodieFans</h3>
<p className="text-center text-gray-600 mb-6 text-sm">Sign in to access your account</p>

<form className="flex flex-col gap-5 text-sm" onSubmit={handleSubmit}>
<div>
<input
name="email"
type="email"
placeholder="Email address"
value={formValues.email}
onChange={handleChange}
className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
/>
{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
</div>

<div className="relative">
<input
name="password"
type={showPassword ? "text" : "password"}
placeholder="Password"
value={formValues.password}
onChange={handleChange}
className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
/>
<div
className="absolute right-3 top-3 cursor-pointer text-primary"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
</div>
{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
</div>

<div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<input
type="checkbox"
id="remember"
checked={rememberMe}
onChange={() => setRememberMe(!rememberMe)}
className="rounded text-primary focus:ring-primary"
/>
<label htmlFor="remember" className="text-gray-600 text-sm">Remember me</label>
</div>
<a href="/forgot-password" className="text-primary text-sm hover:underline">Forgot password?</a>
</div>

<button
type="submit"
className="w-full bg-primary hover:bg-primary-hover text-white p-3 rounded-xl text-base font-bold transition-transform duration-500 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-4"
>
Login
<ArrowRight size={16} />
</button>
</form>

<div className="mt-8 text-center">
<p className="text-gray-600 text-sm">
Don&apos;t have an account? 
<span
className="text-primary cursor-pointer hover:underline"
onClick={() => router.push('/fan-signup')}
>
Sign up here
</span>
</p>
</div>
</div>
</div>
</div>
);
}