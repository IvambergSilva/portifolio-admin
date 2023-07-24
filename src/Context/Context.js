import React, { createContext, useEffect, useState } from 'react'

import { db } from '../Database/firebaseConnection'
import { collection, getDocs } from 'firebase/firestore'

const AmountProjectContext = createContext()

const AmountProjectProvider = ({ children }) => {
    const [amountProject, setAmountProject] = useState(2)

    async function getAmountProject() {
        let amountProject = 0

        const docs = collection(db, "projects")
        await getDocs(docs)
            .then((snapshot) => {
                snapshot.forEach(() => amountProject += 1)
            })
            .catch((error) => {
                console.log(`Error: ${error}`)
            })
        setAmountProject(amountProject)
    }

    useEffect(() => {
        getAmountProject()
    }, [amountProject])

    return (
        <AmountProjectContext.Provider value={{ amountProject, setAmountProject }}>
            {children}
        </AmountProjectContext.Provider>
    )
}

export { AmountProjectContext, AmountProjectProvider }