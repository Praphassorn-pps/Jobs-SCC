# API Models & Services Architecture

โครงสร้างนี้ออกแบบมาเพื่อให้สามารถสลับระหว่าง **Mock Data** และ **Real API** ได้ง่าย โดยไม่ต้องแก้ไขโค้ดในส่วนของ UI Components

## 📁 โครงสร้างไฟล์

```
apps/web/
├── types/                      # Type definitions
│   ├── auth.types.ts          # Authentication types
│   ├── user.types.ts          # User & Profile types
│   ├── job.types.ts           # Job & Application types
│   ├── interview.types.ts     # Interview types
│   ├── notification.types.ts  # Notification types
│   └── index.ts               # Central export
│
├── lib/
│   ├── api-client.ts          # Base API client with error handling
│   └── mock-data-services.ts  # Mock data for development
│
├── services/                   # Service layer (API calls)
│   ├── auth.service.ts        # Authentication service
│   ├── user.service.ts        # User profile service
│   ├── job.service.ts         # Job & Application service
│   ├── interview.service.ts   # Interview service
│   ├── notification.service.ts # Notification service
│   └── index.ts               # Central export
│
└── hooks/                      # Custom React hooks
    ├── useJobs.ts             # Job-related hooks
    ├── useUser.ts             # User-related hooks
    ├── useInterviews.ts       # Interview hooks
    ├── useNotifications.ts    # Notification hooks
    └── index.ts               # Central export
```

## 🔧 Configuration

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` จาก `.env.example`:

```bash
cp .env.example .env.local
```

แก้ไขค่าตามต้องการ:

```env
# ใช้ Mock Data (สำหรับ Development)
NEXT_PUBLIC_USE_MOCK=true

# ใช้ Real API (สำหรับ Production)
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

### 2. สลับระหว่าง Mock และ Real API

เพียงเปลี่ยนค่า `NEXT_PUBLIC_USE_MOCK`:
- `true` = ใช้ Mock Data
- `false` = ใช้ Real API

## 📝 วิธีการใช้งาน

### ใน React Components

```tsx
import { useJobs, useUserProfile, useMyInterviews } from '@/hooks';

function JobListPage() {
  // ดึงรายการงาน
  const { data, loading, error } = useJobs({
    status: 'open',
    page: 1,
    limit: 10
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.jobs.map(job => (
        <JobCard key={job.job_opening_id} job={job} />
      ))}
    </div>
  );
}
```

### เรียกใช้ Service โดยตรง

```tsx
import { jobService, userService } from '@/services';

async function handleApply(jobOpeningId: string) {
  try {
    const result = await jobService.createApplication({
      job_opening_id: jobOpeningId,
      answers: [
        { qa_id: 'qa-001', answer_text: 'คำตอบของฉัน' }
      ]
    });
    
    console.log('Applied successfully:', result);
  } catch (error) {
    console.error('Failed to apply:', error);
  }
}
```

## 🎯 Features

### 1. Type Safety
ทุก API calls มี type definitions ที่ชัดเจน จาก PRD database schema

```typescript
import type { 
  Job, 
  JobApplication, 
  CreateApplicationRequest 
} from '@/types';
```

### 2. Error Handling
API Client จัดการ errors อัตโนมัติ:
- Network errors
- Timeout errors
- API errors with error codes
- Authentication errors

```typescript
try {
  const data = await jobService.getJobs();
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.code, error.message);
  }
}
```

### 3. Authentication
Token management อัตโนมัติ:
- Auto-attach Bearer token
- Token refresh
- Logout cleanup

```typescript
import { authService } from '@/services';

// Login
const response = await authService.lineLogin({ code, redirect_uri });

// Logout
await authService.logout();
```

### 4. File Upload
รองรับการอัปโหลดไฟล์ด้วย validation:

```typescript
import { userService } from '@/services';

const file = event.target.files[0];

// Validate
const validation = userService.validateDocumentFile(file, 'resume');
if (!validation.valid) {
  alert(validation.error);
  return;
}

// Upload
const result = await userService.uploadDocument(file, 'resume');
```

## 📚 Available Services

### Auth Service
- `lineLogin()` - LINE Login
- `getLineLoginUrl()` - Get LINE OAuth URL
- `acceptPDPA()` - Accept PDPA consent
- `getCurrentUser()` - Get current user
- `logout()` - Logout
- `refreshToken()` - Refresh access token

### User Service
- `getProfile()` - Get user profile with documents
- `updateProfile()` - Update profile info
- `getDocuments()` - Get all user documents
- `uploadDocument()` - Upload document
- `deleteDocument()` - Delete document
- `validateDocumentFile()` - Validate file before upload

### Job Service
- `getJobs()` - Get job listings with filters
- `getJobDetail()` - Get job detail
- `getApplicationQuestions()` - Get random questions
- `createApplication()` - Submit application
- `getMyApplications()` - Get my applications
- `canApplyToJob()` - Check if can apply
- `withdrawApplication()` - Withdraw application

