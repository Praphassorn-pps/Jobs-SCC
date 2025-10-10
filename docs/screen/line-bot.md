# 📱 LINE Bot User Experience
## Jobs-SCC LINE Official Account Design

---

## 🎯 **LINE Bot Architecture**

### **Rich Menu Design**
```
┌─────────────────────────────────┐
│  🧩 Jobs SCC - ระบบสมัครงาน     │
│     ยินดีต้อนรับสู่ LINE OA      │
└─────────────────────────────────┘

Rich Menu Layout (2x2):
┌─────────────────┬───────────────────┐
│  🔍 ดูงาน       │  📝 สถานะการสมัคร │
│  Browse Jobs    │  Application Status│
├─────────────────┼───────────────────┤
│  👤 โปรไฟล์      │  ❓ ช่วยเหลือ      │
│  My Profile     │  Help & FAQ       │
└─────────────────┴───────────────────┘
```

### **Chatbot Commands**
- `/jobs` - แสดงงานทั้งหมด
- `/status` - ตรวจสอบสถานะการสมัคร
- `/profile` - ดูข้อมูลโปรไฟล์
- `/help` - ช่วยเหลือและคำถามที่พบบ่อย

---

## 💬 **Conversation Flows**

### **1. Welcome Message (First Time)**
```
👋 สวัสดีครับ/ค่ะ!

ยินดีต้อนรับสู่ Jobs SCC 
ระบบสมัครงานผ่าน LINE OA 🧩

🔹 สมัครงานง่าย ๆ ผ่าน LINE
🔹 รับแจ้งเตือนงานใหม่
🔹 ติดตามสถานะแบบเรียลไทม์

👆 กดเมนูด้านล่างเพื่อเริ่มต้น
หรือพิมพ์ "help" เพื่อดูคำสั่ง

[🟢 ลงทะเบียนเลย]
```

### **2. Job Inquiry Flow**
```
User: "ดูงาน" หรือ กด Rich Menu

Bot: 
🔍 งานที่เปิดรับสมัคร

พบ 12 ตำแหน่ง:
📌 Frontend Developer (5 ตำแหน่ง)
📌 UX Designer (3 ตำแหน่ง) 
📌 Backend Developer (2 ตำแหน่ง)
📌 DevOps Engineer (2 ตำแหน่ง)

[🔍 ดูทั้งหมด] [🎯 งานแนะนำ]
```

### **3. Application Status Check**
```
User: "สถานะ" หรือ กด Rich Menu

Bot:
📊 สถานะการสมัครงาน

👤 คุณสมชาย ใจดี

🔸 Frontend Developer
   สถานะ: ✅ ผ่านเข้ารอบสัมภาษณ์
   สัมภาษณ์: 25/10/67 เวลา 14:00
   
🔸 UX Designer  
   สถานะ: 🔄 กำลังพิจารณา
   ส่งใบสมัคร: 20/10/67

[📞 ติดต่อ HR] [📅 ดูปฏิทิน]
```

---

## 🎨 **Flex Message Templates**

### **Job Announcement Flex Message**
```json
{
  "type": "flex",
  "altText": "งานใหม่: Frontend Developer - บริษัท ABC",
  "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://example.com/job-banner.jpg",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "🚨 งานใหม่!",
          "weight": "bold",
          "size": "xl",
          "color": "#06C755"
        },
        {
          "type": "text",
          "text": "Frontend Developer",
          "weight": "bold",
          "size": "lg",
          "margin": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text", 
                  "text": "🏢",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": "บริษัท ABC จำกัด",
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline", 
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "💰",
                  "size": "sm", 
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": "35,000 - 50,000 บาท",
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm", 
              "contents": [
                {
                  "type": "text",
                  "text": "📍",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text", 
                  "text": "กรุงเทพมหานคร",
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "primary",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "🔍 ดูรายละเอียด",
            "uri": "https://jobs.scc.com/jobs/frontend-dev-001"
          },
          "color": "#06C755"
        },
        {
          "type": "button", 
          "style": "secondary",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "📝 สมัครเลย",
            "uri": "https://jobs.scc.com/apply/frontend-dev-001"
          }
        }
      ]
    }
  }
}
```

