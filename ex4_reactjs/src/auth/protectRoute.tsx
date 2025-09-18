import { Navigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { getProfile } from "../redux/authSlide";
import { ROUTES } from "../constant/path.constants";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { toast } from "react-toastify";
interface ChildrenType {
  children: React.ReactNode;
}
const ProtectRoutes = ({ children }: ChildrenType) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const checkUser = useCallback(async () => {
    try {
      await dispatch(getProfile()).unwrap();
    } catch (err) {
      toast.error(err as string);
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return children;
};
export default ProtectRoutes;
