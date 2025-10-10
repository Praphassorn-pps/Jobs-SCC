export function formatThaiDate(date: Date): string {
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ]
  
  const day = date.getDate()
  const month = thaiMonths[date.getMonth()]
  const year = date.getFullYear() + 543 // Buddhist calendar
  
  return `${day} ${month} ${year}`
}

export function formatThaiDateTime(date: Date): string {
  const dateStr = formatThaiDate(date)
  const timeStr = date.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit'
  })
  
  return `${dateStr} เวลา ${timeStr} น.`
}

export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'เมื่อสักครู่'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} นาทีที่แล้ว`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} ชั่วโมงที่แล้ว`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} วันที่แล้ว`
  }
  
  return formatThaiDate(date)
}

export function isWorkingHours(date: Date = new Date()): boolean {
  const hour = date.getHours()
  const day = date.getDay() // 0 = Sunday, 6 = Saturday
  
  // Working hours: Monday-Friday 8:00-17:00
  return day >= 1 && day <= 5 && hour >= 8 && hour < 17
}

export function getNextWorkingDay(date: Date = new Date()): Date {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  nextDay.setHours(9, 0, 0, 0) // Set to 9:00 AM
  
  // Skip weekends
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
    nextDay.setDate(nextDay.getDate() + 1)
  }
  
  return nextDay
}