import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BibleContext } from '../BibleContext.jsx';
import { ThemeContext } from '../ThemeContext.jsx';

const BibleReader = () => {
  const { book, chapter } = useParams();
  const { bibleData, markCompleted } = useContext(BibleContext);
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useContext(ThemeContext);
  const [mode, setMode] = useState('light'); // Hardcoded mode for visibility options

  const bookData = bibleData[book];
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
  if (mode === 'dark') {
    modeClass = 'bg-gray-800 text-gray-200';
  } else if (mode === 'sepia') {
    modeClass = 'bg-[#FBF0D9] text-[#5F4B32]';
  } else if (mode === 'high-contrast') {
    modeClass = 'bg-black text-yellow-300';
  }

  return (
    <div className={`p-8 rounded-3xl shadow-xl border-4 border-white bg-white dark:bg-gray-800 text-textGray dark:text-gray-200 ${sizeClass} ${familyClass}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primaryBlue dark:text-white">{book} {chapter}</h1>
        {/* Theme toggles */}
        <div className="flex space-x-4">
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="p-2 rounded bg-bgLightBlue dark:bg-gray-700">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
            <option value="high-contrast">High Contrast</option>
          </select>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="p-2 rounded bg-bgLightBlue dark:bg-gray-700">
            <option value="base">Base (16px)</option>
            <option value="lg">Large (18px)</option>
            <option value="xl">X-Large (20px)</option>
          </select>
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="p-2 rounded bg-bgLightBlue dark:bg-gray-700">
            <option value="friendly">Friendly (Fredoka)</option>
            <option value="serif">Serif (Times)</option>
            <option value="sans">Sans-serif (Arial)</option>
          </select>
        </div>
      </div>
      <div className={`space-y-4 p-4 rounded-md ${modeClass}`}>
        {verses.map((v) => (
          <p key={v} id={`verse-${v}`}>
            <sup className="font-bold mr-2">{v}</sup>{chapterData[v]}
          </p>
        ))}
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