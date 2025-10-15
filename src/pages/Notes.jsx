import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Notes = () => {
  const { user, deleteNote, resetUnreadNotes } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.unreadNotesCount > 0) {
      resetUnreadNotes();
    }
  }, [user, resetUnreadNotes]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-500">Please log in to view your notes.</p>
      </div>
    );
  }

  const notes = user.notes || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">My Notes</h1>
      {notes.length === 0 ? (
        <p className="text-center text-textGray">No notes saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow-xl border border-secondaryPurple hover:shadow-2xl transition-all duration-300">
              <Link to={`/bible/${note.book}/${note.chapter}#verse-${note.verse}`} className="text-lg font-bold text-funPink hover:underline">
                {note.book} {note.chapter}:{note.verse} ({note.translation})
              </Link>
              <p className="text-textGray mt-2">{note.text}</p>
              <p className="text-textGray mt-2 italic">Note: {note.note}</p>
              <p className="text-textGray text-sm mt-1">Added: {new Date(note.timestamp).toLocaleString()}</p>
              <button
                onClick={() => deleteNote(index)}
                className="mt-2 bg-secondaryPink text-white py-1 px-3 rounded-full hover:bg-pink-600 transition-all duration-300"
              >
                Delete Note
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
