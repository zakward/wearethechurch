
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const religionsData = [
  {
    id: 'christianity',
    title: 'Christianity',
    shortDescription: 'A religion based on the life and teachings of Jesus Christ, believing He is God’s Son and Savior.',
    details: {
      history: 'Christianity began about 2,000 years ago in Judea (modern-day Israel) with the teachings of Jesus Christ. After His death and resurrection, His disciples, like Peter and Paul, spread the message across the Roman Empire. It became the official religion of Rome in the 4th century under Emperor Constantine. Over centuries, it grew into various denominations, shaping Western culture.',
      beliefs: 'Christians believe in one God in three persons (Trinity: Father, Son, Holy Spirit). Jesus, God’s Son, died for humanity’s sins and rose again, offering salvation to those who believe. The Bible (Old and New Testaments) is God’s word, guiding faith and life.',
      practices: 'Christians pray, read the Bible, and worship in churches. Key practices include baptism (joining the faith) and communion (remembering Jesus’ sacrifice). Holidays like Christmas (Jesus’ birth) and Easter (resurrection) are celebrated. Charity and community service are central.',
      globalImpact: 'With over 2 billion followers, Christianity is the world’s largest religion. It has influenced art (e.g., Renaissance paintings), music (e.g., hymns), education (e.g., universities like Harvard), and charity (e.g., Red Cross). It’s found in every continent, with diverse expressions.'
    }
  },
  {
    id: 'judaism',
    title: 'Judaism',
    shortDescription: 'The religion of the Jewish people, centered on the Torah and a covenant with God.',
    details: {
      history: 'Judaism began over 3,500 years ago with Abraham, who made a covenant with God. Moses received the Torah at Mount Sinai, shaping Jewish law. After exile in Babylon and dispersion (Diaspora), Jewish communities thrived globally, despite challenges like the Holocaust.',
      beliefs: 'Jews believe in one God, who chose them to follow His laws in the Torah. Ethical living, justice, and studying scripture are key. They await a Messiah to bring peace. The covenant with God defines their identity as a people.',
      practices: 'Practices include keeping the Sabbath (rest day), eating kosher food, and celebrating festivals like Passover (freedom from Egypt) and Yom Kippur (atonement). Synagogue worship, prayer, and study of the Torah and Talmud are central.',
      globalImpact: 'With about 14 million Jews, Judaism has shaped monotheism, influencing Christianity and Islam. Jewish contributions to science, literature, and ethics (e.g., Ten Commandments) are significant. Communities thrive in Israel, the U.S., and worldwide.'
    }
  },
  {
    id: 'islam',
    title: 'Islam',
    shortDescription: 'A religion teaching submission to Allah, based on the Quran and Prophet Muhammad’s teachings.',
    details: {
      history: 'Islam began in the 7th century in Mecca, Saudi Arabia, when Muhammad received revelations from Allah. These became the Quran. After Muhammad’s death, Islam spread across the Middle East, Africa, and Asia, forming empires like the Ottoman.',
      beliefs: 'Muslims believe in one God (Allah) and Muhammad as His final prophet, following earlier prophets like Abraham and Jesus. The Five Pillars (faith, prayer, charity, fasting, pilgrimage) guide life. Salvation comes through submission to Allah.',
      practices: 'Muslims pray five times daily, fast during Ramadan, give charity (zakat), and aim to make a pilgrimage (Hajj) to Mecca. They read the Quran and follow Sunnah (Muhammad’s teachings). Mosques are centers of worship and community.',
      globalImpact: 'With 1.9 billion followers, Islam is the second-largest religion. It has shaped architecture (e.g., mosques), science (e.g., algebra), and culture in regions from Spain to Indonesia. Muslim communities are diverse and global.'
    }
  },
  {
    id: 'hinduism',
    title: 'Hinduism',
    shortDescription: 'An ancient religion from India with diverse beliefs, focusing on dharma and reincarnation.',
    details: {
      history: 'Hinduism, over 4,000 years old, has no single founder. It evolved from ancient Indian traditions, with sacred texts like the Vedas and Upanishads. It flourished in India and spread to Southeast Asia and beyond through trade and migration.',
      beliefs: 'Hindus believe in many gods (e.g., Brahma, Vishnu, Shiva), reincarnation (rebirth based on karma), and dharma (right living). The goal is moksha, liberation from the cycle of rebirth, achieved through good deeds and spiritual practice.',
      practices: 'Worship includes temple visits, offerings to gods, and festivals like Diwali (festival of lights). Yoga, meditation, and vegetarianism are common. Sacred texts like the Bhagavad Gita guide spiritual life.',
      globalImpact: 'With 1.2 billion followers, mostly in India, Hinduism influences art (e.g., temple carvings), philosophy (e.g., yoga), and culture. Its ideas of karma and meditation have spread globally.'
    }
  },
  {
    id: 'buddhism',
    title: 'Buddhism',
    shortDescription: 'A path to enlightenment based on the teachings of Siddhartha Gautama, the Buddha.',
    details: {
      history: 'Founded in the 5th century BCE in India by Siddhartha Gautama, who became the Buddha. It spread across Asia, from Sri Lanka to Japan, through missionaries and trade. Different schools like Theravada and Mahayana developed.',
      beliefs: 'Buddhists follow the Four Noble Truths (life involves suffering, caused by desire, which can end through the Eightfold Path). The goal is nirvana, a state of peace free from desire. Karma shapes rebirth.',
      practices: 'Meditation, mindfulness, and ethical living (e.g., no harming) are key. Buddhists visit temples, honor the Buddha, and celebrate festivals like Vesak (Buddha’s birth). Monastic life is respected.',
      globalImpact: 'With 520 million followers, Buddhism influences meditation, mindfulness, and peace movements worldwide. It’s prominent in Asia and growing in the West.'
    }
  },
  {
    id: 'catholic',
    title: 'Catholic Christianity',
    shortDescription: 'The largest Christian denomination, led by the Pope, emphasizing tradition and sacraments.',
    details: {
      history: 'Rooted in the early church, Catholics trace their origins to Jesus and Peter, considered the first Pope. Formalized in the Roman Empire, it split from Orthodoxy in 1054 CE. The Vatican leads globally.',
      beliefs: 'Believe in the Trinity, Bible, and Church tradition. Salvation comes through faith, good works, and sacraments like baptism and Eucharist. The Pope is the spiritual leader.',
      practices: 'Mass (worship service), seven sacraments, devotion to Mary and saints, and prayers like the Rosary. Catholics celebrate Christmas and Easter with special traditions.',
      globalImpact: 'With 1.3 billion followers, Catholics influence education (e.g., Catholic schools), healthcare (hospitals), and charity. The Vatican is a global spiritual and diplomatic center.'
    }
  },
  {
    id: 'orthodox',
    title: 'Orthodox Christianity',
    shortDescription: 'A Christian denomination emphasizing ancient traditions and the Bible.',
    details: {
      history: 'Originated with early Christianity, splitting from Catholicism in 1054 CE (Great Schism) over theological and leadership differences. Strong in Eastern Europe, Russia, and Greece.',
      beliefs: 'Believe in the Trinity, Bible, and salvation through faith and God’s grace. Emphasize mystery in worship and the importance of icons as spiritual images.',
      practices: 'Divine Liturgy (worship), fasting, sacraments (e.g., baptism, chrismation), and veneration of icons. Festivals like Pascha (Easter) are central.',
      globalImpact: 'With 260 million followers, Orthodoxy shapes Eastern European culture, with iconic art and deep liturgical traditions.'
    }
  },
  {
    id: 'protestant',
    title: 'Protestant Christianity',
    shortDescription: 'A Christian group that broke from Catholicism, focusing on the Bible alone.',
    details: {
      history: 'Began in the 16th century with the Reformation, led by Martin Luther, John Calvin, and others, protesting Catholic practices. Includes many groups like Baptists and Methodists.',
      beliefs: 'Salvation by faith alone (sola fide), Bible as the sole authority (sola scriptura), and all believers as priests. Focus on personal faith in Jesus.',
      practices: 'Worship varies—sermons, singing, Bible study. Baptism and communion are common but differ by group. Missions and community service are key.',
      globalImpact: 'With 800 million followers, Protestants influenced democracy, literacy, and modern missions, especially in the U.S. and Europe.'
    }
  },
  {
    id: 'baptist',
    title: 'Baptist Christianity',
    shortDescription: 'A Protestant denomination emphasizing believer’s baptism and local church freedom.',
    details: {
      history: 'Emerged in the 17th century from English Puritans, emphasizing personal faith and baptism by immersion. Grew in the U.S. through revivals.',
      beliefs: 'Salvation through faith in Jesus, Bible as authority, and believer’s baptism (not infants). Churches are independent, led by congregations.',
      practices: 'Baptism by immersion, Sunday worship, Bible study, and missions. Emphasize personal conversion and evangelism.',
      globalImpact: 'About 100 million Baptists, strong in the U.S., Africa, and Asia, known for missionary work and community outreach.'
    }
  },
  {
    id: 'pentecostal',
    title: 'Pentecostal Christianity',
    shortDescription: 'A Protestant group emphasizing the Holy Spirit’s gifts, like speaking in tongues.',
    details: {
      history: 'Began in the early 20th century with the Azusa Street Revival in Los Angeles, led by William Seymour. Spread rapidly worldwide.',
      beliefs: 'Salvation through Jesus, Bible authority, and active Holy Spirit gifts (e.g., tongues, healing). Emphasize spiritual experiences.',
      practices: 'Lively worship with music, speaking in tongues, healing prayers, and evangelism. Baptism and communion are practiced.',
      globalImpact: 'With 280 million followers, Pentecostalism is growing fast in Latin America, Africa, and Asia, influencing charismatic worship.'
    }
  }
];

const ReligionDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const religion = religionsData.find((r) => r.id === id);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Please log in to view religion details.</p>
      </div>
    );
  }

  if (!religion) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Religion or denomination not found.</p>
      </div>
    );
  }

  return (
    <div className="relative container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Arrow */}
      <button
        onClick={() => navigate('/religions')}
        className="absolute top-0 left-0 text-primaryBlue dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 text-lg p-2 transition-all duration-300"
        aria-label="Back to Religions and Denominations"
      >
        🡨
      </button>

      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">{religion.title}</h1>
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-secondaryPurple">
        <p className="text-textGray mt-2"><span className="font-semibold">Overview:</span> {religion.shortDescription}</p>
        <p className="text-textGray mt-4"><span className="font-semibold">History:</span> {religion.details.history}</p>
        <p className="text-textGray mt-4"><span className="font-semibold">Beliefs:</span> {religion.details.beliefs}</p>
        <p className="text-textGray mt-4"><span className="font-semibold">Practices:</span> {religion.details.practices}</p>
        <p className="text-textGray mt-4"><span className="font-semibold">Global Impact:</span> {religion.details.globalImpact}</p>
      </div>
    </div>
  );
};

export default ReligionDetail;
