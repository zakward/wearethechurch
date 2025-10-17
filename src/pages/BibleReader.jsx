
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BibleContext } from '../BibleContext.jsx';
import { AuthContext } from '../AuthContext.jsx';
import { ThemeContext } from '../ThemeContext.jsx';
import { insightsData } from '../data/InsightsData.jsx';

const BibleReader = () => {
  const { book, chapter } = useParams();
  const { currentBibleData, markCompleted, currentTranslation, setCurrentTranslation } = useContext(BibleContext);
  const { user, saveVerse, highlightVerse, unsaveVerse, addBookmark, unbookmark, addNote } = useContext(AuthContext);
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState('light');
  const [activeVerse, setActiveVerse] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(book || '');
  const [selectedChapter, setSelectedChapter] = useState(chapter || '');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [error, setError] = useState(null);

  // Validate book and chapter
  const bookData = currentBibleData && selectedBook in currentBibleData ? currentBibleData[selectedBook] : null;
  const chapterData = bookData && selectedChapter in bookData ? bookData[selectedChapter] : null;

  // Sync selectedBook and selectedChapter with URL params
  useEffect(() => {
    if (book && currentBibleData[book]) {
      setSelectedBook(book);
      setSelectedChapter(chapter || '');
      setSelectedVerse('');
      setError(null);
    } else {
      setError('Invalid book or chapter selected.');
    }
  }, [book, chapter, currentBibleData]);

  if (!currentBibleData || Object.keys(currentBibleData).length === 0) {
    return <p className="text-center text-red-500 dark:text-red-300">Loading Bible data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 dark:text-red-300">{error}</p>;
  }

  if (!bookData) {
    return <p className="text-center text-red-500 dark:text-red-300">Book not found.</p>;
  }

  if (!chapter) {
    const chapters = Object.keys(bookData).sort((a, b) => Number(a) - Number(b));
    return (
      <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-white">
        {/* Back Arrow */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-0 left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
          aria-label="Back to Home"
        >
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-4xl font-bold mb-6 text-primaryBlue dark:text-white text-center">{book}</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {chapters.map((ch) => (
            <Link
              key={ch}
              to={`/bible/${book}/${ch}`}
              className="bg-bgLightBlue text-white dark:bg-gray-700 p-4 rounded-2xl text-center hover:bg-primaryBlue hover:text-white transition-all duration-300"
              aria-label={`Read ${book} Chapter ${ch}`}
            >
              Chapter {ch}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (!chapterData) {
    return <p className="text-center text-red-500 dark:text-red-300">Chapter not found.</p>;
  }

  const verses = Object.keys(chapterData).sort((a, b) => Number(a) - Number(b));

  // Map verses to insights for inline links
  const verseInsights = {};
  const addInsightsToVerses = (section, tab) => {
    section.forEach((item) => {
      item.verseReferences.forEach((ref) => {
        const [refBook, chapterVerse] = ref.split(' ');
        const [refChapter, refVerse] = chapterVerse.includes(':') ? chapterVerse.split(':') : [chapterVerse, null];
        if (refBook === book && refChapter === chapter) {
          const verseRange = refVerse ? refVerse.split('-').map(Number) : [Number(refVerse)];
          verseRange.forEach((v) => {
            if (!verseInsights[v]) verseInsights[v] = [];
            verseInsights[v].push({ id: item.id, title: item.title, tab });
          });
        }
      });
    });
  };
  addInsightsToVerses(insightsData.parablesTeachings, 'parablesTeachings');
  addInsightsToVerses(insightsData.historicalEvents, 'historicalEvents');
  addInsightsToVerses(insightsData.lineages, 'lineages');

  const sizeClass = fontSize === 'base' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl';
  const familyClass = fontFamily === 'friendly' ? 'font-friendly' : fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  let modeClass = 'bg-white text-textGray';
  let dropdownClass = 'bg-white text-gray-800 shadow-md';
  let hoverClass = 'hover:bg-gray-100';
  let savedIndicatorColor = 'text-blue-500';
  let bookmarkIndicatorColor = 'text-red-500';
  let noteIndicatorColor = 'text-green-500';
  let insightIndicatorColor = 'text-purple-500';
  let keyTextColor = 'text-primaryBlue';
  if (mode === 'dark') {
    modeClass = 'bg-gray-800 text-gray-200';
    dropdownClass = 'bg-gray-800 text-gray-200 shadow-lg shadow-gray-900/50';
    hoverClass = 'hover:bg-gray-700';
    savedIndicatorColor = 'text-blue-300';
    bookmarkIndicatorColor = 'text-red-300';
    noteIndicatorColor = 'text-green-300';
    insightIndicatorColor = 'text-purple-300';
    keyTextColor = 'text-white';
  } else if (mode === 'sepia') {
    modeClass = 'bg-[#FBF0D9] text-[#5F4B32]';
    dropdownClass = 'bg-[#FBF0D9] text-[#5F4B32] shadow-md shadow-[#5F4B32]/20';
    hoverClass = 'hover:bg-[#E8D9B8]';
    savedIndicatorColor = 'text-[#3F2B1E]';
    bookmarkIndicatorColor = 'text-[#8B4513]';
    noteIndicatorColor = 'text-[#2E8B57]';
    insightIndicatorColor = 'text-[#4B0082]';
    keyTextColor = 'text-[#5F4B32]';
  } else if (mode === 'high-contrast') {
    modeClass = 'bg-black text-yellow-300';
    dropdownClass = 'bg-black text-yellow-300 shadow-md shadow-white/10';
    hoverClass = 'hover:bg-gray-900';
    savedIndicatorColor = 'text-yellow-500';
    bookmarkIndicatorColor = 'text-red-400';
    noteIndicatorColor = 'text-green-400';
    insightIndicatorColor = 'text-purple-400';
    keyTextColor = 'text-yellow-300';
  }

  const handleSave = (v) => {
    const text = chapterData[v];
    const verseObj = { book, chapter: Number(chapter), verse: Number(v), text, translation: currentTranslation, timestamp: new Date().toISOString() };
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

  const handleUnsave = (v) => {
    unsaveVerse(book, Number(chapter), Number(v));
    alert('Verse unsaved!');
    setActiveVerse(null);
  };

  const handleBookmark = (v) => {
    const text = chapterData[v];
    const obj = { book, chapter: Number(chapter), verse: Number(v), text, translation: currentTranslation, timestamp: new Date().toISOString() };
    const isBookmarked = user?.bookmarks?.some(b => b.book === book && b.chapter === Number(chapter) && b.verse === Number(v)) || false;
    if (isBookmarked) {
      unbookmark(book, Number(chapter), Number(v));
      alert('Bookmark removed!');
    } else {
      addBookmark(obj);
      alert('Bookmark added!');
    }
    setActiveVerse(null);
  };

  const handleOpenNoteModal = (v) => {
    const existingNote = user?.notes?.find(n => n.book === book && n.chapter === Number(chapter) && n.verse === Number(v));
    setNoteText(existingNote ? existingNote.note : '');
    setActiveVerse(v);
    setIsNoteModalOpen(true);
  };

  const handleAddNote = (v) => {
    if (!noteText.trim()) {
      alert('Note cannot be empty!');
      return;
    }
    const noteObj = {
      book,
      chapter: Number(chapter),
      verse: Number(v),
      text: chapterData[v],
      note: noteText,
      translation: currentTranslation,
      timestamp: new Date().toISOString()
    };
    addNote(noteObj);
    alert('Note added!');
    setNoteText('');
    setIsNoteModalOpen(false);
    setActiveVerse(null);
  };

  // Handle navigation for book, chapter, and verse
  const handleBookChange = (e) => {
    const newBook = e.target.value;
    if (newBook && currentBibleData[newBook]) {
      setSelectedBook(newBook);
      setSelectedChapter('');
      setSelectedVerse('');
      setError(null);
      navigate(`/bible/${newBook}`);
    } else {
      setError('Invalid book selected.');
    }
  };

  const handleChapterChange = (e) => {
    const newChapter = e.target.value;
    if (newChapter && bookData && bookData[newChapter]) {
      setSelectedChapter(newChapter);
      setSelectedVerse('');
      setError(null);
      navigate(`/bible/${selectedBook}/${newChapter}`);
    } else {
      setError('Invalid chapter selected.');
    }
  };

  const handleVerseChange = (e) => {
    const newVerse = e.target.value;
    if (newVerse && chapterData && chapterData[newVerse]) {
      setSelectedVerse(newVerse);
      setError(null);
      navigate(`/bible/${selectedBook}/${selectedChapter}#verse-${newVerse}`);
    } else {
      setError('Invalid verse selected.');
    }
  };

  // Icon Key Data
  const iconKey = [
    { icon: '⭐', label: 'Saved Verse', color: savedIndicatorColor, description: 'Marks a verse you saved to view later.' },
    { icon: '📝', label: 'Note', color: noteIndicatorColor, description: 'Shows you added a personal note to this verse.' },
    { icon: '🔖', label: 'Bookmark', color: bookmarkIndicatorColor, description: 'Marks a verse for quick access.' },
    { icon: '📖', label: 'Insight', color: insightIndicatorColor, description: 'Links to educational info about this verse.' }
  ];

  return (
    <div className={`relative p-4 sm:p-8 rounded-3xl shadow-xl border-4 border-white ${modeClass} ${sizeClass} ${familyClass}`}>
      {/* Back Arrow */}
      <button
        onClick={() => navigate('/bible')}
        className="absolute top-0 left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Bible Books"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
      </button>

      {/* Icon Key */}
      <div className={`mb-6 mt-[40px] p-4 rounded-2xl shadow-xl border border-secondaryPurple ${modeClass}`}>
        <h2 className={`text-lg font-bold mb-3 ${keyTextColor}`}>Icon Key</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {iconKey.map((item, index) => (
            <div key={index} className="flex items-center space-x-2" title={item.description}>
              <span className={`text-lg ${item.color}`}>{item.icon}</span>
              <span className={`text-sm ${keyTextColor}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls and Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <label htmlFor="book" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Book</label>
            <select
              id="book"
              value={selectedBook}
              onChange={handleBookChange}
              className={`p-2 rounded border border-gray-300 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              aria-label="Select book"
            >
              <option value="">Select Book</option>
              {Object.keys(currentBibleData).sort().map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="chapter" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Chapter</label>
            <select
              id="chapter"
              value={selectedChapter}
              onChange={handleChapterChange}
              className={`p-2 rounded border border-gray-300 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              aria-label="Select chapter"
              disabled={!selectedBook || !bookData}
            >
              <option value="">Select Chapter</option>
              {bookData &&
                Object.keys(bookData).sort((a, b) => Number(a) - Number(b)).map((ch) => (
                  <option key={ch} value={ch}>
                    Chapter {ch}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="verse" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Verse</label>
            <select
              id="verse"
              value={selectedVerse}
              onChange={handleVerseChange}
              className={`p-2 rounded border border-gray-300 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              aria-label="Select verse"
              disabled={!selectedChapter || !chapterData}
            >
              <option value="">Select Verse</option>
              {chapterData &&
                Object.keys(chapterData).sort((a, b) => Number(a) - Number(b)).map((v) => (
                  <option key={v} value={v}>
                    Verse {v}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="mode" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Mode</label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className={`p-2 rounded border border-gray-300 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              aria-label="Select display mode"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="sepia">Sepia</option>
              <option value="high-contrast">High Contrast</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="fontSize" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Font Size</label>
            <select
              id="fontSize"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className={`p-2 rounded border border-gray-300 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              aria-label="Select font size"
            >
              <option value="base">Base (16px)</option>
              <option value="lg">Large (18px)</option>
              <option value="xl">X-Large (20px)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="fontFamily" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Font Style</label>
            <select
              id="fontFamily"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className={`p-2 rounded border border-gray-300 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              aria-label="Select font style"
            >
              <option value="friendly">Friendly (Fredoka)</option>
              <option value="serif">Serif (Times)</option>
              <option value="sans">Sans-serif (Arial)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="translation" className="text-sm font-medium text-primaryBlue dark:text-white mb-1">Translation</label>
            <select
              id="translation"
              value={currentTranslation}
              onChange={(e) => setCurrentTranslation(e.target.value)}
              className={`p-2 rounded border border-gray-300 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              aria-label="Select Bible translation"
            >
              <option value="NIV">NIV</option>
              <option value="KJV">KJV</option>
            </select>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primaryBlue dark:text-white">{book} {chapter}</h1>
      </div>
      {error && <p className="text-center text-red-500 dark:text-red-300 mb-4">{error}</p>}
      <div className={`space-y-2 sm:space-y-4 p-2 sm:p-4 rounded-md ${modeClass}`}>
        {verses.map((v) => {
          const isHighlighted = user?.highlightedVerses?.some(h => h.book === book && h.chapter === Number(chapter) && h.verse === Number(v)) || false;
          const isSaved = user?.savedVerses?.some(s => s.book === book && s.chapter === Number(chapter) && s.verse === Number(v)) || false;
          const isBookmarked = user?.bookmarks?.some(b => b.book === book && b.chapter === Number(chapter) && b.verse === Number(v)) || false;
          const hasNote = user?.notes?.some(n => n.book === book && n.chapter === Number(chapter) && n.verse === Number(v)) || false;
          const hasInsight = verseInsights[v] || false;
          return (
            <div key={v} className="relative">
              <p
                id={`verse-${v}`}
                onClick={() => setActiveVerse(activeVerse === v ? null : v)}
                className={`${isHighlighted ? 'bg-yellow-300 dark:bg-yellow-300/80 sepia:bg-yellow-200/80 high-contrast:bg-yellow-400/90' : ''} cursor-pointer select-text flex items-start`}
              >
                <sup className="font-bold mr-2 flex-shrink-0">{v}</sup>
                {isSaved && (
                  <span
                    className={`mr-2 text-xs ${savedIndicatorColor} cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnsave(v);
                    }}
                    title="Unsave verse"
                  >
                    ⭐
                  </span>
                )}
                {isBookmarked && (
                  <span
                    className={`mr-2 text-xs ${bookmarkIndicatorColor} cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(v);
                    }}
                    title="Remove bookmark"
                  >
                    🔖
                  </span>
                )}
                {hasNote && (
                  <span
                    className={`mr-2 text-xs ${noteIndicatorColor} cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenNoteModal(v);
                    }}
                    title="View/Edit note"
                  >
                    📝
                  </span>
                )}
                {hasInsight && (
                  <Link
                    to={`/insights?tab=${hasInsight[0].tab}&id=${hasInsight[0].id}`}
                    className={`mr-2 text-xs ${insightIndicatorColor} cursor-pointer`}
                    onClick={(e) => e.stopPropagation()}
                    title={`Learn about ${hasInsight[0].title}`}
                    aria-label={`Learn about ${hasInsight[0].title}`}
                  >
                    📖
                  </Link>
                )}
                <span className="flex-grow">{chapterData[v]}</span>
              </p>
              {activeVerse === v && (
                <div className={`absolute left-0 z-10 mt-1 w-[80vw] md:w-64 rounded-md shadow-2xl ${dropdownClass}`}>
                  <button
                    onClick={() => handleSave(v)}
                    className={`block w-full text-left px-4 py-2 md:py-3 text-sm md:text-base ${hoverClass}`}
                    aria-label="Save verse"
                  >
                    Save Verse
                  </button>
                  <button
                    onClick={() => handleShare(v)}
                    className={`block w-full text-left px-4 py-2 md:py-3 text-sm md:text-base ${hoverClass}`}
                    aria-label="Share verse"
                  >
                    Share Verse
                  </button>
                  <button
                    onClick={() => handleHighlight(v)}
                    className={`block w-full text-left px-4 py-2 md:py-3 text-sm md:text-base ${hoverClass}`}
                    aria-label={isHighlighted ? 'Unhighlight verse' : 'Highlight verse'}
                  >
                    {isHighlighted ? 'Unhighlight Verse' : 'Highlight Verse'}
                  </button>
                  <button
                    onClick={() => handleBookmark(v)}
                    className={`block w-full text-left px-4 py-2 md:py-3 text-sm md:text-base ${hoverClass}`}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                  </button>
                  <button
                    onClick={() => handleOpenNoteModal(v)}
                    className={`block w-full text-left px-4 py-2 md:py-3 text-sm md:text-base ${hoverClass}`}
                    aria-label={hasNote ? 'Edit/View note' : 'Add note'}
                  >
                    {hasNote ? 'Edit/View Note' : 'Add Note'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`w-4/5 max-w-md p-6 rounded-3xl shadow-2xl ${modeClass}`}>
            <h2 className="text-xl font-bold mb-4 text-primaryBlue dark:text-white">Add Note for {book} {chapter}:{activeVerse}</h2>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your note..."
              className={`w-full p-2 border border-gray-300 rounded-lg ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              rows="4"
              aria-label="Enter note for verse"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setNoteText('');
                  setIsNoteModalOpen(false);
                  setActiveVerse(null);
                }}
                className="py-2 px-4 rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400"
                aria-label="Cancel note"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddNote(activeVerse)}
                className="py-2 px-4 rounded-full bg-primaryBlue text-white hover:bg-blue-700"
                aria-label="Save note"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        {Number(chapter) > 1 && (
          <Link
            to={`/bible/${book}/${Number(chapter) - 1}`}
            className="text-primaryBlue dark:text-blue-300 hover:underline"
            aria-label="Previous chapter"
          >
            Previous Chapter
          </Link>
        )}
        <Link
          to={`/bible/${book}`}
          className="text-primaryBlue dark:text-blue-300 hover:underline"
          aria-label="Back to chapters"
        >
          Back to Chapters
        </Link>
        {Number(chapter) < Object.keys(bookData).length && (
          <Link
            to={`/bible/${book}/${Number(chapter) + 1}`}
            className="text-primaryBlue dark:text-blue-300 hover:underline"
            aria-label="Next chapter"
          >
            Next Chapter
          </Link>
        )}
      </div>
      <button
        onClick={() => markCompleted(book, Number(chapter))}
        className="mt-4 bg-primaryGreen text-white py-2 px-4 rounded-full hover:bg-green-600"
        aria-label="Mark chapter as completed"
      >
        Mark Complete
      </button>
    </div>
  );
};

export default BibleReader;
