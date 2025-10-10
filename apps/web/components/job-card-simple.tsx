import Link from 'next/link'

interface JobCardProps {
  title: string
  company: string
  location: string
  salary: string
  tags?: string[]
  href?: string
}

export function JobCard({ title, company, location, salary, tags = [], href = "#" }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          
          <div className="space-y-1 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <span className="mr-2">🏢</span>
              <span>{company}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">💰</span>
              <span className="font-medium text-green-600">{salary}</span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ml-4">
          <Link href={href}>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
              ดูรายละเอียด
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}