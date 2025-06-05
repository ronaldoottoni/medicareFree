'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
