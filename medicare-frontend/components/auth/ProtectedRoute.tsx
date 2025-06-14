'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/login")
        } else {
            setLoading(false)
        }
    }, [router])

    if (loading) {
        return <div className="p-6 text-center text-gray-500"> Carregando...</div>
    }

    return <>{children}</>
}