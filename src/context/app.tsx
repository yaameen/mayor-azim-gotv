import { createContext, useContext } from "react";

const ctx = createContext(null);
const AppCtx = {
  ctx,
  Provider: ({ children, value }: any) => {
    return <ctx.Provider value={value}>{children}</ctx.Provider>;
  },
};

export default AppCtx;
export const UseAppContext = () => {
  return useContext(ctx);
};
