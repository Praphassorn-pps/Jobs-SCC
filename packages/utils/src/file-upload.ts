import { FILE_CONSTRAINTS } from './constants'

export interface FileUploadResult {
  success: boolean
  url?: string
  error?: string
}

export function validateFile(file: File, type: 'RESUME' | 'ID_CARD'): string | null {
  const constraints = FILE_CONSTRAINTS[type]
  
  if (!(constraints.ALLOWED_TYPES as readonly string[]).includes(file.type)) {
    return `ไฟล์ต้องเป็นประเภท ${(constraints.ALLOWED_TYPES as readonly string[]).join(', ')}`
  }
  
  if (file.size > constraints.MAX_SIZE) {
    const maxSizeMB = constraints.MAX_SIZE / (1024 * 1024)
    return `ขนาดไฟล์ต้องไม่เกิน ${maxSizeMB}MB`
  }
  
  return null
}

export function generateFileName(originalName: string, userId: string, type: 'resume' | 'idcard'): string {
  const ext = originalName.split('.').pop()
  const timestamp = Date.now()
  return `${type}/${userId}/${timestamp}.${ext}`
}

export async function uploadToS3(
  file: File, 
  fileName: string, 
  bucketName: string, 
  region: string,
  accessKeyId: string,
  secretAccessKey: string
): Promise<FileUploadResult> {
  try {
    // This is a simplified example. In a real implementation,
    // you would use AWS SDK or a proper S3 client
    const formData = new FormData()
    formData.append('file', file)
    formData.append('key', fileName)
    
    // In practice, you'd implement proper S3 upload logic here
    // For now, return a mock success response
    return {
      success: true,
      url: `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    }
  }
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf'
}

export async function compressImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      // Restrict MIME type to the supported image types so TypeScript accepts it
      const allowedMime: 'image/jpeg' | 'image/png' =
        file.type === 'image/png' ? 'image/png' : 'image/jpeg'

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: blob.type || allowedMime,
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            resolve(file)
          }
        },
        allowedMime,
        quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}