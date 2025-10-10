export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidThaiPhone(phone: string): boolean {
  // Thai phone number validation: 08x-xxx-xxxx or 09x-xxx-xxxx
  const thaiPhoneRegex = /^(08|09)\d{8}$/
  const cleanPhone = phone.replace(/[-\s]/g, '')
  return thaiPhoneRegex.test(cleanPhone)
}

export function isValidThaiIdCard(idCard: string): boolean {
  // Thai ID Card validation (13 digits with checksum)
  const cleanId = idCard.replace(/[-\s]/g, '')
  
  if (!/^\d{13}$/.test(cleanId)) {
    return false
  }
  
  // Calculate checksum
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanId.charAt(i)) * (13 - i)
  }
  
  const checksum = (11 - (sum % 11)) % 10
  return checksum === parseInt(cleanId.charAt(12))
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

export function validateFileSize(file: File, maxSizeBytes: number): boolean {
  return file.size <= maxSizeBytes
}

export interface ValidationError {
  field: string
  message: string
}

export function validateApplicationData(data: any): ValidationError[] {
  const errors: ValidationError[] = []
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'
    })
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'อีเมลไม่ถูกต้อง'
    })
  }
  
  if (!data.phone || !isValidThaiPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'เบอร์โทรศัพท์ไม่ถูกต้อง'
    })
  }
  
  return errors
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}