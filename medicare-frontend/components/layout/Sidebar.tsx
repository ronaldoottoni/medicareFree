'use client'

import styled from 'styled-components'
import Link from 'next/link'

const SidebarContainer = styled.aside`
  width: 240px;
  background-color: #1e293b;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  font-weight: 500;

  &:hover {
    color: #60a5fa;
  }
`

export const Sidebar = () => {
    return (
        <SidebarContainer>
            <h2>MediCare</h2>
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/cuidadores">Cuidadores</NavLink>
            <NavLink href="/residentes">Residentes</NavLink>
            <NavLink href="/agendamentos">Agendamentos</NavLink>
        </SidebarContainer>
    )
}