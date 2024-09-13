'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmploymentList() {
  const [employees, setEmployees] = useState([
    { id: "0001", name: "John Doe", department: "HR", gender: "Male", salary: "50,000" },
    { id: "0002", name: "Jane Smith", department: "Finance", gender: "Female", salary: "55,000" },
    { id: "0003", name: "Alex Johnson", department: "Engineering", gender: "LGBTQ++", salary: "48,000" },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    gender: '',
    salary: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const generateNextId = () => {
    const lastId = employees.length ? employees[employees.length - 1].id : "0000";
    const nextId = String(parseInt(lastId) + 1).padStart(4, '0');
    return nextId;
  };

  const handleSaveEmployee = () => {
    if (newEmployee.name.trim() !== '') {
      if (isEditing) {
        setEmployees(employees.map(emp =>
          emp.id === editingEmployeeId ? { ...emp, ...newEmployee } : emp
        ));
        setIsEditing(false);
        setEditingEmployeeId(null);
      } else {
        const newId = generateNextId();
        setEmployees([...employees, { id: newId, ...newEmployee }]);
      }
      setNewEmployee({ name: '', department: '', gender: '', salary: '' });
      setIsModalOpen(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false);
    setNewEmployee({ name: '', department: '', gender: '', salary: '' });
  };

  const handleEditEmployee = (id, employee) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingEmployeeId(id);
    setNewEmployee(employee);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg relative h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-bold text-green-700">Employment List</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={toggleModal}
        >
          + Add
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-green-700 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <div className="mb-4">
              <label className="block text-white mb-2">Name :</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Department :</label>
              <input
                type="text"
                placeholder="Enter Department"
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Gender :</label>
              <input
                type="text"
                placeholder="Enter Gender"
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={newEmployee.gender}
                onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Basic Salary :</label>
              <input
                type="text"
                placeholder="Enter Salary"
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={handleSaveEmployee}
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setNewEmployee({ name: '', department: '', gender: '', salary: '' });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-auto">
        <Table className="w-full rounded-lg overflow-hidden border border-gray-300">
          <TableHeader className="bg-green-700 text-white">
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Department</TableHead>
              <TableHead className="text-white">Gender</TableHead>
              <TableHead className="text-white">Basic Salary</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id} className="bg-green-100 hover:bg-green-200 text-black">
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.gender}</TableCell>
                <TableCell>{emp.salary}</TableCell>
                <TableCell>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-700"
                    onClick={() => handleEditEmployee(emp.id, emp)}
                  >
                    Update
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
