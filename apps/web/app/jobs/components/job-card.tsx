import Link from 'next/link'
import { Card, CardBody } from '../../../components/card'
import { Button } from '../../../components/button'
import { Job } from '../../../lib/mock-data'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const getExperienceLevelText = (level: string) => {
    switch (level) {
      case 'entry': return 'ผู้เริ่มต้น'
      case 'mid': return 'ระดับกลาง' 
      case 'senior': return 'ระดับสูง'
      default: return level
    }
  }

  const getJobTypeText = (type: string) => {
    switch (type) {
      case 'full-time': return 'เต็มเวลา'
      case 'part-time': return 'ครึ่งเวลา'
      case 'contract': return 'สัญญาจ้าง'
      case 'internship': return 'ฝึกงาน'
      default: return type
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const daysUntilClosing = Math.ceil((new Date(job.closingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
      <CardBody className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-600 font-medium">
              🏢 {job.company}
            </p>
          </div>
          <div className="ml-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              job.experienceLevel === 'entry' ? 'bg-green-100 text-green-800' :
              job.experienceLevel === 'mid' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {getExperienceLevelText(job.experienceLevel)}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <span className="mr-2">📍</span>
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="mr-2">💰</span>
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="mr-2">⏰</span>
            <span>{getJobTypeText(job.type)}</span>
          </div>
          {job.department && (
            <div className="flex items-center text-gray-600">
              <span className="mr-2">🏷️</span>
              <span>{job.department}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Requirements Preview */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            ความต้องการหลัก:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            {job.requirements.slice(0, 2).map((req: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-xs">•</span>
                <span className="line-clamp-1">{req}</span>
              </li>
            ))}
            {job.requirements.length > 2 && (
              <li className="text-blue-600 text-xs">
                และอีก {job.requirements.length - 2} รายการ...
              </li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {daysUntilClosing > 0 ? (
              <span className="text-orange-600">
                ⏳ ปิดรับในอีก {daysUntilClosing} วัน
              </span>
            ) : (
              <span className="text-red-600">
                ❌ ปิดรับแล้ว
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <Link href={`/jobs/${job.id}`}>
              <Button variant="outline" size="sm">
                ดูรายละเอียด
              </Button>
            </Link>
            {daysUntilClosing > 0 && (
              <Link href={`/apply/${job.id}`}>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  สมัครงาน
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}