### Interview Service
- `getMyInterviews()` - Get all interviews
- `getInterviewDetail()` - Get interview detail
- `confirmInterview()` - Confirm/Cancel interview
- `getUpcomingInterviews()` - Get upcoming interviews
- `formatInterviewDateTime()` - Format date/time helper

### Notification Service
- `getNotifications()` - Get all notifications
- `getUnreadNotifications()` - Get unread only
- `markAsRead()` - Mark as read
- `markAllAsRead()` - Mark all as read
- `getUnreadCount()` - Get unread count

## 🔄 การเตรียมต่อ API จริง

### 1. API Endpoints ที่ Backend ต้องจัดเตรียม

```
Authentication:
POST   /api/auth/line/login
POST   /api/auth/pdpa/consent
GET    /api/auth/me
POST   /api/auth/logout
POST   /api/auth/refresh

User Profile:
GET    /api/users/profile
PATCH  /api/users/profile
GET    /api/users/documents
GET    /api/users/documents/type/:type
POST   /api/users/documents/upload
DELETE /api/users/documents/:id
GET    /api/users/documents/:id/download

Jobs:
GET    /api/jobs
GET    /api/jobs/:id
GET    /api/jobs/:id/questions
GET    /api/jobs/:id/can-apply
GET    /api/jobs/departments
POST   /api/jobs/applications
GET    /api/jobs/applications/me
GET    /api/jobs/applications/:id
PATCH  /api/jobs/applications/:id/withdraw

Interviews:
GET    /api/interviews/me
GET    /api/interviews/:id
GET    /api/interviews/upcoming
PATCH  /api/interviews/:id/confirm

Notifications:
GET    /api/notifications
GET    /api/notifications?unread=true
GET    /api/notifications/unread-count
PATCH  /api/notifications/mark-read
PATCH  /api/notifications/mark-all-read
DELETE /api/notifications/:id
```

### 2. API Response Format

Backend ต้อง return ตาม format นี้:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-10-08T00:00:00Z",
    "request_id": "uuid"
  }
}
```

Error response:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": { ... }
  }
}
```

### 3. ขั้นตอนการสลับไปใช้ Real API

1. ตั้งค่า Backend API URL:
```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

2. เปลี่ยนเป็นโหมด Production:
```env
NEXT_PUBLIC_USE_MOCK=false
```

3. ทดสอบ API endpoints ทีละตัว
4. ไม่ต้องแก้โค้ดใน UI Components เลย!

## 🧪 Testing

### ทดสอบด้วย Mock Data

```typescript
// อยู่ใน development mode แล้ว USE_MOCK=true
import { jobService } from '@/services';

const jobs = await jobService.getJobs();
console.log('Mock jobs:', jobs);
```

### ทดสอบกับ Real API

```typescript
// เปลี่ยน USE_MOCK=false ใน .env.local
// Restart dev server
npm run dev
```

## 🎨 Example: สร้างหน้าสมัครงาน

```tsx
'use client';

import { useState } from 'react';
import { useJobDetail, useApplicationQuestions, useApplyJob } from '@/hooks';
import { useRouter } from 'next/navigation';

export default function JobApplicationPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter();
  const { data: job, loading } = useJobDetail(params.id);
  const { data: questions } = useApplicationQuestions(job?.job.job_id || null);
  const { applyJob, loading: applying } = useApplyJob();
  
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await applyJob({
        job_opening_id: params.id,
        answers: Object.entries(answers).map(([qa_id, answer_text]) => ({
          qa_id,
          answer_text
        }))
      });
      
      alert('สมัครงานสำเร็จ!');
      router.push('/applications');
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + (error as Error).message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{job.job.jobname}</h1>
      
      {questions?.map((q) => (
        <div key={q.qa_id}>
          <label>{q.question_text}</label>
          <textarea
            value={answers[q.qa_id] || ''}
            onChange={(e) => setAnswers({
              ...answers,
              [q.qa_id]: e.target.value
            })}
            required
          />
        </div>
      ))}
      
      <button type="submit" disabled={applying}>
        {applying ? 'กำลังส่ง...' : 'สมัครงาน'}
      </button>
    </form>
  );
}
```

## 📖 Additional Notes

- ทุก service มี JSDoc comments อธิบายการใช้งาน
- Type definitions ทั้งหมดสอดคล้องกับ PRD database schema
- Mock data มีข้อมูลครบทุก use case
- Error handling ครบถ้วน รองรับทุกกรณี
- รองรับ TypeScript strict mode

## 🚀 Next Steps

1. ✅ Types & Models - **Done**
2. ✅ Services with Mock Data - **Done**
3. ✅ Custom Hooks - **Done**
4. 🔄 เชื่อมต่อกับ Backend API (Phase ถัดไป)
5. 🔄 Real-time notifications via WebSocket
6. 🔄 Offline support with cache
