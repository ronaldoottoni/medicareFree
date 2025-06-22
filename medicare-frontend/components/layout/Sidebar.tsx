'use client'

import styled from 'styled-components'
import Link from 'next/link'

const SidebarWrapper = styled.aside`
  width: 220px;
  background: #0f172a;
  color: white;
  height: 100vh;
  padding: 2rem 1rem;
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

export default function Sidebar() {
  return (
    <SidebarWrapper>
      <h2 className="text-xl font-bold mb-6">MediCare</h2>

      <NavItem href="/dashboard">Dashboard</NavItem>
      <NavItem href="/cuidadores">Cuidadores</NavItem>
      <NavItem href="/residentes">Residentes</NavItem>
      <NavItem href="/medicamentos">Medicamentos</NavItem>
      <NavItem href="/agendamentos">Agendamentos</NavItem>
    </SidebarWrapper>
  )
}
