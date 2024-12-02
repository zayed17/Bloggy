import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../api/userApi";

interface PublicRouteProps {
  element: React.ComponentType;
  redirectTo: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element: Component, redirectTo }) => {
  const { data, isLoading, isError, error } = useGetUserQuery({});
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !isError) {
      navigate(redirectTo);
    }
  }, [data, isError, navigate, redirectTo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error && 'status' in error && error.status === 401) {
    return <Component />;
  }

  if (isError || data) {
    return null;
  }

  return <Component />;
};

export default PublicRoute;
