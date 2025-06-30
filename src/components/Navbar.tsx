
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Real Estate Dashboard
        </Link>
        <ul className="flex space-x-4">
          <li className="relative">
            <button
              onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              Properties
            </button>
            {isPropertiesOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10">
                <li>
                  <Link href="/properties" className="block px-4 py-2 text-gray-200 hover:bg-gray-600">
                    View All
                  </Link>
                </li>
                <li>
                  <Link href="/properties/add" className="block px-4 py-2 text-gray-200 hover:bg-gray-600">
                    Add New
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/users" className="text-gray-300 hover:text-white">
              Users
            </Link>
          </li>
          <li>
            <Link href="/favourites" className="text-gray-300 hover:text-white">
              Favourites
            </Link>
          </li>
          <li>
            <Link href="/contacts" className="text-gray-300 hover:text-white">
              All User Contact List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
