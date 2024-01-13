import { redirect } from "next/navigation";
export const runtime = "edge";

const NotFoundCatchAll = () => redirect("/");

export default NotFoundCatchAll;
