import React from "react"

export function Icon({ children }: IconProps) {
  return <span className="font-['devicons']">{children}</span>
}

export interface IconProps {
  children: React.ReactNode
}
