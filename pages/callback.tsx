import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    // Obtener el hash con el token
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("spotify_access_token", accessToken);
      router.replace("/player");
    } else {
      router.replace("/");
    }
  }, [router]);

  return <div>Cargando...</div>;
}
