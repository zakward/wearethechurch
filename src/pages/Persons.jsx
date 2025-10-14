import React from 'react';

const persons = [
  {
    name: 'Jesus',
    family: 'Son of Mary and Joseph (adoptive), descendant of David.',
    references: 'Throughout New Testament, e.g., Matthew 1-28.',
    importance: 'Central figure of Christianity, Messiah, teacher, healer.',
    death: 'Crucified around 30-33 AD, resurrected.'
  },
  {
    name: 'Peter (Simon Peter)',
    family: 'Brother of Andrew, fisherman.',
    references: 'Gospels, Acts, 1&2 Peter.',
    importance: 'Leader of apostles, denied Jesus thrice, key in early church.',
    death: 'Crucified upside down in Rome ~64 AD.'
  },
  // Add more apostles like John, James, etc., similarly
  { name: 'John', family: 'Brother of James, son of Zebedee.', references: 'Gospels, Acts, Revelation.', importance: 'Beloved disciple, wrote Gospel.', death: 'Exiled, natural death ~100 AD.' },
  // ... (add the rest: Andrew, James, Philip, Bartholomew, Matthew, Thomas, James (son of Alphaeus), Thaddaeus, Simon the Zealot, Judas Iscariot, Matthias)
];

const Persons = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-secondary text-center">Jesus & Apostles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {persons.map((person, index) => (
          <div key={index} className="bg-white p-6 rounded-cartoon shadow-cartoon">
            <h2 className="text-2xl font-bold mb-2 text-funPink">{person.name}</h2>
            <p><strong>Family:</strong> {person.family}</p>
            <p><strong>References:</strong> {person.references}</p>
            <p><strong>Importance:</strong> {person.importance}</p>
            <p><strong>Death:</strong> {person.death}</p>
          </div>
        ))}
      </div>
      {/* Cartoon image */}
      <img src="https://placehold.co/600x300/png?text=Cartoon+Jesus+and+Apostles&font=comic" alt="Persons cartoon" className="mt-8 rounded-cartoon mx-auto max-w-full sm:max-w-md lg:max-w-lg" />
    </div>
  );
};

export default Persons;