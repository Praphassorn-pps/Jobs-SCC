"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/button'
import { Card } from '../../../components/card'

export default function PdpaPage() {
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)

  const handleContinue = () => {
    if (agreed) {
      router.push('/auth/upload-id')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">ข้อตกลงการเก็บข้อมูล (PDPA)</h1>
          <p className="text-gray-600">กรุณาอ่านและยินยอมเพื่อดำเนินการสมัครงานต่อ</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              บริษัทจะเก็บและใช้ข้อมูลส่วนบุคคลของคุณเพื่อวัตถุประสงค์ในการดำเนินการสมัครงาน การติดต่อ
              และการตรวจสอบคุณสมบัติ ซึ่งข้อมูลดังกล่าวจะได้รับการรักษาความปลอดภัยและไม่นำไปใช้เพื่อ
              วัตถุประสงค์อื่นโดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษร
            </p>
            <p>
              คุณมีสิทธิ์เรียกร้องให้ลบ แก้ไข หรือร้องขอสำเนาข้อมูลส่วนบุคคลของคุณได้ โดยติดต่อทีมงานของบริษัท
            </p>
          </div>

          <div className="mt-6">
            <label className="inline-flex items-center space-x-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm text-gray-700">ฉันยินยอมให้บริษัทเก็บและใช้ข้อมูลส่วนบุคคลตามที่ระบุ</span>
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => router.back()} variant="outline" className="mr-2">ย้อนกลับ</Button>
            <Button onClick={handleContinue} disabled={!agreed}>ยอมรับและดำเนินการต่อ</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
