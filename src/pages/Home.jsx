import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { BibleContext } from '../BibleContext.jsx';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { getOverallProgress } = useContext(BibleContext);

  const popularVerses = [
    { reference: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', translation: 'NIV' },
    { reference: 'Jeremiah 29:11', text: 'For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.', translation: 'NIV' },
    { reference: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', translation: 'NIV' },
    { reference: 'Philippians 4:13', text: 'I can do everything through him who gives me strength.', translation: 'NIV' },
    { reference: 'Genesis 1:1', text: 'In the beginning God created the heavens and the earth.', translation: 'NIV' },
    { reference: 'Proverbs 3:5', text: 'Trust in the LORD with all your heart and lean not on your own understanding.', translation: 'NIV' },
    { reference: 'Proverbs 3:6', text: 'In all your ways acknowledge him, and he will make your paths straight.', translation: 'NIV' },
    { reference: 'Romans 12:2', text: 'Do not conform any longer to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.', translation: 'NIV' },
    { reference: 'Philippians 4:6', text: 'Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God.', translation: 'NIV' },
    { reference: 'Matthew 28:19', text: 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.', translation: 'NIV' },
    { reference: '1 Peter 5:7', text: 'Cast all your anxiety on him because he cares for you.', translation: 'NIV' },
    { reference: 'Philippians 4:7', text: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', translation: 'NIV' },
    { reference: '2 Corinthians 12:9', text: 'But he said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Therefore I will boast all the more gladly about my weaknesses, so that Christ’s power may rest on me.', translation: 'NIV' },
    { reference: '2 Timothy 3:16', text: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.', translation: 'NIV' },
    { reference: '1 Peter 3:15', text: 'But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.', translation: 'NIV' },
    { reference: 'Hebrews 11:6', text: 'And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.', translation: 'NIV' },
    { reference: '2 Corinthians 5:21', text: 'God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.', translation: 'NIV' },
    { reference: 'Psalm 46:1', text: 'God is our refuge and strength, an ever-present help in trouble.', translation: 'NIV' },
    { reference: 'Matthew 6:33', text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', translation: 'NIV' },
    { reference: 'Philippians 4:8', text: 'Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.', translation: 'NIV' }
  ];

  const savedVerses = user?.savedVerses || [];
  const formattedSaved = savedVerses.map(s => ({
    reference: `${s.book} ${s.chapter}:${s.verse}`,
    text: s.text,
    translation: s.translation
  }));

  const allVerses = [...popularVerses, ...formattedSaved];

  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const verseOfTheDay = allVerses[dayOfYear % allVerses.length] || popularVerses[0];

  const progress = getOverallProgress();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center mb-12 bg-primaryBlue p-8 rounded-3xl shadow-xl md:p-12 lg:p-16 border-4 border-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-md">
          Welcome, {user.name}!
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-white/90">
          Dive into your Bible study journey—track progress, jot notes, and explore timeless wisdom.
        </p>
        <Link
          to="/bible"
          className="inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
        >
          Start Studying Now
        </Link>
      </section>

      {/* Featured Verse Section */}
      <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Featured Verse of the Day</h2>
        <blockquote className="text-xl italic text-textGray max-w-2xl mx-auto">
          "{verseOfTheDay.text}" — {verseOfTheDay.reference} ({verseOfTheDay.translation})
        </blockquote>
        <p className="mt-4 text-lg text-secondaryPink">Reflect on this and add your thoughts!</p>
      </section>
      {/* Dashboard Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {/* Quick Links Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white md:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center">
            <span className="mr-2 text-3xl">🔗</span> Quick Explore
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link to="/bible" className="bg-primaryBlue text-white p-4 rounded-2xl hover:bg-primaryGreen transition-all duration-300 text-center hover:scale-105 border-4 border-white">
              Bible Books
            </Link>
            <Link to="/persons" className="bg-primaryYellow text-textGray p-4 rounded-2xl hover:bg-secondaryOrange transition-all duration-300 text-center hover:scale-105 border-4 border-white">
              Significant People
            </Link>
            <Link to="/map" className="bg-secondaryPink text-white p-4 rounded-2xl hover:bg-secondaryPurple transition-all duration-300 text-center hover:scale-105 sm:col-span-2 md:col-span-1 border-4 border-white">
              Historical Map
            </Link>
            <Link to="/bookmarks" className="bg-primaryGreen text-white p-4 rounded-2xl hover:bg-green-700 transition-all duration-300 text-center hover:scale-105 sm:col-span-2 md:col-span-1 border-4 border-white">
              Continue Reading
            </Link>
          </div>
        </div>
        {/* Progress Card - Dynamic */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center">
            <span className="mr-2 text-3xl">📊</span> Your Progress
          </h2>
          <p className="text-lg mb-4 text-textGray">
            You've completed {progress}% of the Bible. Great job—keep the momentum!
          </p>
          <div className="bg-primaryBlue/20 rounded-full h-4 overflow-hidden">
            <div className="bg-primaryBlue h-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Notes Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center">
            <span className="mr-2 text-3xl">📝</span> Recent Notes
          </h2>
          <p className="text-lg mb-4 text-textGray">
            Add thoughts, theories, or connections here (integrate backend later).
          </p>
          <ul className="space-y-2 text-sm">
            <li className="bg-bgLightBlue p-2 rounded-2xl">Genesis 1:1 - In the beginning...</li>
            <li className="bg-bgLightBlue p-2 rounded-2xl">Linking Psalms to modern life</li>
          </ul>
          <button className="mt-4 w-full bg-secondaryPink text-white py-2 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 hover:scale-105">
            Add New Note
          </button>
        </div>

      </section>

      {/* Cool Resources Section */}
      <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Cool Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Can I Trust The Bible? */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Can I Trust The Bible?</h3>
            <a href="https://bible.apologeticscanada.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://i.ytimg.com/vi/QhVPBNBAGY0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAjKogoyGRvmShLGEr7f3odCpO_0A" alt="Can I Trust The Bible?" className="w-full h-auto rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">Explore the reliability of the Bible</p>
            </a>
          </div>
          {/* The Shawn Ryan Show */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">The Shawn Ryan Show</h3>
            <a href="https://www.youtube.com/@ShawnRyanShow" target="_blank" rel="noopener noreferrer">
              <img src="https://shawnryanshow.com/cdn/shop/files/Shawn-Ryan-Show-Website-Cover_189fbb8d-d19b-4d72-9657-6e9a9d482e22.jpg?v=1649170862&width=1500" alt="The Shawn Ryan Show" className="w-full h-auto rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">Watch interviews and stories</p>
            </a>
          </div>
          {/* Jesus Calling */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Jesus Calling</h3>
            <a href="https://www.jesuscalling.com/books/jesus-calling/" target="_blank" rel="noopener noreferrer">
              <img src="https://s32213.pcdn.co/wp-content/uploads/2015/08/jc_book.png" alt="Jesus Calling" className="w-full h-auto rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">A daily devotional</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;