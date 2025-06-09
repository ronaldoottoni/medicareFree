'use client'

import { useId } from 'react'

export function useUniqueId(prefix='input'){
    const reactId = useId()
    return`${prefix}-${reactId}`
}