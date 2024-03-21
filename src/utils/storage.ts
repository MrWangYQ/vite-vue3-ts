/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const setItem = (key: string, value: object | string | null) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getItem = <T>(key: string): T | null => {
  const data = window.localStorage.getItem(key)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!data) return null

  try {
    return JSON.parse(data) as T
  } catch (error) {
    return null
  }
}

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
