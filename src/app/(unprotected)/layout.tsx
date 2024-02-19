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
  const [authorize, setAuthorize] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await isAuthenticated();
      setAuthorize(result);
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <Spinner style="w-12 h-12 ml-2" />
      </div>
    );
  }

  if (authorize && !isLoading) {
    router.push("/play");
  }

  return children;
}
