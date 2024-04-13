import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
  return (
    currentUser ? <Outlet/> : <Navigate to="/sign-in" />//outlet is used to render the child components of the parent component(privateRoute) and navigate is used to redirect to a different route. Here we didnt use usenavigate hook because we are not in a functional component. Navigate is a component. 
    
  )
}
