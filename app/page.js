'use client'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <Link href="/dashboard/register">registro</Link>

      <h1>Autopart Express</h1>
      <h2>El mejor sitio para encontrar tus autopartes</h2>
    </div>

  )
}
