# 🎯 Simplified Plan - UI First Approach
## Jobs-SCC: ระบบสมัครงานผ่าน LINE (User-facing Web App เท่านั้น)

---

## 📋 **Project Scope (ปรับใหม่)**

### **Features ที่จะทำ:**
✅ **Landing Page** - หน้าแรกกับ LINE Login  
✅ **Job Listings** - แสดงตำแหน่งงานทั้งหมด  
✅ **Job Application** - กรอกข้อมูลสมัครงาน  
✅ **User Profile** - ดูและแก้ไขข้อมูลส่วนตัว  
✅ **LINE Integration** - แจ้งเตือนเมื่อสมัครงานสำเร็จ

### **ไม่ทำในเฟสนี้:**
❌ Admin Dashboard  
❌ Database Integration  
❌ Interview Management  
❌ Advanced Analytics  

---

## 🚀 **Development Phases (แบบใหม่)**

### **Phase 1: UI Foundation (สัปดาห์ 1)**
**Duration**: 5 วัน  
**Focus**: สร้าง UI components และ layout พื้นฐาน

**Tasks:**
- [x] ตั้งค่าโปรเจค (เสร็จแล้ว)
- [ ] สร้าง UI components (Button, Card, Form, etc.)
- [ ] Landing page กับ LINE Login mockup
- [ ] Basic routing และ navigation
- [ ] Responsive design setup

**Deliverables:**
- UI component library พร้อมใช้งาน
- Landing page ที่สวยและ responsive
- Navigation system

---

### **Phase 2: Job Listings (สัปดาห์ 2)**  
**Duration**: 5 วัน  
**Focus**: หน้าแสดงตำแหน่งงานและค้นหา

**Tasks:**
- [ ] Job listing page design
- [ ] Job card component
- [ ] Search และ filter functionality
- [ ] Job detail page
- [ ] Pagination หรือ infinite scroll
- [ ] Mock data สำหรับทดสอบ

**Deliverables:**
- หน้าแสดงงานที่สมบูรณ์
- ระบบค้นหาและกรองงาน
- หน้ารายละเอียดงาน

---

### **Phase 3: Application Form (สัปดาห์ 3)**
**Duration**: 5 วัน  
**Focus**: ฟอร์มสมัครงานและการอัปโหลดไฟล์

**Tasks:**
- [ ] Application form design
- [ ] File upload component (resume, ID card)
- [ ] Form validation กับ Zod
- [ ] Multi-step form (ถ้าจำเป็น)
- [ ] Success/error states
- [ ] Preview ก่อนส่ง

**Deliverables:**
- ฟอร์มสมัครงานที่ใช้งานง่าย
- ระบบอัปโหลดไฟล์
- การตรวจสอบข้อมูลที่ครบถ้วน

---

### **Phase 4: User Profile (สัปดาห์ 4)**
**Duration**: 3 วัน  
**Focus**: หน้าโปรไฟล์ผู้ใช้

**Tasks:**
- [ ] Profile page layout
- [ ] Edit profile form
- [ ] Application history
- [ ] Settings page
- [ ] PDPA consent management

**Deliverables:**
- หน้าโปรไฟล์ที่ครบถ้วน
- ระบบแก้ไขข้อมูล
- ประวัติการสมัครงาน

---

### **Phase 5: Polish & Integration (สัปดาห์ 5)**
**Duration**: 2 วัน  
**Focus**: ขัดเกลาและเตรียมต่อ API

**Tasks:**
- [ ] UI/UX improvements
- [ ] Loading states และ animations
- [ ] Error handling
- [ ] Mobile optimization
- [ ] Performance optimization

**Deliverables:**
- UI สมบูรณ์พร้อมใช้งาน
- ประสบการณ์ผู้ใช้ที่ดี
- โค้ดที่พร้อมต่อ API

---

## 🛠️ **Tech Stack (Simplified)**

### **Frontend Only:**
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **State**: React useState/useContext (ไม่ต้อง Redux ตอนนี้)
- **Mock Data**: JSON files สำหรับ development

