// Job types (simplified for now)
export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  requirements: string[]
  benefits?: string[]
  closingDate: string
  isActive: boolean
  department?: string
  experienceLevel: 'entry' | 'mid' | 'senior'
  createdAt: string
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'บริษัท เทคโนโลยี ABC จำกัด',
    location: 'กรุงเทพฯ (บางนา)',
    salary: '35,000 - 50,000 บาท',
    type: 'full-time',
    department: 'Technology',
    experienceLevel: 'mid',
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
    requirements: [
      'ปริญญาตรีสาขาคอมพิวเตอร์ วิศวกรรมคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง',
      'ประสบการณ์ 2-4 ปีในการพัฒนา Frontend',
      'มีความเชี่ยวชาญใน React.js, JavaScript, HTML, CSS',
      'มีประสบการณ์ใน TypeScript และ Next.js',
      'เข้าใจ Responsive Design และ Mobile-first approach',
      'มีความรู้เรื่อง Git และ Version Control',
      'สามารถทำงานเป็นทีมและสื่อสารได้ดี'
    ],
    benefits: [
      'เงินเดือนและโบนัสที่แข่งขันได้',
      'ประกันสุขภาพและประกันชีวิต', 
      'วันหงุดหยุดพิเศษ',
      'Training และ Conference budget',
      'Work from Home ได้ 2 วัน/สัปดาห์',
      'Flexible working hours'
    ],
    closingDate: '2025-10-31',
    isActive: true,
    createdAt: '2025-10-01T00:00:00Z'
  },
  {
    id: '2', 
    title: 'UX/UI Designer',
    company: 'บริษัท ดิจิทัล ดีไซน์ XYZ จำกัด',
    location: 'กรุงเทพฯ (สีลม)',
    salary: '40,000 - 60,000 บาท',
    type: 'full-time',
    department: 'Design',
    experienceLevel: 'mid',
    description: `
เรากำลังมองหา UX/UI Designer ที่มีความคิดสร้างสรรค์และมีประสบการณ์ในการออกแบบดิจิทัล

**หน้าที่ความรับผิดชอบ:**
- วิจัยและวิเคราะห์ผู้ใช้ (User Research)
- สร้าง User Journey และ Wireframe
- ออกแบบ UI ที่สวยงามและใช้งานง่าย
- สร้าง Design System และ Component Library
- ทำงานร่วมกับทีม Developer และ Product Manager
- ทำ Usability Testing และปรับปรุงตาม Feedback

**เครื่องมือที่ใช้:**
- Figma, Sketch, Adobe Creative Suite
- Principle, ProtoPie สำหรับ Prototyping
- Miro, FigJam สำหรับ Collaboration
    `,
    requirements: [
      'ปริญญาตรีสาขาออกแบบ นิเทศศิลป์ หรือสาขาที่เกี่ยวข้อง',
      'ประสบการณ์ 3-5 ปีในการออกแบบ UX/UI',
      'เชี่ยวชาญ Figma และ Adobe Creative Suite',
      'เข้าใจหลักการ UX Design และ Design Thinking',
      'มีประสบการณ์ใน User Research และ Usability Testing',
      'มี Portfolio ที่แสดงผลงานที่หลากหลาย',
      'สามารถสื่อสารและนำเสนอไอเดียได้ดี'
    ],
    benefits: [
      'เงินเดือนสูงและโบนัสประจำปี',
      'ค่า Software License และ Hardware allowance',
      'Training งบประมาณสูง',
      'Creative environment',
      'Work from Home ได้ 3 วัน/สัปดาห์'
    ],
    closingDate: '2025-10-25',
    isActive: true,
    createdAt: '2025-09-28T00:00:00Z'
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'บริษัท ซอฟต์แวร์ โซลูชั่น DEF จำกัด',
    location: 'กรุงเทพฯ (อโศก)',
    salary: '45,000 - 70,000 บาท',
    type: 'full-time', 
    department: 'Engineering',
    experienceLevel: 'senior',
    description: `
เรากำลังมองหา Senior Backend Developer ที่มีประสบการณ์ในการสร้างระบบที่รองรับผู้ใช้จำนวนมาก

**หน้าที่ความรับผิดชอบ:**
- พัฒนาและดูแลระบบ Backend API
- ออกแบบ Database และ optimize performance
- สร้าง Microservices Architecture
- ดูแล DevOps และ CI/CD pipeline
- Code Review และ mentor Junior developers
- วิเคราะห์และแก้ไขปัญหาเชิงเทคนิค

**เทคโนโลยีที่ใช้:**
- Node.js, Python, Go
- PostgreSQL, MongoDB, Redis  
- Docker, Kubernetes
- AWS, GCP
- GraphQL, REST APIs
    `,
    requirements: [
      'ปริญญาตรีสาขาคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง',
      'ประสบการณ์ 4+ ปีในการพัฒนา Backend',
      'เชี่ยวชาญใน Node.js หรือ Python',
      'มีประสบการณ์ใน Database design และ optimization',
      'เข้าใจ Microservices และ Cloud architecture',
      'มีประสบการณ์ใน DevOps และ Container technology',
      'มีความรู้เรื่อง Security และ Performance tuning'
    ],
    closingDate: '2025-11-15',
    isActive: true,
    createdAt: '2025-09-25T00:00:00Z'
  },
  {
    id: '4',
    title: 'Digital Marketing Specialist',
    company: 'บริษัท มาร์เก็ตติ้ง ออนไลน์ GHI จำกัด',
    location: 'กรุงเทพฯ (พญาไท)',
    salary: '25,000 - 35,000 บาท',
    type: 'full-time',
    department: 'Marketing',
    experienceLevel: 'entry',
    description: `
เรากำลังมองหา Digital Marketing Specialist ที่มีความหลงใหลใน Digital Marketing

**หน้าที่ความรับผิดชอบ:**
- วางแผนและดำเนินการ Digital Marketing Campaign
- จัดการ Social Media และ Content Marketing  
- วิเคราะห์ผลการตลาดและจัดทำรายงาน
- ดูแล Google Ads และ Facebook Ads
- SEO และ SEM optimization
- ทำงานร่วมกับทีม Creative

**เครื่องมือที่ใช้:**
- Google Analytics, Google Ads
- Facebook Business Manager
- Hootsuite, Buffer
- Canva, Photoshop
    `,
    requirements: [
      'ปริญญาตรีสาขาการตลาด นิเทศศาสตร์ หรือสาขาที่เกี่ยวข้อง',
      'ประสบการณ์ 1-3 ปีใน Digital Marketing',
      'มีความรู้เรื่อง SEO, SEM, Social Media Marketing',
      'เข้าใจ Google Analytics และ Facebook Insights',
      'มีความคิดสร้างสรรค์และสามารถทำงานเป็นทีม',
      'ทักษะการเขียนและการสื่อสารที่ดี'
    ],
    closingDate: '2025-10-20',
    isActive: true,
    createdAt: '2025-10-05T00:00:00Z'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'บริษัท คลาวด์ เทคโนโลยี JKL จำกัด',
    location: 'กรุงเทพฯ (ลาดพร้าว)',
    salary: '50,000 - 80,000 บาท', 
    type: 'full-time',
    department: 'Infrastructure',
    experienceLevel: 'senior',
    description: `
เรากำลังมองหา DevOps Engineer ที่มีประสบการณ์ในการจัดการ Infrastructure และ Automation

**หน้าที่ความรับผิดชอบ:**
- ออกแบบและจัดการ CI/CD Pipeline  
- ดูแล Cloud Infrastructure (AWS, GCP, Azure)
- Monitoring และ Logging ระบบ
- Automation และ Infrastructure as Code
- Security และ Compliance
- Troubleshooting และ Performance optimization

**เทคโนโลยีที่ใช้:**
- Docker, Kubernetes
- Terraform, Ansible
- Jenkins, GitLab CI/CD
- Prometheus, Grafana
- ELK Stack
    `,
    requirements: [
      'ปริญญาตรีสาขาคอมพิวเตอร์ วิศวกรรม หรือสาขาที่เกี่ยวข้อง',
      'ประสบการณ์ 3+ ปีใน DevOps หรือ Infrastructure',
      'เชี่ยวชาญ Docker, Kubernetes',
      'มีประสบการณ์ใน Cloud platforms (AWS/GCP/Azure)',
      'เข้าใจ Infrastructure as Code และ Configuration Management',
      'มีความรู้เรื่อง Monitoring และ Security',
      'มีประสบการณ์ใน CI/CD และ Automation'
    ],
    closingDate: '2025-11-30',
    isActive: true,
    createdAt: '2025-09-30T00:00:00Z'
  }
]