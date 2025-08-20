const NotFound = () => {
  return (
    <div className="container mx-auto max-w-[400px] min-h-screen flex flex-col justify-center items-center text-center px-4">
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">Sahifa topilmadi</p>

      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition"
      >
        Bosh sahifaga qaytish
      </a>
    </div>
  );
};

export default NotFound;
