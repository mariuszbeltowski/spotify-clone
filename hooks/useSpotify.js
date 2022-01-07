import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // if refreshing fails, redirect to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
