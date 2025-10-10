'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/button'
import { Card } from '../../../components/card'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  education: string
  experience: string
  skills: string[]
  expectedSalary: string
}

export default function ProfileSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    education: '',
    experience: '',
    skills: [],
    expectedSalary: ''
  })

  // Mock ข้อมูลจาก LINE Profile
  const lineProfile = {
    displayName: 'นาย สมชาย ใจดี',
    pictureUrl: 'https://via.placeholder.com/80x80/06C755/ffffff?text=LINE'
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit form และ redirect ไป PDPA consent step before upload
      router.push('/auth/pdpa')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const skillOptions = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 
    'PHP', 'SQL', 'MongoDB', 'Git', 'Docker', 'AWS', 'Azure'
  ]

  const educationOptions = [
    'มัธยมศึกษา',
    'ปวช./ปวส.',
    'ปริญญาตรี',
    'ปริญญาโท',
    'ปริญญาเอก'
  ]

  const experienceOptions = [
    'ไม่มีประสบการณ์',
    '0-1 ปี',
    '1-3 ปี',
    '3-5 ปี',
    '5-10 ปี',
    'มากกว่า 10 ปี'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ตั้งค่าโปรไฟล์</h1>
          <p className="text-gray-600">กรุณากรอกข้อมูลเพื่อสมัครงาน</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">ขั้นตอนที่ {step} จาก 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-6">
          {/* Step 1: ข้อมูลส่วนตัว */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <img 
                  src={lineProfile.pictureUrl} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full mx-auto mb-3"
                />
                <p className="text-sm text-gray-600">ข้อมูลจาก LINE: {lineProfile.displayName}</p>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">ข้อมูลส่วนตัว</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อจริง *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="กรอกชื่อจริง"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="กรอกนามสกุล"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์ *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="08X-XXX-XXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">วันเกิด *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: ข้อมูลการศึกษาและประสบการณ์ */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">การศึกษาและประสบการณ์</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ระดับการศึกษา *</label>
                <select
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">เลือกระดับการศึกษา</option>
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ประสบการณ์การทำงาน *</label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">เลือกประสบการณ์</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เงินเดือนที่คาดหวัง (บาท)</label>
                <input
                  type="number"
                  value={formData.expectedSalary}
                  onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="25000"
                />
              </div>
            </div>
          )}

          {/* Step 3: ทักษะ */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">ทักษะของคุณ</h2>
              <p className="text-gray-600 mb-4">เลือกทักษะที่คุณมี (เลือกได้หลายรายการ)</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.skills.includes(skill)
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              {formData.skills.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">ทักษะที่เลือก: {formData.skills.length} รายการ</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← ก่อนหน้า
            </Button>
            
            <Button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white"
            >
              {step === 3 ? 'สร้างโปรไฟล์' : 'ถัดไป →'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}