import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { Navigate } from "react-router-dom";

function Landing() {
  const { user }: any = useSelector(selectUser);
  
  if (user.id) {
    return <Navigate to="/home" />;
  }

  return <Navigate to="/auth/login" />;
}

export default Landing;
