export const setToken = () => {
    let token = JSON.parse(localStorage.getItem("token")!);
    token = token ? token : "";
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
  };