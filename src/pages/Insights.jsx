import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { insightsData } from '../data/InsightsData.js';
import { prophecyData } from '../data/prophecyData.jsx';

const Insights = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lineages');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [openProphecies, setOpenProphecies] = useState({}); // Track which prophecies are open

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const id = params.get('id');
    if (tab && ['lineages', 'historicalEvents', 'parablesTeachings', 'prophecies'].includes(tab)) {
      setActiveTab(tab);
    }
    if (id) {
      // If navigating to a specific prophecy, open it
      setOpenProphecies(prev => ({ ...prev, [id]: true }));
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

  const linkForRef = (ref) => {
    // Robust-ish parser for "Book Chapter:Verse-Verse" or "Book Chapter"
    // Falls back to plain text if it can’t parse
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
      <h2 className="text-2xl font-bold mb-4 text-primaryBlue">{sectionTitle}</h2>
      <div className="space-y-6">
        {sectionData.map((item) => (
          <div key={item.id} id={item.id} className="bg-white p-6 rounded-2xl shadow-xl border border-secondaryPurple">
            <h3 className="text-xl font-bold text-funPink">{item.title}</h3>
            <p className="text-textGray mt-2"><span className="font-semibold">Description:</span> {item.description}</p>
            <p className="text-textGray mt-2"><span className="font-semibold">Summary:</span> {item.summary}</p>
            {item.analogy && (
              <p className="text-textGray mt-2 italic"><span className="font-semibold not-italic">Analogy:</span> {item.analogy}</p>
            )}
            {item.context && (
              <p className="text-textGray mt-2"><span className="font-semibold">Historical Context:</span> {item.context}</p>
            )}
            <div className="mt-2">
              {item.keyFigures && (
                <p className="text-textGray font-semibold">Key Figures: {item.keyFigures.join(', ') || 'N/A'}</p>
              )}
              <p className="text-textGray font-semibold">Related Verses:</p>
              <ul className="list-disc list-inside text-blue-500">
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
      return <p className="text-center text-gray-500">No prophecy data available.</p>;
    }

    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primaryBlue">Biblical Prophecies</h2>
        <div className="space-y-4">
          {prophecyData.map((p) => {
            const isOpen = openProphecies[p.id] || false;
            
            return (
              <div key={p.id} id={p.id} className="bg-white rounded-2xl shadow-xl border border-secondaryPurple overflow-hidden">
                {/* Dropdown Header */}
                <button
                  onClick={() => toggleProphecy(p.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-label={`Toggle ${p.title}`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-funPink">{p.title}</h3>
                    {p.summary && (
                      <p className="text-textGray text-sm mt-1 line-clamp-2">{p.summary}</p>
                    )}
                  </div>
                  <svg
                    className={`w-6 h-6 text-primaryBlue transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Content */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    {/* Summary (full version when open) */}
                    {p.summary && (
                      <p className="text-textGray mt-4">
                        <span className="font-semibold">Summary:</span> {p.summary}
                      </p>
                    )}

                    {/* Core Metadata */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {p.book && (
                        <p className="text-textGray">
                          <span className="font-semibold">Book:</span> {p.book}{p.section ? ` — ${p.section}` : ''}
                        </p>
                      )}
                      {p.status && (
                        <p className="text-textGray">
                          <span className="font-semibold">Status:</span> {p.status}
                        </p>
                      )}
                      {p.speaker && (
                        <p className="text-textGray">
                          <span className="font-semibold">Speaker:</span> {p.speaker}
                        </p>
                      )}
                      {p.audience && (
                        <p className="text-textGray">
                          <span className="font-semibold">Audience:</span> {p.audience}
                        </p>
                      )}
                      {p.date_range && (
                        <p className="text-textGray">
                          <span className="font-semibold">Date:</span> {p.date_range}
                        </p>
                      )}
                      {p.location && (
                        <p className="text-textGray">
                          <span className="font-semibold">Location:</span> {p.location}
                        </p>
                      )}
                    </div>

                    {/* Scripture Text References */}
                    {p.text_refs && p.text_refs.length > 0 && (
                      <div className="mt-4">
                        <p className="text-textGray font-semibold">Scripture References:</p>
                        <ul className="list-disc list-inside text-blue-500">
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

                    {/* What/Why */}
                    {p.what && (
                      <p className="text-textGray mt-4">
                        <span className="font-semibold">What:</span> {p.what}
                      </p>
                    )}
                    {p.why && (
                      <p className="text-textGray mt-2">
                        <span className="font-semibold">Why:</span> {p.why}
                      </p>
                    )}

                    {/* Historical Context */}
                    {p.historical_context && (
                      <p className="text-textGray mt-4">
                        <span className="font-semibold">Historical Context:</span> {p.historical_context}
                      </p>
                    )}

                    {/* Significance */}
                    {p.significance && (
                      <p className="text-textGray mt-2">
                        <span className="font-semibold">Significance:</span> {p.significance}
                      </p>
                    )}

                    {/* Contemporary Belief */}
                    {p.contemporary_belief && (
                      <p className="text-textGray mt-2">
                        <span className="font-semibold">What People Believed:</span> {p.contemporary_belief}
                      </p>
                    )}

                    {/* Transmission */}
                    {p.transmission && (
                      <p className="text-textGray mt-2">
                        <span className="font-semibold">Transmission:</span> {p.transmission}
                      </p>
                    )}

                    {/* Analogy */}
                    {p.analogy && (
                      <p className="text-textGray mt-4 italic">
                        <span className="font-semibold not-italic">Analogy:</span> {p.analogy}
                      </p>
                    )}

                    {/* Fulfillment Analysis */}
                    {p.fulfillment_analysis && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-800 mb-2">Fulfillment Analysis:</p>
                        <p className="text-textGray">{p.fulfillment_analysis}</p>
                      </div>
                    )}

                    {/* Fulfillment Details */}
                    {Array.isArray(p.fulfillment_details) && p.fulfillment_details.length > 0 && (
                      <div className="mt-4">
                        <p className="text-textGray font-semibold">Detailed Fulfillments:</p>
                        <ul className="list-disc list-inside text-textGray ml-4 space-y-1">
                          {p.fulfillment_details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Fulfillment References */}
                    {Array.isArray(p.fulfillment_refs) && p.fulfillment_refs.length > 0 && (
                      <div className="mt-4">
                        <p className="text-textGray font-semibold">Fulfillment References:</p>
                        <ul className="list-disc list-inside text-blue-500">
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

                    {/* Cross References */}
                    {Array.isArray(p.cross_refs) && p.cross_refs.length > 0 && (
                      <div className="mt-4">
                        <p className="text-textGray font-semibold">Cross References:</p>
                        <ul className="list-disc list-inside text-blue-500">
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

                    {/* Theological Notes */}
                    {Array.isArray(p.theological_notes) && p.theological_notes.length > 0 && (
                      <p className="text-textGray mt-4">
                        <span className="font-semibold">Theological Notes:</span> {p.theological_notes.join(', ')}
                      </p>
                    )}

                    {/* Interpretive Views */}
                    {Array.isArray(p.interpretive_views) && p.interpretive_views.length > 0 && (
                      <p className="text-textGray mt-2">
                        <span className="font-semibold">Interpretive Views:</span> {p.interpretive_views.join(', ')}
                      </p>
                    )}

                    {/* Keywords */}
                    {Array.isArray(p.keywords) && p.keywords.length > 0 && (
                      <p className="text-textGray mt-2">
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

  return (
    <div className="relative container mx-auto px-4 py-8 max-w-7xl">
      <button
        onClick={() => navigate('/')}
        className="absolute top-[0px] left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Bible Books"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Bible Insights</h1>

      {/* Search */}
      <div className="relative mb-6 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search insights by title, topic, or person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pr-14 border-2 border-primaryBlue rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg bg-white"
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

        {/* Search Results */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border-4 border-primaryBlue max-h-96 overflow-y-auto">
            <div className="p-4">
              <p className="text-sm text-gray-700 font-semibold mb-3">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
              {searchResults.map((item) => (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => handleSearchResultClick(item)}
                  className="w-full text-left p-4 hover:bg-blue-100 bg-white rounded-xl transition-all duration-200 mb-2 border-2 border-blue-200 shadow-md hover:shadow-lg hover:scale-102"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-primaryBlue text-lg">{item.title}</h4>
                      <p className="text-xs text-white bg-primaryBlue px-2 py-1 rounded-full inline-block mt-1 mb-2">
                        {item.categoryName || 'Insights'}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {item.description || item.summary}
                      </p>
                      {(item.context || item.historical_context) && (
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          <span className="font-semibold">Historical Context:</span>{' '}
                          {item.context || item.historical_context}
                        </p>
                      )}
                    </div>
                    <span className="ml-4 text-blue-500 text-xl">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isSearching && searchResults.length === 0 && searchQuery.trim() !== '' && (
          <div className="absolute z-50 w-full mt-2 bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-2xl border-4 border-red-400 p-6 text-center">
            <p className="text-gray-700 font-semibold text-lg">No insights found for "{searchQuery}"</p>
            <p className="text-sm text-gray-600 mt-2">Try searching for topics like "Abraham", "Creation", or "Parables"</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('lineages')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${
            activeTab === 'lineages' ? 'bg-primaryBlue text-white' : 'bg-blue-800 text-white hover:bg-blue-700'
          } transition-all duration-300 hover:scale-105`}
          aria-label="View Family Lineages"
        >
          Family Lineages
        </button>
        <button
          onClick={() => setActiveTab('historicalEvents')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${
            activeTab === 'historicalEvents' ? 'bg-primaryBlue text-white' : 'bg-blue-800 text-white hover:bg-blue-700'
          } transition-all duration-300 hover:scale-105`}
          aria-label="View Historical Events"
        >
          Historical Events
        </button>
        <button
          onClick={() => setActiveTab('parablesTeachings')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${
            activeTab === 'parablesTeachings' ? 'bg-primaryBlue text-white' : 'bg-blue-800 text-white hover:bg-blue-700'
          } transition-all duration-300 hover:scale-105`}
          aria-label="View Jesus' Parables and Teachings"
        >
          Jesus Parables & Teachings
        </button>
        <button
          onClick={() => setActiveTab('prophecies')}
          className={`py-2 px-4 rounded-full text-sm font-semibold ${
            activeTab === 'prophecies' ? 'bg-primaryBlue text-white' : 'bg-blue-800 text-white hover:bg-blue-700'
          } transition-all duration-300 hover:scale-105`}
          aria-label="View Biblical Prophecies"
        >
          Prophecies
        </button>
        <Link
          to="/religions"
          className="py-2 px-4 rounded-full text-sm font-semibold bg-blue-800 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          aria-label="View Religions and Denominations"
        >
          Religions & Denominations
        </Link>
      </div>

      {/* Content */}
      {activeTab === 'lineages' && renderSection(insightsData.lineages, 'Family Lineages')}
      {activeTab === 'historicalEvents' && renderSection(insightsData.historicalEvents, 'Historical Events')}
      {activeTab === 'parablesTeachings' && renderSection(insightsData.parablesTeachings, 'Jesus Parables & Teachings')}
      {activeTab === 'prophecies' && renderProphecySection()}
    </div>
  );
};

export default Insights;