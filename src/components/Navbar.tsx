import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[90px] flex justify-between items-center px-10 py-5 sticky top-0 bg-white">
      <div className="flex">
        <div
          className="text-2xl  flex justify-center items-center"
          onClick={() => navigate("/")}
        >
          <img src={"/Logo.png"} alt="logo" className="mt-4 -ml-5" />
          <span className="font-bold cursor-pointer hover:text-primary-500">
            VINTAMEDICAL
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div
          className={`text-xl cursor-pointer ${
            window.location.pathname === "/"
              ? "text-primary-500"
              : "hover:text-primary-500"
          }`}
          onClick={() => navigate("/")}
        >
          <span>Homepage</span>
        </div>
        {/* <div className="text-xl cursor-pointer hover:text-primary-500">
          <span>Contact</span>
        </div> */}
        <div
          className={`text-xl cursor-pointer ${
            window.location.pathname === "/history"
              ? "text-primary-500"
              : "hover:text-primary-500"
          }`}
          onClick={() => navigate("/history")}
        >
          <span className="">History</span>
        </div>
        <div
          className="text-xl cursor-pointer hover:text-red-600"
          onClick={() => navigate("/logout")}
        >
          <span>Logout</span>
        </div>

        <div className="w-full flex justify-center">
          <img
            className="w-[60px] h-[60px] bg-primary-500 rounded-full"
            src={"/Logo.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
