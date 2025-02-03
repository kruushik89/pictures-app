const BASE_URL = 'http://10.0.2.2:8000'

// const getFetchData = async (endpoint, options = {}) => {
//     try{
//         const response = await fetch(`${BASE_URL}${endpoint}`, {
//             headers: { 'Content-Type': 'application/json' },
//             ...options,
//         })
//
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//
//         return await response.json()
//     } catch (error) {
//         console.error(`Fetch error (${endpoint}):`, error.message);
//         throw error;
//     }
//
// }

export const getPlaces = async () => {
    const response = await fetch(`${BASE_URL}/places`)
    console.log('response', response)
    const data = await response.json()
    console.log('data', data)
    return data
}

export const getPlace = async (id) => {
    const response = await fetch(`${BASE_URL}/places/${id}`)
    const data = await response.json()
    return data
}

export const addPlace = async (place) => {
    try {
        const response = await fetch(`${BASE_URL}/places`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(place)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error', error)
    }
}