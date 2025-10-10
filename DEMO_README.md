# 🧩 Jobs SCC - Mock Up Demo

ระบบสมัครงานผ่าน LINE Login - Demo Version

## 📋 ภาพรวม Mock Up

ระบบนี้แสดง flow การทำงานของ Jobs SCC ที่ประกอบด้วย:

### 🔄 ขั้นตอนการใช้งาน (User Journey)

1. **หน้าแรก (Landing Page)** - `http://localhost:3001`
   - แสดงข้อมูลเกี่ยวกับระบบ
   - ปุ่มเข้าสู่ระบบด้วย LINE
   - ดูงานโดยไม่ต้องเข้าสู่ระบบ

2. **หน้า Login** - `http://localhost:3001/auth/login`
   - Mock การ login ผ่าน LINE
   - จำลอง loading 2 วินาที
   - หลังจากนั้นจะ redirect ไป profile setup

3. **หน้ากรอกข้อมูล** - `http://localhost:3001/auth/profile-setup`
   - **ขั้นตอนที่ 1**: ข้อมูลส่วนตัว (ชื่อ, อีเมล, เบอร์โทร, วันเกิด)
   - **ขั้นตอนที่ 2**: การศึกษาและประสบการณ์
   - **ขั้นตอนที่ 3**: ทักษะที่มี (เลือกได้หลายรายการ)
   - Progress bar แสดงความคืบหน้า

4. **หน้าโปรไฟล์** - `http://localhost:3001/profile`
   - แสดงข้อมูลโปรไฟล์ทั้งหมด
   - สถิติการสมัครงาน
   - การสมัครงานล่าสุด
   - สามารถแก้ไขโปรไฟล์ได้

5. **หน้างาน** - `http://localhost:3001/jobs`
   - แสดงรายการงาน (ใช้ข้อมูล mock)
   - ระบบกรองงาน
   - การค้นหา

## 🎯 ฟีเจอร์หลักที่ Demo ได้

### ✅ สิ่งที่ Mock Up แล้ว
- [x] UI/UX ครบทุกหน้า
- [x] Flow การ Login ผ่าน LINE (จำลอง)
- [x] Multi-step form สำหรับกรอกข้อมูล
- [x] หน้าโปรไฟล์พร้อมการแก้ไข
- [x] Responsive design (ใช้งานได้ทั้งมือถือและเดสก์ท็อป)
- [x] Loading states และ transitions
- [x] Form validation (frontend)

### 🔄 ฟีเจอร์ที่ทำงานได้ (Mock)
- การเข้าสู่ระบบผ่าน LINE (จำลอง 2 วินาที)
- การกรอกข้อมูลแบบ multi-step
- การเลือกทักษะ (multiple selection)
- การแก้ไขโปรไฟล์ (UI เท่านั้น)
- การแสดงสถิติการสมัครงาน

## 🛠 การติดตั้งและรัน

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3001`

## 📱 หน้าจอต่างๆ

### หน้าแรก (Landing Page)
- Hero section พร้อมปุ่ม LOGIN
- แสดงฟีเจอร์หลัก 3 อย่าง
- ตำแหน่งงานยอดนิยม
- วิธีใช้งาน 3 ขั้นตอน

### หน้า Login
- UI สไตล์ LINE สีเขียว
- ปุ่ม "เข้าสู่ระบบด้วย LINE" พร้อมไอคอน
- Loading animation เมื่อกด login

### หน้า Profile Setup (3 ขั้นตอน)
- **Step 1**: ข้อมูลพื้นฐาน + แสดง LINE profile
- **Step 2**: การศึกษา, ประสบการณ์, เงินเดือนที่คาดหวัง
- **Step 3**: เลือกทักษะจาก preset list

### หน้า Profile
- **Left Sidebar**: รูปโปรไฟล์, สถิติ, quick actions
- **Main Content**: 
  - ข้อมูลส่วนตัว (แก้ไขได้)
  - การศึกษาและประสบการณ์
  - ทักษะ (แสดงเป็น tags)
  - การสมัครงานล่าสุด (mock data)

## 🎨 Design System

### สี (Colors)
- **Primary**: สีเขียว LINE (#06C755)
- **Secondary**: สีฟ้า, เทา
- **Success**: เขียวอ่อน
- **Warning**: เหลือง
- **Error**: แดง

### Typography
- **Headings**: font-bold, text-xl to text-3xl
- **Body**: text-base, text-gray-600
- **Small**: text-sm, text-gray-500

### Components
- **Cards**: rounded-lg, shadow-md
- **Buttons**: rounded-lg, transition-colors
- **Forms**: focus:ring-2, border styling
- **Tags**: rounded-full, colored backgrounds

## 📋 ข้อมูล Mock ที่ใช้

### ข้อมูลผู้ใช้
```javascript
{
  displayName: 'นาย สมชาย ใจดี',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  email: 'somchai.jaidee@email.com',
  // ... อื่นๆ
}
```

### การสมัครงานล่าสุด
- Frontend Developer (รอการพิจารณา)
- Full Stack Developer (ได้รับการติดต่อ) 
- React Developer (ผ่านการคัดเลือก)

## 🚀 Next Steps

### สิ่งที่ควรพัฒนาต่อ
1. **Backend Integration**
   - LINE Login API จริง
   - Database สำหรับเก็บข้อมูล
   - API endpoints

2. **Real-time Features**
   - LINE Notify integration
   - WebSocket สำหรับ notifications

3. **Enhanced Features**
   - File upload (Resume, ID Card)
   - Job application system
   - Admin dashboard

4. **Performance & Security**
   - Image optimization
   - Data encryption
   - Rate limiting

## 💡 การใช้งาน Demo

1. เปิดเบราว์เซอร์ไปที่ `http://localhost:3001`
2. กดปุ่ม "เข้าสู่ระบบด้วย LINE"
3. รอ 2 วินาทีเพื่อดู loading animation
4. กรอกข้อมูลในทั้ง 3 ขั้นตอน
5. ดูหน้าโปรไฟล์ที่สมบูรณ์
6. ทดลองแก้ไขข้อมูลโปรไฟล์
7. ไปดูหน้างาน `/jobs` (ถ้ามี)

---

**หมายเหตุ**: นี่เป็น Mock Up สำหรับการ demo เท่านั้น ไม่ได้เชื่อมต่อกับ LINE API หรือ Database จริง