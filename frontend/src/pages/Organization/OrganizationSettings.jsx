import React, { useState, useEffect } from 'react';
import { 
  User, Shield, Bell, Camera, Mail, Phone, 
  Globe, Lock, Eye, EyeOff, Save,
  CheckCircle2, Building2, ChevronRight, Upload,
  Key, ShieldCheck, Smartphone, History, ArrowRight, Laptop, LogOut
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
const OrganizationSettings = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || 'profile';
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [deviceInfo, setDeviceInfo] = useState({
    browser: 'Chrome',
    os: 'Windows',
    icon: Laptop
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    let browser = "Chrome";
    if (ua.indexOf("Firefox") > -1) browser = "Firefox";
    else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) browser = "Safari";
    else if (ua.indexOf("Edg") > -1) browser = "Edge";

    let os = "Windows";
    let Icon = Laptop;
    if (ua.indexOf("Mac") > -1) os = "MacOS";
    else if (ua.indexOf("iPhone") > -1) { os = "iPhone"; Icon = Smartphone; }
    else if (ua.indexOf("Android") > -1) { os = "Android"; Icon = Smartphone; }
    else if (ua.indexOf("Linux") > -1) os = "Linux";

    setDeviceInfo({ browser, os, icon: Icon });
  }, []);

  // Form states - Load from localStorage
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('orgProfileData');
    return saved ? JSON.parse(saved) : {
      name: 'Fresh Track Organization',
      email: 'contact@freshtrack.org',
      phone: '+94 11 234 5678',
      bio: 'A non-profit organization dedicated to reducing food waste and supporting local communities through efficient redistribution.'
    };
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('orgProfileData', JSON.stringify(profileData));
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
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

                {/* ── SECURITY SECTION ── */}
                {activeTab === 'security' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Security Settings</h2>
                      <p className="text-sm text-gray-500 mb-6">Manage your password and account security preferences.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Password Form */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-emerald-50 rounded-xl">
                              <Key className="text-emerald-600" size={20} />
                            </div>
                            <h3 className="font-bold text-gray-900">Change Password</h3>
                          </div>

                          <div className="space-y-5">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                              <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                                  <Lock size={18} />
                                </div>
                                <input 
                                  type={showPassword ? "text" : "password"}
                                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                  placeholder="Enter current password"
                                />
                                <button 
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative group">
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                                    <Shield size={18} />
                                  </div>
                                  <input 
                                    type="password"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                    placeholder="New password"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <div className="relative group">
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                                    <Shield size={18} />
                                  </div>
                                  <input 
                                    type="password"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                    placeholder="Confirm password"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                              <button className="px-8 py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] flex items-center gap-2">
                                Update Password
                                <ArrowRight size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Login Activity */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-blue-50 rounded-xl">
                                <History className="text-blue-600" size={20} />
                              </div>
                              <h3 className="font-bold text-gray-900">Login Activity</h3>
                            </div>
                            <button 
                              onClick={() => setShowLogoutConfirm(true)}
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              Log out from all devices
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                                  <deviceInfo.icon size={20} className="text-emerald-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900">{deviceInfo.browser} on {deviceInfo.os}</p>
                                  <p className="text-xs text-gray-500">Active now</p>
                                </div>
                              </div>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">Current Device</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Info/Tips */}
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg shadow-emerald-100">
                          <ShieldCheck size={32} className="mb-4 opacity-80" />
                          <h4 className="font-bold mb-2">Security Tip</h4>
                          <p className="text-sm text-emerald-50 opacity-90 leading-relaxed">
                            Use a unique password with a mix of symbols, numbers, and uppercase letters to keep your account safe.
                          </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <h4 className="font-bold text-gray-900 mb-4">Two-Factor Auth</h4>
                          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                            Add an extra layer of security by requiring a code from your phone.
                          </p>
                          <button className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-100 transition-all">
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── NOTIFICATIONS SECTION (Placeholder) ── */}
                {activeTab === 'notifications' && (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 rounded-full bg-gray-50 border border-gray-100 mb-4">
                      <Bell size={48} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Notification Preferences</h3>
                    <p className="text-gray-500 max-w-sm">Manage how and when you receive updates from Fresh Track.</p>
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <LogOut size={36} className="text-red-500 ml-1" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Log out everywhere?</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">This will sign you out from all other devices and your current session.</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all">Cancel</button>
              <button 
                onClick={() => navigate('/signin')} 
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default OrganizationSettings;
