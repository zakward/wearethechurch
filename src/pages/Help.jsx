import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">How to Use the App</h1>
      
      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">📖</span> Bible Reader
        </h2>
        <p className="text-lg text-textGray mb-4">
          The Bible Reader is your gateway to exploring the Scriptures. Here's how to use it:
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Navigate to a Book:</strong> Click "Bible Books" from the navigation menu to see a list of all books in the Bible. Select a book to view its chapters.
          </li>
          <li>
            <strong>Choose a Chapter:</strong> Once in a book, click on a chapter to start reading its verses.
          </li>
          <li>
            <strong>Interact with Verses:</strong> Click on any verse to open a menu with these options:
            <ul className="list-circle list-inside ml-6 space-y-1 mt-2">
              <li><strong>Save Verse:</strong> Adds the verse to your "Saved Verses" list for quick access later. A blue star (⭐) appears next to saved verses; click it to remove.</li>
              <li><strong>Share Verse:</strong> Copies the verse text and reference to your clipboard for sharing.</li>
              <li><strong>Highlight Verse:</strong> Highlights the verse in yellow for emphasis. Click again to remove the highlight.</li>
              <li><strong>Add Bookmark:</strong> Marks your place with a red bookmark (🔖). Click the bookmark to remove it. Bookmarks help you track your reading progress.</li>
              <li><strong>Add Note:</strong> Create personal notes for any verse. Your notes are saved and can be viewed in the "Notes" section.</li>
            </ul>
          </li>
          <li>
            <strong>Customize Your Experience:</strong> Use the dropdowns at the top to switch between NIV and KJV translations, adjust font size, style, or switch between light, dark, sepia, or high-contrast modes.
          </li>
          <li>
            <strong>Mark Chapters Complete:</strong> Click the "Mark Complete" button at the bottom to track your reading progress.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">⭐</span> Saved Verses
        </h2>
        <p className="text-lg text-textGray mb-4">
          Keep track of your favorite Bible verses in one convenient place.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Save a Verse:</strong> While reading, click on any verse and select "Save Verse" to add it to your collection.
          </li>
          <li>
            <strong>View Saved Verses:</strong> Click "Verses" in the navigation menu to see all your saved verses organized by book and chapter.
          </li>
          <li>
            <strong>Remove Saved Verses:</strong> Click the blue star next to any saved verse to remove it from your collection.
          </li>
          <li>
            <strong>Quick Access:</strong> Click any saved verse to jump directly to it in the Bible Reader.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">📝</span> Notes
        </h2>
        <p className="text-lg text-textGray mb-4">
          Add personal notes and reflections to verses as you study.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Create a Note:</strong> Click on any verse while reading and select "Add Note" to write your thoughts, insights, or questions.
          </li>
          <li>
            <strong>View All Notes:</strong> Click "Notes" in the navigation menu to see all your notes organized by book and chapter.
          </li>
          <li>
            <strong>Edit or Delete:</strong> Manage your notes from the Notes page - edit existing notes or delete ones you no longer need.
          </li>
          <li>
            <strong>Navigate to Verse:</strong> Click on any note to jump directly to that verse in the Bible Reader.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">🔖</span> Bookmarks & Continue Reading
        </h2>
        <p className="text-lg text-textGray mb-4">
          Never lose your place in the Bible with bookmarks and the Continue Reading feature.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Using Bookmarks:</strong> When you bookmark a verse in the Bible Reader, it's added to your "Bookmarks" list, with the most recent bookmark at the top.
          </li>
          <li>
            <strong>Continue Reading:</strong> Click "Continue" in the navigation menu to go directly to the most recently bookmarked verse - perfect for picking up where you left off!
          </li>
          <li>
            <strong>View All Bookmarks:</strong> Click "Bookmarks" in the navigation menu to see all your bookmarked verses. Click any bookmark to return to that verse in the Bible Reader.
          </li>
          <li>
            <strong>Remove Bookmarks:</strong> Click the red bookmark icon (🔖) next to any verse to remove it from your bookmarks list.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">👥</span> Significant People
        </h2>
        <p className="text-lg text-textGray mb-4">
          Learn about key figures in the Bible by exploring the "People" section.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Access the People Page:</strong> Click "People" in the navigation menu to view a list of significant biblical figures.
          </li>
          <li>
            <strong>Search and Filter:</strong> Use the search bar to find specific individuals by name, or filter by category (Old Testament, New Testament, or Apostles).
          </li>
          <li>
            <strong>Sort Options:</strong> Sort people alphabetically or chronologically to explore them in the order they appear in biblical history.
          </li>
          <li>
            <strong>View Details:</strong> Click on any person's name to see comprehensive information including their family, biblical references, importance, death, biblical events, theological significance, and historical notes.
          </li>
          <li>
            <strong>Pagination:</strong> Browse through pages of people with easy navigation controls and jump to specific pages.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">💡</span> Insights
        </h2>
        <p className="text-lg text-textGray mb-4">
          Discover deeper understanding and context about Bible passages.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Access Insights:</strong> Click "Insights" in the navigation menu to explore curated biblical insights, commentary, and deeper understanding of scripture.
          </li>
          <li>
            <strong>Learn More:</strong> Gain historical context, theological perspectives, and practical applications of biblical teachings.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">📚</span> Terminology
        </h2>
        <p className="text-lg text-textGray mb-4">
          Understand biblical terms and concepts with ease.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Browse Terms:</strong> Click "Terms" in the navigation menu to access a comprehensive glossary of biblical terminology.
          </li>
          <li>
            <strong>Search Definitions:</strong> Look up unfamiliar words, theological concepts, and historical terms to enhance your Bible study.
          </li>
          <li>
            <strong>Quick Reference:</strong> Get clear, concise definitions to help you better understand what you're reading.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">💬</span> Forum
        </h2>
        <p className="text-lg text-textGray mb-4">
          Connect with other users to discuss scripture, ask questions, and share insights.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Join Discussions:</strong> Click "Forum" in the navigation menu to participate in community conversations.
          </li>
          <li>
            <strong>Ask Questions:</strong> Post questions about verses, theology, or biblical history and get answers from the community.
          </li>
          <li>
            <strong>Share Insights:</strong> Contribute your own understanding and help others in their faith journey.
          </li>
          <li>
            <strong>Build Community:</strong> Connect with fellow believers and grow together in faith.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">🌍</span> Religions
        </h2>
        <p className="text-lg text-textGray mb-4">
          Explore information about different world religions and their beliefs.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Learn About Religions:</strong> Access the Religions page to discover information about various faith traditions.
          </li>
          <li>
            <strong>View Details:</strong> Click on any religion to see comprehensive information about its beliefs, practices, and history.
          </li>
          <li>
            <strong>Comparative Study:</strong> Better understand Christianity in the context of other world religions.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">👤</span> Account Features
        </h2>
        <p className="text-lg text-textGray mb-4">
          Create an account to unlock all features and save your progress.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Sign Up:</strong> Click "Signup" in the navigation menu to create your free account.
          </li>
          <li>
            <strong>Login:</strong> Access your saved verses, notes, bookmarks, and reading progress from any device.
          </li>
          <li>
            <strong>Sync Across Devices:</strong> Your data is saved to your account and accessible wherever you log in.
          </li>
          <li>
            <strong>Track Progress:</strong> Keep track of completed chapters and your overall Bible reading journey.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">🎨</span> Customization
        </h2>
        <p className="text-lg text-textGray mb-4">
          Personalize your reading experience to match your preferences.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Reading Modes:</strong> Choose from Light, Dark, Sepia, or High Contrast modes for comfortable reading in any environment.
          </li>
          <li>
            <strong>Font Options:</strong> Adjust font size and style to make reading easier on your eyes.
          </li>
          <li>
            <strong>Translations:</strong> Switch between NIV and KJV translations to compare different versions of scripture.
          </li>
          <li>
            <strong>Responsive Design:</strong> Enjoy a seamless experience on desktop, tablet, or mobile devices.
          </li>
        </ul>
      </section>

      <section className="text-center">
        <Link
          to="/"
          className="inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
};

export default Help;