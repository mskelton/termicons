"use client"

import React from "react"
import { Icon } from "../types/icons"

export function IconButton({ icon }: IconProps) {
  const entity = `&#${icon.codepoint};`

  function handleCopy() {
    navigator.clipboard.writeText(String.fromCodePoint(icon.codepoint))
  }

  return (
    <button
      className="flex flex-col text-slate-600 text-center justify-center items-center gap-2 hover:bg-slate-100 rounded-lg w-24 h-24 active:bg-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
      onClick={handleCopy}
    >
      <span
        className="font-['devicons'] text-6xl"
        dangerouslySetInnerHTML={{ __html: entity }}
      />

      <span className="text-xs">{icon.name}</span>
    </button>
  )
}

export interface IconProps {
  icon: Icon
}
