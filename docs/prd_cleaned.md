# Product Requirement Document (PRD)  
## Project: ระบบสมัครงานผ่าน LINE OA + LINE Login  

---

## Executive Summary




---
ระบบสมัครงานผ่าน LINE OA เป็นแพลตฟอร์มที่ช่วยให้การสมัครงานเป็นเรื่องง่ายและสะดวกมากขึ้น โดยใช้ประโยชน์จาก LINE ที่คนไทยใช้กันอย่างแพร่หลาย 

**ภาพรวมระบบ:**
- **ผู้สมัคร:** ลงทะเบียนผ่าน LINE OA → รับการแจ้งเตือนตำแหน่งงานใหม่ → สมัครงาน → เข้าสัมภาษณ์ → รับผลการคัดเลือก
- **HR/Admin:** เปิดตำแหน่งงาน → ส่ง Broadcast → คัดเลือกผู้สมัคร → จัดการสัมภาษณ์ → ประกาศผล

**จุดเด่นหลัก:**
- ใช้ LINE Login เพื่อลดขั้นตอนการกรอกข้อมูล
- รองรับการอัปโหลดเอกสาร (บัตรประชาชน, Resume) 
- ระบบแจ้งเตือนผ่าน LINE ในทุกขั้นตอน
- การจัดการสัมภาษณ์และติดตามผลแบบครบวงจร
- ผู้สมัครสามารถสมัครได้หลายตำแหน่ง แต่ไม่ให้สมัครตำแหน่งเดิมซ้ำ

---

## 1. Document Control
- **Version:** 1.2  
- **Date:** 2025-10-03  
- **Author:** ทีมพัฒนา  
- **Reviewer:** ผู้จัดการโครงการ  

---

## 2. Introduction

### 2.1 Background
การสมัครงานทั่วไปมักต้องผ่านเว็บไซต์หรือแพลตฟอร์มกลาง ซึ่งอาจซับซ้อนและไม่สะดวก  
LINE เป็นช่องทางหลักที่คนไทยใช้ประจำวัน จึงเป็นจุดเชื่อมต่อที่เหมาะสมสำหรับการสมัครงาน  

### 2.2 Objectives
- อำนวยความสะดวกในการสมัครงาน โดยใช้ **LINE Login** เพื่อลดการกรอกข้อมูลซ้ำ  
- รองรับการ **อัปโหลดเอกสารสำคัญ (เช่น บัตรประชาชน, Resume)**  
- ผู้สมัครต้อง **ยินยอมตาม PDPA** ก่อนส่งข้อมูล  
- รองรับกระบวนการสัมภาษณ์และการติดตามผลการสมัครงาน  

### 2.3 Scope
**Phase 1: User Registration**
- ลงทะเบียนผู้ใช้ผ่าน LINE OA → LINE Login → Basic Profile

**Phase 2: Job Application Process**
- HR เปิดตำแหน่งงาน → Broadcast → สมัครงาน → สัมภาษณ์ → ประกาศผล

**Limitations:**
- Web Admin สำหรับ HR  
- Phase แรกยังไม่รวม AI Matching  

---

## 3. Stakeholders
- **Business Owner:** ฝ่าย HR / บริษัท  
- **Product Owner:** ทีมพัฒนา  
- **Developers/QA:** ทีม IT  
- **End Users:** ผู้สมัครงาน, HR  

---

## 4. Assumptions & Constraints

### 4.1 Assumptions
- ผู้สมัครทุกคนมี LINE Account  
- HR ต้องการระบบกลางในการดูข้อมูลผู้สมัคร  
- ผู้สมัครต้องลงทะเบียนก่อนจึงจะสามารถสมัครงานได้
- ผู้สมัครสามารถสมัครได้หลายตำแหน่ง แต่ห้ามสมัครตำแหน่งเดิมซ้ำ  

### 4.2 Constraints
- ขนาดไฟล์: Resume ≤ 5MB, ID Card ≤ 2MB  
- รองรับเฉพาะ PDF/JPG/PNG  
- ต้องเข้ารหัสข้อมูลเอกสารทั้งหมด (Encryption at rest & in transit)  

