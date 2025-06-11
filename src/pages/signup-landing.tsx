import { useState } from "react";
import { ArrowRight, ChefHat, Star, BookOpen, MessageCircle, Tv, ShoppingBag, Award, Search, Heart } from "lucide-react";
import { useRouter } from 'next/router';

export default function SignupLanding() {
  const [activeTab, setActiveTab] = useState<'fan' | 'creator'>('fan');

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const router = useRouter();
  const benefits = {
    fan: [
      { icon: <BookOpen size={18} />, text: "View exclusive content" },
      { icon: <Award size={18} />, text: "Monthly and Yearly subscriptions" },
      { icon: <Tv size={18} />, text: "Fast and reliable buffering and viewing" },
      { icon: <Star size={18} />, text: "Multiple solution options to choose from" },
      { icon: <MessageCircle size={18} />, text: "Chat with creator" },
      { icon: <ShoppingBag size={18} />, text: "Access creator’s personal store" },
      { icon: <Search size={18} />, text: "Search and filter capabilities" },
      { icon: <Heart size={18} />, text: "Favorite your video for future viewing" },
    ],
    creator: [
      { icon: <BookOpen size={18} />, text: "Share exclusive content" },
      { icon: <Award size={18} />, text: "Earn from subscriptions" },
      { icon: <Tv size={18} />, text: "Fast and secure content delivery" },
      { icon: <Star size={18} />, text: "Tools to manage your fanbase" },
      { icon: <MessageCircle size={18} />, text: "Built-in chat with fans" },
      { icon: <ShoppingBag size={18} />, text: "Access to personal online store features" },
      { icon: <Search size={18} />, text: "Analytics and engagement tracking" },
      { icon: <Heart size={18} />, text: "Easy content uploads and management" },
    ],
  };

  const testimonials = [
    { name: "Tom Brooks", text: "I love how easy it is to find exclusive recipes on FoodieFans.", avatar: "https://i.pravatar.cc/40?img=1" },
    { name: "Sarah Chen", text: "The content quality is amazing. Worth every penny!", avatar: "https://i.pravatar.cc/40?img=5" },
    { name: "Mike Johnson", text: "As a creator, the tools here are second to none.", avatar: "https://i.pravatar.cc/40?img=3" }
  ];

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-gray-100 to-white relative overflow-hidden font-richgold">
      <div
        className="text-white flex flex-col justify-center items-center p-10 rounded-br-3xl bg-cover bg-center relative z-10 shadow-2xl gap-6"
        style={{ backgroundImage: "url('/left-bg-green.png')" }}
      >
        <img src="/logo-white.png" alt="FoodieFans Logo" className="w-40 mb-6 drop-shadow-2xl" />
        <h1 className="text-4xl font-extrabold mb-4 text-center tracking-tight leading-tight">Where <span className="text-yellow-300">fans</span> connect.</h1>
        <p className="text-center mb-6 max-w-md text-lg leading-relaxed">
          Connect and engage on a new level with your chosen creators. Join the FoodieFans community.
        </p>

        <div className="relative w-full max-w-xs h-40 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-500 w-full ${
                currentTestimonial === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              } bg-white/20 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/30`}
            >
              <p className="text-sm italic mb-2 text-white">“{testimonial.text}”</p>
              <div className="flex items-center gap-3">
                <img src={testimonial.avatar} alt={testimonial.name} className="rounded-full border-2 border-white" />
                <span className="text-white font-semibold">{testimonial.name}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-2 mt-4 absolute bottom-0 left-0 right-0 pb-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  currentTestimonial === index ? "bg-white" : "bg-white/40"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-10 relative z-10">
        <div className="flex gap-6 mb-8 bg-gray-200 p-2 rounded-full shadow-inner border border-gray-400">
          <button
            onClick={() => setActiveTab("fan")}
            className={`flex items-center gap-2 text-base font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
              activeTab === "fan"
                ? "bg-[#028b6e] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Star size={16} /> Fans
          </button>
          <button
            onClick={() => setActiveTab("creator")}
            className={`flex items-center gap-2 text-base font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
              activeTab === "creator"
                ? "bg-[#028b6e] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ChefHat size={16} /> Creator
          </button>
        </div>

        <div className="w-full max-w-sm border p-5 rounded-2xl bg-white/20 backdrop-blur-xl bg-opacity-30 relative shadow-xl border-gray-300 transition-all duration-700 max-h-[65vh] overflow-hidden ">
          {/* <img src="/join-now-badge.png" alt="Join Now" className="absolute -top-5 -right-5 w-20 rotate-6" /> */}
          {/* <div className="absolute -top-3 -right-3 bg-yellow-400 text-green-800 font-bold py-1 px-3 rounded-full shadow-md transform rotate-6 text-sm">
  Join now!
</div> */}
          <h3 className="text-2xl font-bold mb-4 text-[#028b6e] text-center">Benefits as a {activeTab === "fan" ? "Foodie Fan" : "Creator"}</h3>
          {/* <ul className="space-y-2 text-gray-700 mb-5 text-sm leading-snug"> */}
          <ul className="space-y-1 text-gray-700 mb-5 text-base leading-snug">
            {benefits[activeTab].map((item, index) => (
              <li key={index} className="flex items-start gap-2 p-1 hover:bg-white/40 rounded-md transition-colors">
                <span className="p-1 bg-[#028b6e]/10 text-[#028b6e] rounded-full mt-0.5">
                  {item.icon}
                </span>
                <span className="mt-1 text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
          <button
            className="w-full bg-[#028b6e] hover:bg-[#02705a] text-white p-3 rounded-xl text-base font-bold transition-transform duration-500 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 group mb-12"
            onClick={() => {
                if (activeTab === "fan") router.push("/fan-signup");
                else router.push("/creator-signup");
              }}
          >
            Let’s roll in <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
