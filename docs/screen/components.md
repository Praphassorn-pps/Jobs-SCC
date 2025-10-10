# 🎨 UI Components Specification
## Jobs-SCC Design System

---

## 🎯 **Component Library**

### **Buttons**

#### Primary Button (LINE Style)
```css
.btn-primary {
  background: #06C755;
  color: white;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #1DB146;
  transform: translateY(-1px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #06C755;
  border: 2px solid #06C755;
  border-radius: 8px;
  padding: 10px 22px;
}
```

#### Danger Button  
```css
.btn-danger {
  background: #EF4444;
  color: white;
  border-radius: 8px;
}
```

### **Forms**

#### Input Field
```css
.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px;
  background: white;
}

.input-field:focus {
  border-color: #06C755;
  outline: none;
  box-shadow: 0 0 0 3px rgba(6, 199, 85, 0.1);
}
```

#### File Upload Area
```css
.file-upload {
  border: 2px dashed #D1D5DB;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  background: #F9FAFB;
  transition: all 0.3s;
}

.file-upload:hover {
  border-color: #06C755;
  background: #F0FDF4;
}
```

### **Cards**

#### Job Card
```css
.job-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

#### Application Card
```css
.application-card {
  background: white;
  border-left: 4px solid #06C755;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 0 8px 8px 0;
}
```

### **Status Indicators**

#### Status Badges
```css
.status-submitted { background: #EAB308; color: white; }
.status-review { background: #3B82F6; color: white; }
.status-interview { background: #8B5CF6; color: white; }
.status-accepted { background: #10B981; color: white; }
.status-rejected { background: #EF4444; color: white; }

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
```

### **Navigation**

#### Header Navigation
```css
.header-nav {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-link {
  color: #374151;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #F3F4F6;
  color: #06C755;
}
```

---

## 📱 **Responsive Breakpoints**

```css
/* Mobile First */
.container {
  width: 100%;
  padding: 0 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

---

## 🎭 **Animation Guidelines**

### **Loading Animations**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-skeleton {
  background: #F3F4F6;
  animation: pulse 2s infinite;
  border-radius: 4px;
}
```

### **Page Transitions**
```css
.page-enter {
  opacity: 0;
  transform: translateX(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease;
}
```

---

## 📊 **Component States**

### **Interactive States**
- **Default**: Normal appearance
- **Hover**: Slightly elevated, color change
- **Active**: Pressed state, deeper color
- **Focus**: Outline ring for accessibility
- **Disabled**: Grayed out, no interaction
- **Loading**: Spinner or skeleton

### **Form Validation States**
- **Valid**: Green border, checkmark icon
- **Invalid**: Red border, error message
- **Required**: Asterisk (*) indicator
- **Optional**: "(ไม่จำเป็น)" text

---

## 🌐 **Internationalization (i18n)**

### **Thai Language Support**
```css
.font-thai {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  line-height: 1.6;
}

/* Thai text spacing */
.text-thai {
  letter-spacing: 0.02em;
  word-spacing: 0.05em;
}
```

### **Date & Time Formats**
- **Thai Buddhist Era**: พ.ศ. 2567 (2024 CE + 543)
- **Date Format**: 15 ตุลาคม 2567
- **Time Format**: 14:30 น.

---

## ♿ **Accessibility (A11Y)**

### **Color Contrast**
- **AA Level**: 4.5:1 minimum ratio
- **AAA Level**: 7:1 for important text
- **Non-text**: 3:1 for UI elements

### **Focus Management**
```css
.focus-visible {
  outline: 2px solid #06C755;
  outline-offset: 2px;
}

/* Hide outline for mouse users */
.no-focus-visible {
  outline: none;
}
```

### **Screen Reader Support**
```html
<!-- Semantic HTML -->
<main role="main">
<nav role="navigation">
<button aria-label="ปิดหน้าต่าง">×</button>
<input aria-describedby="email-help" />
<div id="email-help">รูปแบบ: user@example.com</div>
```

---

## 📐 **Layout Grid System**

### **12-Column Grid**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-6 { grid-column: span 6; }
.col-12 { grid-column: span 12; }
```

### **Flexbox Utilities**
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: 16px; }
```

---

**Component Library**: Storybook (Coming Soon)  
**Design Tokens**: CSS Variables + Tailwind Config  
**Last Updated**: October 8, 2025