import { useState, useEffect } from 'react';

export default function Preloader({ onDone }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    // Start exit after 2.1s, remove from DOM after transition completes
    const exitTimer = setTimeout(() => setOut(true),  2100);
    const doneTimer = setTimeout(() => onDone(),       2900);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className={`preloader${out ? ' preloader-out' : ''}`}>
      <div className="preloader-inner">
        <div className="preloader-name">
          <span className="preloader-t">T</span>
          <span className="preloader-rest">emilola</span>
        </div>
        <p className="preloader-tag">✦ &nbsp; Twenty-One &nbsp; ✦</p>
        <div className="preloader-track">
          <div className="preloader-fill" />
        </div>
      </div>
    </div>
  );
}
