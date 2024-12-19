import useOline from "../../hooks/useOnline"


export default function Offline({children}) {
    let isOnline = useOline()
  if(!isOnline){
    return children
  }
  
}
