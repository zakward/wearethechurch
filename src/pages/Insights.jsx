
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { insightsData } from '../data/InsightsData.jsx';

const Insights = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lineages');

  // Read query parameters to set active tab and scroll to insight
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const id = params.get('id');
    if (tab && ['lineages', 'historicalEvents', 'parablesTeachings'].includes(tab)) {
      setActiveTab(tab);
    }
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.search]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Please log in to view Bible Insights.</p>
      </div>
    );
  }

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
      {/* Back Arrow */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-0 left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Home"
      >
        🡨
      </button>

      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Bible Insights</h1>

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
          Jesus' Parables & Teachings
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
      {activeTab === 'parablesTeachings' && renderSection(insightsData.parablesTeachings, 'Jesus’ Parables & Teachings')}
    </div>
  );
};

export default Insights;
