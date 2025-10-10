# Quick Start: Using API Models & Services

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Copy environment template
cp apps/web/.env.example apps/web/.env.local

# Edit and set USE_MOCK=true for development
```

### 2. Import and Use

```tsx
import { useJobs, useUserProfile } from '@/hooks';

function MyComponent() {
  const { data, loading, error } = useJobs();
  
  return <div>{/* Your UI */}</div>;
}
```

## 📚 Common Usage Examples

### Get Job Listings

```tsx
import { useJobs } from '@/hooks';

function JobsPage() {
  const { data, loading, error } = useJobs({
    status: 'open',
    page: 1,
    limit: 10,
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.jobs.map(job => (
        <JobCard key={job.job_opening_id} job={job} />
      ))}
    </div>
  );
}
```

### Apply for a Job

```tsx
import { useApplyJob } from '@/hooks';

function ApplyButton({ jobOpeningId }: { jobOpeningId: string }) {
  const { applyJob, loading } = useApplyJob();

  const handleApply = async () => {
    try {
      await applyJob({
        job_opening_id: jobOpeningId,
        answers: [
          { qa_id: 'qa-001', answer_text: 'My answer' }
        ]
      });
      alert('Applied successfully!');
    } catch (error) {
      alert('Failed: ' + (error as Error).message);
    }
  };

  return (
    <button onClick={handleApply} disabled={loading}>
      {loading ? 'Applying...' : 'Apply Now'}
    </button>
  );
}
```

### Upload Document

```tsx
import { useUserDocuments } from '@/hooks';
import { userService } from '@/services';

function DocumentUpload() {
  const { uploadDocument } = useUserDocuments();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const validation = userService.validateDocumentFile(file, 'resume');
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // Upload
    try {
      await uploadDocument(file, 'resume');
      alert('Uploaded successfully!');
    } catch (error) {
      alert('Upload failed: ' + (error as Error).message);
    }
  };

  return <input type="file" onChange={handleUpload} />;
}
```

### Get User Profile

```tsx
import { useUserProfile } from '@/hooks';

function ProfilePage() {
  const { profile, loading, refetch } = useUserProfile();

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>{profile?.first_name} {profile?.last_name}</h1>
      <p>{profile?.email}</p>
      
      <h2>Documents</h2>
      {profile?.documents.map(doc => (
        <div key={doc.document_id}>
          {doc.file_name} ({doc.document_type})
        </div>
      ))}
    </div>
  );
}
```

### Manage Interviews

```tsx
import { useMyInterviews, useConfirmInterview } from '@/hooks';

function InterviewsPage() {
  const { data, loading, refetch } = useMyInterviews();
  const { confirmInterview } = useConfirmInterview();

  const handleConfirm = async (interviewId: string) => {
    try {
      await confirmInterview({
        interview_id: interviewId,
        status: 'confirmed'
      });
      refetch();
      alert('Confirmed!');
    } catch (error) {
      alert('Failed: ' + (error as Error).message);
    }
  };

  return (
    <div>
      <h2>Upcoming Interviews</h2>
      {data?.upcoming.map(interview => (
        <div key={interview.interview_id}>
          <p>{interview.job_application.job_opening.job.jobname}</p>
          <p>{new Date(interview.scheduled_date).toLocaleDateString()}</p>
          {interview.status === 'pending' && (
            <button onClick={() => handleConfirm(interview.interview_id)}>
              Confirm
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Notifications

```tsx
import { useNotifications } from '@/hooks';

function NotificationBell() {
  const { data, markAsRead } = useNotifications();

  const handleClick = async (notificationId: string) => {
    await markAsRead([notificationId]);
  };

  return (
    <div>
      <span>🔔 {data?.unread_count}</span>
      {data?.notifications.map(notif => (
        <div 
          key={notif.notification_id}
          onClick={() => handleClick(notif.notification_id)}
        >
          {notif.title}
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Direct Service Calls

Sometimes you need to call services directly (e.g., in event handlers):

```tsx
import { jobService, userService, authService } from '@/services';

// Get jobs
const jobs = await jobService.getJobs({ status: 'open' });

// Update profile
const updated = await userService.updateProfile({
  first_name: 'John',
  last_name: 'Doe'
});

// Logout
await authService.logout();
```

## 📦 Available Hooks

### Job Hooks
- `useJobs(params)` - Get job listings
- `useJobDetail(id)` - Get job detail
- `useApplyJob()` - Apply for a job
- `useMyApplications()` - Get my applications
- `useApplicationQuestions(jobId)` - Get random questions
- `useCanApplyToJob(id)` - Check if can apply

### User Hooks
- `useUserProfile()` - Get user profile
- `useUpdateProfile()` - Update profile
- `useUserDocuments()` - Manage documents
- `useCurrentUser()` - Get current user
- `useAuth()` - Auth actions (logout, etc.)

### Interview Hooks
- `useMyInterviews()` - Get all interviews
- `useInterviewDetail(id)` - Get interview detail
- `useConfirmInterview()` - Confirm/cancel interview
- `useUpcomingInterviews()` - Get upcoming only

### Notification Hooks
- `useNotifications()` - Get notifications
- `useUnreadCount()` - Get unread count

## 🔄 Switching to Real API

1. Update `.env.local`:
```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

2. Restart dev server:
```bash
npm run dev
```

That's it! No code changes needed.

## 📖 Full Documentation

See [API-MODELS-GUIDE.md](./API-MODELS-GUIDE.md) for complete documentation.
