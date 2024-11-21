
import { useRouter } from 'next/router';
import React from 'react';

export interface AboutProps {
}

export default function App (props: AboutProps) {
    const router = useRouter();
    console.log(router.query);
  return (
    <div>
      About Page
    </div>
  );
}

export function getServerSideProps(){
    return{
        props: {}, // truyền qua page component như là 1 props
    }
}
