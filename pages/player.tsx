import { useEffect, useState } from "react";

export default function Player() {
  const [player, setPlayer] = useState<any>(null); // Cambiado a any
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "LoveWeb Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };

    return () => {
      if (player) player.disconnect();
    };
  }, []);

  const play = () => {
    if (!deviceId) return;
    const token = localStorage.getItem("spotify_access_token");
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        uris: ["spotify:track:7ouMYWpwJ422jRcDASZB7P"], // Canción ejemplo
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Reproductor Spotify</h1>
      <button
        onClick={play}
        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
      >
        Reproducir canción ejemplo
      </button>
    </div>
  );
}
