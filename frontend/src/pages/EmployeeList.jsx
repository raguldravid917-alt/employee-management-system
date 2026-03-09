import { useState, useEffect } from 'react';
import { PlusCircle, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EmployeeList() {
  const[employees, setEmployees] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const[deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  },[]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${deleteId}`);
      setShowDelete(false);
      fetchEmployees(); 
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Employee</h2>
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <Search className="w-[18px] h-[18px] absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary w-64" 
            />
          </div>
          <Link to="/add" className="bg-[#007BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center transition-colors">
            <PlusCircle className="w-[18px] h-[18px] mr-2" /> Add New Employee
          </Link>
        </div>
      </div>

      <div className="p-0">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-200 text-[13px] text-gray-500 bg-white">
              <th className="px-5 py-4 font-medium whitespace-nowrap">Employee Name</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">Employee ID</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">Department</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">Designation</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">Project</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">Type</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">Status</th>
              <th className="px-5 py-4 font-medium whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-5 py-20 text-center text-gray-500 font-medium text-sm">
                  No records found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                  <td className="px-5 py-4 text-[14px] font-medium text-gray-800 flex items-center space-x-3 whitespace-nowrap">
                    <img 
                      src={emp.image ? `http://localhost:5000${emp.image}` : "https://i.pravatar.cc/150?img=12"} 
                      alt={emp.name} 
                      className="w-8 h-8 rounded-full bg-gray-200 object-cover" 
                    />
                    <span>{emp.name}</span>
                  </td>
                  <td className="px-5 py-4 text-[14px] text-gray-600 whitespace-nowrap">{emp.empId}</td>
                  <td className="px-5 py-4 text-[14px] text-gray-600 whitespace-nowrap">{emp.department}</td>
                  <td className="px-5 py-4 text-[14px] text-gray-600 whitespace-nowrap">{emp.designation}</td>
                  <td className="px-5 py-4 text-[14px] text-gray-600 whitespace-nowrap">{emp.project}</td>
                  <td className="px-5 py-4 text-[14px] text-gray-600 whitespace-nowrap">{emp.type}</td>
                  <td className="px-5 py-4 text-[14px] text-gray-600 whitespace-nowrap">{emp.status}</td>
                  <td className="px-5 py-4 text-[14px] text-gray-500 flex items-center space-x-4 whitespace-nowrap">
                    <Link to={`/view/${emp.id}`} className="hover:text-[#007BFF] transition-colors"><Eye className="w-5 h-5" /></Link>
                    <Link to={`/edit/${emp.id}`} className="hover:text-blue-500 transition-colors"><Pencil className="w-5 h-5" /></Link>
                    <button onClick={() => { setDeleteId(emp.id); setShowDelete(true); }} className="hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDelete && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-80 text-center overflow-hidden">
             <div className="py-8 px-6">
                <div className="flex justify-center mb-4">
                  <Trash2 className="w-12 h-12 text-blue-500 bg-blue-50 p-3 rounded-full" />
                </div>
                <h3 className="text-gray-800 font-semibold mb-2 text-lg">Are you sure you want<br/>to Delete</h3>
             </div>
             <div className="flex border-t border-gray-200">
               <button onClick={() => setShowDelete(false)} className="w-1/2 py-3 bg-[#FF4B4B] text-white font-medium hover:bg-red-600 transition-colors">Cancel</button>
               <button onClick={confirmDelete} className="w-1/2 py-3 bg-[#007BFF] text-white font-medium hover:bg-blue-600 transition-colors">Yes</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}