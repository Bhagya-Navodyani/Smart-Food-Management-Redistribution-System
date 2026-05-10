import React, { useState } from 'react';
import { 
  User, Shield, Bell, Camera, Mail, Phone, 
  Globe, Lock, Eye, EyeOff, Save,
  CheckCircle2, Building2, ChevronRight, Upload
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
const OrganizationSettings = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || 'profile';
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: 'Fresh Track Organization',
    email: 'contact@freshtrack.org',
    phone: '+94 11 234 5678',
    bio: 'A non-profit organization dedicated to reducing food waste and supporting local communities through efficient redistribution.'
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Organization information' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Password & access' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Preferences' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Settings</h1>
          <p className="text-gray-500">Manage your organization's account and preferences.</p>
        </header>

        <div className="flex flex-col gap-8">
          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="p-8">
                {/* ── ORGANIZATION PROFILE SECTION ── */}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Organization Profile</h2>
                      <p className="text-sm text-gray-500 mb-6">Update your organization's public information.</p>
                    </div>

                    {/* Avatar Upload Component */}
                    <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-gray-100">
                      <div className="relative group">
                        <div className="w-28 h-28 rounded-3xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                          <Building2 size={48} className="text-emerald-600" />
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                            <Upload size={24} className="text-white drop-shadow-md" />
                          </div>
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2.5 bg-white border border-gray-200 rounded-xl shadow-lg text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all">
                          <Camera size={16} />
                        </button>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="font-bold text-gray-900 mb-1 tracking-wide">Organization Logo</h3>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                          Recommended size: 400x400px.<br />
                          JPG, PNG or SVG. Max 2MB.
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                          <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-200">
                            Upload Logo
                          </button>
                          <button className="px-5 py-2 bg-white hover:bg-gray-50 text-gray-500 text-xs font-bold rounded-xl transition-all border border-gray-200">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields - Tailwind Forms Styling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Organization Name</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Building2 size={18} />
                          </div>
                          <input 
                            type="text" 
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                            placeholder="e.g. Food Care Foundation"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Mail size={18} />
                          </div>
                          <input 
                            type="email" 
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                            placeholder="organization@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Phone size={18} />
                          </div>
                          <input 
                            type="text" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                            placeholder="+94 7X XXX XXXX"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Official Website</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Globe size={18} />
                          </div>
                          <input 
                            type="text" 
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                            placeholder="https://your-org.org"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Bio / Description</label>
                        <textarea 
                          rows="4"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 resize-none placeholder-gray-400 leading-relaxed"
                          placeholder="Tell us about your organization's mission..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-6 flex items-center justify-between border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        {saveSuccess && (
                          <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold animate-in fade-in slide-in-from-left-2 duration-300">
                            <CheckCircle2 size={16} /> Changes saved successfully!
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 text-sm font-bold hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-[0.98]">
                          Discard
                        </button>
                        <button 
                          onClick={handleSave}
                          disabled={isSaving}
                          className="px-8 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 active:scale-[0.98]"
                        >
                          {isSaving ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Placeholder for other tabs ── */}
                {activeTab !== 'profile' && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="p-6 rounded-full bg-gray-50 border border-gray-100 mb-4">
                      {activeTab === 'security' ? <Shield size={48} className="text-gray-300" /> : <Bell size={48} className="text-gray-300" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
                    <p className="text-gray-500 max-w-sm">This section is currently under development to match the light theme.</p>
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettings;
