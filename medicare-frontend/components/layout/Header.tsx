'use client'

import styled from "styled-components"
import { useRouter } from "next/navigation"

const HeaderWrapper = styled.header`
  height: 60px;
  background: #f1f5f9;
  padding: 0 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
`

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    background: #dc2626;
  }
`

export default function Header() {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <HeaderWrapper>
      <LogoutButton onClick={logout}>Sair</LogoutButton>
    </HeaderWrapper>
  )
}
