import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added for scripture links
import { bibleBooksData, nonCanonicalBooksData } from '../data/BibleBooksAuthorData.js';
import { insightsData } from '../data/InsightsData.js';
import { prophecyData } from '../data/prophecyData.jsx';
import { terminologyData } from '../data/terminologyData.js'; // Assuming this is the file name based on your code

// ResultsDetail component
const ResultsDetail = ({ questions, userAnswers, score, onTryAgain }) => {
  const total = questions.length;
  const percentage = (score / total) * 100;
  const passed = percentage >= 70;

  const linkForRef = (ref) => {
    if (!ref) return null;
    const cleanRef = ref.replace(' (NIV)', '').trim();
    const match = cleanRef.match(/^(\d?\s?[A-Za-z]+(?:\s[A-Za-z]+)*)\s+(\d+)(?::(\d+))?/);
    if (!match) return null;
    const book = match[1].replace(/\s/g, '');
    const chapter = match[2];
    const verse = match[3];
    const href = `/bible/${book}/${chapter}${verse ? `#verse-${verse}` : ''}`;
    return href;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-primaryBlue">Quiz Results</h1>
      <p className="text-xl text-center mb-8">Your score: {score} / {total} ({percentage.toFixed(0)}%)</p>
      {passed ? (
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-green-600">Congratulations! You passed! 🎉✨⭐</p>
          <p className="text-lg text-gray-700 mt-2">Great job testing your Bible knowledge!</p>
        </div>
      ) : (
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-red-600">You did not pass this time.</p>
          <p className="text-lg text-gray-700 mt-2 italic">"For though the righteous fall seven times, they rise again..." - Proverbs 24:16</p>
          <p className="text-md text-gray-600">Keep studying and try again!</p>
          <button 
            onClick={onTryAgain}
            className="mt-4 py-2 px-4 bg-primaryBlue text-white rounded-full font-semibold"
          >
            Try Again
          </button>
        </div>
      )}
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-xl border border-secondaryPurple">
            <h3 className="text-xl font-bold text-funPink mb-2">Question {index + 1}: {q.question}</h3>
            <p className="text-textGray mb-2">
              Your answer: <span className={userAnswers[index] === q.correct ? 'text-green-600' : 'text-red-600'}>{q.options[userAnswers[index]]}</span>
            </p>
            <p className="text-textGray mb-2">
              Correct answer: <span className="text-green-600">{q.options[q.correct]}</span>
            </p>
            {q.reference && (
              <p className="text-textGray">
                Scripture reference: 
                {linkForRef(q.reference) ? (
                  <Link to={linkForRef(q.reference)} className="text-blue-500 hover:underline ml-1">
                    {q.reference}
                  </Link>
                ) : (
                  <span className="ml-1">{q.reference}</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to shuffle array
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Question bank generation
const generateQuestionBank = (difficulty) => {
  const bank = [];

  // Books questions
  const allBooks = [...bibleBooksData.oldTestament, ...bibleBooksData.newTestament, ...nonCanonicalBooksData].filter(b => b.summary && b.significance && (b.why_included || b.reasons_not_included) && b.analogy && b.significant_verses?.length > 0);
  allBooks.forEach(item => {
    const ref = item.significant_verses ? item.significant_verses[0] : null;
    if (difficulty === 'easy') {
      const correctValue = item.title;
      const options = [correctValue, ...shuffle(allBooks.map(b => b.title)).slice(0, 3)];
      const shuffledOptions = shuffle(options);
      bank.push({
        question: `Which Bible book is attributed to ${item.author}?`,
        options: shuffledOptions,
        correct: shuffledOptions.indexOf(correctValue),
        reference: ref
      });
      const correctTestament = item.id.includes('old') ? 'Old Testament' : 'New Testament';
      const wrongTestaments = shuffle(['Old Testament', 'New Testament', 'Apocrypha', 'Non-Canonical'].filter(t => t !== correctTestament));
      const testamentOptions = [correctTestament, ...wrongTestaments.slice(0, 3)];
      const shuffledTestament = shuffle(testamentOptions);
      bank.push({
        question: `In which testament is the book of ${item.title} found?`,
        options: shuffledTestament,
        correct: shuffledTestament.indexOf(correctTestament),
        reference: ref
      });
    } else if (difficulty === 'medium') {
      const correctSummary = item.summary;
      const optionsSummary = [correctSummary, ...shuffle(allBooks.map(b => b.summary)).slice(0, 3)];
      const shuffledSummary = shuffle(optionsSummary);
      bank.push({
        question: `What best summarizes the book of ${item.title}?`,
        options: shuffledSummary,
        correct: shuffledSummary.indexOf(correctSummary),
        reference: ref
      });
      const correctSignificance = item.significance;
      const optionsSignificance = [correctSignificance, ...shuffle(allBooks.map(b => b.significance)).slice(0, 3)];
      const shuffledSignificance = shuffle(optionsSignificance);
      bank.push({
        question: `What is the significance of the book of ${item.title}?`,
        options: shuffledSignificance,
        correct: shuffledSignificance.indexOf(correctSignificance),
        reference: ref
      });
    } else { // hard
      const key = item.why_included || item.reasons_not_included;
      if (key) {
        const optionsKey = [key, ...shuffle(allBooks.map(b => b.why_included || b.reasons_not_included).filter(k => k)).slice(0, 3)];
        const shuffledKey = shuffle(optionsKey);
        bank.push({
          question: `What is a key reason for the inclusion (or exclusion) of ${item.title} in the Bible canon?`,
          options: shuffledKey,
          correct: shuffledKey.indexOf(key),
          reference: ref
        });
      }
      const correctAnalogy = item.analogy;
      const optionsAnalogy = [correctAnalogy, ...shuffle(allBooks.map(b => b.analogy).filter(a => a)).slice(0, 3)];
      const shuffledAnalogy = shuffle(optionsAnalogy);
      bank.push({
        question: `What analogy describes the book of ${item.title}?`,
        options: shuffledAnalogy,
        correct: shuffledAnalogy.indexOf(correctAnalogy),
        reference: ref
      });
    }
  });

  // Insights questions
  const allInsights = [...insightsData.lineages, ...insightsData.historicalEvents, ...insightsData.parablesTeachings].filter(i => i.summary && i.keyFigures?.length > 0 && i.analogy && i.context && i.verseReferences?.length > 0);
  allInsights.forEach(item => {
    const insightType = item.category === 'lineages' ? 'family lineage' : item.category === 'historicalEvents' ? 'historical event' : 'parable or teaching';
    const ref = item.verseReferences ? item.verseReferences[0] : null;
    if (difficulty === 'easy') {
      const correctTitle = item.title;
      const optionsTitle = [correctTitle, ...shuffle(allInsights.map(i => i.title)).slice(0, 3)];
      const shuffledTitle = shuffle(optionsTitle);
      bank.push({
        question: `What is the name of this biblical ${insightType}: "${item.description.substring(0, 50)}..."?`,
        options: shuffledTitle,
        correct: shuffledTitle.indexOf(correctTitle),
        reference: ref
      });
    } else if (difficulty === 'medium') {
      const figure = item.keyFigures[0];
      const optionsFigure = [figure, ...shuffle(allInsights.flatMap(i => i.keyFigures)).slice(0, 3)];
      const shuffledFigure = shuffle(optionsFigure);
      bank.push({
        question: `Who is a key figure in the biblical ${insightType} "${item.title}"?`,
        options: shuffledFigure,
        correct: shuffledFigure.indexOf(figure),
        reference: ref
      });
      const correctSummary = item.summary;
      const optionsSummary = [correctSummary, ...shuffle(allInsights.map(i => i.summary)).slice(0, 3)];
      const shuffledSummary = shuffle(optionsSummary);
      bank.push({
        question: `What is a summary of "${item.title}"?`,
        options: shuffledSummary,
        correct: shuffledSummary.indexOf(correctSummary),
        reference: ref
      });
    } else { // hard
      const correctAnalogy = item.analogy;
      const optionsAnalogy = [correctAnalogy, ...shuffle(allInsights.map(i => i.analogy)).slice(0, 3)];
      const shuffledAnalogy = shuffle(optionsAnalogy);
      bank.push({
        question: `What analogy best describes the biblical ${insightType} "${item.title}"?`,
        options: shuffledAnalogy,
        correct: shuffledAnalogy.indexOf(correctAnalogy),
        reference: ref
      });
      const correctContext = item.context;
      const optionsContext = [correctContext, ...shuffle(allInsights.map(i => i.context)).slice(0, 3)];
      const shuffledContext = shuffle(optionsContext);
      bank.push({
        question: `What is the historical context for "${item.title}"?`,
        options: shuffledContext,
        correct: shuffledContext.indexOf(correctContext),
        reference: ref
      });
    }
  });

  // Prophecies questions
  const allProphecies = prophecyData.filter(p => p.summary && p.speaker && p.historical_context && p.fulfillment_refs?.length > 0);
  allProphecies.forEach(item => {
    const ref = item.text_refs ? item.text_refs[0] : null;
    if (difficulty === 'easy') {
      const correctBook = item.book;
      const optionsBook = [correctBook, ...shuffle(allProphecies.map(p => p.book)).slice(0, 3)];
      const shuffledBook = shuffle(optionsBook);
      bank.push({
        question: `In which book is the prophecy "${item.title}" found?`,
        options: shuffledBook,
        correct: shuffledBook.indexOf(correctBook),
        reference: ref
      });
    } else if (difficulty === 'medium') {
      const correctSummary = item.summary;
      const optionsSummary = [correctSummary, ...shuffle(allProphecies.map(p => p.summary)).slice(0, 3)];
      const shuffledSummary = shuffle(optionsSummary);
      bank.push({
        question: `What summarizes the prophecy "${item.title}"?`,
        options: shuffledSummary,
        correct: shuffledSummary.indexOf(correctSummary),
        reference: ref
      });
      const correctSpeaker = item.speaker;
      const optionsSpeaker = [correctSpeaker, ...shuffle(allProphecies.map(p => p.speaker)).slice(0, 3)];
      const shuffledSpeaker = shuffle(optionsSpeaker);
      bank.push({
        question: `Who is the speaker of the prophecy "${item.title}"?`,
        options: shuffledSpeaker,
        correct: shuffledSpeaker.indexOf(correctSpeaker),
        reference: ref
      });
    } else { // hard
      const fulfillRef = item.fulfillment_refs[0];
      const optionsFulfill = [fulfillRef, ...shuffle(allProphecies.flatMap(p => p.fulfillment_refs)).slice(0, 3)];
      const shuffledFulfill = shuffle(optionsFulfill);
      bank.push({
        question: `What is a New Testament fulfillment reference for the prophecy "${item.title}"?`,
        options: shuffledFulfill,
        correct: shuffledFulfill.indexOf(fulfillRef),
        reference: fulfillRef // Use fulfillment ref as the link for hard questions
      });
      const correctContext = item.historical_context;
      const optionsContext = [correctContext, ...shuffle(allProphecies.map(p => p.historical_context)).slice(0, 3)];
      const shuffledContext = shuffle(optionsContext);
      bank.push({
        question: `What is the historical context of "${item.title}"?`,
        options: shuffledContext,
        correct: shuffledContext.indexOf(correctContext),
        reference: ref
      });
    }
  });

  // Terminology questions
  terminologyData.forEach(item => {
    if (difficulty === 'easy') {
      const correctDef = item.definition;
      const optionsDef = [correctDef, ...shuffle(terminologyData.map(t => t.definition)).slice(0, 3)];
      const shuffledDef = shuffle(optionsDef);
      bank.push({
        question: `What does the biblical term "${item.term}" mean?`,
        options: shuffledDef,
        correct: shuffledDef.indexOf(correctDef),
        reference: item.references
      });
    } else if (difficulty === 'medium') {
      const correctRef = item.references;
      const optionsRef = [correctRef, ...shuffle(terminologyData.map(t => t.references)).slice(0, 3)];
      const shuffledRef = shuffle(optionsRef);
      bank.push({
        question: `Which Bible reference is linked to the term "${item.term}"?`,
        options: shuffledRef,
        correct: shuffledRef.indexOf(correctRef),
        reference: item.references
      });
    } else { // hard
      const correctTerm = item.term;
      const optionsTerm = [correctTerm, ...shuffle(terminologyData.map(t => t.term)).slice(0, 3)];
      const shuffledTerm = shuffle(optionsTerm);
      bank.push({
        question: `Which biblical term matches this definition: "${item.definition}"?`,
        options: shuffledTerm,
        correct: shuffledTerm.indexOf(correctTerm),
        reference: item.references
      });
    }
  });

  return bank.filter(q => q.options.every(opt => opt && opt !== 'N/A'));
};

// Precompute banks
const questionBanks = {
  easy: generateQuestionBank('easy'),
  medium: generateQuestionBank('medium'),
  hard: generateQuestionBank('hard')
};

const Quiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [quizLength, setQuizLength] = useState('short'); // 'short' or 'long'
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // null, 'correct', 'incorrect'
  const [showResults, setShowResults] = useState(false);

  const lengthOptions = { short: 10, long: 25 };

  useEffect(() => {
    if (started) {
      const bank = shuffle([...questionBanks[difficulty]]);
      const numQuestions = lengthOptions[quizLength];
      const selectedQuestions = bank.slice(0, numQuestions);
      setQuestions(selectedQuestions);
    }
  }, [started, difficulty, quizLength]);

  const handleAnswer = (selected) => {
    const correct = questions[currentQuestion].correct;
    const isCorrect = selected === correct;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selected;
    setUserAnswers(newAnswers);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const handleTryAgain = () => {
    setStarted(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setFeedback(null);
    setShowResults(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-primaryBlue text-center">Test Your Bible Knowledge! Take a Quiz Now!</h1>
      
      {!started && (
        <div className="text-center mb-8">
          <label className="mr-4">Difficulty:</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-2 border border-primaryBlue rounded mr-4"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label className="mr-4">Length:</label>
          <select 
            value={quizLength} 
            onChange={(e) => setQuizLength(e.target.value)}
            className="p-2 border border-primaryBlue rounded"
          >
            <option value="short">Short (10 questions)</option>
            <option value="long">Long (25 questions)</option>
          </select>
          <button 
            onClick={() => setStarted(true)}
            className="ml-4 py-2 px-4 bg-primaryBlue text-white rounded-full font-semibold"
          >
            Start Quiz
          </button>
        </div>
      )}

      {started && !showResults && questions.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-secondaryPurple max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-funPink">Question {currentQuestion + 1}/{questions.length}</h2>
          <p className="text-textGray mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((opt, idx) => (
              <button 
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={feedback !== null}
                className={`w-full p-3 rounded-lg text-left ${
                  feedback === null 
                    ? 'bg-blue-100 hover:bg-blue-200' 
                    : feedback === 'correct' && idx === questions[currentQuestion].correct
                      ? 'bg-green-300 animate-pulse' // Sparkle effect with pulse
                      : feedback === 'incorrect' && idx === questions[currentQuestion].correct
                        ? 'bg-green-300'
                        : feedback === 'incorrect' && idx === userAnswers[currentQuestion]
                          ? 'bg-red-300'
                          : 'bg-gray-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {feedback === 'correct' && <p className="text-green-600 font-bold mt-4 text-center">Correct! ⭐✨</p>}
          {feedback === 'incorrect' && <p className="text-red-600 font-bold mt-4 text-center">Incorrect</p>}
        </div>
      )}

      {showResults && (
        <ResultsDetail questions={questions} userAnswers={userAnswers} score={score} onTryAgain={handleTryAgain} />
      )}
    </div>
  );
};

export default Quiz;