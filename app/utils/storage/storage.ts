const isWindow = typeof window !== "undefined"

export const load = <T>(key: string): T | null => {
  try {
    if (isWindow) {
      return JSON.parse(localStorage.getItem(key) ?? "")
    }
    return null
  } catch {
    return null
  }
}

export const save = (key: string, value: unknown): boolean => {
  try {
    isWindow && localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
