import { useState, useEffect } from 'react'
import axios from 'axios';

const useAuth = () => {
  const [accessToken, setAccessToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios.post('/api/spotify/authenticate')
    .then(res => {
      setAccessToken(res.data.accessToken)
      setExpiresIn(res.data.expiresIn)
    })
    .catch(err => {
      console.log("post request failed", err)
    })
  }, []);

  // This refreshes our access token whenever it expires
  useEffect(() => {
    if (!expiresIn) return
    const interval = setInterval(() => {
      axios.post('/api/spotify/authenticate')
      .then(res => {
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
      })
      .catch(err => {
        console.log("post request failed", err)
      })
    }, (expiresIn - 60) * 1000)

    // if token changes before actual refresh, clear timeout
    return () => clearInterval(interval) 
  }, [expiresIn])

  return accessToken;
}

export default useAuth