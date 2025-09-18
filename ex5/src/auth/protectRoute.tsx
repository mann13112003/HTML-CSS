import { Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { logIn } from "../redux/authSlide";
import { getProfile } from "../services/api";
import { ROUTES } from "../constant/path.constants";
import { useAppDispatch, useAppSelector } from "../redux/store";
interface ChildrenType {
  children: React.ReactNode;
}
const ProtectRoutes = ({ children }: ChildrenType) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const res = await getProfile();
      dispatch(logIn({ user: res.data.data.user }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return children;
};
export default ProtectRoutes;
