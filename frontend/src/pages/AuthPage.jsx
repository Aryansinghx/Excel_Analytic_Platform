// // src/pages/AuthPage.jsx
// import { useState } from "react";
// import LoginForm from "../components/LoginForm";
// import RegisterForm from "../components/RegisterForm";
// import ExcelAnalyticsLogo from "../assets/ExcelAnalyticsLogo.svg";
// import Lottie from "lottie-react";
// import animation1 from "../assets/animation1.json";
// import animation2 from "../assets/animation2.json";
// import animation3 from "../assets/animation3.json";
// import animation4 from "../assets/animation4.json";
// import SocialLogin from '../components/SocialLogin';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const handleSocialSuccess = async (provider, token) => {
//     try {
//       const res = await axios.post('/api/auth/social', { provider, token });
//       localStorage.setItem('token', res.data.token);
//       // Redirect to dashboard
//     } catch (error) {
//       console.error('Social login failed', error);
//     }
//   };

//   return (
//     <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
//       {/* Background Lottie Animations */}
//       <div className="pointer-events-none select-none">
//         <div className="absolute top-0 left-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
//           <Lottie animationData={animation1} loop={true} className="w-full h-full" />
//         </div>
//         <div className="absolute top-0 right-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
//           <Lottie animationData={animation2} loop={true} className="w-full h-full" />
//         </div>
//         <div className="absolute bottom-0 left-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
//           <Lottie animationData={animation3} loop={true} className="w-full h-full" />
//         </div>
//         <div className="absolute bottom-0 right-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
//           <Lottie animationData={animation4} loop={true} className="w-full h-full" />
//         </div>
//       </div>
//       <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-3 md:p-4 flex flex-col items-center z-10 relative">
//         <img src={ExcelAnalyticsLogo} alt="ExcelAnalytics Logo" className="h-8 w-8 mb-1" />
//         <div className="text-center mb-2">
//           <h1 className="text-lg font-extrabold text-gray-900">ExcelAnalytics</h1>
//           <div className="text-gray-500 text-xs mt-0.5">Transform your data into insights</div>
//         </div>
//         {isLogin ? (
//           <LoginForm toggle={() => setIsLogin(false)} />
//         ) : (
//           <RegisterForm toggle={() => setIsLogin(true)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import { useState } from "react";
// import axios from "axios"; // Make sure to import axios
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ExcelAnalyticsLogo from "../assets/ExcelAnalyticsLogo.svg";
import Lottie from "lottie-react";
import animation1 from "../assets/animation1.json";
import animation2 from "../assets/animation2.json";
import animation3 from "../assets/animation3.json";
import animation4 from "../assets/animation4.json";
// import SocialLogin from '../components/SocialLogin';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // const handleSocialSuccess = async (provider, token) => {
  //   try {
  //     const res = await axios.post('/api/auth/social', { provider, token });
  //     localStorage.setItem('token', res.data.token);
  //     // Redirect to dashboard
  //     window.location.href = '/dashboard';
  //   } catch (error) {
  //     console.error('Social login failed', error);
  //   }
  // };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Lottie Animations */}
      <div className="pointer-events-none select-none">
        <div className="absolute top-0 left-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
          <Lottie animationData={animation1} loop={true} className="w-full h-full" />
        </div>
        <div className="absolute top-0 right-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
          <Lottie animationData={animation2} loop={true} className="w-full h-full" />
        </div>
        <div className="absolute bottom-0 left-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
          <Lottie animationData={animation3} loop={true} className="w-full h-full" />
        </div>
        <div className="absolute bottom-0 right-0 z-0 opacity-30 w-28 h-28 md:w-40 md:h-40">
          <Lottie animationData={animation4} loop={true} className="w-full h-full" />
        </div>
      </div>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-3 md:p-4 flex flex-col items-center z-10 relative">
        <img src={ExcelAnalyticsLogo} alt="ExcelAnalytics Logo" className="h-8 w-8 mb-1" />
        <div className="text-center mb-2">
          <h1 className="text-lg font-extrabold text-gray-900">ExcelAnalytics</h1>
          <div className="text-gray-500 text-xs mt-0.5">Transform your data into insights</div>
        </div>
        {isLogin ? (
          <LoginForm toggle={() => setIsLogin(false)} />
        ) : (
          <RegisterForm toggle={() => setIsLogin(true)} />
        )}
        
        {/* Social Login Section
        <div className="w-full mt-4">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <SocialLogin onSuccess={handleSocialSuccess} />
        </div> */}
      </div>
    </div>
  );
};

export default AuthPage;