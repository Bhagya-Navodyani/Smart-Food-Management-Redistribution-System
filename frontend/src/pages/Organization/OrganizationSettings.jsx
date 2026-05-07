import React, { useState } from 'react';
import { 
  User, Shield, Bell, Camera, Mail, Phone, 
  MapPin, Globe, Lock, Eye, EyeOff, Save,
  CheckCircle2, AlertCircle, Building2, ChevronRight
} from 'lucide-react';

const OrganizationSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: 'Fresh Track Organization',
    email: 'contact@freshtrack.org',
    phone: '+94 11 234 5678',
    address: 'No 123, Main Street, Colombo 07',
    website: 'https://freshtrack.org',
    bio: 'A non-profit organization dedicated to reducing food waste and supporting local communities through efficient redistribution.'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newDonations: true,
    requestUpdates: true,
    impactMilestones: true,
    emailDigest: false,
    marketingEmails: false
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
    { id: 'profile', label: 'Profile', icon: User, description: 'Manage your organization information' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Password and access controls' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Configure how you stay updated' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Settings</h1>
          <p className="text-gray-500">Manage your organization's account and preferences.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <nav className="space-y-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 text-left ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                      : 'text-gray-600 hover:bg-white hover:text-emerald-600 hover:shadow-sm'
                  }`}
                >
                  <tab.icon size={20} />
                  <div>
                    <p className="text-sm font-bold">{tab.label}</p>
                    <p className={`text-[10px] ${activeTab === tab.id ? 'text-emerald-100' : 'text-gray-400'}`}>
                      {tab.description}
                    </p>
                  </div>
                  {activeTab === tab.id && <ChevronRight size={16} className="ml-auto opacity-70" />}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Tab Header */}
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900">
                  {tabs.find(t => t.id === activeTab)?.label} Settings
                </h2>
              </div>

              <div className="p-8">
                {/* ── PROFILE SECTION ── */}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    {/* Avatar Upload */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-100">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                          <Building2 size={40} className="text-emerald-600" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-gray-200 rounded-xl shadow-lg text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all">
                          <Camera size={16} />
                        </button>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="font-bold text-gray-900 mb-1">Organization Logo</h3>
                        <p className="text-xs text-gray-500 mb-3">JPG, PNG or SVG. Max size 2MB.</p>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors">
                            Upload New
                          </button>
                          <button className="px-4 py-2 bg-white text-gray-400 text-xs font-bold rounded-lg border border-gray-100 hover:text-red-500 hover:border-red-100 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Organization Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type="text" 
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type="email" 
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type="text" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Website</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type="text" 
                            value={profileData.website}
                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Physical Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type="text" 
                            value={profileData.address}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Organization Bio</label>
                        <textarea 
                          rows="4"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── SECURITY SECTION ── */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                      <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                      <p className="text-xs text-blue-700 leading-relaxed">
                        We recommend changing your password every 90 days and using a combination of letters, numbers, and symbols.
                      </p>
                    </div>

                    <div className="space-y-6 max-w-md">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Current Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full pl-11 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full pl-11 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full pl-11 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-4">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                              <Shield size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">2FA is Currently Disabled</p>
                              <p className="text-[11px] text-gray-500">Secure your account with an extra layer</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-white text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 hover:bg-emerald-50 transition-colors shadow-sm">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── NOTIFICATIONS SECTION ── */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">Push Notifications</h4>
                      
                      {[
                        { id: 'newDonations', label: 'New Donations in Feed', desc: 'Get alerted when fresh food is posted near you' },
                        { id: 'requestUpdates', label: 'Request Status Updates', desc: 'Notify when your pickup requests are approved or completed' },
                        { id: 'impactMilestones', label: 'Impact Milestones', desc: 'Celebrate reaching new goals in food saved' }
                      ].map(item => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <div>
                            <p className="text-sm font-bold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={notificationSettings[item.id]}
                              onChange={() => setNotificationSettings({...notificationSettings, [item.id]: !notificationSettings[item.id]})}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-100 space-y-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">Email Preferences</h4>
                      
                      {[
                        { id: 'emailDigest', label: 'Weekly Impact Digest', desc: 'A summary of your food rescue impact and activities' },
                        { id: 'marketingEmails', label: 'News & Updates', desc: 'Stay informed about new features and platform news' }
                      ].map(item => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <div>
                            <p className="text-sm font-bold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={notificationSettings[item.id]}
                              onChange={() => setNotificationSettings({...notificationSettings, [item.id]: !notificationSettings[item.id]})}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold animate-in fade-in slide-in-from-left-2 duration-300">
                      <CheckCircle2 size={16} /> Changes saved successfully!
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-100 transition-all">
                    Discard
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettings;
