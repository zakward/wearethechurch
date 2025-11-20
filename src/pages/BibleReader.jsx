import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { BibleContext } from '../BibleContext.jsx';
import { AuthContext } from '../AuthContext.jsx';
import { insightsData } from '../data/InsightsData.js';

const BibleReader = () => {
  const { book, chapter: chapterParam } = useParams();
  const {
    currentBibleData,
    markCompleted,
    currentTranslation,
    setCurrentTranslation,
  } = useContext(BibleContext);

  const {
    user,
    saveVerse,
    highlightVerse,
    unsaveVerse,
    addBookmark,
    unbookmark,
    addNote,
    deleteNote,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeVerse, setActiveVerse] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [selectedBook, setSelectedBook] = useState(book || '');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [error, setError] = useState(null);

  // Data helpers (bookData, chapterData, verses)
  const bookData = currentBibleData && selectedBook in currentBibleData
    ? currentBibleData[selectedBook]
    : null;

  const chapterData = bookData && selectedChapter in bookData ? bookData[selectedChapter] : null;
  const verses = chapterData ? Object.keys(chapterData).sort((a, b) => Number(a) - Number(b)) : [];

  // Sync URL → component state on load
  useEffect(() => {
    if (book && currentBibleData && currentBibleData[book]) {
      setSelectedBook(book);
      const chap = chapterParam || '1';
      setSelectedChapter(chap);
      setError(null);
      if (!chapterParam) {
        navigate(`/bible/${book}/1`, { replace: true });
      }
    } else if (currentBibleData) {
      setError('Invalid book or chapter selected.');
    }
    // eslint-disable-next-line
  }, [book, chapterParam, currentBibleData, navigate]);

  // Parse hash for verse focus, after verses available
  useEffect(() => {
    if (location.hash && verses && verses.length) {
      const hashVerse = location.hash.replace('#verse-', '');
      if (hashVerse && verses.includes(hashVerse)) {
        const element = document.getElementById(`verse-${hashVerse}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('bg-blue-900');
          setTimeout(() => element.classList.remove('bg-blue-900'), 3000);
        }
      }
    }
  }, [location.hash, verses]);

  // Insight mapping
  const verseInsights = {};
  const addInsights = (section, tab) => {
    section.forEach((item) => {
      item.verseReferences.forEach((ref) => {
        const [refBook, chapVerse] = ref.split(' ');
        if (!chapVerse) return;
        const [refChap, refVerse] = chapVerse.includes(':') ? chapVerse.split(':') : [chapVerse, null];
        if (refBook === book && refChap === selectedChapter) {
          if (refVerse) {
            let rangeArr = refVerse.includes('-')
              ? (() => {
                  const [start, end] = refVerse.split('-').map(Number);
                  return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
                })()
              : [refVerse];
            rangeArr.forEach((v) => {
              if (!verseInsights[v]) verseInsights[v] = [];
              verseInsights[v].push({ id: item.id, title: item.title, tab });
            });
          }
        }
      });
    });
  };

  if (insightsData) {
    addInsights(insightsData.parablesTeachings || [], 'parablesTeachings');
    addInsights(insightsData.historicalEvents || [], 'historicalEvents');
    addInsights(insightsData.lineages || [], 'lineages');
  }

  // Hardcoded dark mode classes
  const modeClass = 'bg-gray-800 text-gray-200';
  const dropdownClass = 'bg-gray-800 text-gray-200 shadow-lg shadow-gray-900/50';
  const hoverClass = 'hover:bg-gray-700';
  const savedColor = 'text-blue-300';
  const bookmarkColor = 'text-red-300';
  const noteColor = 'text-green-300';
  const insightColor = 'text-purple-300';
  const keyText = 'text-white';

  // Hardcoded font and size
  const sizeClass = 'text-base';
  const familyClass = 'font-friendly';

  // Note handlers
  const handleOpenNoteModal = (v) => {
    const existingNote = user?.notes?.find(
      (n) => n.book === book && n.chapter === Number(selectedChapter) && n.verse === Number(v)
    );
    if (existingNote) {
      setNoteText(existingNote.text);
      const idx = user.notes.indexOf(existingNote);
      setEditingNoteIndex(idx);
    } else {
      setNoteText('');
      setEditingNoteIndex(null);
    }
    setIsNoteModalOpen(true);
  };

  const handleAddNote = async (v) => {
    if (!noteText.trim()) {
      alert('Note cannot be empty');
      return;
    }
    if (editingNoteIndex !== null) {
      await deleteNote(editingNoteIndex);
    }
    await addNote({
      book,
      chapter: Number(selectedChapter),
      verse: Number(v),
      text: noteText,
      timestamp: new Date().toISOString(),
    });
    setNoteText('');
    setEditingNoteIndex(null);
    setIsNoteModalOpen(false);
    setActiveVerse(null);
  };

  const handleDeleteNote = async () => {
    if (editingNoteIndex !== null) {
      await deleteNote(editingNoteIndex);
      setNoteText('');
      setEditingNoteIndex(null);
      setIsNoteModalOpen(false);
      setActiveVerse(null);
    }
  };

  // Handlers (save/etc.)
  const handleSave = (v) => {
    const text = chapterData[v];
    saveVerse({
      book,
      chapter: Number(selectedChapter),
      verse: Number(v),
      text,
      translation: currentTranslation,
      timestamp: new Date().toISOString(),
    });
    alert('Verse saved!');
    setActiveVerse(null);
  };

  const handleShare = (v) => {
    const share = `${book} ${selectedChapter}:${v} "${chapterData[v]}" (${currentTranslation})`;
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(share)
        .then(() => alert('Verse copied!'))
        .catch(() => alert('Could not copy verse.'));
    }
    setActiveVerse(null);
  };

  const handleBookmark = (v) => {
    const exists =
      user?.bookmarks?.some(
        (b) =>
          b.book === book &&
          b.chapter === Number(selectedChapter) &&
          b.verse === Number(v)
      ) || false;
    if (exists) {
      unbookmark(book, Number(selectedChapter), Number(v));
      alert('Bookmark removed!');
    } else {
      addBookmark({
        book,
        chapter: Number(selectedChapter),
        verse: Number(v),
        text: chapterData[v],
        translation: currentTranslation,
        timestamp: new Date().toISOString(),
      });
      alert('Bookmark added!');
    }
    setActiveVerse(null);
  };

  // UI rendering
  if (!currentBibleData)
    return <div className="text-center p-8 text-gray-200">Loading Bible data...</div>;

  return (
    <div className={`relative p-4 sm:p-8 rounded-3xl shadow-xl border-4 border-gray-600 ${modeClass} ${sizeClass} ${familyClass}`}>
      {/* Back arrow */}
      <button
        onClick={() => navigate('/bible')}
        className="absolute top-0 left-0 text-blue-300 hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Bible Books"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {/* Icon key */}
      <div className={`mb-6 mt-[40px] p-4 rounded-2xl shadow-xl border border-gray-600 ${modeClass}`}>
        <h2 className={`text-lg font-bold mb-3 ${keyText}`}>Icon Key</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '⭐', label: 'Saved Verse', color: savedColor },
            { icon: '📝', label: 'Note', color: noteColor },
            { icon: '🔖', label: 'Bookmark', color: bookmarkColor },
            { icon: '📖', label: 'Insight', color: insightColor },
          ].map((it, i) => (
            <div key={i} className="flex items-center space-x-2">
              <span className={`text-lg ${it.color}`}>{it.icon}</span>
              <span className={`text-sm ${keyText}`}>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        {/* Selectors */}
        <div className="flex flex-wrap gap-4">
          {/* Book */}
          <Selector
            id="book"
            label="Book"
            value={selectedBook}
            onChange={(e) => {
              const b = e.target.value;
              if (b && currentBibleData[b]) {
                navigate(`/bible/${b}/1`);
              }
            }}
            options={Object.keys(currentBibleData).sort().map((b) => ({
              value: b,
              text: b,
            }))}
            disabled={false}
            modeClass={modeClass}
          />
          {/* Chapter */}
          <Selector
            id="chapter"
            label="Chapter"
            value={selectedChapter}
            onChange={(e) => {
              const ch = e.target.value;
              if (ch && bookData && bookData[ch]) {
                navigate(`/bible/${selectedBook}/${ch}`);
              }
            }}
            options={
              bookData
                ? Object.keys(bookData)
                    .sort((a, b) => Number(a) - Number(b))
                    .map((c) => ({ value: c, text: `Chapter ${c}` }))
                : []
            }
            disabled={!bookData}
            modeClass={modeClass}
          />
          {/* Translation */}
          <Selector
            id="translation"
            label="Translation"
            value={currentTranslation || 'NIV'}
            onChange={(e) => {
              const v = e.target.value;
              setCurrentTranslation(v);
            }}
            options={[
              { value: 'NIV', text: 'NIV' },
              { value: 'KJV', text: 'KJV' },
            ]}
            modeClass={modeClass}
          />
        </div>
        <h1 className="text-3xl font-bold text-white">
          {book} {selectedChapter}
        </h1>
      </div>
      {/* Error */}
      {error && (
        <p className="text-center text-red-300 mb-4">{error}</p>
      )}
      {/* Verses */}
      {chapterData ? (
        <div className={`space-y-2 sm:space-y-4 p-2 sm:p-4 rounded-md ${modeClass}`}>
          {verses.map((v) => {
            const highlight =
              user?.highlightedVerses?.some(
                (h) =>
                  h.book === book &&
                  h.chapter === Number(selectedChapter) &&
                  h.verse === Number(v)
              ) || false;
            const saved =
              user?.savedVerses?.some(
                (s) =>
                  s.book === book &&
                  s.chapter === Number(selectedChapter) &&
                  s.verse === Number(v)
              ) || false;
            const bookmarked =
              user?.bookmarks?.some(
                (b) =>
                  b.book === book &&
                  b.chapter === Number(selectedChapter) &&
                  b.verse === Number(v)
              ) || false;
            const noted =
              user?.notes?.some(
                (n) =>
                  n.book === book &&
                  n.chapter === Number(selectedChapter) &&
                  n.verse === Number(v)
              ) || false;
            const insight =
              Array.isArray(verseInsights[v]) && verseInsights[v].length
                ? verseInsights[v][0]
                : null;
            return (
              <div key={v} className="relative">
                {/* Verse line */}
                <p
                  id={`verse-${v}`}
                  onClick={() => setActiveVerse(activeVerse === v ? null : v)}
                  className={`${
                    highlight
                      ? 'bg-yellow-300 text-black'
                      : ''
                  } cursor-pointer select-text flex items-start`}
                >
                  <sup className="font-bold mr-2 flex-shrink-0">{v}</sup>
                  {saved && (
                    <InlineIcon
                      title="Unsave verse"
                      color={savedColor}
                      icon="⭐"
                      onClick={(e) => {
                        e.stopPropagation();
                        unsaveVerse(book, Number(selectedChapter), Number(v));
                      }}
                    />
                  )}
                  {bookmarked && (
                    <InlineIcon
                      title="Remove bookmark"
                      color={bookmarkColor}
                      icon="🔖"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(v);
                      }}
                    />
                  )}
                  {noted && (
                    <InlineIcon
                      title="View/Edit note"
                      color={noteColor}
                      icon="📝"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVerse(v);
                        handleOpenNoteModal(v);
                      }}
                    />
                  )}
                  {insight && (
                    <Link
                      to={`/insights?tab=${encodeURIComponent(
                        insight.tab
                      )}&id=${encodeURIComponent(insight.id)}`}
                      className={`mr-2 text-xs ${insightColor} cursor-pointer`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Learn about ${insight.title}`}
                      aria-label={`Learn about ${insight.title}`}
                    >
                      📖
                    </Link>
                  )}
                  <span className="flex-grow">{chapterData[v]}</span>
                </p>
                {/* Verse dropdown */}
                {activeVerse === v && (
                  <div className={`absolute left-0 z-10 mt-1 w-[80vw] md:w-64 rounded-md shadow-2xl ${dropdownClass}`}>
                    <DropdownButton
                      text="Save Verse"
                      onClick={() => handleSave(v)}
                      hoverClass={hoverClass}
                    />
                    <DropdownButton
                      text="Share Verse"
                      onClick={() => handleShare(v)}
                      hoverClass={hoverClass}
                    />
                    <DropdownButton
                      text={highlight ? 'Unhighlight Verse' : 'Highlight Verse'}
                      onClick={() => {
                        highlightVerse(book, Number(selectedChapter), Number(v));
                        setActiveVerse(null);
                      }}
                      hoverClass={hoverClass}
                    />
                    <DropdownButton
                      text={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                      onClick={() => handleBookmark(v)}
                      hoverClass={hoverClass}
                    />
                    <DropdownButton
                      text={noted ? 'Edit/View Note' : 'Add Note'}
                      onClick={() => handleOpenNoteModal(v)}
                      hoverClass={hoverClass}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-200">Loading chapter...</p>
      )}
      {/* Note modal */}
      {isNoteModalOpen && (
        <NoteModal
          modeClass={modeClass}
          noteText={noteText}
          setNoteText={setNoteText}
          onClose={() => {
            setNoteText('');
            setEditingNoteIndex(null);
            setIsNoteModalOpen(false);
            setActiveVerse(null);
          }}
          onSave={() => handleAddNote(activeVerse)}
          onDelete={editingNoteIndex !== null ? handleDeleteNote : undefined}
          heading={`${
            editingNoteIndex !== null ? 'Edit' : 'Add'
          } Note for ${book} ${selectedChapter}:${activeVerse}`}
        />
      )}
      {/* Chapter navigation */}
      <div className="mt-8 flex justify-between">
        {Number(selectedChapter) > 1 && (
          <Link
            to={`/bible/${book}/${Number(selectedChapter) - 1}`}
            className="text-blue-300 hover:underline"
          >
            Previous Chapter
          </Link>
        )}
        <Link
          to={`/bible/${book}`}
          className="text-blue-300 hover:underline"
        >
          Back to Chapters
        </Link>
        {bookData &&
          Number(selectedChapter) < Object.keys(bookData).length && (
            <Link
              to={`/bible/${book}/${Number(selectedChapter) + 1}`}
              className="text-blue-300 hover:underline"
            >
              Next Chapter
            </Link>
          )}
      </div>
      <button
        onClick={() => markCompleted(book, Number(selectedChapter))}
        className="mt-4 bg-green-700 text-white py-2 px-4 rounded-full hover:bg-green-600"
      >
        Mark Complete
      </button>
    </div>
  );
};

const Selector = ({ id, label, value, onChange, options, disabled, modeClass }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-white mb-1">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`p-2 rounded border border-gray-600 ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  </div>
);

const InlineIcon = ({ title, color, icon, onClick }) => (
  <span
    className={`mr-2 text-xs ${color} cursor-pointer`}
    title={title}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={onClick}
  >
    {icon}
  </span>
);

const DropdownButton = ({ text, onClick, hoverClass }) => (
  <button
    className={`block w-full text-left px-4 py-2 md:py-3 text-sm md:text-base ${hoverClass}`}
    onClick={onClick}
    type="button"
  >
    {text}
  </button>
);

const NoteModal = ({
  modeClass,
  noteText,
  setNoteText,
  onClose,
  onSave,
  onDelete,
  heading,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className={`w-4/5 max-w-md p-6 rounded-3xl shadow-2xl ${modeClass}`}>
      <h2 className="text-xl font-bold mb-4 text-white">
        {heading}
      </h2>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Enter your note..."
        rows="4"
        className={`w-full p-2 border border-gray-600 rounded-lg ${modeClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
      />
      <div className="flex justify-between gap-2 mt-4">
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="py-2 px-4 rounded-full bg-blue-700 text-white hover:bg-blue-500"
            type="button"
          >
            Save Note
          </button>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600"
            type="button"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  </div>
);

export default BibleReader;