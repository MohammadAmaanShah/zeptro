import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ childern }) => {

    let { user } = useUser();
    return (
        <div>
            {
                user ? childern : <Navigate to='/' />
            }
        </div>
    )
}

export default ProtectedRoute
