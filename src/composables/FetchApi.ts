import { ref, computed } from 'vue'
import axios, { AxiosResponse, AxiosError } from 'axios'

interface Frase {
  frase: string
}

export const useFetchApi = () => {
  // Request States
  const REQUEST_IN_PROGRESS = 'REQUEST_IN_PROGRESS'
  const REQUEST_ERROR = 'REQUEST_ERROR'
  const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
  const requestState = ref<string>('')
  const loading = computed(() => requestState.value === REQUEST_IN_PROGRESS)
  const error = computed(() => requestState.value === REQUEST_ERROR)

  // Countries
  const phrases = ref<Frase>({ frase: 'Foi de loading...' })

  const fetchApi = (): void => {
    axios
      .get('https://foi-de-base-api.vercel.app/')
      .then((res: AxiosResponse) => {
        phrases.value = res.data
        requestState.value = REQUEST_SUCCESS
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 400) {
          requestState.value = REQUEST_ERROR
        }
      })
  }
  return { phrases, loading, error, fetchApi }
}
