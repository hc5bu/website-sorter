import React, { useState } from 'react';
import Link from 'next/link';

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
      <h1>Website Text Sorter</h1>
      <h2>Enter URL (excluding https://):</h2>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a URL..." />
        <Link href={'/' + input} passHref legacyBehavior>
          <EnterButton onClick={() => setLoading(true)} />
        </Link>
      </div>
      <div id='disclaimer'>
        Note: Does not work well on highly dynamic webpages.
      </div>
    </div>
  )
}
