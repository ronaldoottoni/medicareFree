'use client'

import * as React from 'react'
import styled from 'styled-components'
import { useUniqueId } from '@/lib/useUniqueId'

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0rem;
`

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
`

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: red;
`

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => {
    const generatedId = useUniqueId()
    const inputId = id || props.name || generatedId
    return (
      <InputWrapper>
        {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}
        <StyledInput id={inputId} ref={ref} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    )
  }
)

Input.displayName = 'Input'