---

## 5. User Stories / Use Cases

### 5.1 Persona
- **ผู้สมัครงาน:** บุคคลทั่วไปที่ต้องการลงทะเบียนและสมัครงาน  
- **HR:** ผู้ดูแลตำแหน่งงาน คัดเลือกและจัดการสัมภาษณ์  

### 5.2 User Stories

**User Registration Phase:**
- ในฐานะผู้สมัคร ฉันต้องการ **ลงทะเบียนด้วย LINE Login** เพื่อสร้าง Basic Profile
- ในฐานะผู้สมัคร ฉันต้องการ **ยินยอมตาม PDPA** ก่อนส่งข้อมูลส่วนตัว

**Job Application Phase:**
- ในฐานะ HR ฉันต้องการ **เปิดตำแหน่งงานใหม่** พร้อมกำหนดวันปิดรับสมัคร
- ในฐานะ HR ฉันต้องการ **ส่ง Broadcast** แจ้งตำแหน่งงานใหม่ให้ผู้ใช้ทั้งหมด
- ในฐานะผู้สมัคร ฉันต้องการ **สมัครงานตำแหน่งที่สนใจ** พร้อมอัปโหลดเอกสาร (สามารถสมัครหลายตำแหน่งได้ แต่ห้ามซ้ำ)
- ในฐานะ HR ฉันต้องการ **เลือกผู้สมัครเข้าสัมภาษณ์** และส่งการแจ้งเตือน
- ในฐานะผู้สมัคร ฉันต้องการ **ยืนยัน/ยกเลิกการเข้าสัมภาษณ์**
- ในฐานะ HR ฉันต้องการ **บันทึกผลการสัมภาษณ์** และประกาศผลการคัดเลือก  

### 5.3 Complete User Flow

**Phase 0: User Registration**
1. ผู้ใช้เข้า LINE OA → กด "ลงทะเบียน"
2. ระบบ redirect ไป LINE Login → ดึงข้อมูลผู้ใช้
3. ผู้ใช้กดยอมรับ **PDPA Consent**
4. ผู้ใช้กรอก **Basic Profile** (ชื่อ, เบอร์โทร, อีเมล)
5. ระบบบันทึกข้อมูล → ส่งข้อความยืนยันการลงทะเบียน

**Phase 1: Job Posting**
1. HR เข้าสู่ระบบ Admin → เปิดตำแหน่งงานใหม่
2. HR กำหนดรายละเอียดงาน, วันปิดรับสมัคร (optional)
3. HR กด "Broadcast" → ระบบส่งข้อความแจ้งตำแหน่งงานใหม่ให้ผู้ใช้ทั้งหมด

**Phase 2: Job Application**
1. ผู้ใช้ได้รับ Broadcast → กดดูรายละเอียดงาน
2. ผู้ใช้กด "สมัครงาน" → กรอกข้อมูลเพิ่มเติม
3. ผู้ใช้อัปโหลด **บัตรประชาชน + Resume**
4. ผู้ใช้ตอบคำถามเฉพาะตำแหน่ง
5. ระบบบันทึกใบสมัคร → ส่งข้อความยืนยันการสมัคร

**Phase 3: Interview Process**
1. HR ดูใบสมัครทั้งหมด → เลือกผู้สมัครเข้าสัมภาษณ์
2. ระบบส่งการแจ้งเตือนสัมภาษณ์ผ่าน LINE (วัน/เวลา/สถานที่)
3. ผู้สมัครกด "ยืนยัน" หรือ "ยกเลิก" การเข้าสัมภาษณ์
4. วันสัมภาษณ์: HR บันทึกสถานะ "มา/ไม่มา" และผลการสัมภาษณ์

**Phase 4: Result Announcement**
1. HR ประกาศผลการคัดเลือก (ผ่าน/ไม่ผ่าน)
2. ระบบส่งการแจ้งเตือนผลการสมัครผ่าน LINE
3. ระบบบันทึก Log ทั้งหมดเพื่อการติดตาม

