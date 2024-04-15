import PublicRoutes from "./pages/public/public.routes";
import PrivateRoutes from "./pages/private/private.routes";
import Layout from "./components/dashboard/Layout";

const Routes = () => {

  return (
    <>
      <PublicRoutes />

      {/* <Layout> */}
      <PrivateRoutes />
      {/* </Layout> */}
    </>
  );
};

export default Routes;
