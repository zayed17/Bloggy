import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../api/userApi";

interface ProtectedRouteProps {
  element: React.ComponentType;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, redirectTo }) => {
  const { data, isLoading, isError } = useGetUserQuery({});
  const [shouldRedirect, setShouldRedirect] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (isError || !data) {
      const timer = setTimeout(() => {
        setShouldRedirect(true); 
      }, 500); 

      return () => clearTimeout(timer);
    } else {
      setShouldRedirect(false); 
    }
  }, [isError, data]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate(redirectTo);
    }
  }, [shouldRedirect, navigate, redirectTo]);

  if (isLoading || isError || !data) {
    return null; 
  }

  return <Component />;
};

export default ProtectedRoute;