---

## 6. Functional Requirements

**User Management:**
- **LINE Login Integration** → Authentication ผู้ใช้
- **PDPA Consent Form** → Checkbox + บันทึกการยินยอม
- **Basic Profile Registration** → ข้อมูลส่วนตัวพื้นฐาน

**Job Management:**
- **Job Posting** → HR สร้างตำแหน่งงาน, กำหนดวันปิดรับสมัคร
- **Broadcast System** → ส่งข้อความแจ้งตำแหน่งงานใหม่
- **Job Application** → สมัครงาน + อัปโหลดเอกสาร + ตอบคำถาม
- **Multi-Position Application** → รองรับการสมัครหลายตำแหน่ง แต่ป้องกันการสมัครซ้ำ

**Interview Management:**
- **Candidate Selection** → HR เลือกผู้เข้าสัมภาษณ์
- **Interview Scheduling** → แจ้งเตือนการสัมภาษณ์
- **Interview Confirmation** → ผู้สมัครยืนยัน/ยกเลิก
- **Interview Tracking** → บันทึกสถานะการเข้าสัมภาษณ์

**Result Management:**
- **Result Recording** → บันทึกผลการสัมภาษณ์
- **Result Notification** → แจ้งผลการคัดเลือก
- **Activity Logging** → เก็บ Log การดำเนินการทั้งหมด

**Admin Dashboard:**
- **User Management** → ดูข้อมูลผู้ลงทะเบียน
- **Job Management** → CRUD ตำแหน่งงาน
- **Application Management** → ดูใบสมัคร, Export CSV
- **Interview Management** → จัดการการสัมภาษณ์
- **Report & Analytics** → รายงานสถิติการสมัครงาน  

---

## 7. Non-Functional Requirements
- **Security:**  
  - เอกสารผู้สมัครเข้ารหัส AES-256  
  - รองรับ HTTPS/TLS 1.3  
- **Performance:** โหลดหน้า < 2 วินาที  
- **Scalability:** รองรับผู้ลงทะเบียน ≥ 50,000 คน  
- **Availability:** Uptime ≥ 99.9%  
- **Compliance:** ต้องสอดคล้องกับ **PDPA**  

---

## 8. Acceptance Criteria

**User Registration:**
- ผู้ใช้สามารถ Login ผ่าน LINE ได้
- ผู้ใช้ต้องกดยอมรับ PDPA ก่อนลงทะเบียน
- ระบบบันทึก Basic Profile สำเร็จ

**Job Application:**
- HR สามารถเปิดตำแหน่งงานและ Broadcast ได้
- ผู้ใช้สามารถสมัครงานและอัปโหลดเอกสารได้สำเร็จ
- ผู้ใช้สามารถสมัครหลายตำแหน่งได้ แต่ระบบป้องกันการสมัครตำแหน่งเดิมซ้ำ
- ระบบส่งการแจ้งเตือนการสมัครได้

**Interview Process:**
- HR สามารถเลือกผู้เข้าสัมภาษณ์และส่งการแจ้งเตือนได้
- ผู้สมัครสามารถยืนยัน/ยกเลิกการสัมภาษณ์ได้
- ระบบบันทึกสถานะการเข้าสัมภาษณ์ได้

**Result Management:**
- HR สามารถประกาศผลและส่งการแจ้งเตือนได้
- ระบบเก็บ Log การดำเนินการทั้งหมด
- ข้อมูลทั้งหมดถูกเก็บเข้ารหัส  

---

## 9. Out of Scope
- AI Matching  
- ระบบ Video Interview  
- การเชื่อม Payroll  
- การจัดการ Onboarding  

---

## 10. Technical Specifications

### 10.1 Technology Stack
- **Frontend:** Next.js
- **Backend:** .NET 8
- **Database:** PostgreSQL  
- **Storage:** AWS S3 (Encrypted)

### 10.2 External APIs
- **LINE Login API** → User Authentication
- **LINE Messaging API** → Broadcast & Notification



### Profile Section

