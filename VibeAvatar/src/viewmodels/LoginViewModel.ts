import { redirectToSpotifyLogin } from '../services/Utilities'

export function useSpotifyLogin() {
  const login = () => {
    redirectToSpotifyLogin()
  }

  return { login }
}
