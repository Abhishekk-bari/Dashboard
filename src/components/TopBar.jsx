import img from "../assets/Avatar Image.png";
import { IoIosSearch } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TiMessageTyping } from "react-icons/ti";
import { CiBellOn } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";

const TopBar = () => {
  
  return (
    <div className="pl-6 border-b border-gray-200 p-4 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
      {/* Search Bar */}
      <div className="w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Search your course"
          className="border rounded-md px-8 py-2 w-full"
        />
        <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center justify-center space-x-4 md:space-x-6">
        <IoIosHelpCircleOutline className="text-xl text-gray-500" />
        <TiMessageTyping className="text-2xl text-gray-500" />
        <LuSettings2 className="text-xl text-gray-500" />
        <CiBellOn className="text-2xl text-gray-500" />

        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <img src={img} alt="profile" className="w-8 h-8  md:w-10 md:h-10" />
          <span className="hidden md:block text-gray-800 font-semibold">
            Adeline H. Dancy
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
