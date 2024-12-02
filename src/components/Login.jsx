import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com/users/login", formData);
      console.log("User logged in:", response.data);
      setAuth(response.data);
      localStorage.setItem('secretToken', response.data.token);
      navigate("/tasks/create");
    } catch (error) {
      console.error("Error logging in:", error.response.data);
    }
  };

  return (
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <div class="flex flex-row gap-3 pb-4">
        <div>
          <img src="/favicon.svg" alt="Logo" width="50" />
        </div>
        <h1 class="text-3xl font-bold text-[#4B5563] my-auto">Your Company</h1>
      </div>
      <div class="text-sm font-light text-[#6B7280] pb-8">Login to your account on Your Company.</div>
      <form class="flex flex-col" onSubmit={handleSubmit}>
        <div class="pb-2">
          <label htmlFor="email" class="block mb-2 text-sm font-medium text-[#111827]">Email</label>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input type="email" name="email" id="email" class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="name@company.com" autoComplete="off" value={formData.email} onChange={handleChange} />
          </div>
        </div>
        <div class="pb-6">
          <label htmlFor="password" class="block mb-2 text-sm font-medium text-[#111827]">Password</label>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-asterisk">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input type="password" name="password" id="password" placeholder="••••••••••" class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" value={formData.password} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" class="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Login</button>
        <div class="text-sm font-light text-[#6B7280]">Don't have an account yet? <a href="#" class="font-medium text-[#4F46E5] hover:underline">Sign Up</a></div>
      </form>
    </div>
  );
};

export default Login;

