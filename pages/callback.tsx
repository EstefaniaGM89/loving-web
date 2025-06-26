import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");

      if (accessToken) {
        localStorage.setItem("spotify_access_token", accessToken);
        router.replace("/");
      } else {
        router.replace("/");
      }
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      <p className="text-white font-semibold text-lg">Procesando autenticación...</p>
    </div>
  );
}
