import { HiOutlineUser } from "react-icons/hi";

export const renderAdminAvatar = (adminUser: any) => {
  if (adminUser?.profilePic) {
    return (
      <img
        src={adminUser.profilePic}
        className="circleIMg"
        alt="Profile"
      />
    );
  }

  const hasName = !!adminUser?.name;

  const initials = hasName
    ? adminUser.name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word: any) => word[0])
      .join("")
      .toUpperCase()
    : null;

  return (
    <div
      className="nameTitleMain"
      style={{
        backgroundColor: hasName ? "" : "#6778FE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hasName ? initials : <HiOutlineUser color="#fff" />}
    </div>
  );
};