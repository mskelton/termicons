import React from "react"

export function SearchInput(props: SearchInputProps) {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search icons
      </label>

      <input
        type="text"
        name="search"
        id="search"
        className="block h-12 text-lg w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        autoFocus
        placeholder="Search icons..."
        {...props}
      />
    </div>
  )
}

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
