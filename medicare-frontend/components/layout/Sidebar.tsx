'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { useState } from 'react'

const SidebarWrapper = styled.aside<{ open: boolean }>`
  width: 220px;
  background: #0f172a;
  color: white;
  height: 100vh;
  padding: 1rem 1rem;
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? '0' : '-220px')};
  transition: left 0.3s ease;
  z-index: 1000;

  @media (min-width: 768px) {
    left: 0;
    position: static;
    height: auto;
  }
`

const NavItem = styled(Link)`
  display: block;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    color: #38bdf8;
  }
`

const ToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: #0f172a;
  color: white;
  border: none;
  font-size: 1.5rem;
  z-index: 1100;

  @media (min-width: 768px) {
    display: none;
  }
`

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ToggleButton onClick={() => setOpen(!open)}>
        ☰
      </ToggleButton>

      <SidebarWrapper open={open}>
        <h2 className="text-xl font-bold mb-6">MediCare</h2>

        <NavItem href="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavItem>
        <NavItem href="/cuidadores" onClick={() => setOpen(false)}>Cuidadores</NavItem>
        <NavItem href="/residentes" onClick={() => setOpen(false)}>Residentes</NavItem>
        <NavItem href="/medicamentos" onClick={() => setOpen(false)}>Medicamentos</NavItem>
        <NavItem href="/agendamentos" onClick={() => setOpen(false)}>Agendamentos</NavItem>
      </SidebarWrapper>
    </>
  )
}
