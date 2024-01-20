import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector(state => state.auth)
    const navigete = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) navigete("/login")
    }, [isAuthenticated, navigete])

    return isAuthenticated ? children : null
}

export default ProtectedRoute