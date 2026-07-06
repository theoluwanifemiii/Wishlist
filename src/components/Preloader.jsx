import { useState, useEffect } from 'react';
import { CONFIG } from '../config';

const { person } = CONFIG;

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
          <span className="preloader-t">{person.name[0]}</span>
          <span className="preloader-rest">{person.name.slice(1)}</span>
        </div>
        <p className="preloader-tag">✦ &nbsp; Twenty-{person.age === 21 ? 'One' : person.age === 20 ? 'Twenty' : person.age} &nbsp; ✦</p>
        <div className="preloader-track">
          <div className="preloader-fill" />
        </div>
      </div>
    </div>
  );
}
