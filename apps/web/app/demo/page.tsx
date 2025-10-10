'use client'

import Link from 'next/link'
import { Button } from '../../components/button'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🧩 Jobs SCC - Demo Navigation</h1>
          <p className="text-lg text-gray-600">ทดสอบขั้นตอนการ Login และการใช้งานระบบ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Flow */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🔄 User Flow (ลำดับการใช้งาน)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">1. หน้าแรก</h3>
                  <p className="text-sm text-gray-600">Landing Page พร้อมปุ่ม Login</p>
                </div>
                <Link href="/">
                  <Button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white">
                    ไป →
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">2. เข้าสู่ระบบ</h3>
                  <p className="text-sm text-gray-600">Login ผ่าน LINE (Mock 2 วินาที)</p>
                </div>
                <Link href="/auth/login">
                  <Button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white">
                    ไป →
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">3. กรอกข้อมูล</h3>
                  <p className="text-sm text-gray-600">Multi-step form (3 ขั้นตอน)</p>
                </div>
                <Link href="/auth/profile-setup">
                  <Button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white">
                    ไป →
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">4. โปรไฟล์</h3>
                  <p className="text-sm text-gray-600">หน้าโปรไฟล์ผู้ใช้</p>
                </div>
                <Link href="/profile">
                  <Button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white">
                    ไป →
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">5. หางาน</h3>
                  <p className="text-sm text-gray-600">ดูตำแหน่งงานทั้งหมด</p>
                </div>
                <Link href="/jobs">
                  <Button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white">
                    ไป →
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Features Demo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✨ ฟีเจอร์ที่ Demo ได้</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">✅ Mock Login Process</h3>
                <p className="text-sm text-green-700">
                  จำลองการ login ผ่าน LINE พร้อม loading animation 2 วินาที
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">✅ Multi-step Form</h3>
                <p className="text-sm text-blue-700">
                  ฟอร์มกรอกข้อมูล 3 ขั้นตอน พร้อม progress bar และ validation
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2">✅ Profile Management</h3>
                <p className="text-sm text-purple-700">
                  หน้าโปรไฟล์พร้อมการแก้ไขข้อมูล และแสดงสถิติ
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">✅ Responsive Design</h3>
                <p className="text-sm text-yellow-700">
                  ใช้งานได้ทั้งมือถือและเดสก์ท็อป พร้อม animations
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">📋 Mock Data</h3>
                <p className="text-sm text-gray-700">
                  ข้อมูลจำลองสำหรับการทดสอบ (งาน, โปรไฟล์, การสมัคร)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 การทดสอบแนะนำ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">🎬 ทดสอบ Full Flow</h3>
              <p className="text-sm text-gray-600 mb-3">
                1. เข้าหน้าแรก → 2. Login → 3. กรอกข้อมูล → 4. ดูโปรไฟล์
              </p>
              <Link href="/">
                <Button className="w-full text-sm bg-green-500 hover:bg-green-600 text-white">
                  เริ่มทดสอบ
                </Button>
              </Link>
            </div>

            <div className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">📝 ทดสอบฟอร์ม</h3>
              <p className="text-sm text-gray-600 mb-3">
                ทดสอบการกรอกข้อมูล 3 ขั้นตอน และการเลือกทักษะ
              </p>
              <Link href="/auth/profile-setup">
                <Button className="w-full text-sm bg-blue-500 hover:bg-blue-600 text-white">
                  ทดสอบฟอร์ม
                </Button>
              </Link>
            </div>

            <div className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">👤 ทดสอบโปรไฟล์</h3>
              <p className="text-sm text-gray-600 mb-3">
                ดูหน้าโปรไฟล์ พร้อมการแก้ไขและสถิติต่างๆ
              </p>
              <Link href="/profile">
                <Button className="w-full text-sm bg-purple-500 hover:bg-purple-600 text-white">
                  ดูโปรไฟล์
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ ข้อมูลทางเทคนิค</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">🛠 Tech Stack</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Next.js 14 (App Router)</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• React Hook Form</li>
                <li>• Lucide React Icons</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">📋 Mock Features</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• LINE Login (จำลอง 2 วินาที)</li>
                <li>• Multi-step Form Validation</li>
                <li>• Local State Management</li>
                <li>• Responsive Design</li>
                <li>• Loading States</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500">
            🧩 Jobs SCC Mock Up - Demo Version for Testing UI/UX Flow
          </p>
        </div>
      </div>
    </div>
  )
}