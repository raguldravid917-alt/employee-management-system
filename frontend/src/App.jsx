import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeList />} />
          <Route path="add" element={<EmployeeForm />} />
          <Route path="edit/:id" element={<EmployeeForm />} />
          <Route path="view/:id" element={<EmployeeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}