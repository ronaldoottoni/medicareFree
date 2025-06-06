'use client'

import styled from 'styled-components'

const HeaderContainer = styled.header`
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  font-weight: bold;
`

export const Header = () => {
    return <HeaderContainer>MediCar Free</HeaderContainer>
}