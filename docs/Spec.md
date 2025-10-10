(#) Jobs-SCC — Short Specification

## วัตถุประสงค์
- ระบบสมัครงานผ่าน LINE OA (User Web App)
- ให้ผู้ใช้สมัครงาน กรอกข้อมูลส่วนตัว อัปโหลดบัตรประชาชน (หรือข้ามชั่วคราว) และดูรายการงาน

## Tech stack
- Frontend: Next.js 14 (app router), React 18, TypeScript
- Styling: Tailwind CSS
- Monorepo: npm workspaces + turbo
- Packages: `packages/ui` (shared components), `packages/utils` (helpers)

## โครงสร้างสำคัญ (ย่อ)
- apps/web: Next.js app (app/)
  - app/auth: pdpa, upload-id, profile, login flows
  - app/jobs: jobs list, job details, filters
  - components: reusable UI (button, card, form)
- packages/ui: shared UI primitives
- utils/src: helper utilities (date, encryption, validation, line-api)

## Routes / Flows (สำคัญ)
- /auth/login — เริ่มการเข้าสู่ระบบผ่าน LINE
- /auth/pdpa — ยืนยัน PDPA
- /auth/upload-id — อัปโหลดบัตรประชาชน (มีปุ่ม "ข้าม" ที่เปิด modal ยืนยัน)
- /profile — หน้าตั้งค่าบัญชี/ข้อมูลผู้สมัคร
- /jobs — รายการงาน

## การรัน (local)
1. ติดตั้ง dependencies ที่ root (workspaces):
	npm install
2. รันเว็บแอปโดยตรง (แนะนำ):
	cd apps/web
	npm run dev
3. หรือใช้ turbo จาก root เพื่อกรองแอป:
	npm run web:dev

หมายเหตุ: ต้องใช้ Node.js >= 18 (ตาม `package.json`)

## ข้อมูลสำคัญ / shape (ย่อ)
- Candidate (profile): { id: string, name: string, phone?: string, email?: string, idCardUploaded: boolean }
- Job: { id: string, title: string, company?: string, location?: string, tags?: string[] }

## PDPA / Privacy note
- ข้อมูลส่วนบุคคล (เช่น บัตรประชาชน) ควรจัดเก็บและส่งแบบเข้ารหัสและมีนโยบายการเข้าถึงที่ชัดเจน
- ฟีเจอร์ "ข้าม" อนุญาตให้ผู้ใช้ไปต่อ แต่ควรแสดงเตือนว่าข้อมูลอาจจำเป็นต่อการตรวจสอบภายหลัง

## Current TODOs / Suggested next steps
- เพิ่ม API contract (POST /api/upload-id, GET /api/profile)
- เพิ่ม server-side validation และ secure storage สำหรับไฟล์ที่อัปโหลด
- เพิ่มหน้า/ข้อความแจ้งเตือนสำหรับกรณีผู้ใช้ข้าม (reminder)
- เพิ่ม E2E tests สำหรับ flow สมัครงาน (happy path + skip-upload)
- สร้าง README ที่ชัดเจนสำหรับการดีพลอย

---
This is a short, editable spec. Ask me to expand any section into a detailed spec or create API contracts and tests.

