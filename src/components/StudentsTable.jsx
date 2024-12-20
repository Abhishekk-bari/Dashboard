import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("AY 2024-25");
  const [selectedCourse, setSelectedCourse] = useState("CBSE 9");
  const [newStudent, setNewStudent] = useState({ name: "", cohort: "AY 2024-25", courses: [] });
  const [editStudent, setEditStudent] = useState(null);
  const [editName, setEditName] = useState("");

  const years = ["AY 2024-25", "AY 2023-24", "AY 2022-23"];
  const courses = ["CBSE 9", "CBSE 10", "CBSE 11"];

  // Fetching students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://dashboard-backend-pvsl.onrender.com/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // Add new student handler
  const handleAddStudent = async () => {
    try {
      const response = await axios.post("https://dashboard-backend-pvsl.onrender.com/students", newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ name: "", cohort: "AY 2024-25", courses: [] }); // Reset form
    } catch (error) {
      console.error("Error adding student:", error.response ? error.response.data : error.message);
    }
  };

  // Delete student handler
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://dashboard-backend-pvsl.onrender.com/students/${id}`);
      alert("Student deleted successfully");
      // Update the UI by removing the deleted student from the state
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  // Edit student handler
  const handleEditStudent = (student) => {
    setEditStudent(student);
    setEditName(student.name);
  };

  // Update student handler
  const handleUpdateStudent = async () => {
    try {
      const updatedStudent = {
        ...editStudent,
        name: editName, // Ensure the updated name is included
      };

      const response = await axios.put(
        `https://dashboard-backend-pvsl.onrender.com/students/${editStudent.id}`,
        updatedStudent
      );

      // Update the local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editStudent.id ? response.data : student
        )
      );
      setEditStudent(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Filtering students based on selected year and course
  const filteredStudents = students.filter(
    (student) =>
      student.cohort === selectedYear &&
      student.courses.some((course) => course.includes(selectedCourse))
  );

  const courseImages = {
    "CBSE 9 Science": "/assets/sir.png",
    "CBSE 9 Math": "/assets/mam.png",
    "CBSE 10 Science": "/assets/sir.png",
    "CBSE 10 Math": "/assets/mam.png",
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Filters Section */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b gap-4">
        <div className="flex flex-wrap gap-4">
          {/* Academic Year Dropdown */}
          <div>
            <select
              aria-label="Select Academic Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="block w-36 pl-2 pr-8 py-2 border border-gray-300 bg-gray-300 font-semibold rounded-md shadow-sm focus:outline-none sm:w-48"
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
              aria-label="Select Course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="block w-36 pl-3 pr-10 py-2 font-semibold border border-gray-300 bg-gray-300 rounded-md shadow-sm focus:outline-none sm:w-48"
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            aria-label="Add new student"
            onClick={handleAddStudent}
            className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md"
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto h-screen no-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Student Name</th>
              <th>Cohort</th>
              <th>Courses</th>
              <th>Date Joined</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {editStudent?.id === student.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded-md"
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td className="pr-14">{student.cohort}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {student.courses.map((course, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg"
                        >
                          <img
                            src={courseImages[course] || "/assets/mam.png"}
                            alt={course}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    {student.date_joined
                      ? new Date(student.date_joined).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Invalid date"}
                  </td>
                  <td>
                    {student.last_login
                      ? new Date(student.last_login).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Invalid time"}
                  </td>
                  <td>
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        student.status === "online" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                  </td>
                  <td className="flex gap-2">
                    {editStudent?.id === student.id ? (
                      <button
                        onClick={handleUpdateStudent}
                        className="text-green-500 hover:text-green-700"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No students found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
