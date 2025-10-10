'use client'

export function LineLoginButton() {
  const handleLogin = () => {
    // Mock LINE Login - จะเปลี่ยนเป็น real implementation ทีหลัง
    alert('LINE Login clicked! (Mock implementation)')
    // TODO: Implement real LINE Login later
  }

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 text-lg bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.477 2 2 5.477 2 9.75c0 2.468 1.517 4.77 4.046 6.146L6 22l4.751-2.469c.416.055.834.083 1.249.083 5.523 0 10-3.477 10-7.75S17.523 2 12 2z"
          fill="currentColor"
        />
      </svg>
      เข้าสู่ระบบด้วย LINE
    </button>
  )
}