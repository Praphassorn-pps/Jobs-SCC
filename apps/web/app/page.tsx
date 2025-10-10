import Link from 'next/link'
import { LineLoginButton } from './components/line-login-button'
import { Card, CardBody } from '../components/card'
import { Button } from '../components/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-xl">
              <span className="text-2xl">🧩</span>
              <span>Jobs SCC</span>
            </div>
            <div className="hidden md:flex space-x-6 text-white/90">
              <Link href="/jobs" className="hover:text-white transition-colors">
                ดูงานทั้งหมด
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                เกี่ยวกับเรา
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              🧩 Jobs SCC
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
              ระบบสมัครงานผ่าน LINE OA
            </p>
            <div className="max-w-3xl mx-auto text-lg opacity-90 leading-relaxed">
              สมัครงานง่าย ๆ ผ่าน LINE Login • รับการแจ้งเตือนตำแหน่งงานใหม่ • ติดตามสถานะการสมัครแบบเรียลไทม์
            </div>
          </div>

          {/* Login Card */}
          <div className="max-w-md mx-auto mb-16">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
              <CardBody className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  เข้าสู่ระบบ
                </h2>
                
                <Link href="/auth/login">
                  <Button className="w-full bg-[#06C755] hover:bg-[#05B94A] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-3 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.017 24C5.919 24 .999 19.317.999 13.622c0-5.695 4.92-10.378 11.018-10.378S23.035 7.927 23.035 13.622C23.035 19.317 18.115 24 12.017 24zM8.473 11.892c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm7.054 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm-1.764 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm-1.764 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014zm-1.764 0c0-.273-.221-.494-.494-.494s-.494.221-.494.494v2.014c0 .273.221.494.494.494s.494-.221.494-.494v-2.014z"/>
                    </svg>
                    <span>เข้าสู่ระบบด้วย LINE</span>
                  </Button>
                </Link>
                
                <p className="mt-6 text-sm text-gray-600 leading-relaxed">
                  กดเข้าสู่ระบบเพื่อเริ่มต้นการสมัครงาน<br />
                  และรับการแจ้งเตือนตำแหน่งงานใหม่
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <Link href="/demo">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      🎬 ทดสอบ Demo Navigation
                    </Button>
                  </Link>
                  <Link href="/jobs">
                    <Button variant="outline" className="w-full">
                      🔍 ดูงานทั้งหมด (ไม่ต้องเข้าสู่ระบบ)
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
              <CardBody className="p-8 text-center">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold mb-3 text-white">เข้าสู่ระบบง่าย</h3>
                <p className="text-white/80 leading-relaxed">
                  ใช้ LINE Login เข้าสู่ระบบ<br />
                  ไม่ต้องจำรหัสผ่าน
                </p>
              </CardBody>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
              <CardBody className="p-8 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-3 text-white">แจ้งเตือนผ่าน LINE</h3>
                <p className="text-white/80 leading-relaxed">
                  รับการแจ้งเตือนตำแหน่งงานใหม่<br />
                  และสถานะการสมัครงาน
                </p>
              </CardBody>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
              <CardBody className="p-8 text-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-3 text-white">อัปโหลดเอกสาร</h3>
                <p className="text-white/80 leading-relaxed">
                  อัปโหลดเรซูเม่และบัตรประชาชน<br />
                  ปลอดภัยด้วยการเข้ารหัส
                </p>
              </CardBody>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardBody className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  พร้อมเริ่มต้นแล้วใช่ไหม?
                </h3>
                <p className="text-white/80 mb-6 text-lg">
                  เข้าร่วมกับพนักงานหลายพันคนที่เลือกใช้ Jobs SCC
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/jobs">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100">
                      🔍 ดูงานทั้งหมด
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    📞 ติดต่อสอบถาม
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-white/60">
              <p>© 2025 Jobs SCC - ระบบสมัครงานผ่าน LINE OA</p>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="hover:text-white/80 transition-colors">
                  นโยบายความเป็นส่วนตัว
                </Link>
                <Link href="/terms" className="hover:text-white/80 transition-colors">
                  ข้อกำหนดการใช้งาน
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}