'use client'

import { useState } from 'react'
import { Button } from '../../../components/button'
import Link from 'next/link'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLineLogin = async () => {
    setIsLoading(true)
    // Mock การ redirect ไป LINE Login
    setTimeout(() => {
      // Simulate LINE login success และ redirect ไปกรอกข้อมูล
      window.location.href = '/auth/profile-setup'
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Jobs SCC</h1>
          <p className="text-gray-600">ระบบสมัครงานผ่าน LINE</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">เข้าสู่ระบบ</h2>
            <p className="text-gray-600 text-sm">ใช้บัญชี LINE ของคุณเพื่อเข้าสู่ระบบ</p>
          </div>

          {/* LINE Login Button */}
          <Button
            onClick={handleLineLogin}
            disabled={isLoading}
            className="w-full bg-[#06C755] hover:bg-[#05B94A] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-3 transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>กำลังเชื่อมต่อ...</span>
              </div>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 24C5.919 24 .999 19.317.999 13.622c0-5.695 4.92-10.378 11.018-10.378S23.035 7.927 23.035 13.622C23.035 19.317 18.115 24 12.017 24zM8.473 11.892c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm7.054 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm-1.764 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm-1.764 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm-1.764 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014z"/>
                </svg>
                <span>เข้าสู่ระบบด้วย LINE</span>
              </>
            )}
          </Button>

          {/* Additional Info */}
          <div className="text-center space-y-3">
            <p className="text-xs text-gray-500">
              การเข้าสู่ระบบแสดงว่าคุณยอมรับ
              <Link href="/terms" className="text-green-600 hover:underline ml-1">
                ข้อกำหนดการใช้งาน
              </Link>
            </p>
            
            <div className="border-t pt-3">
              <p className="text-sm text-gray-600 mb-2">หรือดูตำแหน่งงานโดยไม่ต้องเข้าสู่ระบบ</p>
              <Link href="/jobs" className="text-green-600 hover:underline text-sm font-medium">
                ดูตำแหน่งงานทั้งหมด →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2024 SCC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}