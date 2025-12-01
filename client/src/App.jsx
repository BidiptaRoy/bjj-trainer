import React, { useState, useEffect } from 'react';
import { ChevronRight, Award, BookOpen, Brain, Menu, X } from 'lucide-react';

// BJJ Data Structure - All Sections
const bjjData = {
  chokes: {
    title: "Chokes",
    description: "Front headlock, rear chokes, triangles, and more",
    icon: "🥋",
    moveCount: 5,
    quizCount: 2,
    moves: [
      {
        id: 'rnc',
        name: 'Rear Naked Choke',
        tagline: 'Back control choke',
        category: 'Back Control',
        level: 'Beginner',
        overview: 'The rear naked choke is one of the most fundamental and effective submissions in nogi BJJ. From back control, you wrap your choking arm around the neck while the other hand supports behind the head.',
        steps: [
          'Secure back control with hooks in',
          'Thread choking arm under chin, hand to opposite shoulder',
          'Place other hand behind head',
          'Squeeze elbows together while expanding chest',
          'Apply pressure until tap'
        ],
        keyCues: [
          'Keep your chest tight to their back',
          'Blade of forearm across throat, not bicep',
          'Squeeze elbows together, not hands'
        ],
        mistakes: [
          'Arm too high on face instead of throat',
          'Pulling hands instead of squeezing elbows',
          'Losing back control during finish'
        ],
        safety: 'This choke works fast. Tap early to avoid going unconscious.'
      },
      {
        id: 'guillotine',
        name: 'Guillotine',
        tagline: 'Front headlock choke',
        category: 'Front Headlock',
        level: 'Beginner',
        overview: 'A versatile front headlock choke that can be applied from many positions. You wrap your arm around the neck and squeeze while controlling their posture.',
        steps: [
          'Secure front headlock position',
          'Wrap arm deep around neck',
          'Lock hands with guillotine grip',
          'Pull guard or stay standing',
          'Lift elbow and squeeze'
        ],
        keyCues: [
          'Get wrist deep across throat',
          'Keep their head pulled to your chest',
          'Lift choking elbow up'
        ],
        mistakes: [
          'Not getting deep enough on neck',
          'Letting them get their head free',
          'Wrong grip configuration'
        ],
        safety: 'Can cause neck discomfort. Tap early if you feel pressure.'
      }
    ]
  },
  armLocks: {
    title: "Arm & Shoulder Locks",
    description: "Armbars, kimuras, americanas, and arm triangles",
    icon: "💪",
    moveCount: 4,
    quizCount: 2,
    moves: [
      {
        id: 'armbar',
        name: 'Armbar',
        tagline: 'Hyperextend the elbow',
        category: 'Joint Lock',
        level: 'Beginner',
        overview: 'The armbar is a fundamental submission that hyperextends the elbow joint. It can be applied from many positions including guard, mount, and side control.',
        steps: [
          'Control the arm you want to attack',
          'Pivot your body perpendicular to opponent',
          'Clamp knees together around their shoulder',
          'Pull wrist to chest, hips up',
          'Apply pressure until tap'
        ],
        keyCues: [
          'Keep arm tight to your chest',
          'Pinch knees together',
          'Hips drive up, not just pulling the arm'
        ],
        mistakes: [
          'Not controlling the wrist properly',
          'Letting them stack you',
          'Not keeping knees tight together'
        ],
        safety: 'Elbow joints are fragile. Apply pressure slowly and tap immediately.'
      },
      {
        id: 'kimura',
        name: 'Kimura',
        tagline: 'Shoulder lock with figure-four grip',
        category: 'Shoulder Lock',
        level: 'Beginner',
        overview: 'A shoulder lock using a figure-four grip on the arm. Extremely versatile and can be applied from almost any position.',
        steps: [
          'Grip opponents wrist with same-side hand',
          'Thread other arm under their elbow',
          'Grab your own wrist (figure-four)',
          'Keep their elbow tight to body',
          'Rotate their hand toward their head'
        ],
        keyCues: [
          'Keep their elbow close to their body',
          'Move their hand in a circle toward their head',
          'Control the angle, not just strength'
        ],
        mistakes: [
          'Letting the elbow flare away from body',
          'Cranking too hard too fast',
          'Not controlling their body with your weight'
        ],
        safety: 'Shoulders can be damaged quickly. Tap early and apply slowly.'
      }
    ]
  },
  legLocks: {
    title: "Leg Locks",
    description: "Heel hooks, ankle locks, and knee bars",
    icon: "🦵",
    moveCount: 3,
    quizCount: 2,
    moves: [
      {
        id: 'straightAnkleLock',
        name: 'Straight Ankle Lock',
        tagline: 'Classic ankle submission',
        category: 'Ankle Lock',
        level: 'Beginner',
        overview: 'The straight ankle lock attacks the achilles tendon and ankle joint. It is one of the safest and most fundamental leg locks.',
        steps: [
          'Control the leg with both hands',
          'Place ankle in armpit or across chest',
          'Lock hands around the foot',
          'Squeeze knees together',
          'Arch back and extend'
        ],
        keyCues: [
          'Blade of forearm across achilles',
          'Keep heel deep in armpit',
          'Extend hips, dont just pull'
        ],
        mistakes: [
          'Letting them pull their foot out',
          'Not controlling the knee line',
          'Using arms only instead of whole body'
        ],
        safety: 'Ankle locks come on slowly. Still tap when you feel pressure.'
      }
    ]
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSection, setCurrentSection] = useState(null);
  const [currentMove, setCurrentMove] = useState(null);
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [mode, setMode] = useState('learn');

  useEffect(() => {
    const saved = localStorage.getItem('bjjUserName');
    if (saved) {
      setUserName(saved);
    }
  }, []);

  const promptForName = (callback) => {
    if (!userName) {
      setShowNamePrompt(true);
      return false;
    }
    callback();
    return true;
  };

  const handleNameSubmit = (name) => {
    setUserName(name);
    localStorage.setItem('bjjUserName', name);
    setShowNamePrompt(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {showNamePrompt && (
        <NamePromptModal onSubmit={handleNameSubmit} />
      )}

      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold cursor-pointer hover:text-green-400 transition"
            onClick={() => setCurrentPage('home')}
          >
            Nogi BJJ Trainer
          </h1>
          {userName && (
            <div className="text-sm text-gray-400">
              Welcome, <span className="text-green-400">{userName}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            mode={mode}
            setMode={setMode}
          />
        )}
        
        {currentPage === 'section' && (
          <SectionPage 
            section={bjjData[currentSection]}
            setCurrentPage={setCurrentPage}
            setCurrentMove={setCurrentMove}
          />
        )}

        {currentPage === 'move' && (
          <MoveDetailPage 
            move={currentMove}
            setCurrentPage={setCurrentPage}
            userName={userName}
            promptForName={promptForName}
          />
        )}
      </main>
    </div>
  );
}

function NamePromptModal({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-green-400">Welcome to Nogi BJJ Trainer</h2>
        <p className="text-gray-300 mb-6">Please enter your name to get started:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Your name"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded text-white focus:outline-none focus:border-green-400 mb-4"
          autoFocus
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition"
        >
          Start Training
        </button>
      </div>
    </div>
  );
}

function HomePage({ setCurrentPage, setCurrentSection, mode, setMode }) {
  const sections = [
    { key: 'chokes', ...bjjData.chokes },
    { key: 'armLocks', ...bjjData.armLocks },
    { key: 'legLocks', ...bjjData.legLocks },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">Nogi BJJ Trainer</h2>
        <p className="text-xl text-gray-400">Learn, drill, and test yourself on nogi submissions and positions</p>
      </div>

      <div className="flex justify-center mb-12 gap-4">
        <button
          onClick={() => setMode('learn')}
          className={`px-8 py-3 rounded-lg font-bold text-lg transition flex items-center gap-2 ${
            mode === 'learn' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <BookOpen size={20} />
          Learn
        </button>
        <button
          onClick={() => setMode('quiz')}
          className={`px-8 py-3 rounded-lg font-bold text-lg transition flex items-center gap-2 ${
            mode === 'quiz' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Brain size={20} />
          Quiz
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <SectionCard 
            key={section.key} 
            section={section} 
            onClick={() => {
              setCurrentSection(section.key);
              setCurrentPage('section');
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SectionCard({ section, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20 transition group"
    >
      <div className="text-4xl mb-4">{section.icon}</div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition">
        {section.title}
      </h3>
      <p className="text-gray-400 mb-4">{section.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{section.moveCount} moves • {section.quizCount} quizzes</span>
        <ChevronRight className="group-hover:text-green-400 group-hover:translate-x-1 transition" />
      </div>
      <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 w-0"></div>
      </div>
    </div>
  );
}

function SectionPage({ section, setCurrentPage, setCurrentMove }) {
  return (
    <div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 text-gray-400 hover:text-green-400 transition flex items-center gap-2"
      >
        <ChevronRight className="rotate-180" size={20} />
        Back to Home
      </button>

      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">{section.title}</h2>
        <p className="text-gray-400 text-lg">{section.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {section.moves.map((move) => (
          <MoveCard 
            key={move.id} 
            move={move} 
            onClick={() => {
              setCurrentMove(move);
              setCurrentPage('move');
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MoveCard({ move, onClick }) {
  const levelColors = {
    'Beginner': 'text-green-400',
    'Intermediate': 'text-yellow-400',
    'Advanced': 'text-red-400'
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-green-400 hover:shadow-lg transition group"
    >
      <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition">
        {move.name}
      </h3>
      <p className="text-gray-400 mb-3">{move.tagline}</p>
      <span className={`text-sm font-semibold ${levelColors[move.level]}`}>
        {move.level}
      </span>
    </div>
  );
}

function MoveDetailPage({ move, setCurrentPage, userName, promptForName }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    loadComments();
  }, [move.id]);

  const loadComments = async () => {
    setIsLoadingComments(true);
    try {
      const data = await fetch(`http://localhost:3000/api/comments/${move.id}`)
        .then(r => r.json())
        .catch(() => []);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments([]);
    }
    setIsLoadingComments(false);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    
    if (!userName) {
      promptForName(() => submitComment());
      return;
    }
    
    await submitComment();
  };

  const submitComment = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pageId: move.id, 
          userName: userName, 
          text: newComment 
        })
      });
      
      if (response.ok) {
        setNewComment('');
        loadComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const levelColors = {
    'Beginner': 'bg-green-500',
    'Intermediate': 'bg-yellow-500',
    'Advanced': 'bg-red-500'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentPage('section')}
        className="mb-6 text-gray-400 hover:text-green-400 transition flex items-center gap-2"
      >
        <ChevronRight className="rotate-180" size={20} />
        Back to Section
      </button>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{move.name}</h1>
        
        <div className="flex gap-3 mb-6">
          <span className={`px-3 py-1 rounded text-sm font-semibold ${levelColors[move.level]}`}>
            {move.level}
          </span>
          <span className="px-3 py-1 rounded text-sm font-semibold bg-gray-700">
            {move.category}
          </span>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-green-400">Overview</h2>
          <p className="text-gray-300 leading-relaxed">{move.overview}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-green-400">Key Steps</h2>
          <ol className="space-y-2">
            {move.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-400 font-bold">{index + 1}.</span>
                <span className="text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-green-400">Key Cues</h2>
          <ul className="space-y-2">
            {move.keyCues.map((cue, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-400">•</span>
                <span className="text-gray-300">{cue}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-green-400">Common Mistakes</h2>
          <ul className="space-y-2">
            {move.mistakes.map((mistake, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span className="text-gray-300">{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">⚠️ Safety</h2>
          <p className="text-gray-300 bg-gray-900 p-4 rounded border-l-4 border-yellow-400">
            {move.safety}
          </p>
        </section>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Comments & Questions</h2>
        
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ask a question or share feedback..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded text-white focus:outline-none focus:border-green-400 min-h-24 resize-y"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-3 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition"
          >
            Post Comment
          </button>
        </div>

        <div className="space-y-4">
          {isLoadingComments ? (
            <p className="text-gray-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-green-400">{comment.userName}</span>
                  <span className="text-gray-500 text-sm">{new Date(comment.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-300">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

