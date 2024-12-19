import useOline from "../../hooks/useOnline"

export default function Online({children}) {
    let isOnline = useOline()
  if(isOnline){
    return children
  }
}
