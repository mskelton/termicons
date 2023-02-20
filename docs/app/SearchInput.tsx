import React from "react"

export function SearchInput({ totalResults, ...props }: SearchInputProps) {
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

      <p className="mt-4 text-slate-500">
        Showing {totalResults} {totalResults === 1 ? "result" : "results"}
      </p>
    </div>
  )
}

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  totalResults: number
}
