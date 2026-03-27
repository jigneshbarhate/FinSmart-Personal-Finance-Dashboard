import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { mockUser } from '../utils/mockData';
import { User, Mail, Calendar, Settings, Shield, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-navy">Profile</h1>
        <p className="text-gray-500 text-sm">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-0 shadow-sm h-fit">
          <CardContent className="pt-8 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-navy bg-gradient-to-tr from-navy to-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl mb-5 ring-4 ring-navy/5">
               {mockUser.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-navy">{mockUser.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{mockUser.email}</p>
            
            <div className="w-full space-y-2">
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50">
                <Settings size={18} className="mr-3" /> Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50">
                <Shield size={18} className="mr-3" /> Security
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase flex items-center tracking-wider">
                   <User size={14} className="mr-1.5" /> Full Name
                </label>
                <div className="font-medium text-navy bg-gray-50/80 p-3 rounded-lg border border-gray-100/80">
                  {mockUser.name}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase flex items-center tracking-wider">
                   <Mail size={14} className="mr-1.5" /> Email Address
                </label>
                <div className="font-medium text-navy bg-gray-50/80 p-3 rounded-lg border border-gray-100/80">
                  {mockUser.email}
                </div>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-400 uppercase flex items-center tracking-wider">
                   <Calendar size={14} className="mr-1.5" /> Member Since
                </label>
                <div className="font-medium text-navy bg-gray-50/80 p-3 rounded-lg border border-gray-100/80">
                  {mockUser.joinDate}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-red-600 mb-2">Account Actions</h3>
              <p className="text-sm text-gray-500 mb-5">Manage your active session or permanently delete your data.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 focus:ring-red-200">
                    <LogOut size={16} className="mr-2" /> Log out
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
