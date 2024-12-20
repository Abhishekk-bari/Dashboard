import { FaTachometerAlt, FaUsers, FaBook, FaQuestionCircle, FaChartBar, FaCog } from 'react-icons/fa';
import logo from '../assets/Vector.png';

//sidebar stuff
const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col pt-2">
      <img src={logo} className='p-4 pt-8 w-32 pl-5'/>
      {/* <h1 className="text-2xl font-bold p-4">Quyl.</h1> */}
      <nav className="flex-1 pt-6 text-gray-600">
        <ul>
          {[
            { name: 'Dashboard', icon: <FaTachometerAlt />  },
            { name: 'Students', icon: <FaUsers />, active: true },
            { name: 'Chapter', icon: <FaBook /> },
            { name: 'Help', icon: <FaQuestionCircle /> },
            { name: 'Reports', icon: <FaChartBar /> },
            { name: 'Settings', icon: <FaCog /> },
          ].map(({ name, icon, active }) => (
            <li key={name} className={`p-4 flex items-center space-x-2 ${active ? 'bg-gray-200  text-zinc-800 font-bold' : ''}`}>
              {icon}
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

