import { useState } from "react";
import { ArrowRight, ChefHat, Star, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/router';
import Image from "next/image";

// Define types for form errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  username?: string;
  email?: string;
  dob?: string;
  gender?: string;
  categories?: string;
  password?: string;
  confirmPassword?: string;
  idUpload?: string;
}

export default function CreatorSignupPage() {
  const [formValues, setFormValues] = useState<{
    firstName: string;
    lastName: string;
    displayName: string;
    username: string;
    email: string;
    dob: string;
    gender: string;
    categories: string;
    password: string;
    confirmPassword: string;
    idUpload: File | null;
  }>({
    firstName: '',
    lastName: '',
    displayName: '',
    username: '',
    email: '',
    dob: '',
    gender: '',
    categories: '',
    password: '',
    confirmPassword: '',
    idUpload: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === 'idUpload' && e.target instanceof HTMLInputElement && e.target.files) {
      setFormValues({ ...formValues, idUpload: e.target.files[0] });
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';
    if (!formValues.displayName) newErrors.displayName = 'Display name is required';
    if (!formValues.username) newErrors.username = 'Username is required';
    if (!formValues.email) newErrors.email = 'Email is required';
    if (!formValues.dob) newErrors.dob = 'Date of Birth is required';
    if (!formValues.gender) newErrors.gender = 'Please select gender';
    if (!formValues.categories) newErrors.categories = 'Please select categories';
    if (!formValues.password || formValues.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formValues.password !== formValues.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formValues.idUpload) newErrors.idUpload = 'ID upload is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('Creator signup successful!');
      // Add actual submission logic here
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden m-0 p-0 w-full">
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
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/creator1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <div className="lg:pl-10 relative  xl:pl-40 pb-30 xl:pb-10">
                  <div className="flex absolute lg:right-34  flex-col items-start gap-3">
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
                <h3 className="text-3xl max-w-sm font-bold mb-2">Grow Your Culinary Brand as a Creator</h3>
                <p className="text-md max-w-sm mb-4">Share your recipes, cooking tips, and food stories with a dedicated audience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-10 relative z-10">
        <img src="/logo2.png" alt="FoodieFans Logo" className="w-40 mb-6" />

        <h3 className="text-2xl font-bold mb-3 text-primary text-center">Creator Sign Up</h3>
        <p className="text-center text-gray-600 mb-5 text-sm">Sign up to monetize your content and connect with fans!</p>

        <form className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First name" value={formValues.firstName} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
          <input name="lastName" placeholder="Last name" value={formValues.lastName} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
          <input name="displayName" placeholder="Display name" value={formValues.displayName} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
          <input name="username" placeholder="Username" value={formValues.username} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
          <input name="email" type="email" placeholder="Email address" value={formValues.email} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
          <input name="dob" placeholder="DOB (DD/MM/YYYY)" value={formValues.dob} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
          <select name="gender" value={formValues.gender} onChange={handleChange} className="p-2 rounded-xl border border-gray-300">
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select name="categories" value={formValues.categories} onChange={handleChange} className="p-2 rounded-xl border border-gray-300">
            <option value="">Select categories</option>
            <option value="cooking">Cooking</option>
            <option value="baking">Baking</option>
            <option value="food-blog">Food Blog</option>
          </select>

          <div className="md:col-span-2">
            <label className="font-semibold text-gray-700 text-sm mb-1 block">Upload Government ID (jpg/png/pdf)</label>
            <input name="idUpload" type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} className="p-2 rounded-xl border border-gray-300 bg-white" />
            {errors.idUpload && <p className="text-red-500 text-xs mt-1">{errors.idUpload}</p>}
          </div>

          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formValues.password} onChange={handleChange} className="p-2 rounded-xl border border-gray-300 w-full" />
            <div className="absolute right-3 top-2 cursor-pointer text-primary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          <div className="relative">
            <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={formValues.confirmPassword} onChange={handleChange} className="p-2 rounded-xl border border-gray-300 w-full" />
            <div className="absolute right-3 top-2 cursor-pointer text-primary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <button type="submit" className="md:col-span-2 w-full bg-primary hover:bg-primary-hover text-white p-3 rounded-xl text-base font-bold mt-4">
            Sign up as Foodie Creator
          </button>
        </form>

        <p className="text-center text-gray-600 mt-2 text-xs">
          By signing up you agree to our <span className="text-primary cursor-pointer">Terms</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>.
        </p>
        <p className="text-center text-gray-600 mt-4 text-xs">
          Already have an account?{' '}
          <span className="text-primary cursor-pointer" onClick={() => router.push('/login')}>
            Log in here.
          </span>
        </p>
      </div>
    </div>
  );
}
