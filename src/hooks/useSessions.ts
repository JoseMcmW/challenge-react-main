import { useState } from "react"

export const useSessions = () => {
    const [sessions, setSessions] = useState<any[]>([])

    return { sessions, setSessions }
}
