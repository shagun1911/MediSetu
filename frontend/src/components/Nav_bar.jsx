import React from 'react'

const Nav_bar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-extrabold text-teal-400 tracking-tight">🩺</span>
          <span className="text-2xl font-bold text-teal-400">MediSetu</span>
        </div>
        <div className="flex gap-8">
          <a href="/" className="text-gray-300 font-semibold hover:text-teal-400 transition-colors duration-300 text-lg">
            Home
          </a>
          <a href="/home" className="text-gray-300 font-semibold hover:text-teal-400 transition-colors duration-300 text-lg">
            DashBoard
          </a>
          <a href="/about" className="text-gray-300 font-semibold hover:text-teal-400 transition-colors duration-300 text-lg">
            About
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-gray-300 font-semibold hover:text-teal-400 transition-colors duration-300 text-lg">
            Login
          </a>
          <a href="/register" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300">
            Register
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav_bar