/**
 * Mock Data for Development
 * This file contains all mock data that simulates API responses
 * Can be easily switched to real API by changing API_CONFIG.USE_MOCK
 */

import {
  User,
  UserDocument,
  UserProfile,
  Job,
  JobOpening,
  JobApplication,
  QA,
  Interview,
  Notification,
  DocumentType,
  JobStatus,
  ApplicationStatus,
  InterviewStatus,
  NotificationType,
} from '@/types';

// ============= User Mock Data =============
export const mockCurrentUser: User = {
  user_id: 'user-001',
  email: 'john.doe@example.com',
  line_user_id: 'U1234567890abcdef',
  display_name: 'John Doe',
  picture_url: 'https://via.placeholder.com/150',
  prefix: 'นาย',
  first_name: 'จอห์น',
  last_name: 'โด',
  phone: '0812345678',
  address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
  role: 'user',
  pdpa_consent: true,
  is_active: true,
  extra_fields: {
    date_of_birth: '1995-05-15',
    education: 'ปริญญาตรี วิศวกรรมศาสตร์',
  },
  created_at: '2024-01-01T00:00:00Z',
};

export const mockUserDocuments: UserDocument[] = [
  {
    document_id: 'doc-001',
    user_id: 'user-001',
    document_type: 'id_card',
    file_path: 'https://example.com/documents/id-card.pdf',
    file_name: 'id_card.pdf',
    file_size: 1024000,
    uploaded_at: '2024-01-15T10:00:00Z',
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    document_id: 'doc-002',
    user_id: 'user-001',
    document_type: 'resume',
    file_path: 'https://example.com/documents/resume.pdf',
    file_name: 'resume_john_doe.pdf',
    file_size: 2048000,
    uploaded_at: '2024-01-15T10:05:00Z',
    is_active: true,
    created_at: '2024-01-15T10:05:00Z',
  },
];

export const mockUserProfile: UserProfile = {
  ...mockCurrentUser,
  documents: mockUserDocuments,
};

