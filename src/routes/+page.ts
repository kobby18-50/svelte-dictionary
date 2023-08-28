import { BASE_URL } from '$lib'

export const load = async ({fetch}) => {
    const word = 'car'
    let isLoading = true
    const response = await fetch(BASE_URL + `/${word}`)

    const meaning = await response.json()

    isLoading = false

    return {
        meaning,
        isLoading
    }
}