### **Interview Notification**
```json
{
  "type": "flex",
  "altText": "นัดสัมภาษณ์: Frontend Developer - 25/10/67",
  "contents": {
    "type": "bubble", 
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "🎯 การนัดสัมภาษณ์",
          "weight": "bold",
          "color": "#ffffff",
          "size": "lg"
        }
      ],
      "backgroundColor": "#06C755",
      "paddingAll": "20px"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text", 
          "text": "ยินดีด้วยครับ/ค่ะ! 🎉",
          "weight": "bold",
          "size": "lg",
          "margin": "md"
        },
        {
          "type": "text",
          "text": "คุณผ่านเข้ารอบสัมภาษณ์สำหรับตำแหน่ง Frontend Developer",
          "wrap": true,
          "color": "#666666",
          "margin": "md"
        },
        {
          "type": "separator",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg", 
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "📅 วันที่:",
                  "size": "sm",
                  "color": "#aaaaaa",
                  "flex": 2
                },
                {
                  "type": "text", 
                  "text": "25 ตุลาคม 2567",
                  "wrap": true,
                  "size": "sm",
                  "flex": 3,
                  "weight": "bold"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "🕐 เวลา:",
                  "size": "sm", 
                  "color": "#aaaaaa",
                  "flex": 2
                },
                {
                  "type": "text",
                  "text": "14:00 - 15:00 น.",
                  "wrap": true,
                  "size": "sm",
                  "flex": 3,
                  "weight": "bold"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "📍 สถานที่:",
                  "size": "sm",
                  "color": "#aaaaaa", 
                  "flex": 2
                },
                {
                  "type": "text",
                  "text": "ห้องประชุม A ชั้น 5",
                  "wrap": true,
                  "size": "sm", 
                  "flex": 3,
                  "weight": "bold"
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "primary",
          "action": {
            "type": "postback",
            "label": "✅ ยืนยันเข้าร่วม", 
            "data": "confirm_interview=yes&interview_id=12345"
          },
          "color": "#06C755"
        },
        {
          "type": "button",
          "style": "secondary", 
          "action": {
            "type": "postback",
            "label": "📅 ขอเปลี่ยนเวลา",
            "data": "reschedule_interview=yes&interview_id=12345"
          }
        },
        {
          "type": "text",
          "text": "💡 กรุณายืนยันภายใน 24 ชั่วโมง",
          "size": "xs",
          "color": "#aaaaaa",
          "margin": "md"
        }
      ]
    }
  }
}
```

---

## 🔔 **Notification Strategy**

### **Notification Types & Timing**

#### **Job Notifications**
- **New Job Posted**: ทันทีหลังจาก HR โพสต์งาน
- **Job Closing Soon**: 2 วันก่อนปิดรับสมัคร  
- **Job Match**: เมื่อมีงานที่ตรงกับโปรไฟล์

#### **Application Notifications**
- **Application Received**: ทันทีหลังจากส่งใบสมัคร
- **Status Update**: เมื่อ HR เปลี่ยนสถานะ
- **Document Required**: เมื่อต้องการเอกสารเพิ่มเติม

#### **Interview Notifications**  
- **Interview Invitation**: ทันทีหลังจาก HR นัดสัมภาษณ์
- **Interview Reminder**: 1 วันและ 2 ชั่วโมงก่อนสัมภาษณ์
- **Interview Result**: หลังจาก HR บันทึกผล

### **Message Personalization**
```
สวัสดี คุณ{firstName}! 👋

{jobTitle} ที่คุณสมัคร
สถานะ: {status}

{customMessage}

ขอบคุณที่ใช้บริการ Jobs SCC 🧩
```

---

## 🎭 **User Journey Scenarios**

### **Scenario 1: First-time User**
1. **Add Friend** → Welcome message + Rich menu intro
2. **Browse Jobs** → Click "ดูงาน" → Job list  
3. **View Details** → Click job → Full details + Apply button
4. **Register** → Click apply → LINE Login → PDPA consent
5. **Apply** → Fill form → Upload docs → Submit
6. **Confirmation** → Success message + tracking info

### **Scenario 2: Returning User**
1. **Job Alert** → Receive notification → Click to view
2. **Quick Apply** → Use saved profile → One-click apply
3. **Status Check** → Type "สถานะ" → View all applications
4. **Interview** → Receive invitation → Confirm attendance

### **Scenario 3: Interview Process**
1. **Selected** → Notification with details → Confirm/reschedule
2. **Reminder** → 24h and 2h before interview  
3. **Follow-up** → Post-interview thank you message
4. **Result** → Accepted/rejected notification

---

## 🤖 **Chatbot Intelligence**

### **Natural Language Processing**
```
User Input → Intent Recognition → Response Generation

Intents:
- job_search: "หางาน", "ดูงาน", "งานว่าง"
- status_check: "สถานะ", "ตรวจสอบ", "ใบสมัคร"
- help_request: "ช่วย", "help", "ไม่เข้าใจ"
- profile_update: "แก้ไขข้อมูล", "เปลี่ยน", "อัปเดต"
```

### **Quick Replies**
```json
{
  "type": "text",
  "text": "ต้องการความช่วยเหลืออะไรครับ?",
  "quickReply": {
    "items": [
      {
        "type": "action", 
        "action": {
          "type": "message",
          "label": "🔍 ดูงาน",
          "text": "ดูงาน"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message", 
          "label": "📝 สถานะ",
          "text": "สถานะ"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "👤 โปรไฟล์", 
          "text": "โปรไฟล์"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "❓ ช่วยเหลือ",
          "text": "ช่วยเหลือ"
        }
      }
    ]
  }
}
```

---

**LINE Bot Features**: Rich Menu + Flex Messages + Chatbot  
**Webhook URL**: `https://jobs.scc.com/api/line/webhook`  
**Last Updated**: October 8, 2025