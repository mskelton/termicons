"use client"

import { useState } from "react"
import { SearchInput } from "./SearchInput"
import manifest from "../../dist/manifest.json"
import { IconButton } from "../components/IconButton"

export default function Home() {
  const [query, setQuery] = useState("")
  const filteredIcons = manifest.icons.filter((icon) =>
    icon.name.includes(query)
  )

  return (
    <div>
      <SearchInput
        totalResults={filteredIcons.length}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  gap-8 mt-12">
        {filteredIcons.map((icon) => (
          <IconButton key={icon.name} icon={icon} />
        ))}
      </div>
    </div>
  )
}
