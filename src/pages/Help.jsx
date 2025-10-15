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
            </ul>
          </li>
          <li>
            <strong>Customize Your Experience:</strong> Use the dropdowns at the top to switch between NIV and KJV translations, adjust font size, style, or switch between light, dark, sepia, or high-contrast modes.
          </li>
          <li>
            <strong>Mark Chapters Complete:</strong> Click the "Mark Complete" button at the bottom to track your progress.
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
            <strong>Explore Details:</strong> Click on a person's name to see detailed information about their role, story, and significance in the Bible.
          </li>
          <li>
            <strong>Filter and Search:</strong> Use the search bar or filters to find specific individuals or browse by category (e.g., prophets, apostles).
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">🔖</span> Continue Reading
        </h2>
        <p className="text-lg text-textGray mb-4">
          The "Continue Reading" feature lets you jump back to where you left off.
        </p>
        <ul className="list-disc list-inside space-y-2 text-textGray">
          <li>
            <strong>Using Bookmarks:</strong> When you bookmark a verse in the Bible Reader, it’s added to your "Bookmarks" list, with the most recent bookmark at the top.
          </li>
          <li>
            <strong>Continue Reading:</strong> Click "Continue Reading" in the navigation menu to go directly to the most recently bookmarked verse.
          </li>
          <li>
            <strong>View Bookmarks:</strong> Click "Bookmarks" in the navigation menu to see all your bookmarked verses. Click any bookmark to return to that verse in the Bible Reader.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue flex items-center">
          <span className="mr-2 text-3xl">🗺️</span> Historical Map
        </h2>
        <p className="text-lg text-textGray mb-4">
          The Historical Map feature is currently under construction. Stay tuned for an interactive map to explore biblical locations and events!
        </p>
        <p className="text-red-500 text-center">Under Construction</p>
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