### **Development Tools:**
- **TypeScript** - Type safety
- **ESLint + Prettier** - Code quality
- **Storybook** - Component development (optional)

---

## 📂 **Simplified Project Structure**

```
Jobs-SCC/
├── apps/
│   └── web/                    # User-facing web app เท่านั้น
│       ├── app/
│       │   ├── (auth)/         # LINE Login pages
│       │   ├── jobs/           # Job listings & details
│       │   ├── apply/          # Application forms
│       │   ├── profile/        # User profile
│       │   ├── components/     # Page-specific components
│       │   └── globals.css
│       ├── components/         # Shared UI components
│       ├── lib/               # Utilities & mock data
│       └── public/            # Static assets
├── packages/
│   ├── ui/                    # Shared UI components
│   └── utils/                 # Helper functions
└── docs/                      # Documentation
```

---

## 🎨 **UI Components ที่ต้องสร้าง**

### **Core Components:**
- [x] Button (เสร็จแล้ว)
- [ ] Card
- [ ] Input & Form fields
- [ ] Modal/Dialog
- [ ] Loading spinner
- [ ] Toast notifications

### **Feature Components:**
- [ ] JobCard - แสดงข้อมูลงานแต่ละตำแหน่ง
- [ ] JobFilters - ค้นหาและกรองงาน
- [ ] ApplicationForm - ฟอร์มสมัครงาน
- [ ] FileUpload - อัปโหลดไฟล์
- [ ] UserProfile - หน้าโปรไฟล์

### **Layout Components:**
- [ ] Header/Navigation
- [ ] Footer
- [ ] Sidebar (ถ้ามี)
- [ ] PageLayout wrapper

---

## 📱 **Pages ที่ต้องสร้าง**

### **1. Landing Page (`/`)**
- Hero section กับ LINE Login
- ข้อมูลบริษัทและประโยชน์
- Call-to-action

### **2. Job Listings (`/jobs`)**
- รายการงานทั้งหมด
- Search bar และ filters
- Pagination

### **3. Job Details (`/jobs/[id]`)**
- รายละเอียดงาน
- ข้อมูลบริษัท
- ปุ่มสมัครงาน

### **4. Application Form (`/apply/[jobId]`)**
- ฟอร์มข้อมูลส่วนตัว
- อัปโหลดเรซูเม่และบัตรประชาชน
- คำถามเฉพาะตำแหน่ง

### **5. Profile (`/profile`)**
- ข้อมูลผู้ใช้
- แก้ไขข้อมูล
- ประวัติการสมัครงาน

### **6. Success Pages**
- หน้า thank you หลังสมัครงาน
- หน้าแจ้งเตือนต่างๆ

---

## 📊 **Mock Data Structure**

### **Jobs Data:**
```typescript
interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: 'full-time' | 'part-time' | 'contract'
  description: string
  requirements: string[]
  benefits: string[]
  closingDate: string
  isActive: boolean
}
```

### **User Data:**
```typescript  
interface User {
  id: string
  lineId: string
  name: string
  email: string
  phone: string
  profileImage?: string
  pdpaConsent: boolean
}
```

### **Application Data:**
```typescript
interface Application {
  id: string
  jobId: string
  userId: string
  status: 'submitted' | 'reviewing' | 'accepted' | 'rejected'
  resumeUrl?: string
  idCardUrl?: string
  answers: Record<string, string>
  submittedAt: string
}
```

---

## 🎯 **Success Metrics**

### **Phase 1-5 Goals:**
- [ ] Responsive design ใช้งานได้ดีบนมือถือ
- [ ] Form validation ครบถ้วนและเข้าใจง่าย  
- [ ] File upload ทำงานได้ถูกต้อง
- [ ] Navigation ราบรื่นระหว่างหน้า
- [ ] Loading states และ error handling

### **Performance Targets:**
- Page load < 2 seconds
- Mobile-friendly (95+ Lighthouse mobile score)
- Accessible (WCAG 2.1 AA)

---

**Timeline**: 5 สัปดาห์ (UI เท่านั้น)  
**Next Phase**: API Development & Database Integration  
**Last Updated**: October 8, 2025