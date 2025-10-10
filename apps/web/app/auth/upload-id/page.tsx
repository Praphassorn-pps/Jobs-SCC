"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/button'
import { Card } from '../../../components/card'

export default function UploadIdPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [showConfirmSkip, setShowConfirmSkip] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)

    // Mock upload delay
    setTimeout(() => {
      setUploading(false)
      router.push('/profile')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">อัปโหลดบัตรประชาชน</h1>
          <p className="text-gray-600">ส่งสำเนาบัตรประชาชนเพื่อยืนยันตัวตน (ข้อมูลจะถูกปกป้องตาม PDPA)</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />

            {file && (
              <div className="text-sm text-gray-700">
                ชื่อไฟล์: <span className="font-medium">{file.name}</span>
              </div>
            )}

              <div className="flex justify-end mt-4">
                  {/* Skip button: open confirmation modal */}
                  <Button variant="outline" onClick={() => setShowConfirmSkip(true)} className="mr-auto">ข้าม</Button>
                <Button variant="outline" onClick={() => router.back()} className="mr-2">ย้อนกลับ</Button>
                <Button onClick={handleUpload} disabled={!file || uploading}>
                  {uploading ? 'กำลังอัปโหลด...' : 'อัปโหลดและเสร็จสิ้น'}
                </Button>
              </div>

              {showConfirmSkip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirmSkip(false)} />
                  <div className="bg-white rounded-lg shadow-lg max-w-md mx-4 z-10">
                    <div className="px-6 py-4">
                      <h3 className="text-lg font-semibold">ยืนยันการข้ามขั้นตอน</h3>
                      <p className="text-sm text-gray-600 mt-2">ยังไม่ได้อัปโหลดบัตรประจำตัว หากข้ามตอนนี้ คุณสามารถอัปโหลดภายหลังได้ ต้องการข้ามไหม?</p>
                    </div>
                    <div className="px-6 py-4 flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowConfirmSkip(false)}>ยกเลิก</Button>
                      <Button onClick={() => { setShowConfirmSkip(false); router.push('/profile') }}>ยืนยันข้าม</Button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </Card>
      </div>
    </div>
  )
}
