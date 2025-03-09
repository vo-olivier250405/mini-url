
const { VITE_API_ROUTE } = import.meta.env


export const get = async (path: string) => {
    const response = await fetch(`${VITE_API_ROUTE}/${path}/`)
    const data = await response.json()
    if ("error" in data) throw new Error(data.error)
    return data
}

export const post = async (path: string, body: Record<string, any> = {}) => {
    const response = await fetch(`${VITE_API_ROUTE}/${path}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()
    if ("error" in data) throw new Error(data.error) 
    return data
}