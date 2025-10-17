import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { insightsData } from '../data/InsightsData.jsx';

const Insights = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lineages');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const id = params.get('id');
    if (tab && ['lineages', 'historicalEvents', 'parablesTeachings'].includes(tab)) {
      setActiveTab(tab);
    }
    if (id) {
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

    Object.entries(insightsData).forEach(([category, items]) => {
      items.forEach((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const descriptionMatch = item.description.toLowerCase().includes(query);
        const summaryMatch = item.summary.toLowerCase().includes(query);
        const analogyMatch = item.analogy ? item.analogy.toLowerCase().includes(query) : false;
        const contextMatch = item.context ? item.context.toLowerCase().includes(query) : false;
        const keyFiguresMatch = item.keyFigures ? item.keyFigures.some(fig => fig.toLowerCase().includes(query)) : false;

        if (titleMatch || descriptionMatch || summaryMatch || analogyMatch || contextMatch || keyFiguresMatch) {
          results.push({
            ...item,
            category,
            categoryName: category === 'lineages' ? 'Family Lineages' :
                         category === 'historicalEvents' ? 'Historical Events' :
                         'Jesus Parables & Teachings'
          });
        }
      });
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
              <p className="text-textGray mt-2"><span className="font-semibold">Context:</span> {item.context}</p>
            )}
            <div className="mt-2">
              {item.keyFigures && (
                <p className="text-textGray font-semibold">Key Figures: {item.keyFigures.join(', ') || 'N/A'}</p>
              )}
              <p className="text-textGray font-semibold">Related Verses:</p>
              <ul className="list-disc list-inside text-blue-500">
                {item.verseReferences.map((ref, index) => {
                  const [book, chapterVerse] = ref.split(' ');
                  const [chapter, verse] = chapterVerse.includes(':') ? chapterVerse.split(':') : [chapterVerse, null];
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

        {isSearching && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border-4 border-primaryBlue max-h-96 overflow-y-auto">
            <div className="p-4">
              <p className="text-sm text-gray-700 font-semibold mb-3">Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</p>
              {searchResults.map((item) => (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => handleSearchResultClick(item)}
                  className="w-full text-left p-4 hover:bg-blue-100 bg-white rounded-xl transition-all duration-200 mb-2 border-2 border-blue-200 shadow-md hover:shadow-lg hover:scale-102"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-primaryBlue text-lg">{item.title}</h4>
                      <p className="text-xs text-white bg-primaryBlue px-2 py-1 rounded-full inline-block mt-1 mb-2">{item.categoryName}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
                      {item.context && (
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1"><span className="font-semibold">Context:</span> {item.context}</p>
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
            <p className="text-gray-700 font-semibold text-lg">No insights found for &quot;{searchQuery}&quot;</p>
            <p className="text-sm text-gray-600 mt-2">Try searching for topics like &quot;Abraham&quot;, &quot;Creation&quot;, or &quot;Parables&quot;</p>
          </div>
        )}
      </div>

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
        <Link
          to="/religions"
          className="py-2 px-4 rounded-full text-sm font-semibold bg-blue-800 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          aria-label="View Religions and Denominations"
        >
          Religions & Denominations
        </Link>
      </div>

      {activeTab === 'lineages' && renderSection(insightsData.lineages, 'Family Lineages')}
      {activeTab === 'historicalEvents' && renderSection(insightsData.historicalEvents, 'Historical Events')}
      {activeTab === 'parablesTeachings' && renderSection(insightsData.parablesTeachings, 'Jesus Parables & Teachings')}
    </div>
  );
};

export default Insights;
