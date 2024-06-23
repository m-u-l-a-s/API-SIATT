// src/components/ZoomRedirect.tsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';


const ZoomRedirect = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    api.post(`zoom/token/${code}`).then(resp => {
      console.log(resp.data)
      window.opener.postMessage(['authenticated',resp.data],'http://localhost:5173')
    }).catch(error => {
      console.log(error)
    })
  },[])


  return <>Usuário Autenticado </> 
};

export default ZoomRedirect;


