import { ref } from 'vue'

const backendKey = ref(null) // global reactive variable

export function useBackendKey() {
  // fetch the value only once if not already fetched
  async function fetchBackendKey() {
    if (backendKey.value) return backendKey.value
    try {
      const response = await fetch('https://techx.connectwithsanthoshmk.workers.dev/?key=backend')
      if (!response.ok) throw new Error('Failed to fetch backend key')
      backendKey.value = await response.text()
    } catch (err) {
      console.error('Error fetching backend key:', err)
    }
    return backendKey.value
  }

  return {
    backendKey,
    fetchBackendKey
  }
}
