import React from 'react'

const NavBar = ({ user }) => {
    return (
        <header className="mb-8 fixed top-0  w-full bg-white border-b border-gray-200 z-50 p-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">{user?.email}</p>
        </header>
    )
}

export default NavBar
