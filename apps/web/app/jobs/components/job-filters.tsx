'use client'

import { useState } from 'react'
import { Input } from '../../../components/form'
import { Button } from '../../../components/button'

interface JobFiltersProps {
  onFilterChange: (filters: JobFilters) => void
}

export interface JobFilters {
  search: string
  location: string
  type: string
  experienceLevel: string
  department: string
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    type: '',
    experienceLevel: '',
    department: ''
  })

  const handleInputChange = (key: keyof JobFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      location: '',
      type: '',
      experienceLevel: '',
      department: ''
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          🔍 ค้นหาและกรองงาน
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearFilters}
          className="text-gray-600"
        >
          ล้างตัวกรอง
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            placeholder="ค้นหาตำแหน่งงาน, บริษัท..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Location */}
        <div>
          <select
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">สถานที่ทั้งหมด</option>
            <option value="กรุงเทพฯ">กรุงเทพฯ</option>
            <option value="ปทุมธานี">ปทุมธานี</option>
            <option value="นนทบุรี">นนทบุรี</option>
            <option value="สมุทรปราการ">สมุทรปราการ</option>
          </select>
        </div>

        {/* Job Type */}
        <div>
          <select
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">ประเภทงานทั้งหมด</option>
            <option value="full-time">เต็มเวลา</option>
            <option value="part-time">ครึ่งเวลา</option>
            <option value="contract">สัญญาจ้าง</option>
            <option value="internship">ฝึกงาน</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <select
            value={filters.experienceLevel}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">ระดับประสบการณ์ทั้งหมด</option>
            <option value="entry">ผู้เริ่มต้น</option>
            <option value="mid">ระดับกลาง</option>
            <option value="senior">ระดับสูง</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <select
            value={filters.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">แผนกทั้งหมด</option>
            <option value="Technology">เทคโนโลยี</option>
            <option value="Design">ดีไซน์</option>
            <option value="Engineering">วิศวกรรม</option>
            <option value="Marketing">การตลาด</option>
            <option value="Infrastructure">โครงสร้าง</option>
          </select>
        </div>
      </div>
    </div>
  )
}