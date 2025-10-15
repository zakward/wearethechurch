import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BibleContext } from '../BibleContext.jsx';
import { AuthContext } from '../AuthContext.jsx';
import { ThemeContext } from '../ThemeContext.jsx';

const BibleReader = () => {
  const { book, chapter } = useParams();
  const { currentBibleData, markCompleted, currentTranslation } = useContext(BibleContext);
  const { user, saveVerse, highlightVerse } = useContext(AuthContext);
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useContext(ThemeContext);
  const [mode, setMode] = useState('light');
  const [activeVerse, setActiveVerse] = useState(null);

  const bookData = currentBibleData[book];
  if (!bookData) return <p className="text-center text-red-500 dark:text-red-300">Book not found.</p>;

  if (!chapter) {
    // Show chapters list for the book
    const chapters = Object.keys(bookData).sort((a, b) => Number(a) - Number(b));
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-white">
        <h1 className="text-4xl font-bold mb-6 text-primaryBlue dark:text-white text-center">{book}</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {chapters.map((ch) => (
            <Link key={ch} to={`/bible/${book}/${ch}`} className="bg-bgLightBlue text-white dark:bg-gray-700 p-4 rounded-2xl text-center hover:bg-primaryBlue hover:text-white transition-all duration-300">
              Chapter {ch}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const chapterData = bookData[chapter];
  if (!chapterData) return <p className="text-center text-red-500 dark:text-red-300">Chapter not found.</p>;

  const verses = Object.keys(chapterData).sort((a, b) => Number(a) - Number(b));

  // Static conditional classes for font size and family
  const sizeClass = fontSize === 'base' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl';
  const familyClass = fontFamily === 'friendly' ? 'font-friendly' : fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  // Visibility mode classes for verses div
  let modeClass = 'bg-white text-textGray';
  let dropdownClass = 'bg-white text-gray-800 shadow-md';
  let hoverClass = 'hover:bg-gray-100';
  if (mode === 'dark') {
    modeClass = 'bg-gray-800 text-gray-200';
    dropdownClass = 'bg-gray-800 text-gray-200 shadow-lg shadow-gray-900/50';
    hoverClass = 'hover:bg-gray-700';
  } else if (mode === 'sepia') {
    modeClass = 'bg-[#FBF0D9] text-[#5F4B32]';
    dropdownClass = 'bg-[#FBF0D9] text-[#5F4B32] shadow-md shadow-[#5F4B32]/20';
    hoverClass = 'hover:bg-[#E8D9B8]';
  } else if (mode === 'high-contrast') {
    modeClass = 'bg-black text-yellow-300';
    dropdownClass = 'bg-black text-yellow-300 shadow-md shadow-white/10';
    hoverClass = 'hover:bg-gray-900';
  }

  const handleSave = (v) => {
    const text = chapterData[v];
    const verseObj = { book, chapter: Number(chapter), verse: Number(v), text, translation: currentTranslation };
    saveVerse(verseObj);
    alert('Verse saved!');
    setActiveVerse(null);
  };

  const handleShare = (v) => {
    const shareText = `${book} ${chapter}:${v} "${chapterData[v]}" (${currentTranslation})`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Verse copied to clipboard!');
    });
    setActiveVerse(null);
  };

  const handleHighlight = (v) => {
    highlightVerse(book, Number(chapter), Number(v));
    setActiveVerse(null);
  };

  return (
    <div className={`p-4 sm:p-8 rounded-3xl shadow-xl border-4 border-white bg-white dark:bg-gray-800 text-textGray dark:text-gray-200 ${sizeClass} ${familyClass}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        {/* Theme toggles with labels */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <label htmlFor="mode" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Mode</label>
            <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)} className="p-2 rounded bg-bgLightBlue dark:bg-gray-700 dark:text-gray-300">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="sepia">Sepia</option>
              <option value="high-contrast">High Contrast</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="fontSize" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Font Size</label>
            <select id="fontSize" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="p-2 rounded bg-bgLightBlue dark:bg-gray-700 dark:text-gray-300">
              <option value="base">Base (16px)</option>
              <option value="lg">Large (18px)</option>
              <option value="xl">X-Large (20px)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="fontFamily" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Font Style</label>
            <select id="fontFamily" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="p-2 rounded bg-bgLightBlue dark:bg-gray-700 dark:text-gray-300">
              <option value="friendly">Friendly (Fredoka)</option>
              <option value="serif">Serif (Times)</option>
              <option value="sans">Sans-serif (Arial)</option>
            </select>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primaryBlue dark:text-white">{book} {chapter}</h1>
      </div>
      <div className={`space-y-2 sm:space-y-4 p-2 sm:p-4 rounded-md ${modeClass}`}>
        {verses.map((v) => {
          const isHighlighted = user?.highlightedVerses?.some(h => h.book === book && h.chapter === Number(chapter) && h.verse === Number(v)) || false;
          return (
            <div key={v} className="relative">
              <p
                id={`verse-${v}`}
                onClick={() => setActiveVerse(activeVerse === v ? null : v)}
                className={`${isHighlighted ? 'bg-yellow-200 dark:bg-yellow-800/50 sepia:bg-yellow-300/50 high-contrast:bg-yellow-500/30' : ''} cursor-pointer select-text`}
              >
                <sup className="font-bold mr-2">{v}</sup>{chapterData[v]}
              </p>
              {activeVerse === v && (
                <div className={`absolute left-0 z-10 mt-1 w-48 rounded-md shadow-lg ${dropdownClass}`}>
                  <button onClick={() => handleSave(v)} className={`block w-full text-left px-4 py-2 text-sm ${hoverClass}`}>Save Verse</button>
                  <button onClick={() => handleShare(v)} className={`block w-full text-left px-4 py-2 text-sm ${hoverClass}`}>Share Verse</button>
                  <button onClick={() => handleHighlight(v)} className={`block w-full text-left px-4 py-2 text-sm ${hoverClass}`}>
                    {isHighlighted ? 'Unhighlight Verse' : 'Highlight Verse'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        {Number(chapter) > 1 && <Link to={`/bible/${book}/${Number(chapter) - 1}`} className="text-primaryBlue dark:text-blue-300 hover:underline">Previous Chapter</Link>}
        <Link to={`/bible/${book}`} className="text-primaryBlue dark:text-blue-300 hover:underline">Back to Chapters</Link>
        {Number(chapter) < Object.keys(bookData).length && <Link to={`/bible/${book}/${Number(chapter) + 1}`} className="text-primaryBlue dark:text-blue-300 hover:underline">Next Chapter</Link>}
      </div>
      <button onClick={() => markCompleted(book, Number(chapter))} className="mt-4 bg-primaryGreen text-white py-2 px-4 rounded-full hover:bg-green-600">Mark Complete</button>
    </div>
  );
};

export default BibleReader;