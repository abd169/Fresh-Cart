import { Navigate } from "react-router-dom";
import  { useContext } from "react";
import {UserContext} from "../../Context/User.context"
export default function GuestRoute({children}) {
  let {token} = useContext(UserContext)
  if(!token){
    return children;
  }else{
    return <Navigate to="/" />
  }
}