// ============= Job Mock Data =============
export const mockJobs: Job[] = [
  {
    job_id: 'job-001',
    jobcode: 'DEV-001',
    jobname: 'Frontend Developer',
    description: `
เราเป็นบริษัทเทคโนโลยีชั้นนำที่กำลังมองหา Frontend Developer ที่มีความสามารถในการพัฒนาเว็บแอปพลิเคชันที่ทันสมัยและใช้งานง่าย

**หน้าที่ความรับผิดชอบ:**
- พัฒนาและปรับปรุงเว็บไซต์และเว็บแอปพลิเคชัน
- ทำงานร่วมกับทีม UX/UI Designer เพื่อสร้างประสบการณ์ที่ดีให้กับผู้ใช้
- เขียนโค้ดที่สะอาด maintainable และ testable
- ทำงานร่วมกับ Backend Developer ในการเชื่อมต่อ API
- ปรับปรุงประสิทธิภาพของเว็บไซต์

**เทคโนโลยีที่ใช้:**
- React.js, Next.js, TypeScript
- TailwindCSS, styled-components
- Git, GitHub, CI/CD
- Testing: Jest, Cypress
    `,
    requirements: `
- ปริญญาตรีสาขาคอมพิวเตอร์ วิศวกรรมคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง
- ประสบการณ์ 2-4 ปีในการพัฒนา Frontend
- มีความเชี่ยวชาญใน React.js, JavaScript, HTML, CSS
- มีประสบการณ์ใน TypeScript และ Next.js
- เข้าใจ Responsive Design และ Mobile-first approach
- มีทักษะการทำงานเป็นทีม
    `,
    benefits: `
- เงินเดือนและโบนัสตามผลงาน
- ประกันสุขภาพและประกันชีวิต
- วันหยุดพักผ่อนประจำปี 15 วัน
- Work from Home 2 วัน/สัปดาห์
- โอกาสในการพัฒนาทักษะและเติบโตในสายงาน
    `,
    department: 'Technology',
    location: 'กรุงเทพฯ (บางนา)',
    salary_range: '35,000 - 50,000 บาท',
    employment_type: 'full-time',
    experience_level: 'mid',
    status: 'open',
    created_at: '2024-09-01T00:00:00Z',
  },
  {
    job_id: 'job-002',
    jobcode: 'MKT-001',
    jobname: 'Digital Marketing Specialist',
    description: `
ต้องการผู้เชี่ยวชาญด้าน Digital Marketing ที่มีความคิดสร้างสรรค์และมีประสบการณ์ในการทำ Online Marketing

**หน้าที่ความรับผิดชอบ:**
- วางแผนและดำเนินการแคมเปญ Digital Marketing
- บริหารจัดการ Social Media และ Content Marketing
- วิเคราะห์ข้อมูลและรายงานผลการทำ Marketing
- ทำงานร่วมกับทีมออกแบบในการสร้าง Creative Content
- ติดตามเทรนด์และนวัตกรรมใหม่ๆ ในวงการ Digital Marketing
    `,
    requirements: `
- ปริญญาตรีสาขาการตลาด นิเทศศาสตร์ หรือสาขาที่เกี่ยวข้อง
- ประสบการณ์ 1-3 ปีในด้าน Digital Marketing
- มีความรู้ใน SEO, SEM, Social Media Marketing
- สามารถใช้ Google Analytics, Facebook Ads Manager
- มีความคิดสร้างสรรค์และทักษะการเขียนที่ดี
    `,
    benefits: `
- เงินเดือนและค่าคอมมิชชั่นตามผลงาน
- ประกันสังคมและประกันสุขภาพ
- โบนัสประจำปี
- อบรมและพัฒนาทักษะอย่างต่อเนื่อง
    `,
    department: 'Marketing',
    location: 'กรุงเทพฯ (สาทร)',
    salary_range: '25,000 - 40,000 บาท',
    employment_type: 'full-time',
    experience_level: 'entry',
    status: 'open',
    created_at: '2024-09-15T00:00:00Z',
  },
  {
    job_id: 'job-003',
    jobcode: 'DEV-002',
    jobname: 'Backend Developer (.NET)',
    description: `
กำลังมองหา Backend Developer ที่มีประสบการณ์ใน .NET และ C# เพื่อมาร่วมพัฒนาระบบที่มั่นคงและรองรับการใช้งานจำนวนมาก

**หน้าที่ความรับผิดชอบ:**
- พัฒนาและดูแล Backend API ด้วย .NET
- ออกแบบและพัฒนา Database Schema
- เขียน Unit Tests และ Integration Tests
- Optimize Performance และแก้ไข Bugs
- ทำงานร่วมกับทีม Frontend และ DevOps
    `,
    requirements: `
- ปริญญาตรีสาขาคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง
- ประสบการณ์ 3-5 ปีใน Backend Development
- มีความเชี่ยวชาญใน .NET Core/ASP.NET Core, C#
- มีประสบการณ์ใน SQL Server หรือ PostgreSQL
- เข้าใจ RESTful API และ Microservices
- มีความรู้ใน Git, Docker, CI/CD
    `,
    department: 'Technology',
    location: 'กรุงเทพฯ (บางนา)',
    salary_range: '45,000 - 65,000 บาท',
    employment_type: 'full-time',
    experience_level: 'senior',
    status: 'open',
    created_at: '2024-10-01T00:00:00Z',
  },
];

