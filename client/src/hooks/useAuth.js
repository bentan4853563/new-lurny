const useAuth = () => {
  const token = localStorage.getItem("token");

  const isAuthenticated = token ? true : false;

  return isAuthenticated;
};

export default useAuth;
