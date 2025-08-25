// src/components/UserAvatar.jsx
const UserAvatar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";
  const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${name}`;

  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <img
        src={avatar}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover border"
      />
      <span className="text-sm text-white hidden md:block">{name}</span>
    </div>
  );
};

export default UserAvatar;