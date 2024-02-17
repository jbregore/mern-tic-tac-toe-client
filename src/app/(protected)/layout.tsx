"use client";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/buttons/Spinner";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { AuthApi } from "@/api/AuthApi";
import { useUserStore } from "@/zustand/store";
import Cookies from "js-cookie";
import { socket } from "@/utils/socket";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useUser();
  const [authorize, setAuthorize] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await isAuthenticated();
      setAuthorize(result);
      setIsLoading(false);
    };

    fetchData();
  }, [pathname]);

  if (!authorize && !isLoading) {
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <Spinner style="w-12 h-12 ml-2" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32">
      <Navbar activeLink={pathname} />

      {children}
    </main>
  );
}
