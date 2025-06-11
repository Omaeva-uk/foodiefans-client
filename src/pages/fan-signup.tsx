import { useState } from "react";
import { ChefHat, Star, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from "next/image";

interface FanFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export default function FanSignupPage() {
  const [formValues, setFormValues] = useState<FanFormValues>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("fan");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const passwordStrength = (password: string) => {
    if (password.length >= 10) return 'Strong';
    if (password.length >= 6) return 'Moderate';
    return 'Weak';
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';
    if (!formValues.username) newErrors.username = 'Username is required';
    if (!formValues.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Email is invalid';
    if (!formValues.password || formValues.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:3001/fan/signup', formValues);
        console.log(response.data);
        alert('Signup successful! 🎉');
        router.push('/login');
      } catch (error) {
        console.error(error);
        alert('Error creating account');
      }
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 justify-center items-center md:grid-cols-2 relative  m-0 p-0 w-full">
      {/* Left side with masked video */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
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
            boxShadow: '0 5px 25px rgba(0,0,0,0.15)',
          }}
        >
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/fans1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
            <div className="lg:pl-10 relative  xl:pl-40 pb-30 xl:pb-10">
              <div className="flex absolute lg:right-30  flex-col items-start gap-3">
                <Image src="/login-dot-img.svg" alt="dot" width={26} height={26} />
                <button className="border-2 border-primary font-medium px-4 py-2 rounded-full text-md text-white">Premium Recipes</button>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Image src="/login-dot-img.svg" alt="dot" width={26} height={26} />
                <button className="border-2 border-primary font-medium px-4 py-2 rounded-full text-md text-white">Monetisze easily</button>
              </div>
              <div className="flex max-lg:hidden flex-col absolute -top-36 left-60 items-start gap-3">
                <Image src="/login-dot-img.svg" alt="dot" width={26} height={26} />
                <button className="border-2 border-primary font-medium px-4 py-2 rounded-full text-md text-white">Creator tools</button>
              </div>
            </div>
              <div className="lg:pl-10  xl:pl-40 pb-30 xl:pb-10 w-full text-left text-white">
                <h3 className="text-3xl max-w-sm font-bold mb-2">Discover Exclusive Content for Food Lovers</h3>
                <p className="text-md max-w-sm mb-4">Join a passionate community and enjoy recipes & stories from top creators.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup form */}
      <div className="flex flex-col justify-center items-center p-10">
        <img src="/logo2.png" alt="FoodieFans Logo" className="w-40 mb-6" />

        <div className="flex gap-6 mb-8 bg-gray-200 p-2 rounded-full shadow-inner border border-gray-400">
          <button
            onClick={() => router.push('/fan-signup')}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all ${
              activeTab === "fan" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Star size={16} /> Fans
          </button>
          <button
            onClick={() => router.push('/creator-signup')}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all ${
              activeTab === "creator" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ChefHat size={16} /> Creator
          </button>
        </div>

        <div className="w-[80vw] md:w-[35vw] h-[80vh] border p-6 rounded-[2rem] bg-white/30 backdrop-blur-xl shadow-2xl border-white/30 overflow-hidden">
          <h3 className="text-2xl font-bold mb-3 text-primary text-center">Fan Sign Up</h3>
          <p className="text-center text-gray-600 mb-5 text-sm">Join the community and enjoy exclusive content!</p>

          <form className="flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
            {["firstName", "lastName", "username", "email"].map((field) => (
              <div key={field}>
                <input
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(formValues as any)[field]}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors[field as keyof FormErrors] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field as keyof FormErrors]}</p>
                )}
              </div>
            ))}

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              {formValues.password && (
                <p className="text-sm mt-1 text-gray-600">
                  Password strength:{" "}
                  <span
                    className={
                      passwordStrength(formValues.password) === "Strong"
                        ? "text-green-600"
                        : passwordStrength(formValues.password) === "Moderate"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }
                  >
                    {passwordStrength(formValues.password)}
                  </span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white p-3 rounded-xl text-base font-bold transition-transform duration-500 transform hover:scale-105 shadow-md mt-4"
            >
              Sign up as Foodie Fan
            </button>
          </form>

          <p className="text-center text-gray-600 mt-2 text-xs">
            By signing up you agree to our{" "}
            <span className="text-primary cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-primary cursor-pointer">Privacy Policy</span>.
          </p>
          <p className="text-center text-gray-600 mt-4 text-xs">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Log in here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
