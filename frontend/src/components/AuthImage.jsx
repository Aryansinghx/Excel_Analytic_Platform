import bg from "../assets/logo.png";

function AuthImage({ isLogin }) {
  return (
    <div
      className="h-full w-full bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="h-full w-full bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h2 className="text-2xl font-bold">
            {isLogin ? "New here?" : "Welcome back!"}
          </h2>
          <p className="text-sm mt-2">
            {isLogin
              ? "Sign up and explore the platform"
              : "Login and start working"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthImage;