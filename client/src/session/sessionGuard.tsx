
import { useSessionGuard } from "../hooks/useSessionHook";
import SessionExpiredAlert from "./alert";

export default function SessionGuard({children}: {children?: React.ReactNode}) {
  const showAlert = useSessionGuard();

  return (
    <>
      {showAlert && <SessionExpiredAlert />}
      {children}
    </>
  );
}
