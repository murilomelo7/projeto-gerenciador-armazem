import PublicRoutes from "./pages/public/public.routes";
import PrivateRoutes from "./pages/private/private.routes";

const Routes = () => {
  return (
    <>
      <PublicRoutes />
      <PrivateRoutes />
    </>
  );
};

export default Routes;
