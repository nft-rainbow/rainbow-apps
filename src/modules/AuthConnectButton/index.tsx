import { PropsWithChildren } from "react"
import { useAccount } from "@services/account"

interface AuthConnectButtonProps extends PropsWithChildren {
  Connected: JSX.Element ,
  Unconnected: JSX.Element,
}
const AuthConnectButton: React.FC<AuthConnectButtonProps> = ({ Connected, Unconnected }) => {
  const account = useAccount()
  if (account) {
    return <>{Connected}</>
  } else {
    return <>{Unconnected}</>
  }
}

export default AuthConnectButton;