'use client'

import styled from 'styled-components'
import Link from 'next/link'

const SidebarContainer = styled.aside`
  width: 220px;
  background: #1e293b;
  color: white;
  height: 100vh;
  padding: 2rem 1rem;
`

const NavLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 1rem;
  font-weight: 500;

  &:hover {
    color: #38bdf8;
  }
`

export default function Sidebar() {
  return (
    <SidebarContainer>
      <h2 className="text-xl font-bold mb-6">MediCare</h2>
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/cuidadores">Cuidadores</NavLink>
      <NavLink href="/residentes">Residentes</NavLink>
      <NavLink href="/agendamentos">Agendamentos</NavLink>
    </SidebarContainer>
  )
}