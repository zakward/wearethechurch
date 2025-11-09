import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { insightsData } from '../data/InsightsData.js';
import { prophecyData } from '../data/prophecyData.jsx';
import { bibleBooksData, nonCanonicalBooksData } from '../data/BibleBooksAuthorData.js';

const Insights = () => {
  const { user, readerSettings, updateReaderSettings } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lineages');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [openProphecies, setOpenProphecies] = useState({});
  const [openBooks, setOpenBooks] = useState({});

  // Mode, font size, font family from settings
  const mode = readerSettings?.mode || 'light';
  const fontSize = readerSettings?.fontSize || 'base';
  const fontFamily = readerSettings?.fontFamily || 'friendly';

  // Dynamic classes
  let bgClass = 'bg-white';
  let textClass = 'text-textGray';
  let headerClass = 'text-primaryBlue';
  let accentClass = 'text-funPink';
  let borderClass = 'border-secondaryPurple';
  let hoverBg = 'hover:bg-gray-50';
  let searchBg = 'bg-gradient-to-br from-white to-blue-50';
  let searchBorder = 'border-primaryBlue';
  let dropdownBg = 'bg-white';
  let linkColor = 'text-blue-500';
  let buttonBg = 'bg-primaryBlue';
  let buttonText = 'text-white';
  let hoverButtonBg = 'hover:bg-blue-700';
  let grayBg = 'bg-gray-50';
  let grayBorder = 'border-gray-200';
  let inputBg = 'bg-white';
  let selectorBg = 'bg-white';
  let selectorText = 'text-gray-800';

  if (mode === 'dark') {
    bgClass = 'bg-gray-800';
    textClass = 'text-gray-200';
    headerClass = 'text-blue-300';
    accentClass = 'text-pink-300';
    borderClass = 'border-gray-600';
    hoverBg = 'hover:bg-gray-700';
    searchBg = 'bg-gradient-to-br from-gray-800 to-gray-600';
    searchBorder = 'border-blue-500';
    dropdownBg = 'bg-gray-800';
    linkColor = 'text-blue-300';
    buttonBg = 'bg-blue-700';
    buttonText = 'text-white';
    hoverButtonBg = 'hover:bg-blue-500';
    grayBg = 'bg-gray-700';
    grayBorder = 'border-gray-500';
    inputBg = 'bg-gray-700';
    selectorBg = 'bg-gray-700';
    selectorText = 'text-gray-200';
  } else if (mode === 'sepia') {
    bgClass = 'bg-[#E8D9B8]';
    textClass = 'text-[#5F4B32]';
    headerClass = 'text-[#8B4513]';
    accentClass = 'text-[#A0522D]';
    borderClass = 'border-[#D2B48C]';
    hoverBg = 'hover:bg-[#D2B48C]';
    searchBg = 'bg-gradient-to-br from-[#FBF0D9] to-[#E8D9B8]';
    searchBorder = 'border-[#8B4513]';
    dropdownBg = 'bg-[#FBF0D9]';
    linkColor = 'text-[#5F4B32]';
    buttonBg = 'bg-[#A0522D]';
    buttonText = 'text-white';
    hoverButtonBg = 'hover:bg-[#8B4513]';
    grayBg = 'bg-[#D2B48C]';
    grayBorder = 'border-[#A0522D]';
    inputBg = 'bg-[#FBF0D9]';
    selectorBg = 'bg-[#FBF0D9]';
    selectorText = 'text-[#5F4B32]';
  } else if (mode === 'high-contrast') {
    bgClass = 'bg-black';
    textClass = 'text-yellow-300';
    headerClass = 'text-yellow-400';
    accentClass = 'text-red-300';
    borderClass = 'border-white';
    hoverBg = 'hover:bg-gray-800';
    searchBg = 'bg-gradient-to-br from-black to-gray-800';
    searchBorder = 'border-yellow-300';
    dropdownBg = 'bg-black';
    linkColor = 'text-white';
    buttonBg = 'bg-blue-500';
    buttonText = 'text-white';
    hoverButtonBg = 'hover:bg-blue-300';
    grayBg = 'bg-gray-900';
    grayBorder = 'border-white';
    inputBg = 'bg-gray-900';
    selectorBg = 'bg-gray-900';
    selectorText = 'text-yellow-300';
  }

  const sizeClass = fontSize === 'base' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl';
  const familyClass = fontFamily === 'friendly' ? 'font-friendly' : fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const id = params.get('id');
    if (tab && ['lineages', 'historicalEvents', 'parablesTeachings', 'prophecies', 'bibleBooks'].includes(tab)) {
      setActiveTab(tab);
    }
    if (id) {
      if (tab === 'prophecies') {
        setOpenProphecies(prev => ({ ...prev, [id]: true }));
      } else if (tab === 'bibleBooks') {
        setOpenBooks(prev => ({ ...prev, [id]: true }));
      }
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.search]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const results = [];

    // Search in existing insights categories
    Object.entries(insightsData).forEach(([category, items]) => {
      items.forEach((item) => {
        const titleMatch = item.title?.toLowerCase().includes(query);
        const descriptionMatch = item.description?.toLowerCase().includes(query);
        const summaryMatch = item.summary?.toLowerCase().includes(query);
        const analogyMatch = item.analogy ? item.analogy.toLowerCase().includes(query) : false;
        const contextMatch = item.context ? item.context.toLowerCase().includes(query) : false;
        const keyFiguresMatch = item.keyFigures ? item.keyFigures.some(fig => fig.toLowerCase().includes(query)) : false;

        if (titleMatch || descriptionMatch || summaryMatch || analogyMatch || contextMatch || keyFiguresMatch) {
          results.push({
            ...item,
            category,
            categoryName:
              category === 'lineages' ? 'Family Lineages' :
              category === 'historicalEvents' ? 'Historical Events' :
              'Jesus Parables & Teachings'
          });
        }
      });
    });

    // Search in prophecies
    if (Array.isArray(prophecyData)) {
      prophecyData.forEach((item) => {
        const titleMatch = item.title?.toLowerCase().includes(query);
        const summaryMatch = item.summary?.toLowerCase().includes(query);
        const analogyMatch = item.analogy?.toLowerCase().includes(query);
        const bookMatch = item.book?.toLowerCase().includes(query);
        const speakerMatch = item.speaker?.toLowerCase().includes(query);
        const whatMatch = item.what?.toLowerCase().includes(query);
        const whyMatch = item.why?.toLowerCase().includes(query);
        const contextMatch = item.historical_context?.toLowerCase().includes(query);
        const significanceMatch = item.significance?.toLowerCase().includes(query);
        const beliefMatch = item.contemporary_belief?.toLowerCase().includes(query);
        const transmissionMatch = item.transmission?.toLowerCase().includes(query);
        const keywordsMatch = item.keywords ? item.keywords.some(kw => kw.toLowerCase().includes(query)) : false;

        if (
          titleMatch || summaryMatch || analogyMatch || bookMatch || speakerMatch || whatMatch || whyMatch ||
          contextMatch || significanceMatch || beliefMatch || transmissionMatch || keywordsMatch
        ) {
          results.push({
            ...item,
            category: 'prophecies',
            categoryName: 'Prophecies'
          });
        }
      });
    }

    // Search in bible books
    [...bibleBooksData.oldTestament, ...bibleBooksData.newTestament, ...nonCanonicalBooksData].forEach((item) => {
      const titleMatch = item.title?.toLowerCase().includes(query);
      const authorMatch = item.author?.toLowerCase().includes(query);
      const summaryMatch = item.summary?.toLowerCase().includes(query);
      const contextMatch = item.geographical_location?.toLowerCase().includes(query);
      const significanceMatch = item.significance?.toLowerCase().includes(query);
      const whyIncludedMatch = item.why_included ? item.why_included.toLowerCase().includes(query) : false;
      const reasonsNotIncludedMatch = item.reasons_not_included ? item.reasons_not_included.toLowerCase().includes(query) : false;
      const versesMatch = item.significant_verses ? item.significant_verses.some(v => v.toLowerCase().includes(query)) : false;
      const analogyMatch = item.analogy ? item.analogy.toLowerCase().includes(query) : false;

      if (titleMatch || authorMatch || summaryMatch || contextMatch || significanceMatch || whyIncludedMatch || reasonsNotIncludedMatch || versesMatch || analogyMatch) {
        results.push({
          ...item,
          category: 'bibleBooks',
          categoryName: 'Bible Books'
        });
      }
    });

    setSearchResults(results);
  }, [searchQuery]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Please log in to view Bible Insights.</p>
      </div>
    );
  }

  const handleSearchResultClick = (item) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setActiveTab(item.category);
    navigate(`/insights?tab=${item.category}&id=${item.id}`);
  };

  const toggleProphecy = (id) => {
    setOpenProphecies(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleBook = (id) => {
    setOpenBooks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const linkForRef = (ref) => {
    const cleanRef = ref.replace(' (NIV)', '').trim();
    const match = cleanRef.match(/^(\d?\s?[A-Za-z]+(?:\s[A-Za-z]+)*)\s+(\d+)(?::(\d+))?/);
    if (!match) return { href: null, label: cleanRef };
    const book = match[1].replace(/\s/g, '');
    const chapter = match[2];
    const verse = match[3];
    const href = `/bible/${book}/${chapter}${verse ? `#verse-${verse}` : ''}`;
    return { href, label: cleanRef };
  };

  const renderSection = (sectionData, sectionTitle) => (
    <div>
      <h2 className={`text-2xl font-bold mb-4 ${headerClass}`}>{sectionTitle}</h2>
      <div className="space-y-6">
        {sectionData.map((item) => (
          <div key={item.id} id={item.id} className={`${bgClass} p-6 rounded-2xl shadow-xl border ${borderClass}`}>
            <h3 className={`text-xl font-bold ${accentClass}`}>{item.title}</h3>
            <p className={`${textClass} mt-2`}><span className="font-semibold">Description:</span> {item.description}</p>
            <p className={`${textClass} mt-2`}><span className="font-semibold">Summary:</span> {item.summary}</p>
            {item.analogy && (
              <p className={`${textClass} mt-2 italic`}><span className="font-semibold not-italic">Analogy:</span> {item.analogy}</p>
            )}
            {item.context && (
              <p className={`${textClass} mt-2`}><span className="font-semibold">Historical Context:</span> {item.context}</p>
            )}
            <div className="mt-2">
              {item.keyFigures && (
                <p className={`${textClass} font-semibold`}>Key Figures: {item.keyFigures.join(', ') || 'N/A'}</p>
              )}
              <p className={`${textClass} font-semibold`}>Related Verses:</p>
              <ul className={`list-disc list-inside ${linkColor}`}>
                {item.verseReferences.map((ref, index) => {
                  const [book, chapterVerse] = ref.split(' ');
                  const [chapter, verse] = chapterVerse?.includes(':') ? chapterVerse.split(':') : [chapterVerse, null];
                  return (
                    <li key={index}>
                      <Link
                        to={`/bible/${book}/${chapter}${verse ? `#verse-${verse}` : ''}`}
                        className="hover:underline"
                        aria-label={`Read ${ref}`}
                      >
                        {ref}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProphecySection = () => {
    if (!Array.isArray(prophecyData) || prophecyData.length === 0) {
      return <p className={`text-center ${textClass}`}>No prophecy data available.</p>;
    }

    return (
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${headerClass}`}>Biblical Prophecies</h2>
        <div className="space-y-4">
          {prophecyData.map((p) => {
            const isOpen = openProphecies[p.id] || false;
            
            return (
              <div key={p.id} id={p.id} className={`${bgClass} rounded-2xl shadow-xl border ${borderClass} overflow-hidden`}>
                <button
                  onClick={() => toggleProphecy(p.id)}
                  className={`w-full p-6 flex items-center justify-between ${hoverBg} transition-colors duration-200`}
                  aria-expanded={isOpen}
                  aria-label={`Toggle ${p.title}`}
                >
                  <div className="flex-1 text-left">
                    <h3 className={`text-xl font-bold ${accentClass}`}>{p.title}</h3>
                    {p.summary && (
                      <p className={`${textClass} text-sm mt-1 line-clamp-2`}>{p.summary}</p>
                    )}
                  </div>
                  <svg
                    className={`w-6 h-6 ${linkColor} transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className={`px-6 pb-6 border-t ${grayBorder}`}>
                    {p.summary && (
                      <p className={`${textClass} mt-4`}>
                        <span className="font-semibold">Summary:</span> {p.summary}
                      </p>
                    )}

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {p.book && (
                        <p className={`${textClass}`}>
                          <span className="font-semibold">Book:</span> {p.book}{p.section ? ` — ${p.section}` : ''}
                        </p>
                      )}
                      {p.status && (
                        <p className={`${textClass}`}>
                          <span className="font-semibold">Status:</span> {p.status}
                        </p>
                      )}
                      {p.speaker && (
                        <p className={`${textClass}`}>
                          <span className="font-semibold">Speaker:</span> {p.speaker}
                        </p>
                      )}
                      {p.audience && (
                        <p className={`${textClass}`}>
                          <span className="font-semibold">Audience:</span> {p.audience}
                        </p>
                      )}
                      {p.date_range && (
                        <p className={`${textClass}`}>
                          <span className="font-semibold">Date:</span> {p.date_range}
                        </p>
                      )}
                      {p.location && (
                        <p className={`${textClass}`}>
                          <span className="font-semibold">Location:</span> {p.location}
                        </p>
                      )}
                    </div>

                    {p.text_refs && p.text_refs.length > 0 && (
                      <div className="mt-4">
                        <p className={`${textClass} font-semibold`}>Scripture References:</p>
                        <ul className={`list-disc list-inside ${linkColor}`}>
                          {p.text_refs.map((ref, idx) => {
                            const { href, label } = linkForRef(ref);
                            return (
                              <li key={idx}>
                                {href ? (
                                  <Link to={href} className="hover:underline" aria-label={`Read ${label}`}>
                                    {label}
                                  </Link>
                                ) : (
                                  <span>{label}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {p.what && (
                      <p className={`${textClass} mt-4`}>
                        <span className="font-semibold">What:</span> {p.what}
                      </p>
                    )}
                    {p.why && (
                      <p className={`${textClass} mt-2`}>
                        <span className="font-semibold">Why:</span> {p.why}
                      </p>
                    )}

                    {p.historical_context && (
                      <p className={`${textClass} mt-4`}>
                        <span className="font-semibold">Historical Context:</span> {p.historical_context}
                      </p>
                    )}

                    {p.significance && (
                      <p className={`${textClass} mt-2`}>
                        <span className="font-semibold">Significance:</span> {p.significance}
                      </p>
                    )}

                    {p.contemporary_belief && (
                      <p className={`${textClass} mt-2`}>
                        <span className="font-semibold">What People Believed:</span> {p.contemporary_belief}
                      </p>
                    )}

                    {p.transmission && (
                      <p className={`${textClass} mt-2`}>
                        <span className="font-semibold">Transmission:</span> {p.transmission}
                      </p>
                    )}

                    {p.analogy && (
                      <p className={`${textClass} mt-4 italic`}>
                        <span className="font-semibold not-italic">Analogy:</span> {p.analogy}
                      </p>
                    )}

                    {p.fulfillment_analysis && (
                      <div className={`mt-4 ${grayBg} p-4 rounded-lg border ${grayBorder}`}>
                        <p className={`font-semibold ${textClass} mb-2`}>Fulfillment Analysis:</p>
                        <p className={`${textClass}`}>{p.fulfillment_analysis}</p>
                      </div>
                    )}

                    {Array.isArray(p.fulfillment_details) && p.fulfillment_details.length > 0 && (
                      <div className="mt-4">
                        <p className={`${textClass} font-semibold`}>Detailed Fulfillments:</p>
                        <ul className={`list-disc list-inside ${textClass} ml-4 space-y-1`}>
                          {p.fulfillment_details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(p.fulfillment_refs) && p.fulfillment_refs.length > 0 && (
                      <div className="mt-4">
                        <p className={`${textClass} font-semibold`}>Fulfillment References:</p>
                        <ul className={`list-disc list-inside ${linkColor}`}>
                          {p.fulfillment_refs.map((ref, idx) => {
                            const { href, label } = linkForRef(ref);
                            return (
                              <li key={idx}>
                                {href ? (
                                  <Link to={href} className="hover:underline" aria-label={`Read ${label}`}>
                                    {label}
                                  </Link>
                                ) : (
                                  <span>{label}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(p.cross_refs) && p.cross_refs.length > 0 && (
                      <div className="mt-4">
                        <p className={`${textClass} font-semibold`}>Cross References:</p>
                        <ul className={`list-disc list-inside ${linkColor}`}>
                          {p.cross_refs.map((ref, idx) => {
                            const { href, label } = linkForRef(ref);
                            return (
                              <li key={idx}>
                                {href ? (
                                  <Link to={href} className="hover:underline" aria-label={`Read ${label}`}>
                                    {label}
                                  </Link>
                                ) : (
                                  <span>{label}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(p.theological_notes) && p.theological_notes.length > 0 && (
                      <p className={`${textClass} mt-4`}>
                        <span className="font-semibold">Theological Notes:</span> {p.theological_notes.join(', ')}
                      </p>
                    )}

                    {Array.isArray(p.interpretive_views) && p.interpretive_views.length > 0 && (
                      <p className={`${textClass} mt-2`}>
                        <span className="font-semibold">Interpretive Views:</span> {p.interpretive_views.join(', ')}
                      </p>
                    )}

                    {Array.isArray(p.keywords) && p.keywords.length > 0 && (
                      <p className={`${textClass} mt-2`}>
                        <span className="font-semibold">Keywords:</span> {p.keywords.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBibleBooksSection = () => {
    if (!bibleBooksData || !nonCanonicalBooksData) {
      return <p className={`text-center ${textClass}`}>No Bible books data available.</p>;
    }

    const categories = {
      'Old Testament': bibleBooksData.oldTestament,
      'New Testament': bibleBooksData.newTestament,
      'Non-Canonical New Testament Books': nonCanonicalBooksData
    };

    return (
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${headerClass}`}>Bible Books</h2>
        {Object.entries(categories).map(([catName, books]) => (
          <div key={catName} className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${accentClass}`}>{catName}</h3>
            <div className="space-y-4">
              {books.map((b) => {
                const isOpen = openBooks[b.id] || false;
                return (
                  <div key={b.id} id={b.id} className={`${bgClass} rounded-2xl shadow-xl border ${borderClass} overflow-hidden`}>
                    <button
                      onClick={() => toggleBook(b.id)}
                      className={`w-full p-6 flex items-center justify-between ${hoverBg} transition-colors duration-200`}
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${b.title}`}
                    >
                      <div className="flex-1 text-left">
                        <h4 className={`text-xl font-bold ${accentClass}`}>{b.title}</h4>
                        {b.summary && (
                          <p className={`${textClass} text-sm mt-1 line-clamp-2`}>{b.summary}</p>
                        )}
                      </div>
                      <svg
                        className={`w-6 h-6 ${linkColor} transition-transform duration-300 flex-shrink-0 ml-4 ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className={`px-6 pb-6 border-t ${grayBorder}`}>
                        {b.summary && (
                          <p className={`${textClass} mt-4`}>
                            <span className="font-semibold">Summary:</span> {b.summary}
                          </p>
                        )}

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                          {b.author && (
                            <p className={`${textClass}`}>
                              <span className="font-semibold">Author:</span> {b.author}
                            </p>
                          )}
                          {b.date_range && (
                            <p className={`${textClass}`}>
                              <span className="font-semibold">Date Range:</span> {b.date_range}
                            </p>
                          )}
                        </div>

                        {b.geographical_location && (
                          <p className={`${textClass} mt-4`}>
                            <span className="font-semibold">Geographical Location:</span> {b.geographical_location}
                          </p>
                        )}

                        {b.significance && (
                          <p className={`${textClass} mt-2`}>
                            <span className="font-semibold">Significance:</span> {b.significance}
                          </p>
                        )}

                        {b.why_included && (
                          <p className={`${textClass} mt-2`}>
                            <span className="font-semibold">Why Included:</span> {b.why_included}
                          </p>
                        )}

                        {b.reasons_not_included && (
                          <p className={`${textClass} mt-2`}>
                            <span className="font-semibold">Reasons Not Included:</span> {b.reasons_not_included}
                          </p>
                        )}

                        {b.analogy && (
                          <p className={`${textClass} mt-4 italic`}>
                            <span className="font-semibold not-italic">Analogy:</span> {b.analogy}
                          </p>
                        )}

                        {b.significant_verses && b.significant_verses.length > 0 && (
                          <div className="mt-4">
                            <p className={`${textClass} font-semibold`}>Significant Verses:</p>
                            <ul className={`list-disc list-inside ${linkColor}`}>
                              {b.significant_verses.map((ref, idx) => {
                                const { href, label } = linkForRef(ref);
                                return (
                                  <li key={idx}>
                                    {href ? (
                                      <Link to={href} className="hover:underline" aria-label={`Read ${label}`}>
                                        {label}
                                      </Link>
                                    ) : (
                                      <span>{label}</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`relative container mx-auto px-4 py-8 max-w-7xl ${bgClass} ${textClass} ${sizeClass} ${familyClass}`}>
      <button
        onClick={() => navigate('/')}
        className={`absolute top-[0px] left-0 ${linkColor} hover:opacity-70 text-lg p-2 transition-all duration-300`}
        aria-label="Back to Bible Books"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className={`text-4xl font-bold mb-8 ${headerClass} text-center`}>Bible Insights</h1>

      {/* Settings selectors */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <Selector
          id="mode"
          label="Mode"
          value={mode}
          onChange={(e) => updateReaderSettings({ mode: e.target.value })}
          options={[
            { value: 'light', text: 'Light' },
            { value: 'dark', text: 'Dark' },
            { value: 'sepia', text: 'Sepia' },
            { value: 'high-contrast', text: 'High Contrast' },
          ]}
          bgClass={selectorBg}
          textClass={selectorText}
          labelClass={headerClass}
        />
        <Selector
          id="fontSize"
          label="Font Size"
          value={fontSize}
          onChange={(e) => updateReaderSettings({ fontSize: e.target.value })}
          options={[
            { value: 'base', text: 'Base' },
            { value: 'lg', text: 'Large' },
            { value: 'xl', text: 'X-Large' },
          ]}
          bgClass={selectorBg}
          textClass={selectorText}
          labelClass={headerClass}
        />
        <Selector
          id="fontFamily"
          label="Font Family"
          value={fontFamily}
          onChange={(e) => updateReaderSettings({ fontFamily: e.target.value })}
          options={[
            { value: 'friendly', text: 'Friendly' },
            { value: 'serif', text: 'Serif' },
            { value: 'sans', text: 'Sans' },
          ]}
          bgClass={selectorBg}
          textClass={selectorText}
          labelClass={headerClass}
        />
      </div>

      <div className="text-center mb-6">
        <Link
          to="/quiz"
          className="py-2 px-4 rounded-full text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-all duration-300 hover:scale-105"
          aria-label="Take the Bible Quiz"
        >
          Test Your Knowledge - Take the Quiz!
        </Link>
      </div>

      <div className="relative mb-6 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search insights by title, topic, or person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full p-4 pr-14 border-2 ${searchBorder} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ${inputBg} ${textClass}`}
            aria-label="Search insights"
          />
          {searchQuery ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setIsSearching(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-3xl font-bold transition-colors duration-200"
              aria-label="Clear search"
            >
              ✕
            </button>
          ) : (
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">🔍</span>
          )}
        </div>

        {isSearching && searchResults.length > 0 && (
          <div className={`absolute z-50 w-full mt-2 ${searchBg} rounded-2xl shadow-2xl border-4 ${searchBorder} max-h-96 overflow-y-auto`}>
            <div className="p-4">
              <p className={`text-sm ${textClass} font-semibold mb-3`}>
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
              {searchResults.map((item) => (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => handleSearchResultClick(item)}
                  className={`w-full text-left p-4 ${hoverBg} ${bgClass} rounded-xl transition-all duration-200 mb-2 border-2 ${borderClass} shadow-md hover:shadow-lg hover:scale-102`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-bold ${headerClass} text-lg`}>{item.title}</h4>
                      <p className={`text-xs ${buttonBg} ${buttonText} px-2 py-1 rounded-full inline-block mt-1 mb-2`}>
                        {item.categoryName || 'Insights'}
                      </p>
                      <p className={`text-sm ${textClass} line-clamp-2`}>
                        {item.description || item.summary}
                      </p>
                      {(item.context || item.geographical_location) && (
                        <p className={`text-sm ${textClass} line-clamp-2 mt-1`}>
                          <span className="font-semibold">Location:</span>{' '}
                          {item.context || item.geographical_location}
                        </p>
                      )}
                    </div>
                    <span className={`ml-4 ${linkColor} text-xl`}>→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isSearching && searchResults.length === 0 && searchQuery.trim() !== '' && (
          <div className={`absolute z-50 w-full mt-2 ${searchBg} rounded-2xl shadow-2xl border-4 border-red-400 p-6 text-center`}>
            <p className={`${textClass} font-semibold text-lg`}>No insights found for "{searchQuery}"</p>
            <p className={`text-sm ${textClass} mt-2`}>Try searching for topics like "Abraham", "Creation", or "Parables"</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('lineages')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${activeTab === 'lineages' ? `${buttonBg} ${buttonText}` : `bg-blue-800 ${buttonText} ${hoverButtonBg}`} transition-all duration-300 hover:scale-105`}
          aria-label="View Family Lineages"
        >
          Family Lineages
        </button>
        <button
          onClick={() => setActiveTab('historicalEvents')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${activeTab === 'historicalEvents' ? `${buttonBg} ${buttonText}` : `bg-blue-800 ${buttonText} ${hoverButtonBg}`} transition-all duration-300 hover:scale-105`}
          aria-label="View Historical Events"
        >
          Historical Events
        </button>
        <button
          onClick={() => setActiveTab('parablesTeachings')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${activeTab === 'parablesTeachings' ? `${buttonBg} ${buttonText}` : `bg-blue-800 ${buttonText} ${hoverButtonBg}`} transition-all duration-300 hover:scale-105`}
          aria-label="View Jesus' Parables and Teachings"
        >
          Jesus Parables & Teachings
        </button>
        <button
          onClick={() => setActiveTab('prophecies')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${activeTab === 'prophecies' ? `${buttonBg} ${buttonText}` : `bg-blue-800 ${buttonText} ${hoverButtonBg}`} transition-all duration-300 hover:scale-105`}
          aria-label="View Biblical Prophecies"
        >
          Prophecies
        </button>
        <button
          onClick={() => setActiveTab('bibleBooks')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${activeTab === 'bibleBooks' ? `${buttonBg} ${buttonText}` : `bg-blue-800 ${buttonText} ${hoverButtonBg}`} transition-all duration-300 hover:scale-105`}
          aria-label="View Bible Books"
        >
          Bible Books
        </button>
        <Link
          to="/religions"
          className={`py-2 px-4 rounded-full text-sm font-semibold ${buttonBg} ${buttonText} ${hoverButtonBg} transition-all duration-300 hover:scale-105`}
          aria-label="View Religions and Denominations"
        >
          Religions & Denominations
        </Link>
      </div>

      {activeTab === 'lineages' && renderSection(insightsData.lineages, 'Family Lineages')}
      {activeTab === 'historicalEvents' && renderSection(insightsData.historicalEvents, 'Historical Events')}
      {activeTab === 'parablesTeachings' && renderSection(insightsData.parablesTeachings, 'Jesus Parables & Teachings')}
      {activeTab === 'prophecies' && renderProphecySection()}
      {activeTab === 'bibleBooks' && renderBibleBooksSection()}
    </div>
  );
};

const Selector = ({ id, label, value, onChange, options, bgClass, textClass, labelClass }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className={`text-sm font-medium mb-1 ${labelClass || 'text-gray-700'}`}>
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${bgClass || 'bg-white'} ${textClass || 'text-gray-800'}`}
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
    </select>
  </div>
);

export default Insights;