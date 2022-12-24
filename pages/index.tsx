import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Home: NextPage = () => {
  let router = useRouter();
  useEffect(() =>{
    router.push("/home");
  },[])
  return (
      <></>
  )
}

export default Home
