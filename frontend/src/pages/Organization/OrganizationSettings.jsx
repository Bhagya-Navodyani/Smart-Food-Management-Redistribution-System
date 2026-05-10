import React, { useState, useEffect } from 'react';
import { 
  User, Shield, Bell, Camera, Mail, Phone, 
  Globe, Lock, Eye, EyeOff, Save,
  CheckCircle2, Building2, ChevronRight, Upload,
  Key, ShieldCheck, Smartphone, History, ArrowRight, Laptop, LogOut,
  MapPin, UserCircle, FileText, Calendar, Hash, Trash2, Pencil, X,
  ClipboardList, AlertTriangle, BarChart3
} from 'lucide-react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';

const OrganizationSettings = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { notifications: notificationsList, setNotifications: setNotificationsList } = useOutletContext();
  const activeTab = tab || 'profile';
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteLogoConfirm, setShowDeleteLogoConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  
  const [deviceInfo, setDeviceInfo] = useState({
    browser: 'Chrome',
    os: 'Windows',
    icon: Laptop
  });

  const [showOlder, setShowOlder] = useState(false);

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
      regNumber: 'GA-123456',
      email: 'contact@freshtrack.org',
      phone: '+94 11 234 5678',
      website: 'https://freshtrack.org',
      address: 'No 45, Galle Road, Colombo 03',
      representative: 'John Doe',
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Settings</h1>
          <p className="text-sm text-gray-500">Manage your organization's account and preferences.</p>
        </header>

        <div className="flex flex-col gap-8">
          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="p-6">
                {/* ── ORGANIZATION PROFILE SECTION ── */}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Organization Profile</h2>
                      <p className="text-sm text-gray-500">Update your organization's public information.</p>
                    </div>

                    {/* Avatar Upload Component */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 pb-6 border-b border-gray-100">
                      <div className="relative group flex-shrink-0">
                        <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                          {profileData.logo ? (
                            <img src={profileData.logo} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            <Building2 size={48} className="text-emerald-600" />
                          )}
                          <div 
                            className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                            onClick={() => document.getElementById('logoInput').click()}
                          >
                            <Upload size={24} className="text-white drop-shadow-md" />
                          </div>
                        </div>
                        <div className="absolute -bottom-3 left-0 w-full flex justify-center gap-2 z-20">
                          <button 
                            onClick={() => document.getElementById('logoInput').click()}
                            className="p-2.5 bg-white border border-gray-200 rounded-xl shadow-lg text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all"
                            title="Upload Logo"
                          >
                            <Camera size={16} />
                          </button>
                          {profileData.logo && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteLogoConfirm(true);
                              }}
                              className="p-2.5 bg-white border border-red-100 rounded-xl shadow-lg text-red-500 hover:bg-red-50 hover:scale-110 transition-all"
                              title="Remove Logo"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <input 
                          type="file" 
                          id="logoInput" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfileData({...profileData, logo: reader.result});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                      <div className="text-center sm:text-left pt-1">
                        <h3 className="font-bold text-gray-900 mb-0.5 tracking-wide">Organization Logo</h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Click to upload or drag & drop.<br />
                          JPG, PNG or SVG. Max 2MB.
                        </p>
                      </div>
                    </div>

                    {/* Form Fields - Tailwind Forms Styling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Organization Name</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Building2 size={16} />
                          </div>
                          <input 
                            type="text" 
                            disabled={!isEditMode}
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 placeholder-gray-400`}
                            placeholder="e.g. Food Care Foundation"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Mail size={16} />
                          </div>
                          <input 
                            type="email" 
                            disabled={!isEditMode}
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 placeholder-gray-400`}
                            placeholder="organization@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Phone size={16} />
                          </div>
                          <input 
                            type="text" 
                            disabled={!isEditMode}
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 placeholder-gray-400`}
                            placeholder="+94 7X XXX XXXX"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Official Website</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Globe size={16} />
                          </div>
                          <input 
                            type="text" 
                            disabled={!isEditMode}
                            value={profileData.website || ''}
                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 placeholder-gray-400`}
                            placeholder="https://your-org.org"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Registration Number</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <Hash size={16} />
                          </div>
                          <input 
                            type="text" 
                            disabled={!isEditMode}
                            value={profileData.regNumber || ''}
                            onChange={(e) => setProfileData({...profileData, regNumber: e.target.value})}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 placeholder-gray-400`}
                            placeholder="e.g. GA-123456"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Representative Name</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <UserCircle size={16} />
                          </div>
                          <input 
                            type="text" 
                            disabled={!isEditMode}
                            value={profileData.representative || ''}
                            onChange={(e) => setProfileData({...profileData, representative: e.target.value})}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 placeholder-gray-400`}
                            placeholder="e.g. John Doe"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Physical Address</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                            <MapPin size={16} />
                          </div>
                          <input 
                            type="text" 
                            disabled={!isEditMode}
                            value={profileData.address || ''}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 placeholder-gray-400`}
                            placeholder="Full address of the organization"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Bio / Description</label>
                        <textarea 
                          rows="3"
                          disabled={!isEditMode}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium ${isEditMode ? 'bg-white border-emerald-500 focus:ring-2 focus:ring-emerald-100' : 'bg-gray-50 border-gray-200 cursor-not-allowed'} text-gray-900 resize-none placeholder-gray-400 leading-relaxed`}
                          placeholder="Tell us about your organization's mission..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-6 flex items-center justify-end border-t border-gray-100">
                      <div className="flex gap-3">
                        {!isEditMode ? (
                          <button 
                            onClick={() => setShowEditConfirm(true)}
                            className="p-3.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-md shadow-emerald-100 active:scale-95"
                            title="Edit Profile"
                          >
                            <Pencil size={24} />
                          </button>
                        ) : (
                          <>
                            <button 
                              onClick={() => {
                                setProfileData(originalData);
                                setIsEditMode(false);
                              }}
                              className="p-3.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all shadow-md active:scale-95"
                              title="Cancel Edit"
                            >
                              <X size={24} />
                            </button>
                            <button 
                              onClick={() => setShowSaveConfirm(true)}
                              className="p-3.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                              title="Save Changes"
                            >
                              <Save size={24} />
                            </button>
                          </>
                        )}
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
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications</h2>
                        <p className="text-sm text-gray-500">Stay updated with your organization's activities.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setNotificationsList(prev => prev.map(n => ({...n, unread: false})));
                        }}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {notificationsList.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => {
                            setNotificationsList(prev => prev.map(n => 
                              n.id === notif.id ? { ...n, unread: false } : n
                            ));
                          }}
                          className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
                            notif.unread 
                              ? 'bg-emerald-50/60 border-emerald-200 border-l-4 border-l-emerald-500 shadow-sm' 
                              : 'bg-white border-gray-100'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                            notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                            notif.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <notif.icon size={24} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-bold ${notif.unread ? 'text-emerald-900' : 'text-gray-700'}`}>
                                {notif.title}
                              </h4>
                              <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-bold ${notif.unread ? 'text-emerald-600' : 'text-gray-400'}`}>
                                  {notif.time}
                                </span>
                                {notif.unread && (
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">New</span>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className={`text-sm leading-relaxed truncate group-hover:whitespace-normal transition-all ${
                              notif.unread ? 'text-gray-700 font-medium' : 'text-gray-500'
                            }`}>
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {showOlder && [
                        {
                          id: 5,
                          title: "Listing Expired",
                          message: "Your listing for 'Mixed Vegetables' has expired and been removed.",
                          time: "3 days ago",
                          type: "warning",
                          unread: false,
                          icon: AlertTriangle
                        },
                        {
                          id: 6,
                          title: "Profile Updated",
                          message: "Your organization profile was successfully updated.",
                          time: "1 week ago",
                          type: "success",
                          unread: false,
                          icon: UserCircle
                        }
                      ].map((notif) => (
                        <div 
                          key={notif.id}
                          className="flex items-start gap-4 p-4 rounded-2xl border bg-white border-gray-100 transition-all hover:shadow-md opacity-70 hover:opacity-100"
                        >
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                            notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                            notif.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <notif.icon size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-bold text-gray-700">{notif.title}</h4>
                              <span className="text-[10px] font-bold text-gray-400">{notif.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed truncate group-hover:whitespace-normal transition-all">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 text-center">
                      <button 
                        onClick={() => setShowOlder(!showOlder)}
                        className="text-sm font-bold text-gray-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2 mx-auto"
                      >
                        {showOlder ? "Hide older notifications" : "View older notifications"}
                        <ChevronRight size={16} className={`transition-transform ${showOlder ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>
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

      {/* Delete Logo Confirmation Modal */}
      {showDeleteLogoConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowDeleteLogoConfirm(false)} />
          <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <Trash2 size={36} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Remove logo?</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">This will permanently remove your organization logo.</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowDeleteLogoConfirm(false)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all">Cancel</button>
              <button 
                onClick={() => { 
                  setProfileData({...profileData, logo: null}); 
                  setShowDeleteLogoConfirm(false); 
                }} 
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
              >
                Delete Logo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mode Confirmation Modal */}
      {showEditConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowEditConfirm(false)} />
          <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
              <Pencil size={36} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enable edit mode?</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">You will be able to modify your organization's profile information.</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowEditConfirm(false)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all">Cancel</button>
              <button 
                onClick={() => { 
                  setOriginalData({...profileData});
                  setIsEditMode(true); 
                  setShowEditConfirm(false); 
                }} 
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all"
              >
                Yes, Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Changes Confirmation Modal */}
      {showSaveConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowSaveConfirm(false)} />
          <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
              <Save size={36} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm changes?</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Are you sure you want to save the modified information?</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowSaveConfirm(false)} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all">Cancel</button>
              <button 
                onClick={() => { 
                  handleSave();
                  setIsEditMode(false); 
                  setShowSaveConfirm(false); 
                }} 
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationSettings;
