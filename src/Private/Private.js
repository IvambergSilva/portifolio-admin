import { useState, useEffect} from "react"
import { auth } from '../Database/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

export default function Private({ children }) {
    const [signed, setSigned] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setSigned(true);
                    navigate('/home', { replace: true })
                }
                else {
                    setSigned(false)
                }

                setIsLoading(false)
            })
        }
        checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isLoading) return ( <div></div> )

    if(!signed) { return navigate("/") }

    return children
}