export const mockJobOpenings: JobOpening[] = [
  {
    job_opening_id: 'opening-001',
    job_id: 'job-001',
    job: mockJobs[0],
    open_date: '2024-10-01T00:00:00Z',
    close_date: '2024-10-31T23:59:59Z',
    status: 'open',
    position_count: 2,
    created_at: '2024-10-01T00:00:00Z',
  },
  {
    job_opening_id: 'opening-002',
    job_id: 'job-002',
    job: mockJobs[1],
    open_date: '2024-10-05T00:00:00Z',
    close_date: '2024-11-05T23:59:59Z',
    status: 'open',
    position_count: 1,
    created_at: '2024-10-05T00:00:00Z',
  },
  {
    job_opening_id: 'opening-003',
    job_id: 'job-003',
    job: mockJobs[2],
    open_date: '2024-10-10T00:00:00Z',
    close_date: '2024-11-10T23:59:59Z',
    status: 'open',
    position_count: 3,
    created_at: '2024-10-10T00:00:00Z',
  },
];

// ============= QA Mock Data =============
export const mockQuestions: QA[] = [
  {
    qa_id: 'qa-001',
    question_text: 'กรุณาแนะนำตัวเองและเล่าเกี่ยวกับประสบการณ์การทำงานของคุณ',
    question_type: 'basic',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    qa_id: 'qa-002',
    question_text: 'ทำไมคุณถึงสนใจตำแหน่งงานนี้และบริษัทของเรา',
    question_type: 'company-fit',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    qa_id: 'qa-003',
    question_text: 'คุณมีประสบการณ์อะไรบ้างที่เกี่ยวข้องกับตำแหน่งงานนี้',
    question_type: 'job-specific',
    job_id: 'job-001',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
];

// ============= Application Mock Data =============
export const mockApplications: JobApplication[] = [
  {
    job_application_id: 'app-001',
    user_id: 'user-001',
    job_opening_id: 'opening-001',
    job_opening: mockJobOpenings[0],
    extra_answers: {},
    status: 'interview',
    applied_at: '2024-10-02T10:00:00Z',
    created_at: '2024-10-02T10:00:00Z',
  },
];

// ============= Interview Mock Data =============
export const mockInterviews: Interview[] = [
  {
    interview_id: 'int-001',
    job_application_id: 'app-001',
    scheduled_date: '2024-10-15T14:00:00Z',
    scheduled_time: '14:00',
    location: 'ชั้น 5 ห้องประชุม A',
    interview_type: 'onsite',
    status: 'confirmed',
    result: 'pending',
    notes: 'กรุณามาถึงก่อนเวลา 15 นาที',
    created_at: '2024-10-05T10:00:00Z',
  },
];

// ============= Notification Mock Data =============
export const mockNotifications: Notification[] = [
  {
    notification_id: 'notif-001',
    user_id: 'user-001',
    type: 'interview_scheduled',
    title: 'นัดสัมภาษณ์งาน',
    message: 'คุณได้รับการนัดสัมภาษณ์ตำแหน่ง Frontend Developer วันที่ 15 ต.ค. 2024 เวลา 14:00 น.',
    link: '/interviews/int-001',
    is_read: false,
    created_at: '2024-10-05T10:00:00Z',
  },
  {
    notification_id: 'notif-002',
    user_id: 'user-001',
    type: 'application_status',
    title: 'สถานะการสมัครงาน',
    message: 'ใบสมัครของคุณสำหรับตำแหน่ง Frontend Developer อยู่ระหว่างการพิจารณา',
    link: '/applications/app-001',
    is_read: true,
    created_at: '2024-10-03T15:00:00Z',
    read_at: '2024-10-03T16:00:00Z',
  },
  {
    notification_id: 'notif-003',
    user_id: 'user-001',
    type: 'job_opening',
    title: 'ตำแหน่งงานใหม่',
    message: 'มีตำแหน่งงานใหม่ที่น่าสนใจ: Backend Developer (.NET)',
    link: '/jobs/opening-003',
    is_read: false,
    created_at: '2024-10-10T09:00:00Z',
  },
];

// Helper function to simulate API delay
export const delay = (ms: number = 500) => 
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper to generate random ID
export const generateId = (prefix: string) => 
  `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
