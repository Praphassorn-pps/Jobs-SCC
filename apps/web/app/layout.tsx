import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Jobs SCC - ระบบสมัครงานผ่าน LINE',
  description: 'ระบบสมัครงานผ่าน LINE OA + LINE Login สำหรับบริษัท SCC',
  keywords: 'สมัครงาน, LINE Login, HR, บริษัท SCC',
  authors: [{ name: 'SCC Development Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#06C755',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  )
}