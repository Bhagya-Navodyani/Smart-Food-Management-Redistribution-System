import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const r = params.get('role');
    if (r) setRole(r);
  }, [location.search]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ email, password, role });
    // TODO: call backend auth, then redirect based on role
    const redirectMap = {
      'Customer': '/customer/dashboard',
      'Admin': '/admin/dashboard',
      'Organizations': '/organization/dashboard',
      'Food sellers': '/foodsellers/dashboard'
    };
    navigate(redirectMap[role] || '/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2">
              <option>Customer</option>
              <option>Admin</option>
              <option>Organizations</option>
              <option>Food sellers</option>
            </select>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
          </div>
        </form>
        <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
      </div>
    </div>
  );
}
