import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { peopleData } from '../data/BibleTranslations/peopleData.jsx';

const PersonDetail = () => {
  const { name } = useParams();
  
  // Find person in either oldTestament or newTestament
  const person = [
    ...peopleData.oldTestament,
    ...peopleData.newTestament
  ].find(p => p.name.toLowerCase() === name.toLowerCase());

  if (!person) return <p className="text-center text-red-500">Person not found.</p>;

  const era = `${Math.abs(person.chronology)} ${person.chronology < 0 ? 'BCE' : 'AD'}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/persons" className="text-primaryBlue hover:underline mb-6 inline-block">← Back to People</Link>
      <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-white">
        <h1 className="text-4xl font-bold mb-4 text-primaryBlue">{person.name} ({person.title})</h1>
        <div className="space-y-4 text-textGray">
          <p><strong>Family:</strong> {person.family}</p>
          <p><strong>References:</strong> {person.references}</p>
          <p><strong>Importance:</strong> {person.importance}</p>
          <p><strong>Death:</strong> {person.death}</p>
          <p><strong>Approximate Era:</strong> {era}</p>
          <div className="whitespace-pre-line">
            <strong>Biblical Events:</strong> {person.biblicalEvents}
          </div>
          <div className="whitespace-pre-line">
            <strong>Theological Significance:</strong> {person.theologicalSignificance}
          </div>
          <div className="whitespace-pre-line">
            <strong>Historical Note:</strong> {person.historicalNote}
          </div>
        </div>
        <img
          src={`https://placehold.co/600x300/png?text=Cartoon+${person.name}&font=Fredoka`}
          alt={`Cartoon of ${person.name}`}
          className="mt-6 rounded-3xl shadow-xl mx-auto max-w-full sm:max-w-md"
        />
      </div>
    </div>
  );
};

export default PersonDetail;