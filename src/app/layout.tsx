import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GetUser } from "@/utils/session";
import AuthLayout from "@/components/AuthLayout";
import { Suspense } from "react";
import PageSkeleton from "@/components/skeletons/page";
import Celebrate from "@/components/Celebrate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GOTV App MMC2023",
  description: "GOTV App MMC2023",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    countryName: "Maldives",
    alternateLocale: "dv",
    description: "GOTV App MMC2023",
    title: "GOTV App MMC2023",
    siteName: "GOTV App MMC2023",
    images: [
      {
        url: "https://mmc.mageymdp.com/images/mmc.jpeg",
        width: 1800,
        height: 1600,
        alt: "GOTV App MMC2023",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await GetUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Celebrate />
      </body>
    </html>
  );
}
// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const user = await GetUser();
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {user ? (
//           <AuthLayout user={user}>
//             <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
//           </AuthLayout>
//         ) : (
//           <div className="flex">{children}</div>
//         )}

//         <Toaster />
//       </body>
//     </html>
//   );
// }
