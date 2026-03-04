import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function EmployeeForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const isViewMode = location.pathname.includes('/view');
  const isEditMode = location.pathname.includes('/edit');
  const pageTitle = isViewMode ? "View Employee Details" : isEditMode ? "Edit Employee Details" : "Add New Employee";

  const [formData, setFormData] = useState({
    name: '', empId: '', department: '', designation: '', project: '', type: '', status: ''
  });
  
  const[imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/employees/${id}`)
        .then(res => {
          const data = res.data;
          setFormData({
            name: data.name || '',
            empId: data.empId || '',
            department: data.department || '',
            designation: data.designation || '',
            project: data.project || '',
            type: data.type || '',
            status: data.status || ''
          });
          if (data.image) {
            setImagePreview(`http://localhost:5000${data.image}`);
          }
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/employees/${id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5000/api/employees', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error && err.response.data.error.includes('Duplicate entry')) {
        alert("Error: இந்த Employee ID ஏற்கெனவே உள்ளது! தயவுசெய்து வேறு ID-ஐ கொடுக்கவும்.");
      } else {
        alert("Error saving data! Please check backend.");
      }
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-md p-2.5 text-sm mt-1 focus:outline-none focus:border-[#007BFF] bg-white transition-colors";

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 min-h-[80vh]">
      <div className="flex items-center space-x-2 mb-6">
        <Link to="/" className="text-gray-500 font-bold text-lg hover:text-black">&lt;</Link>
        <h2 className="text-xl font-bold text-gray-800">{pageTitle}</h2>
      </div>

      <div className="border-b border-gray-200 mb-6 pb-2">
        <span className="text-[#007BFF] font-semibold text-sm border-b-2 border-[#007BFF] pb-2.5 px-2">Personal Information</span>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div 
           className={`mb-6 w-16 h-16 rounded border border-dashed border-gray-400 flex items-center justify-center bg-gray-50 overflow-hidden ${!isViewMode ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
           onClick={() => !isViewMode && fileInputRef.current.click()}
           title={!isViewMode ? "Click to upload image" : ""}
        >
           {imagePreview ? (
             <img src={imagePreview} alt="avatar" className="w-full h-full object-cover" />
           ) : (
             <span className="text-gray-400 text-xs border border-gray-300 rounded-full p-2">📷</span>
           )}
           
           <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageChange} 
              disabled={isViewMode} 
           />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700">Name*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isViewMode} placeholder="Enter name" required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700">Employee ID*</label>
            <input type="text" name="empId" value={formData.empId} onChange={handleChange} disabled={isViewMode} placeholder="Enter employee ID" required className={inputClass} />
          </div>
          
          {/* 5 Options Added for Department */}
          <div>
            <label className="text-sm font-bold text-gray-700">Department*</label>
            <select name="department" value={formData.department} onChange={handleChange} disabled={isViewMode} required className={inputClass}>
              <option value="">Select Department</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Quality Assurance">Quality Assurance (QA)</option>
              <option value="Human Resources">Human Resources (HR)</option>
              <option value="Marketing & Sales">Marketing & Sales</option>
            </select>
          </div>
          
          {/* 5 Options Added for Designation */}
          <div>
            <label className="text-sm font-bold text-gray-700">Designation*</label>
            <select name="designation" value={formData.designation} onChange={handleChange} disabled={isViewMode} required className={inputClass}>
              <option value="">Select designation</option>
              <option value="Design Lead">Design Lead</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Project Manager">Project Manager</option>
              <option value="QA Tester">QA Tester</option>
              <option value="HR Executive">HR Executive</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Project</label>
            <input type="text" name="project" value={formData.project} onChange={handleChange} disabled={isViewMode} placeholder="Enter Project" className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700">Type*</label>
            <select name="type" value={formData.type} onChange={handleChange} disabled={isViewMode} required className={inputClass}>
              <option value="">Select Type</option>
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700">Status*</label>
            <select name="status" value={formData.status} onChange={handleChange} disabled={isViewMode} required className={inputClass}>
              <option value="">Select Status</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Probation">Probation</option>
            </select>
          </div>
        </div>

        {!isViewMode && (
          <div className="flex justify-end mt-8 space-x-4">
            <Link to="/" className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</Link>
            <button type="submit" className="px-6 py-2 bg-[#007BFF] hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors">
              {isEditMode ? 'Update' : 'Confirm'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}