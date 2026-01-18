import { signIn } from '@/app/api/auth';
import { auth } from '@/app/lib/auth';
import React from 'react'

const LoginPage =  async () => {
  const session = await auth();
  console.log(session)

    const handleGithubLogin = async () => {
     "use server"
     await signIn("github");
  }
  return (
    <div>
      <form action={handleGithubLogin}>
     <button>Login with Github</button>
      </form>
    </div>
  )
};

export default LoginPage