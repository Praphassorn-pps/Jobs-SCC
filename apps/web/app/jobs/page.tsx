'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { mockJobs } from '../../lib/mock-data'
import { JobCard } from './components/job-card'
import { JobFilters, type JobFilters as JobFiltersType } from './components/job-filters'
import { Button } from '../../components/button'
import { Card, CardBody } from '../../components/card'

export default function JobsPage() {
  // Simple auth flag check — this project currently doesn't have a central auth context.
  // We'll use a lightweight client-side check (localStorage key `isLoggedIn`) to gate access.
  // TODO: replace with real auth context/session when available.
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    try {
      const v = localStorage.getItem('isLoggedIn')
      setIsLoggedIn(v === 'true')
    } catch (e) {
      setIsLoggedIn(false)
    }
    setIsAuthChecked(true)
  }, [])

  const [filters, setFilters] = useState<JobFiltersType>({
    search: '',
    location: '',
    type: '',
    experienceLevel: '',
    department: ''
  })

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase())

      const matchesLocation = !filters.location || job.location.includes(filters.location)
      const matchesType = !filters.type || job.type === filters.type
      const matchesExperience = !filters.experienceLevel || job.experienceLevel === filters.experienceLevel
      const matchesDepartment = !filters.department || job.department === filters.department

      return matchesSearch && matchesLocation && matchesType && matchesExperience && matchesDepartment && job.isActive
    })
  }, [filters])

  const activeJobsCount = mockJobs.filter(job => job.isActive).length

  // While we check auth, render nothing (hydration safe)
  if (!isAuthChecked) return null

  // If not logged in, show login CTA instead of job list
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <Card>
            <CardBody className="text-center py-12">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">เข้าสู่ระบบเพื่อดูตำแหน่งงาน</h3>
              <p className="text-gray-500 mb-6">กรุณาเข้าสู่ระบบผ่าน LINE เพื่อเข้าถึงรายการงานและรับการแจ้งเตือน</p>
              <div className="flex justify-center">
                <Link href="/auth/login">
                  <Button variant="line">เข้าสู่ระบบ</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold text-green-600 flex items-center space-x-2">
                <span>🧩</span>
                <span>Jobs SCC</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                หน้าแรก
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                เกี่ยวกับเรา
              </Link>
              <Button variant="line" size="sm">
                เข้าสู่ระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔍 ตำแหน่งงานทั้งหมด
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              พบ <span className="font-semibold text-green-600">{filteredJobs.length}</span> ตำแหน่งงาน
              จากทั้งหมด {activeJobsCount} ตำแหน่ง
            </p>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <span>เรียงตาม:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>ล่าสุด</option>
                <option>เงินเดือนสูงสุด</option>
                <option>เงินเดือนต่ำสุด</option>
                <option>วันปิดรับใกล้สุด</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters */}
        <JobFilters onFilterChange={setFilters} />

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job List */}
          <div className="lg:col-span-2">
            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <Card>
                <CardBody className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    ไม่พบตำแหน่งงานที่ตรงกับเงื่อนไข
                  </h3>
                  <p className="text-gray-500 mb-6">
                    ลองเปลี่ยนคำค้นหาหรือปรับเงื่อนไขการกรองใหม่
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({
                      search: '',
                      location: '',
                      type: '',
                      experienceLevel: '',
                      department: ''
                    })}
                  >
                    ล้างตัวกรองทั้งหมด
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardBody className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">📊 สถิติงาน</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">งานเต็มเวลา</span>
                      <span className="font-semibold text-green-600">
                        {mockJobs.filter(job => job.type === 'full-time').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">งานครึ่งเวลา</span>
                      <span className="font-semibold text-blue-600">
                        {mockJobs.filter(job => job.type === 'part-time').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">สัญญาจ้าง</span>
                      <span className="font-semibold text-orange-600">
                        {mockJobs.filter(job => job.type === 'contract').length}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Job Alert */}
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardBody className="p-6 text-center">
                  <div className="text-3xl mb-3">🔔</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    แจ้งเตือนงานใหม่
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    เข้าสู่ระบบเพื่อรับการแจ้งเตือนงานใหม่ผ่าน LINE
                  </p>
                  <Button variant="line" size="sm" className="w-full">
                    เข้าสู่ระบบ
                  </Button>
                </CardBody>
              </Card>

              {/* Tips */}
              <Card>
                <CardBody className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">💡 ทิปการหางาน</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span>✓</span>
                      <span>อัปเดตโปรไฟล์ให้ครบถ้วน</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span>✓</span>
                      <span>เตรียมเรซูเม่และบัตรประชาชน</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span>✓</span>
                      <span>อ่านรายละเอียดงานก่อนสมัคร</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span>✓</span>
                      <span>สมัครเร็ว ๆ ก่อนปิดรับ</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}