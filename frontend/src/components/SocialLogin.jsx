// import { GoogleLogin } from '@react-oauth/google';
// import { useFacebookLogin } from "@kazion/react-facebook-login";

// export default function SocialLogin({ onSuccess }) {
//   const handleGoogleSuccess = (credentialResponse) => {
//     onSuccess('google', credentialResponse.credential);
//   };

//   const facebookLogin = useFacebookLogin({
//     appId: "YOUR_FACEBOOK_APP_ID",
//     version: "v19.0",
//     onSuccess: (response) => onSuccess('facebook', response.accessToken),
//     onError: () => console.error('Facebook login failed')
//   });

//   return (
//     <div className="space-y-4">
//       <GoogleLogin
//         onSuccess={handleGoogleSuccess}
//         onError={() => console.error('Google login failed')}
//         useOneTap
//       />
//       <button
//         onClick={() => facebookLogin()}
//         className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//       >
//         Continue with Facebook
//       </button>
//     </div>
//   );
// }