import * as crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'

export function encrypt(text: string, secretKey: string): string {
  const iv = crypto.randomBytes(16)
  const key = crypto.createHash('sha256').update(secretKey).digest()
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  cipher.setAAD(Buffer.from('jobs-scc-encryption', 'utf8'))
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}
export function decrypt(encryptedData: string, secretKey: string): string {
  const parts = encryptedData.split(':')
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format')
  }
  
  const iv = Buffer.from(parts[0], 'hex')
  const authTag = Buffer.from(parts[1], 'hex')
  const encrypted = parts[2]
  
  const key = crypto.createHash('sha256').update(secretKey).digest()
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAAD(Buffer.from('jobs-scc-encryption', 'utf8'))
  decipher.setAuthTag(authTag)
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return salt + ':' + hash
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const parts = hashedPassword.split(':')
  if (parts.length !== 2) return false
  
  const salt = parts[0]
  const hash = parts[1]
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  
  return hash === verifyHash
}