export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🚀 CounselFlow
        </h1>
        <p className="text-gray-600 mb-4">
          Professional Legal Support
        </p>
        <div className="space-y-2">
          <p className="text-sm text-green-600">✅ Backend Running</p>
          <p className="text-sm text-green-600">✅ Frontend Connected</p>
          <p className="text-sm text-blue-600">🎯 Ready for Dashboard</p>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Launch Dashboard
        </button>
      </div>
    </div>
  )
}