**Users Table**
คือ: ตารางเก็บข้อมูลผู้ใช้งานทุกประเภท (ผู้สมัคร, HR, Admin, Sysadmin) แยกการ login และข้อมูลโปรไฟล์หลัก
- user_id: รหัสผู้ใช้ (PK)
- email: อีเมล (ใช้ login สำหรับ HR/Admin/Sysadmin)
- password_hash: รหัสผ่าน (สำหรับ HR/Admin/Sysadmin)
- line_user_id: รหัส LINE (nullable, สำหรับผู้สมัครที่ login ผ่าน LINE)
- display_name, picture_url: ข้อมูลจาก LINE (nullable)
- prefix, first_name, last_name, phone, address: ข้อมูลโปรไฟล์พื้นฐาน
- role: ประเภทผู้ใช้ (user, hr, admin, sysadmin)
- pdpa_consent: การยินยอม PDPA (boolean)
- is_active: สถานะบัญชี
- extra_fields: ข้อมูลเพิ่มเติม (JSON)
- created_at, created_by, updated_at, updated_by

**User_Profile_Documents Table**
คือ: ตารางเก็บไฟล์เอกสารและประวัติของผู้ใช้ (รองรับหลายไฟล์/ประเภท/เวอร์ชัน)
- document_id: รหัสเอกสาร (PK)
- user_id: อ้างอิงผู้ใช้
- document_type: ประเภทเอกสาร (ENUM: id_card, resume, transcript, certificate, portfolio, house_registration, photo, reference_letter, cover_letter, other)
- file_path: ที่อยู่ไฟล์ (S3/Cloud Storage URL)
- file_name: ชื่อไฟล์
- file_size: ขนาดไฟล์
- uploaded_at: วันที่อัปโหลด
- is_active: ใช้งาน/ไม่ใช้งาน (เช่น resume ล่าสุด)
- created_at, created_by, updated_at, updated_by

**ตัวอย่าง document_type ที่รองรับ**
- id_card (บัตรประชาชน)
- resume (เรซูเม่)
- transcript (ใบแสดงผลการศึกษา)
- certificate (ใบรับรอง/ประกาศนียบัตร)
- portfolio (แฟ้มผลงาน)
- house_registration (ทะเบียนบ้าน)
- photo (รูปถ่าย)
- reference_letter (จดหมายรับรอง)
- cover_letter (จดหมายแนะนำตัว)
- other (อื่นๆ)

### Job Section

**Jobs Table**
คือ: ตารางเก็บข้อมูลตำแหน่งงานแต่ละตำแหน่งที่บริษัทเปิดรับ
- job_id: รหัสตำแหน่งงาน (PK)
- jobcode: โค้ดตำแหน่งงาน (เช่น DEV001)
- jobname: ชื่อตำแหน่งงาน
- description: รายละเอียดงาน
- requirements: คุณสมบัติ/เงื่อนไข
- status: สถานะ (เปิด/ปิด)
- created_by, created_at, updated_by, updated_at

**Job_Openings Table**
คือ: ตารางเก็บรอบการเปิดรับสมัครของแต่ละตำแหน่งงาน (เช่น เปิดรับรอบใหม่, กำหนดวันปิดรับสมัคร)
- job_opening_id: รหัสรอบเปิดรับสมัคร (PK)
- job_id: อ้างอิง jobs
- open_date: วันที่เริ่มเปิดรับสมัคร
- close_date: วันที่ปิดรับสมัคร
- status: สถานะรอบ (เปิด/ปิด)
- created_by, created_at, updated_by, updated_at

**Job_Applications Table**
คือ: ตารางเก็บใบสมัครของผู้สมัครแต่ละคนในแต่ละรอบเปิดรับสมัคร (1 คนสมัครได้หลาย job_opening แต่ละ job_opening สมัครได้ 1 ครั้ง)
- job_application_id: รหัสใบสมัคร (PK)
- user_id: อ้างอิงผู้สมัคร
- job_opening_id: อ้างอิงรอบเปิดรับสมัคร
- extra_answers: คำตอบเพิ่มเติม (เช่น คำตอบจาก QA)
- status: สถานะใบสมัคร (รอตรวจ, สัมภาษณ์, ผ่าน, ไม่ผ่าน)
- applied_at: วันที่สมัคร
- created_by, created_at, updated_by, updated_at

