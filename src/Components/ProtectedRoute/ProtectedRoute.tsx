import React, { ReactNode } from 'react'
import { useAppSelector } from '../../store/hooks'
import { Navigate} from 'react-router-dom'


// interface ProtectedRouteProps  {
 
//     children: React.ReactNode;
// }

const ProtectedRoute = ({ children }: { children: ReactNode }): ReactNode => {
    const {authUser} = useAppSelector((state)=>state.auth)
    if(authUser == null && localStorage.getItem('token') == null){
        return <Navigate to="/login"/>
    }else{
        return children
    }

}

export default ProtectedRoute
