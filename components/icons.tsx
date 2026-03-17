import React from 'react'

export const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Central Sphere */}
      <circle cx="12" cy="12" r="7" />
      {/* First Intertwined Arrow */}
      <path d="M12 5c4.5 0 8 3.5 8 7s-3.5 7-8 7c-2 0-3.5-.5-5-1.5" />
      <path d="M7 17.5L5 19l1.5-2.5" />
      {/* Second Intertwined Arrow */}
      <path d="M12 19c-4.5 0-8-3.5-8-7s3.5-7 8-7c2 0 3.5.5 5 1.5" />
      <path d="M17 6.5L19 5l-1.5 2.5" />
    </svg>
  ),
}
