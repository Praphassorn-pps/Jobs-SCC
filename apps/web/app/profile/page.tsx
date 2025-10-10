'use client'

import { useState, useEffect } from 'react'
import { Button } from '../../components/button'
import { Card } from '../../components/card'
import Link from 'next/link'

interface UserProfile {
  id: string
  displayName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  education: string
  experience: string
  skills: string[]
  expectedSalary: string
  profileImage: string
  joinDate: string
  applicationCount: number
  viewCount: number
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [settings, setSettings] = useState({
    language: 'th',
    notifyEmail: true,
    notifyLine: true,
    notifySms: false,
    pdpaReminders: true
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem('userSettings')
      if (raw) setSettings(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  const saveSettings = () => {
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings))
      // feedback could be added (toast)
      setShowSettings(false)
    } catch (e) {
      // ignore
    }
  }
  
  // Mock user profile data
  const [profile] = useState<UserProfile>({
    id: 'user-123',
    displayName: 'นาย สมชาย ใจดี',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    email: 'somchai.jaidee@email.com',
    phone: '081-234-5678',
    dateOfBirth: '1995-05-15',
    education: 'ปริญญาตรี',
    experience: '3-5 ปี',
    skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    expectedSalary: '35000',
    profileImage: 'https://via.placeholder.com/120x120/06C755/ffffff?text=LINE',
    joinDate: '2024-01-15',
    applicationCount: 5,
    viewCount: 23
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">โปรไฟล์ของฉัน</h1>
            <div className="flex space-x-3">
              <Link href="/jobs">
                <Button
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200"
                  onClick={() => {
                    try { localStorage.setItem('isLoggedIn', 'true') } catch (e) {}
                  }}
                >
                  ดูตำแหน่งงาน
                </Button>
              </Link>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white"
              >
                {isEditing ? 'ยกเลิก' : 'แก้ไขโปรไฟล์'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900">{profile.displayName}</h2>
                <p className="text-gray-600">{profile.firstName} {profile.lastName}</p>
                <p className="text-sm text-gray-500 mt-2">
                  เข้าร่วมเมื่อ {formatDate(profile.joinDate)}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ใบสมัครที่ส่ง</span>
                  <span className="font-medium text-green-600">{profile.applicationCount} ฉบับ</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">การเข้าชมโปรไฟล์</span>
                  <span className="font-medium">{profile.viewCount} ครั้ง</span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/applications">
                  <Button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white">
                    ดูสถานะการสมัคร
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">การกระทำด่วน</h3>
              <div className="space-y-3">
                <Link href="/jobs" className="block">
                  <button
                    onClick={() => { try { localStorage.setItem('isLoggedIn', 'true') } catch (e) {} }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    🔍 ค้นหางาน
                  </button>
                </Link>
                <Link href="/resume" className="block">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    📄 อัพโหลดเรซูเม่
                  </button>
                </Link>
                <Link href="/notifications" className="block">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    🔔 การแจ้งเตือน
                  </button>
                </Link>
                <div className="block">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    ⚙️ ตั้งค่า
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">ข้อมูลส่วนตัว</h3>
                {isEditing && (
                  <Button className="text-sm px-3 py-1 bg-green-500 hover:bg-green-600 text-white">
                    บันทึก
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อจริง</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.firstName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.lastName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={profile.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={profile.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">วันเกิด</label>
                  <p className="text-gray-900">
                    {formatDate(profile.dateOfBirth)} (อายุ {calculateAge(profile.dateOfBirth)} ปี)
                  </p>
                </div>
              </div>
            </Card>

            {showSettings && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">การตั้งค่า</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => setShowSettings(false)}>ปิด</Button>
                    <Button onClick={saveSettings}>บันทึก</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ภาษา</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-48 px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="th">ไทย</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">การแจ้งเตือน</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={settings.notifyEmail} onChange={(e) => setSettings(prev => ({ ...prev, notifyEmail: e.target.checked }))} />
                        <span className="text-sm text-gray-700">อีเมล</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={settings.notifyLine} onChange={(e) => setSettings(prev => ({ ...prev, notifyLine: e.target.checked }))} />
                        <span className="text-sm text-gray-700">LINE</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={settings.notifySms} onChange={(e) => setSettings(prev => ({ ...prev, notifySms: e.target.checked }))} />
                        <span className="text-sm text-gray-700">SMS</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={settings.pdpaReminders} onChange={(e) => setSettings(prev => ({ ...prev, pdpaReminders: e.target.checked }))} />
                      <span className="text-sm text-gray-700">รับการเตือนเกี่ยวกับ PDPA / การอัปโหลดเอกสาร</span>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {/* Education & Experience */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การศึกษาและประสบการณ์</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">การศึกษา</label>
                  {isEditing ? (
                    <select
                      defaultValue={profile.education}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="มัธยมศึกษา">มัธยมศึกษา</option>
                      <option value="ปวช./ปวส.">ปวช./ปวส.</option>
                      <option value="ปริญญาตรี">ปริญญาตรี</option>
                      <option value="ปริญญาโท">ปริญญาโท</option>
                      <option value="ปริญญาเอก">ปริญญาเอก</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profile.education}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ประสบการณ์</label>
                  {isEditing ? (
                    <select
                      defaultValue={profile.experience}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="ไม่มีประสบการณ์">ไม่มีประสบการณ์</option>
                      <option value="0-1 ปี">0-1 ปี</option>
                      <option value="1-3 ปี">1-3 ปี</option>
                      <option value="3-5 ปี">3-5 ปี</option>
                      <option value="5-10 ปี">5-10 ปี</option>
                      <option value="มากกว่า 10 ปี">มากกว่า 10 ปี</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profile.experience}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เงินเดือนที่คาดหวัง</label>
                  {isEditing ? (
                    <input
                      type="number"
                      defaultValue={profile.expectedSalary}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{parseInt(profile.expectedSalary).toLocaleString()} บาท</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ทักษะ</h3>
              
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="mt-4">
                  <Button className="text-sm px-3 py-1 text-green-600 border border-green-600 hover:bg-green-50">
                    + เพิ่มทักษะ
                  </Button>
                </div>
              )}
            </Card>

            {/* Recent Applications */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การสมัครงานล่าสุด</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                    <p className="text-sm text-gray-600">บริษัท ABC จำกัด • สมัครเมื่อ 2 วันที่แล้ว</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                    รอการพิจารณา
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Full Stack Developer</h4>
                    <p className="text-sm text-gray-600">บริษัท XYZ จำกัด • สมัครเมื่อ 1 สัปดาห์ที่แล้ว</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    ได้รับการติดต่อ
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">React Developer</h4>
                    <p className="text-sm text-gray-600">บริษัท DEF จำกัด • สมัครเมื่อ 2 สัปดาห์ที่แล้ว</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    ผ่านการคัดเลือก
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link href="/applications">
                  <Button className="text-sm text-green-600 hover:text-green-700">
                    ดูทั้งหมด →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}