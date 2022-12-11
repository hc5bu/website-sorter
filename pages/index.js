import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const EnterButton = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <button href={href} onClick={onClick} ref={ref} disabled={loading || input === ""}>
        {loading ? "Loading..." : "Enter"}
      </button>
    )
  })

  return (
    <div id='wrapper'>
      <Head>
        <title>Website Text Sorter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Website Text Sorter</h1>
      <h2>Enter URL (no https:// needed):</h2>
      <div id='entry'>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a URL..." />
        <Link href={'/' + input} passHref legacyBehavior>
          <EnterButton onClick={() => setLoading(true)} />
        </Link>
      </div>
      <div id='disclaimer'>
        Note: Does not work well on highly dynamic or complex webpages.
      </div>
    </div>
  )
}
