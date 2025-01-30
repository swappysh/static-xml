import '../styles/App.css'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <Image
          src="/logo.svg"  // Move logo.svg to public folder
          alt="logo"
          className="App-logo"
          width={240}
          height={240}
        />
        <p>
          Edit <code>app/page.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Next.js
        </a>
      </header>
    </div>
  )
} 