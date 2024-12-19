import { useState, useEffect } from "react";
import axios from "axios";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("AY 2024-25");
  const [selectedCourse, setSelectedCourse] = useState("CBSE 9");

  const years = ["AY 2024-25", "AY 2023-24", "AY 2022-23"];
  const courses = ["CBSE 9", "CBSE 10", "CBSE 11"];

  useEffect(() => {
    // Fetch students from API
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Filters Section */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b gap-4">
        <div className="flex flex-wrap gap-4">
          {/* Academic Year Dropdown */}
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="block w-36 pl-2 pr-8 py-2 border border-gray-300 bg-gray-300 font-semibold rounded-md shadow-sm focus:outline-none"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="block w-36 pl-3 pr-10 py-2 font-semibold border border-gray-300 bg-gray-300 rounded-md shadow-sm focus:outline-none"
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md">
          + Add new Student
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto  h-screen no-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Student Name</th>
              <th>Cohort</th>
              <th>Courses</th>
              <th>Date Joined</th>
              <th>Last Login</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{student.name}</td>
                <td className="pr-14">{student.cohort}</td>
                <td>{student.courses.join(", ")}</td>
                <td>{new Date(student.dateJoined).toLocaleDateString()}</td>
                <td>{new Date(student.lastLogin).toLocaleString()}</td>
                <td>
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      student.status === "online"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
