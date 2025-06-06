'use client'

import styled from 'styled-components'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

const LayoutWrapper = styled.div`
    display: flex;
    height: 100vh;
`

const Main = styled.main`
    flex: 1;
    padding: 1.5rem;
    background: #f4f4f4;
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Layout = ({children} :{children: React.ReactNode}) => {
    return(
        <LayoutWrapper>
            <Sidebar />
            <Content>
                <Header />
                <Main>{children}</Main>
            </Content>
        </LayoutWrapper>
    )
}