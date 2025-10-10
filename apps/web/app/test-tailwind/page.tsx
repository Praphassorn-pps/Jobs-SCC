'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Tailwind Test Page
        </h1>
        <p className="text-gray-700 mb-4">
          ถ้าเห็นสีและ styles นี่แสดงว่า Tailwind ทำงาน!
        </p>
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
            ปุ่มสีเขียว
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg">
            ปุ่มสีม่วง
          </button>
        </div>
      </div>
    </div>
  );
}
