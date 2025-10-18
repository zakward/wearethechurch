import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { BibleContext } from '../BibleContext.jsx';

const Home = () => {
  const { user, saveVerse } = useContext(AuthContext);
  const { getOverallProgress } = useContext(BibleContext);

  const popularVerses = [
    { reference: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', translation: 'NIV' },
    { reference: 'Jeremiah 29:11', text: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.', translation: 'NIV' },
    { reference: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', translation: 'NIV' },
    { reference: 'Philippians 4:13', text: 'I can do everything through him who gives me strength.', translation: 'NIV' },
    { reference: 'Genesis 1:1', text: 'In the beginning God created the heavens and the earth.', translation: 'NIV' },
    { reference: 'Proverbs 3:5', text: 'Trust in the LORD with all your heart and lean not on your own understanding.', translation: 'NIV' },
    { reference: 'Proverbs 3:6', text: 'In all your ways acknowledge him, and he will make your paths straight.', translation: 'NIV' },
    { reference: 'Romans 12:2', text: 'Do not conform any longer to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God"s will is—his good, pleasing and perfect will.', translation: 'NIV' },
    { reference: 'Philippians 4:6', text: 'Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God.', translation: 'NIV' },
    { reference: 'Matthew 28:19', text: 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.', translation: 'NIV' },
    { reference: '1 Peter 5:7', text: 'Cast all your anxiety on him because he cares for you.', translation: 'NIV' },
    { reference: 'Philippians 4:7', text: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', translation: 'NIV' },
    { reference: '2 Corinthians 12:9', text: 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness." Therefore I will boast all the more gladly about my weaknesses, so that Chris"s power may rest on me.', translation: 'NIV' },
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

  const parseReference = (reference) => {
    const parts = reference.split(' ');
    const chapterVerse = parts.pop();
    const book = parts.join(' ');
    const [chapter, verse] = chapterVerse.split(':').map(Number);
    return { book, chapter, verse };
  };

  const handleSaveVerse = () => {
    const { book, chapter, verse } = parseReference(verseOfTheDay.reference);
    saveVerse({
      book,
      chapter,
      verse,
      text: verseOfTheDay.text,
      translation: verseOfTheDay.translation
    });
  };

  const isSaved = formattedSaved.some(s => s.reference === verseOfTheDay.reference);

  // If user is not logged in, show a welcome message prompting them to log in
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <section className="text-center mb-12 bg-primaryBlue p-8 rounded-3xl shadow-xl md:p-12 lg:p-16 border-4 border-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-md">
            Welcome to Bible Study App!
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-white/90">
            Please log in or sign up to start your Bible study journey.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/login"
              className="inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-white text-primaryBlue font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-primaryBlue"
            >
              Sign Up
            </Link>
          </div>
        </section>

        {/* Featured Verse Section - accessible without login */}
        <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
          <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Featured Verse of the Day</h2>
          <blockquote className="text-xl italic text-textGray max-w-2xl mx-auto">
            "{verseOfTheDay.text}" — {verseOfTheDay.reference} ({verseOfTheDay.translation})
          </blockquote>
          <p className="mt-4 text-lg text-secondaryPink">Reflect on this and add your thoughts!</p>
          <p className="mt-4 text-lg text-secondaryPink">Login to save this verse!</p>
        </section>

        {/* About Us Card - accessible without login */}
        <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white text-center">
          <h2 className="text-3xl font-bold mb-6 text-primaryBlue">About Us</h2>
          <p className="text-lg text-textGray mb-4">
            Discover We Are the Church—a community focused on a living faith in Christ without traditional hierarchies. Learn about our site creator Zak Ward and our core statement of faith centered on Christ, grace, and truth-seeking.
          </p>
          <div className="text-center">
            <Link
              to="/about"
              className="inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
            >
              Learn More About We Are The Church
            </Link>
          </div>
        </section>

        {/* Upcoming Features Section */}
        <section className="text-center mb-12 bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-3xl shadow-xl border-4 border-white">
          <h2 className="text-3xl font-bold mb-4 text-primaryBlue">Coming Soon</h2>
          <p className="text-lg text-textGray mb-6">Exciting new features we're working on to enhance your Bible study experience!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Ministry Map */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-200">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2 text-primaryBlue">Interactive Ministry Map</h3>
              <p className="text-textGray text-sm">Explore the journeys of Jesus and the apostles with an interactive historical map showing key locations and events from their ministry.</p>
            </div>
            {/* Testimonials */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-200">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2 text-primaryBlue">Testimonials</h3>
              <p className="text-textGray text-sm">Share your faith journey and be encouraged by testimonies from other believers in the community.</p>
            </div>
            {/* Prayer Requests */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-200">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="text-xl font-bold mb-2 text-primaryBlue">Prayer Requests</h3>
              <p className="text-textGray text-sm">Submit prayer requests and pray for others in the community. Build a supportive network of believers lifting each other up.</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-600 italic">Stay tuned for these features and more!</p>
        </section>

        {/* Cool Resources Section - accessible without login */}
        <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
          <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Cool Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Can I Trust The Bible? */}
            <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
              <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Can I Trust The Bible?</h3>
              <a href="https://bible.apologeticscanada.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ytimg.com/vi/QhVPBNBAGY0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAjKogoyGRvmShLGEr7f3odCpO_0A" alt="Can I Trust The Bible?" className="w-full h-48 object-cover rounded-2xl mb-4" />
                <p className="text-textGray hover:text-funPink hover:underline">Explore the reliability of the Bible</p>
              </a>
            </div>
            {/* Wes Huff - Archaeology & Bible */}
            <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
              <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Archaeology & the Bible</h3>
              <a href="https://www.youtube.com/watch?v=p58vknxGR4I&t=50s" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ytimg.com/vi/p58vknxGR4I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1dxk0FEm0adsjqrLPAGJh2QBpkA" alt="Archaeology and the Bible" className="w-full h-48 object-cover rounded-2xl mb-4" />
                <p className="text-textGray hover:text-funPink hover:underline">Biblical archaeology insights</p>
              </a>
            </div>
            {/* The Shawn Ryan Show */}
            <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
              <h3 className="text-2xl font-bold mb-4 text-primaryBlue">The Shawn Ryan Show</h3>
              <a href="https://www.youtube.com/@ShawnRyanShow" target="_blank" rel="noopener noreferrer">
                <img src="https://shawnryanshow.com/cdn/shop/files/Shawn-Ryan-Show-Website-Cover_189fbb8d-d19b-4d72-9657-6e9a9d482e22.jpg?v=1649170862&width=1500" alt="The Shawn Ryan Show" className="w-full h-48 object-cover rounded-2xl mb-4" />
                <p className="text-textGray hover:text-funPink hover:underline">Watch interviews and stories</p>
              </a>
            </div>
            {/* Jesus Calling */}
            <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
              <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Jesus Calling</h3>
              <a href="https://www.jesuscalling.com/books/jesus-calling/" target="_blank" rel="noopener noreferrer">
                <img src="https://s32213.pcdn.co/wp-content/uploads/2015/08/jc_book.png" alt="Jesus Calling" className="w-full h-48 object-cover rounded-2xl mb-4" />
                <p className="text-textGray hover:text-funPink hover:underline">A daily devotional</p>
              </a>
            </div>
            {/* Got Questions? */}
            <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
              <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Got Questions?</h3>
              <a href="https://www.gotquestions.org/questions_Bible.html" target="_blank" rel="noopener noreferrer">
                <img src="https://redeeminggod.com/wp-content/uploads/2014/05/bible-questions.jpg" alt="Got Questions?" className="w-full h-48 object-cover rounded-2xl mb-4" />
                <p className="text-textGray hover:text-funPink hover:underline">Answers to Bible questions</p>
              </a>
            </div>
            {/* Case for Christ */}
            <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
              <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Case for Christ</h3>
              <a href="https://www.amazon.com/Case-Christ-Journalists-Personal-Investigation/dp/0310350034" target="_blank" rel="noopener noreferrer">
                <img src="https://m.media-amazon.com/images/I/71Utqy+1v1L._UF1000,1000_QL80_.jpg" alt="Case for Christ" className="w-full h-48 object-cover rounded-2xl mb-4" />
                <p className="text-textGray hover:text-funPink hover:underline">Investigate the evidence for Christ</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
        <button
          onClick={handleSaveVerse}
          disabled={isSaved}
          className={`mt-4 inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white ${isSaved ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSaved ? 'Verse Saved' : 'Save This Verse'}
        </button>
      </section>
      {/* Dashboard Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {/* Recent Bookmarks Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white text-center">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center justify-center">
            <span className="mr-2 text-3xl">🔖</span> Recent Bookmarks
          </h2>
          {user.bookmarks && user.bookmarks.length > 0 ? (
            <ul className="space-y-2 text-sm mx-auto max-w-md">
              {user.bookmarks.slice(0, 2).map((bookmark, index) => (
                <li key={index} className="bg-bgLightBlue p-2 rounded-2xl">
                  {bookmark.book} {bookmark.chapter}:{bookmark.verse}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg mb-4 text-textGray">No recent bookmarks yet.</p>
          )}
          <div className="text-center">
            <Link
              to="/bookmarks"
              className="mt-4 inline-block bg-secondaryPink text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 hover:scale-105"
            >
              View All Bookmarks
            </Link>
          </div>
        </div>

        {/* About Us Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white text-center">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center justify-center">
            <span className="mr-2 text-3xl">ℹ️</span> About Us
          </h2>
          <p className="text-lg mb-4 text-textGray">
            Discover We Are the Church—a community focused on a living faith in Christ without traditional hierarchies. Learn about our site creator Zak Ward and our core statement of faith centered on Christ, grace, and truth-seeking.
          </p>
          <div className="text-center">
            <Link
              to="/about"
              className="inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
            >
              Learn More About We Are The Church
            </Link>
          </div>
        </div>

        {/* Notes Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white text-center">
          <h2 className="text-2xl font-bold mb-4 text-primaryBlue flex items-center justify-center">
            <span className="mr-2 text-3xl">📝</span> Recent Notes
          </h2>
          {user.notes && user.notes.length > 0 ? (
            <ul className="space-y-2 text-sm mx-auto max-w-md">
              {user.notes.slice(0, 2).map((note, index) => (
                <li key={index} className="bg-bgLightBlue p-2 rounded-2xl">
                  {note.book} {note.chapter}:{note.verse} - {note.text.slice(0, 50)}...
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg mb-4 text-textGray">No recent notes yet.</p>
          )}
          <div className="text-center">
            <button className="mt-4 inline-block bg-secondaryPink text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 hover:scale-105">
              Add New Note
            </button>
          
          </div>
          <div className="text-center mt-4">
            <Link
              to="/notes"
              className="inline-block bg-secondaryPink text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 hover:scale-105"
            >
              View All Notes
            </Link>
          </div>
        </div>

      </section>

      {/* Upcoming Features Section */}
      <section className="text-center mb-12 bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-4 text-primaryBlue">Coming Soon</h2>
        <p className="text-lg text-textGray mb-6">Exciting new features we're working on to enhance your Bible study experience!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Interactive Ministry Map */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-200">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold mb-2 text-primaryBlue">Interactive Ministry Map</h3>
            <p className="text-textGray text-sm">Explore the journeys of Jesus and the apostles with an interactive historical map showing key locations and events from their ministry.</p>
          </div>
          {/* Testimonials */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-200">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2 text-primaryBlue">Testimonials</h3>
            <p className="text-textGray text-sm">Share your faith journey and be encouraged by testimonies from other believers in the community.</p>
          </div>
          {/* Prayer Requests */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-200">
            <div className="text-5xl mb-4">🙏</div>
            <h3 className="text-xl font-bold mb-2 text-primaryBlue">Prayer Requests</h3>
            <p className="text-textGray text-sm">Submit prayer requests and pray for others in the community. Build a supportive network of believers lifting each other up.</p>
          </div>
          {/* Track Your Progress */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-200">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-primaryBlue">Track Your Progress</h3>
            <p className="text-textGray text-sm">Visualize your Bible reading journey with detailed statistics, charts, and milestones to celebrate your spiritual growth.</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-600 italic">Stay tuned for these features and more!</p>
      </section>

      {/* Cool Resources Section */}
      <section className="text-center mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue">Cool Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Can I Trust The Bible? */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Can I Trust The Bible?</h3>
            <a href="https://bible.apologeticscanada.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://i.ytimg.com/vi/QhVPBNBAGY0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAjKogoyGRvmShLGEr7f3odCpO_0A" alt="Can I Trust The Bible?" className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">Explore the reliability of the Bible</p>
            </a>
          </div>
          {/* Wes Huff - Archaeology & Bible */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Archaeology & the Bible</h3>
            <a href="https://www.youtube.com/watch?v=p58vknxGR4I&t=50s" target="_blank" rel="noopener noreferrer">
              <img src="https://i.ytimg.com/vi/p58vknxGR4I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1dxk0FEm0adsjqrLPAGJh2QBpkA" alt="Archaeology and the Bible" className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">Biblical archaeology insights</p>
            </a>
          </div>
          {/* The Shawn Ryan Show */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">The Shawn Ryan Show</h3>
            <a href="https://www.youtube.com/@ShawnRyanShow" target="_blank" rel="noopener noreferrer">
              <img src="https://shawnryanshow.com/cdn/shop/files/Shawn-Ryan-Show-Website-Cover_189fbb8d-d19b-4d72-9657-6e9a9d482e22.jpg?v=1649170862&width=1500" alt="The Shawn Ryan Show" className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">Watch interviews and stories</p>
            </a>
          </div>
          {/* Jesus Calling */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Jesus Calling</h3>
            <a href="https://www.jesuscalling.com/books/jesus-calling/" target="_blank" rel="noopener noreferrer">
              <img src="https://s32213.pcdn.co/wp-content/uploads/2015/08/jc_book.png" alt="Jesus Calling" className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">A daily devotional</p>
            </a>
          </div>
          {/* Got Questions? */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Got Questions?</h3>
            <a href="https://www.gotquestions.org/questions_Bible.html" target="_blank" rel="noopener noreferrer">
              <img src="https://redeeminggod.com/wp-content/uploads/2014/05/bible-questions.jpg" alt="Got Questions?" className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">Answers to Bible questions</p>
            </a>
          </div>
          {/* Case for Christ */}
          <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white">
            <h3 className="text-2xl font-bold mb-4 text-primaryBlue">Case for Christ</h3>
            <a href="https://www.amazon.com/Case-Christ-Journalists-Personal-Investigation/dp/0310350034" target="_blank" rel="noopener noreferrer">
              <img src="https://m.media-amazon.com/images/I/71Utqy+1v1L._UF1000,1000_QL80_.jpg" alt="Case for Christ" className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-textGray hover:text-funPink hover:underline">Investigate the evidence for Christ</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;