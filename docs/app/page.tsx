"use client"

import { useState } from "react"
import { SearchInput } from "./SearchInput"

const icons = []

export default function Home() {
  const [query, setQuery] = useState("")
  const filteredIcons = icons.filter((icon) => icon.name.includes(query))

  return (
    <div>
      <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />

      <div className="grid grid-cols-12">
        {filteredIcons.map((icon) => (
          <div key={icon.name}>{icon.codepoint}</div>
        ))}
      </div>
    </div>
  )
}
