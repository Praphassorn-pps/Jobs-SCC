export function generateOTP(length: number = 6): string {
  const digits = '0123456789'
  let otp = ''
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)]
  }
  
  return otp
}

export function isOTPExpired(createdAt: Date, expirationMinutes: number = 5): boolean {
  const now = new Date()
  const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60)
  return diffInMinutes > expirationMinutes
}

export interface OTPData {
  code: string
  expiresAt: Date
  attempts: number
  maxAttempts: number
}

export function createOTPData(code?: string, expirationMinutes: number = 5): OTPData {
  return {
    code: code || generateOTP(),
    expiresAt: new Date(Date.now() + expirationMinutes * 60 * 1000),
    attempts: 0,
    maxAttempts: 3
  }
}

export function isOTPValid(otpData: OTPData, inputCode: string): boolean {
  const now = new Date()
  
  // Check if expired
  if (now > otpData.expiresAt) {
    return false
  }
  
  // Check if max attempts exceeded
  if (otpData.attempts >= otpData.maxAttempts) {
    return false
  }
  
  // Check if codes match
  return otpData.code === inputCode
}