
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const religionsData = [
  {
    id: 'christianity',
    title: 'Christianity',
    shortDescription: 'A religion based on the life and teachings of Jesus Christ, believing He is God’s Son and Savior.',
    details: {
      history: 'Began about 2,000 years ago in Judea with Jesus’ teachings. Spread by disciples like Peter and Paul.',
      beliefs: 'Believe in one God, the Trinity (Father, Son, Holy Spirit), and salvation through Jesus’ death and resurrection.',
      practices: 'Prayer, Bible reading, worship in churches, sacraments like baptism and communion.',
      globalImpact: 'Over 2 billion followers worldwide, influencing culture, art, and charity.'
    }
  },
  {
    id: 'judaism',
    title: 'Judaism',
    shortDescription: 'The religion of the Jewish people, centered on the Torah and a covenant with God.',
    details: {
      history: 'Started over 3,500 years ago with Abraham and Moses. Centered in Israel, spread globally after exile.',
      beliefs: 'One God, the Torah as God’s law, and living ethically to follow God’s covenant.',
      practices: 'Observing Sabbath, kosher diet, festivals like Passover, and synagogue worship.',
      globalImpact: 'About 14 million Jews worldwide, shaping ethical laws and monotheism.'
    }
  },
  {
    id: 'islam',
    title: 'Islam',
    shortDescription: 'A religion teaching submission to Allah, based on the Quran and Prophet Muhammad’s teachings.',
    details: {
      history: 'Began in the 7th century in Mecca with Muhammad. Spread across the Middle East and beyond.',
      beliefs: 'One God (Allah), Muhammad as the final prophet, and following the Five Pillars.',
      practices: 'Prayer five times daily, fasting during Ramadan, charity, pilgrimage to Mecca.',
      globalImpact: 'Over 1.9 billion Muslims, influencing art, science, and culture.'
    }
  },
  {
    id: 'hinduism',
    title: 'Hinduism',
    shortDescription: 'An ancient religion from India with diverse beliefs, focusing on dharma and reincarnation.',
    details: {
      history: 'Over 4,000 years old, originating in India. No single founder, based on ancient texts like the Vedas.',
      beliefs: 'Many gods (e.g., Brahma, Vishnu, Shiva), reincarnation, karma, and living a good life.',
      practices: 'Worship in temples, festivals like Diwali, yoga, and meditation.',
      globalImpact: 'About 1.2 billion followers, shaping Indian culture and philosophy.'
    }
  },
  {
    id: 'buddhism',
    title: 'Buddhism',
    shortDescription: 'A path to enlightenment based on the teachings of Siddhartha Gautama, the Buddha.',
    details: {
      history: 'Founded around the 5th century BCE in India by Siddhartha Gautama. Spread across Asia.',
      beliefs: 'Four Noble Truths, Eightfold Path, achieving nirvana by overcoming desire.',
      practices: 'Meditation, mindfulness, ethical living, and honoring Buddhist teachings.',
      globalImpact: 'About 520 million followers, influencing peace and mindfulness practices.'
    }
  },
  {
    id: 'catholic',
    title: 'Catholic Christianity',
    shortDescription: 'The largest Christian denomination, led by the Pope, emphasizing tradition and sacraments.',
    details: {
      history: 'Traces to Jesus and Peter, formalized in the 1st century. Grew through the Roman Empire.',
      beliefs: 'Believes in the Trinity, Bible, and Church tradition. Salvation through faith and sacraments.',
      practices: 'Mass, seven sacraments (e.g., baptism, Eucharist), devotion to Mary and saints.',
      globalImpact: 'Over 1.3 billion Catholics, shaping education, hospitals, and charity.'
    }
  },
  {
    id: 'orthodox',
    title: 'Orthodox Christianity',
    shortDescription: 'A Christian denomination emphasizing ancient traditions and the Bible.',
    details: {
      history: 'Began with early Christianity, split from Catholicism in 1054 CE (Great Schism).',
      beliefs: 'Trinity, Bible, and salvation through faith and God’s grace. Focus on liturgy.',
      practices: 'Divine Liturgy, icons, fasting, and sacraments like baptism and chrismation.',
      globalImpact: 'About 260 million followers, strong in Eastern Europe and Russia.'
    }
  },
  {
    id: 'protestant',
    title: 'Protestant Christianity',
    shortDescription: 'A Christian group that broke from Catholicism, focusing on the Bible alone.',
    details: {
      history: 'Began in the 16th century with the Reformation, led by figures like Martin Luther.',
      beliefs: 'Salvation by faith alone, Bible as the sole authority, and the priesthood of all believers.',
      practices: 'Worship services, Bible study, baptism, and communion (varies by group).',
      globalImpact: 'Over 800 million Protestants, influencing democracy and literacy.'
    }
  },
  {
    id: 'baptist',
    title: 'Baptist Christianity',
    shortDescription: 'A Protestant denomination emphasizing believer’s baptism and local church freedom.',
    details: {
      history: 'Emerged in the 17th century from English Puritans, focusing on personal faith.',
      beliefs: 'Salvation through faith, Bible authority, and baptism by immersion for believers.',
      practices: 'Baptism of adults, congregational governance, and active missions.',
      globalImpact: 'About 100 million Baptists, strong in the U.S. and Africa.'
    }
  },
  {
    id: 'pentecostal',
    title: 'Pentecostal Christianity',
    shortDescription: 'A Protestant group emphasizing the Holy Spirit’s gifts, like speaking in tongues.',
    details: {
      history: 'Began in the early 20th century with the Azusa Street Revival in the U.S.',
      beliefs: 'Salvation through Jesus, Bible authority, and active Holy Spirit gifts.',
      practices: 'Lively worship, speaking in tongues, healing prayers, and evangelism.',
      globalImpact: 'About 280 million Pentecostals, growing in Latin America and Africa.'
    }
  }
];

const Religions = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState({});

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Please log in to view Religions and Denominations.</p>
      </div>
    );
  }

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Arrow */}
      <button
        onClick={() => navigate('/insights')}
        className="absolute top-0 left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Insights"
      >
        🡨
      </button>

      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Religions and Denominations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {religionsData.map((religion) => (
          <div key={religion.id} className="bg-white p-6 rounded-2xl shadow-xl border border-secondaryPurple">
            <h2 className="text-xl font-bold text-funPink">{religion.title}</h2>
            <p className="text-textGray mt-2">{religion.shortDescription}</p>
            <button
              onClick={() => toggleCard(religion.id)}
              className="text-blue-500 hover:underline mt-2"
              aria-expanded={expandedCards[religion.id] || false}
              aria-controls={`details-${religion.id}`}
            >
              {expandedCards[religion.id] ? 'Hide Details' : 'Show Details'}
            </button>
            <Link
              to={`/religions/${religion.id}`}
              className="ml-4 text-blue-500 hover:underline mt-2"
              aria-label={`View detailed information about ${religion.title}`}
            >
              Learn More
            </Link>
            {expandedCards[religion.id] && (
              <div id={`details-${religion.id}`} className="mt-4 text-textGray">
                <p><span className="font-semibold">History:</span> {religion.details.history}</p>
                <p className="mt-2"><span className="font-semibold">Beliefs:</span> {religion.details.beliefs}</p>
                <p className="mt-2"><span className="font-semibold">Practices:</span> {religion.details.practices}</p>
                <p className="mt-2"><span className="font-semibold">Global Impact:</span> {religion.details.globalImpact}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Religions;
