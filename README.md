# 🧩 Jobs-SCC  
> ระบบสมัครงานผ่าน LINE OA + LINE Login + Admin Dashboard  
> พัฒนาโดยใช้ Next.js 14 + TypeScript + Prisma + TailwindCSS

---

## 📘 Project Overview

**Jobs-SCC** เป็นระบบสมัครงานผ่าน **LINE Official Account**  
โดยผู้สมัครสามารถเข้าสู่ระบบด้วย **LINE Login**,  
ยืนยันตัวตนด้วย **OTP ผ่าน LINE Messaging API**,  
อัปโหลดเอกสาร (บัตรประชาชน / Resume)  
และยืนยันการยินยอมตาม **PDPA** ก่อนส่งใบสมัคร  

ฝั่ง **HR (Admin Dashboard)** สามารถดูใบสมัคร, ดาวน์โหลดเอกสาร,  
จัดการตำแหน่งงาน และส่ง Broadcast ผ่าน LINE ได้

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14 (App Router) + TypeScript + TailwindCSS + Shadcn UI |
| Backend | Node.js (Next API Routes) + Prisma ORM |
| Database | PostgreSQL |
| Storage | AWS S3 (Encrypted) |
| Auth | LINE Login + JWT |
| Messaging | LINE Messaging API (OTP + Notification) |
| Infra | Vercel + Supabase/AWS RDS |

---

## 📂 Project Structure

```bash
Jobs-SCC/
├── apps/
│   ├── web/          # ผู้สมัคร (LINE user)
│   └── admin/        # HR Dashboard
├── packages/
│   ├── ui/           # Shared UI Components
│   ├── utils/        # Helper functions, encryption, OTP, etc.
│   └── db/           # Prisma Schema & DB Client
├── docs/
│   ├── prd_cleaned.md             # Product Requirement Document (PRD)
│   ├── nextjs.instructions(2).md  # Technical Implementation Guide
│   ├── Spec.md                    # Technical Specs per module
│   ├── Plan.md                    # Development Plan / Milestones
│   ├── Task.md                    # Feature & Task Breakdown
│   └── screen/                    # Wireframes / UI Screenshots
├── .env.example
├── README.md
└── package.json
```
