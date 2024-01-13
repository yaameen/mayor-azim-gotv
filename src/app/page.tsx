import { getLatestVoted } from "@/actions/govt";
import GOTV from "@/components/gotv";
import { GetUser, getCookieParams } from "@/utils/session";
import { cookies } from "next/headers";

export const runtime = "edge";

export default async function Page(props: any) {
  const [user, voted] = await Promise.all([GetUser(), getLatestVoted()]);
  return <GOTV voted={voted} user={user} />;
}
