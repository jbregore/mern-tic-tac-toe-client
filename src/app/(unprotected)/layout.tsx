"use client";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/buttons/Spinner";
import { useRouter } from "next/navigation";

export default function UnProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useUser();
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = await isAuthenticated();
      setUser(user);
      setIsLoading(false);
    };

    fetchData();
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <Spinner style="w-12 h-12 ml-2" />
      </div>
    );
  }

  if (user && !isLoading) {
    router.push("/play");
  }

  return children;
}
