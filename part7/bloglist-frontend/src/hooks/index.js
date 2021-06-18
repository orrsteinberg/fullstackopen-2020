import { useState, useCallback } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = useCallback((event) => setValue(event.target.value), [])

  const clear = useCallback(() => setValue(''), [])

  return [
    {
      type,
      value,
      onChange,
    },
    clear,
  ]
}