**QA Table**
คือ: ตารางคลังคำถามที่ใช้ในการสมัครงาน สามารถแบ่งประเภทและผูกกับ job ได้
- qa_id: รหัสคำถาม (PK)
- question_text: ข้อความคำถาม
- question_type: ประเภทคำถาม (basic, job-specific, attitude, company-fit, ai-extra)
- job_id: อ้างอิง jobs (nullable)
- is_active: สถานะใช้งาน
- created_by, created_at, updated_by, updated_at

**Job_Application_Answers Table**
คือ: ตารางเก็บคำตอบของผู้สมัครแต่ละคนต่อคำถามที่สุ่มมาในแต่ละใบสมัคร (เชื่อม job_applications กับ qa)
- job_application_id: อ้างอิงใบสมัคร
- qa_id: อ้างอิงคำถาม
- answer_text: คำตอบ
- created_by, created_at, updated_by, updated_at


### Interview Section

**Interviews Table**
คือ: ตารางเก็บข้อมูลการสัมภาษณ์ของแต่ละใบสมัคร (รองรับการสัมภาษณ์หลายรอบ)
- interview_id: รหัสสัมภาษณ์ (PK)
- job_application_id: อ้างอิงใบสมัคร
- scheduled_date: วัน-เวลา สัมภาษณ์
- status: สถานะ (รอ, ยืนยัน, ยกเลิก, มา, ไม่มา)
- result: ผลสัมภาษณ์ (ผ่าน/ไม่ผ่าน/รอพิจารณา)
- notes: หมายเหตุ
- created_by, created_at, updated_by, updated_at

**Future Phase:**
- สามารถขยายระบบในอนาคตเพื่อรองรับการประเมินแบบ panel (หลาย HR ให้คะแนน/คอมเมนต์แยก), การกำหนดเกณฑ์ประเมิน (criteria) และการรวมผลคะแนนอัตโนมัติได้

**Activity_Logs Table**
คือ: ตารางเก็บ log กิจกรรมต่างๆ ในระบบ
- log_id: รหัส log (PK)
- user_id: อ้างอิงผู้ใช้
- action: กิจกรรม
- details: รายละเอียด
- timestamp: เวลา
- created_by, created_at, updated_by, updated_at

---
## แนวทางการแบ่งประเภทคำถามสำหรับระบบสมัครงาน
ระบบจะสุ่มคำถามจากคลังคำถามเหล่านี้มา 3 ข้อในแต่ละการสมัครงาน

**ประเภทคำถามหลัก:**
1. **คำถามพื้นฐาน (General/Basic Questions)**
  - ใช้กับทุกตำแหน่ง เช่น แนะนำตัว, จุดแข็ง-จุดอ่อน, เหตุผลที่สนใจบริษัท ฯลฯ
2. **คำถามเฉพาะตำแหน่ง (Job-Specific Questions)**
  - ผูกกับแต่ละ job เช่น ทักษะเฉพาะ, ประสบการณ์ที่เกี่ยวข้อง, สถานการณ์จำลอง ฯลฯ
3. **คำถามเกี่ยวกับทัศนคติ/บุคลิกภาพ (Attitude/Personality Questions)**
  - เช่น วิธีรับมือกับความกดดัน, การทำงานเป็นทีม ฯลฯ
4. **คำถามเกี่ยวกับความรู้บริษัท/วัฒนธรรมองค์กร (Company Fit/Culture Questions)**
  - เช่น รู้จักบริษัทมากน้อยแค่ไหน, ค่านิยมที่ตรงกับองค์กร ฯลฯ
5. **คำถามเพิ่มเติมสำหรับ AI Matching (Optional/Future Use)**
  - เผื่อไว้สำหรับการเก็บข้อมูลเชิงลึกเพื่อ AI ในอนาคต