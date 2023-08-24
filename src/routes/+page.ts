import { BASE_URL } from '$lib'

export const load = async ({fetch}) => {
    const word = 'car'
    const response = await fetch(BASE_URL + `/${word}`)

    const meaning = await response.json()

    return {
        meaning
    }
}