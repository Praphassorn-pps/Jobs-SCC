'use client';

/**
 * Example: Job Listing Page using API Services
 * This demonstrates how to use the job service with mock data
 */

import { useState } from 'react';
import { useJobs } from '@/hooks';
import type { JobListParams, EmploymentType, ExperienceLevel } from '@/types';

export default function JobsWithServicePage() {
  const [filters, setFilters] = useState<JobListParams>({
    status: 'open',
    page: 1,
    limit: 10,
  });

  // Use the custom hook to fetch jobs
  const { data, loading, error } = useJobs(filters);

  const handleFilterChange = (key: keyof JobListParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filter changes
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06C755] mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">เกิดข้อผิดพลาด: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#06C755] text-white rounded-lg"
          >
            ลองอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            ตำแหน่งงานทั้งหมด
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            พบ {data?.total || 0} ตำแหน่งงาน
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">ค้นหา & กรอง</h2>

              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  คำค้นหา
                </label>
                <input
                  type="text"
                  placeholder="ชื่อตำแหน่งหรือคำอธิบาย"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#06C755]"
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Employment Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเภทการจ้างงาน
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#06C755]"
                  onChange={(e) =>
                    handleFilterChange('employment_type', e.target.value || undefined)
                  }
                >
                  <option value="">ทั้งหมด</option>
                  <option value="full-time">เต็มเวลา</option>
                  <option value="part-time">พาร์ทไทม์</option>
                  <option value="contract">สัญญาจ้าง</option>
                  <option value="internship">ฝึกงาน</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ระดับประสบการณ์
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#06C755]"
                  onChange={(e) =>
                    handleFilterChange('experience_level', e.target.value || undefined)
                  }
                >
                  <option value="">ทั้งหมด</option>
                  <option value="entry">เริ่มต้น</option>
                  <option value="mid">ปานกลาง</option>
                  <option value="senior">อาวุโส</option>
                </select>
              </div>

              {/* Department */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  แผนก
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#06C755]"
                  onChange={(e) =>
                    handleFilterChange('department', e.target.value || undefined)
                  }
                >
                  <option value="">ทั้งหมด</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Job List */}
          <main className="lg:col-span-3">
            {data?.jobs && data.jobs.length > 0 ? (
              <>
                <div className="space-y-4">
                  {data.jobs.map((jobOpening) => (
                    <div
                      key={jobOpening.job_opening_id}
                      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {jobOpening.job?.jobname}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {jobOpening.job?.jobcode}
                            </span>
                            {jobOpening.job?.employment_type && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                {jobOpening.job.employment_type}
                              </span>
                            )}
                            {jobOpening.job?.experience_level && (
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                                {jobOpening.job.experience_level}
                              </span>
                            )}
                          </div>
                          <div className="text-gray-600 space-y-1">
                            {jobOpening.job?.location && (
                              <p className="flex items-center gap-2">
                                <span>📍</span>
                                {jobOpening.job.location}
                              </p>
                            )}
                            {jobOpening.job?.salary_range && (
                              <p className="flex items-center gap-2">
                                <span>💰</span>
                                {jobOpening.job.salary_range}
                              </p>
                            )}
                            {jobOpening.job?.department && (
                              <p className="flex items-center gap-2">
                                <span>🏢</span>
                                {jobOpening.job.department}
                              </p>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-3">
                            ปิดรับสมัคร:{' '}
                            {new Date(jobOpening.close_date).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                        <div className="ml-4">
                          <a
                            href={`/jobs/${jobOpening.job_opening_id}`}
                            className="px-6 py-2 bg-[#06C755] text-white rounded-lg hover:bg-[#05b04b] transition-colors inline-block"
                          >
                            ดูรายละเอียด
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {data.total_pages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(data.page - 1)}
                      disabled={data.page === 1}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ก่อนหน้า
                    </button>
                    <span className="px-4 py-2">
                      หน้า {data.page} จาก {data.total_pages}
                    </span>
                    <button
                      onClick={() => handlePageChange(data.page + 1)}
                      disabled={data.page === data.total_pages}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ถัดไป
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">ไม่พบตำแหน่งงานที่ตรงกับเงื่อนไข</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
