import { useEffect, useState } from "react";

declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

export default function SpotifyPlayer() {
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [trackName, setTrackName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "LoveWeb Player",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token!);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }: { device_id: string }) => {
        setDeviceId(device_id);
        console.log("Spotify Player ready with Device ID", device_id);
      });

      player.addListener("player_state_changed", (state: any) => {
        if (!state) return;
        setIsPaused(state.paused);
        setTrackName(state.track_window.current_track.name);
        setArtistName(state.track_window.current_track.artists.map((a: any) => a.name).join(", "));
      });

      player.connect();
    };

    return () => {
      if (player) player.disconnect();
      document.body.removeChild(script);
    };
  }, []);

  if (!player) return <p>Cargando reproductor Spotify...</p>;

  const togglePlay = () => {
    player.togglePlay();
  };

  const previousTrack = () => {
    player.previousTrack();
  };

  const nextTrack = () => {
    player.nextTrack();
  };

  return (
    <div className="p-4 bg-white/80 rounded-lg shadow-md max-w-sm mx-auto mt-6 text-center">
      <h2 className="font-bold text-lg mb-2">Spotify Player</h2>
      <p className="text-sm mb-1">
        <strong>Pista:</strong> {trackName || "No reproducido"}
      </p>
      <p className="text-sm mb-4">
        <strong>Artista:</strong> {artistName || "-"}
      </p>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
        onClick={togglePlay}
      >
        {isPaused ? "Reproducir" : "Pausar"}
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
        onClick={previousTrack}
      >
        Anterior
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        onClick={nextTrack}
      >
        Siguiente
      </button>
    </div>
  );
}
