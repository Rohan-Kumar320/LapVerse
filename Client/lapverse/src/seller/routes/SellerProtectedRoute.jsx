import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useSeller } from "../../context/SellerContext";

const SellerProtectedRoute = ({ children }) => {

const {
  loading: authLoading,
} = useAuth();

const {
  loading: sellerLoading,
  isSeller,
  activeMode,
} = useSeller();

if (authLoading || sellerLoading) {
  return null; // Later we can replace this with a spinner
}

  if (!isSeller) {
    
    return <Navigate to="/settings" replace />;
  }

  if (activeMode !== "seller") {
    return <Navigate to="/settings" replace />;
  }

  return children;

};

export default SellerProtectedRoute;