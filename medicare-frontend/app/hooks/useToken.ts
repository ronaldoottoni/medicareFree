'use client'

import { useEffect, useState } from "react"

export function useToken() {
  const [token, setToken] = useState<string>("")
  const [carregando, setCarregando] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("token")
      if (saved) setToken(saved)
      setCarregando(false)
    }
  }, [])

  return { token, carregando }
}
