import React, { useState, useEffect } from 'react';
import { ChevronRight, Award, BookOpen, Brain, Menu, X } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

// BJJ Data Structure - All Sections
const bjjData = {
  chokes: {
    title: "Chokes",
    description: "Front headlock, rear chokes, triangles, and more",
    icon: "🥋",
    moveCount: 6,
    quizCount: 2,
    quizzes: [
      {
        id: 'chokes-quiz-1',
        question: 'Which submission compresses the carotid arteries from back control?',
        options: ['Rear Naked Choke', 'Guillotine', 'Armbar', 'Kimura'],
        correctAnswer: 'Rear Naked Choke',
        explanation: 'The RNC is applied from back control and targets the carotid arteries on both sides of the neck.'
      },
      {
        id: 'chokes-quiz-2',
        question: 'What is the key detail for finishing a guillotine choke?',
        options: [
          'Pull their head down hard',
          'Get wrist deep across throat and lift elbow',
          'Use both hands to squeeze the neck',
          'Keep their head high'
        ],
        correctAnswer: 'Get wrist deep across throat and lift elbow',
        explanation: 'The guillotine requires deep wrist placement and lifting the choking elbow to create proper pressure.'
      }
    ],
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
      },
      {
        id: 'triangle',
        name: 'Triangle Choke',
        tagline: 'Choke with legs from guard',
        category: 'Guard Choke',
        level: 'Intermediate',
        overview: 'The triangle choke traps one arm inside while using your legs to compress the carotid arteries. One leg crosses the back of the neck while the other locks behind your knee.',
        steps: [
          'Break their posture from guard',
          'Create angle to one side',
          'Throw leg over their shoulder',
          'Lock triangle with foot behind knee',
          'Pull head down to chest',
          'Squeeze knees together'
        ],
        keyCues: [
          'Create angle not straight',
          'Lock tight with no space',
          'Pull head down',
          'Squeeze knees together'
        ],
        mistakes: [
          'Staying too straight',
          'Loose triangle',
          'Not pulling head',
          'Wrong squeeze direction'
        ],
        safety: 'Blood choke works fast. Tap early when feeling pressure.'
      }
    ]
  },
  armLocks: {
    title: "Arm & Shoulder Locks",
    description: "Armbars, kimuras, americanas, and arm triangles",
    icon: "💪",
    moveCount: 6,
    quizCount: 2,
    quizzes: [
      {
        id: 'armlocks-quiz-1',
        question: 'Which joint does an armbar attack?',
        options: ['Shoulder', 'Elbow', 'Wrist', 'Neck'],
        correctAnswer: 'Elbow',
        explanation: 'The armbar hyperextends the elbow joint by pulling the wrist while pushing the hips up.'
      },
      {
        id: 'armlocks-quiz-2',
        question: 'What grip configuration is used for a Kimura?',
        options: ['Gable grip', 'Figure-four grip', 'S-grip', 'No grip needed'],
        correctAnswer: 'Figure-four grip',
        explanation: 'The Kimura uses a figure-four grip where you grab your own wrist after threading under their elbow.'
      }
    ],
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
      },
      {
        id: 'americana',
        name: 'Americana',
        tagline: 'Keylock shoulder lock',
        category: 'Shoulder Lock',
        level: 'Beginner',
        overview: 'The Americana is a shoulder lock from top positions like side control or mount. The arm is bent at 90 degrees and rotated toward the head.',
        steps: [
          'From side control isolate their arm',
          'Pin their wrist to the mat',
          'Thread arm under their elbow',
          'Grab your own wrist',
          'Lift their elbow while keeping wrist pinned',
          'Rotate hand toward their head'
        ],
        keyCues: [
          'Keep wrist pinned to mat',
          'Elbow at 90 degrees',
          'Lift elbow up not out',
          'Rotate in arc toward head'
        ],
        mistakes: [
          'Not pinning wrist',
          'Letting arm straighten',
          'Rotating too fast',
          'Poor weight distribution'
        ],
        safety: 'Shoulder locks cause serious injury. Apply slowly and tap immediately.'
      },
      {
        id: 'armTriangle',
        name: 'Arm Triangle',
        tagline: 'Head and arm choke',
        category: 'Choke',
        level: 'Intermediate',
        overview: 'The arm triangle uses your shoulder and their arm to compress one side of the neck. Finished from side control or mount.',
        steps: [
          'Get their arm across their neck',
          'Drive shoulder into other side',
          'Lock hands together',
          'Switch to opposite side',
          'Walk legs back for angle',
          'Squeeze shoulder into neck',
          'Pull head toward you'
        ],
        keyCues: [
          'Arm tight across neck',
          'Shoulder closes other side',
          'Create angle',
          'Squeeze tight'
        ],
        mistakes: [
          'Arm not across properly',
          'Staying too perpendicular',
          'Leaving space',
          'Not angling'
        ],
        safety: 'Blood choke. Tap early when feeling pressure.'
      }
    ]
  },
  legLocks: {
    title: "Leg Locks",
    description: "Heel hooks, ankle locks, and knee bars",
    icon: "🦵",
    moveCount: 5,
    quizCount: 2,
    quizzes: [
      {
        id: 'leglocks-quiz-1',
        question: 'Which leg lock is considered safest for beginners?',
        options: ['Heel Hook', 'Straight Ankle Lock', 'Toe Hold', 'Knee Bar'],
        correctAnswer: 'Straight Ankle Lock',
        explanation: 'The straight ankle lock comes on gradually and is the safest leg lock for beginners to practice.'
      },
      {
        id: 'leglocks-quiz-2',
        question: 'What should you do when caught in a leg lock?',
        options: [
          'Try to roll out immediately',
          'Tap early before feeling pain',
          'Wait to see how bad it gets',
          'Pull your leg out quickly'
        ],
        correctAnswer: 'Tap early before feeling pain',
        explanation: 'Leg locks can cause serious injury quickly. Always tap early, especially with heel hooks and knee bars.'
      }
    ],
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
      },
      {
        id: 'heelHook',
        name: 'Heel Hook',
        tagline: 'Rotational leg attack',
        category: 'Leg Lock',
        level: 'Advanced',
        overview: 'The heel hook is one of the most dangerous leg locks in BJJ. It attacks the knee by controlling the heel and rotating it. This can cause catastrophic knee damage instantly.',
        steps: [
          'Enter leg entanglement position',
          'Cup the heel with both hands',
          'Trap their leg between yours',
          'Keep their knee line controlled',
          'Rotate heel away from their body',
          'Keep hips tight to their leg'
        ],
        keyCues: [
          'Control the knee line first',
          'Cup heel like holding a basketball',
          'Rotation comes from whole body not just arms',
          'Keep everything tight'
        ],
        mistakes: [
          'Poor knee line control',
          'Loose leg entanglement',
          'Using only arms to rotate',
          'Going too fast'
        ],
        safety: 'EXTREMELY DANGEROUS. Can destroy knees instantly. Only practice with experienced partners. Tap immediately at first pressure.'
      },
      {
        id: 'kneeBar',
        name: 'Knee Bar',
        tagline: 'Hyperextend the knee',
        category: 'Leg Lock',
        level: 'Advanced',
        overview: 'The knee bar hyperextends the knee joint similar to how an armbar works on the elbow. The leg is isolated and pressure is applied by arching the hips.',
        steps: [
          'Isolate one leg',
          'Fall back with their leg',
          'Trap leg across your body',
          'Clamp knees around their thigh',
          'Control their foot to hip',
          'Arch hips up to hyperextend knee'
        ],
        keyCues: [
          'Keep foot to hip',
          'Knees tight around thigh',
          'Hips drive up not just pulling',
          'Control the angle'
        ],
        mistakes: [
          'Not controlling the foot',
          'Loose knee clamp',
          'Wrong angle',
          'Letting them turn'
        ],
        safety: 'Knee bars can injure quickly. Tap early before feeling pain. Knees are fragile.'
      }
    ]
  },
  guardPasses: {
    title: "Guard Passes",
    description: "Techniques to pass the guard and advance position",
    icon: "🛡️",
    moveCount: 3,
    quizCount: 2,
    quizzes: [
      {
        id: 'guardpasses-quiz-1',
        question: 'What is the primary goal of a guard pass?',
        options: [
          'Submit your opponent',
          'Advance to a dominant position like side control or mount',
          'Escape back to standing',
          'Control their legs'
        ],
        correctAnswer: 'Advance to a dominant position like side control or mount',
        explanation: 'Guard passing is about moving past the legs to reach dominant positions where you can control and attack.'
      },
      {
        id: 'guardpasses-quiz-2',
        question: 'When passing guard, what should you avoid?',
        options: [
          'Keeping your weight forward',
          'Controlling their hips',
          'Staying in their closed guard too long',
          'Moving to side control'
        ],
        correctAnswer: 'Staying in their closed guard too long',
        explanation: 'Staying static in closed guard allows your opponent to set up attacks. Keep moving and working to open and pass.'
      }
    ],
    moves: [
      {
        id: 'toreandoPass',
        name: 'Toreando Pass',
        tagline: 'Bullfighter pass',
        category: 'Open Guard Pass',
        level: 'Intermediate',
        overview: 'The toreando or bullfighter pass involves controlling both pant legs and swinging them to one side while moving to the opposite side to pass.',
        steps: [
          'Grip both pant legs at the knees',
          'Stand up with good posture',
          'Swing their legs to one side',
          'Circle around to the opposite side',
          'Drop weight and secure side control'
        ],
        keyCues: [
          'Keep their legs together when swinging',
          'Move quickly to prevent recovery',
          'Stay on your toes for mobility'
        ],
        mistakes: [
          'Not controlling both legs',
          'Moving too slowly',
          'Letting them recover guard'
        ],
        safety: 'This is a positional technique with minimal injury risk.'
      },
      {
        id: 'kneeSlice',
        name: 'Knee Slice Pass',
        tagline: 'Cut through the guard',
        category: 'Pressure Pass',
        level: 'Beginner',
        overview: 'The knee slice pass involves driving your knee across their legs while maintaining upper body control to cut through their guard.',
        steps: [
          'Control their far arm and collar',
          'Drive knee across their thigh',
          'Pin their bottom leg with your shin',
          'Slide knee across to far side',
          'Drop weight into side control'
        ],
        keyCues: [
          'Keep chest heavy on them',
          'Drive knee low across thigh',
          'Control their upper body throughout'
        ],
        mistakes: [
          'Not pinning their bottom leg',
          'Leaving too much space',
          'Poor upper body control'
        ],
        safety: 'Apply pressure gradually to avoid knee on belly injuries.'
      }
    ]
  },
  sweeps: {
    title: "Sweeps",
    description: "Reversals from guard to top position",
    icon: "🔄",
    moveCount: 2,
    quizCount: 2,
    quizzes: [
      {
        id: 'sweeps-quiz-1',
        question: 'What is the main purpose of a sweep?',
        options: [
          'Submit your opponent',
          'Escape to standing',
          'Reverse position from bottom to top',
          'Defend against passes'
        ],
        correctAnswer: 'Reverse position from bottom to top',
        explanation: 'Sweeps are techniques used from guard to reverse the position and end up on top in a dominant position.'
      },
      {
        id: 'sweeps-quiz-2',
        question: 'What do most sweeps require?',
        options: [
          'Superior strength',
          'Breaking opponent\'s base and posture',
          'A gi to grip',
          'Flexible legs'
        ],
        correctAnswer: 'Breaking opponent\'s base and posture',
        explanation: 'Effective sweeps require disrupting your opponent\'s balance and base, not just strength.'
      }
    ],
    moves: [
      {
        id: 'scissorSweep',
        name: 'Scissor Sweep',
        tagline: 'Classic guard sweep',
        category: 'Closed Guard',
        level: 'Beginner',
        overview: 'The scissor sweep uses a scissoring motion with your legs while pulling your opponent forward to sweep them over.',
        steps: [
          'From closed guard, break their posture down',
          'Open guard and get an underhook',
          'Place top leg across their chest',
          'Place bottom leg behind their knee',
          'Scissor legs while pulling them forward',
          'Come up on top in mount or side control'
        ],
        keyCues: [
          'Break their posture first',
          'Top leg pushes, bottom leg pulls',
          'Pull with your arms as you scissor'
        ],
        mistakes: [
          'Not breaking posture first',
          'Weak scissor motion',
          'Not coming up with the sweep'
        ],
        safety: 'Control the sweep to avoid slamming your partner.'
      },
      {
        id: 'butterflyHook',
        name: 'Butterfly Hook Sweep',
        tagline: 'Elevate and sweep',
        category: 'Butterfly Guard',
        level: 'Intermediate',
        overview: 'From butterfly guard, use your hook to elevate your opponent while pulling them in the direction of the sweep.',
        steps: [
          'Sit up in butterfly guard with hooks in',
          'Get underhooks or collar grips',
          'Pull them forward, breaking posture',
          'Lift with your hook on one side',
          'Drive your shoulder into them',
          'Roll them over to the side'
        ],
        keyCues: [
          'Stay chest to chest',
          'Lift with your leg, drive with your shoulder',
          'Follow them over to maintain top position'
        ],
        mistakes: [
          'Leaning back instead of forward',
          'Not elevating with the hook',
          'Poor timing'
        ],
        safety: 'Control the sweep to avoid partner landing awkwardly.'
      }
    ]
  },
  wrestling: {
    title: "Wrestling",
    description: "Takedowns including single leg and double leg",
    icon: "🤼",
    moveCount: 3,
    quizCount: 2,
    quizzes: [
      {
        id: 'wrestling-quiz-1',
        question: 'What is the most important aspect of a successful takedown?',
        options: [
          'Pure strength',
          'Speed only',
          'Level change and penetration step',
          'Jumping at opponent'
        ],
        correctAnswer: 'Level change and penetration step',
        explanation: 'Good takedowns require proper level change and penetration step to close distance and off-balance your opponent.'
      },
      {
        id: 'wrestling-quiz-2',
        question: 'In wrestling, what does "changing levels" mean?',
        options: [
          'Switching between different techniques',
          'Dropping your hips lower to shoot',
          'Standing on your toes',
          'Lifting your opponent'
        ],
        correctAnswer: 'Dropping your hips lower to shoot',
        explanation: 'Changing levels means dropping your hips and lowering your body to shoot in for a takedown effectively.'
      }
    ],
    moves: [
      {
        id: 'singleLeg',
        name: 'Single Leg Takedown',
        tagline: 'Classic wrestling takedown',
        category: 'Takedown',
        level: 'Beginner',
        overview: 'The single leg takedown involves shooting in to grab one leg, then driving through or lifting to take your opponent down.',
        steps: [
          'Set up with hand fighting or feints',
          'Change levels by dropping your hips',
          'Step in deep with penetration step',
          'Grab behind their knee with both arms',
          'Drive forward or lift to finish',
          'Come up on top'
        ],
        keyCues: [
          'Level change before shooting',
          'Penetration step gets you deep',
          'Head on the outside, tight to their body',
          'Drive through them, not just pulling'
        ],
        mistakes: [
          'No level change before shooting',
          'Shallow penetration step',
          'Head on wrong side',
          'Only pulling instead of driving'
        ],
        safety: 'Control the finish to avoid knee injuries to your partner.'
      },
      {
        id: 'doubleLeg',
        name: 'Double Leg Takedown',
        tagline: 'Powerful wrestling staple',
        category: 'Takedown',
        level: 'Beginner',
        overview: 'The double leg takedown involves shooting in low, grabbing both legs, and driving through to take your opponent to the mat.',
        steps: [
          'Set up with movement or feints',
          'Drop level and shoot in',
          'Wrap both arms around both legs',
          'Head tight to their chest or side',
          'Drive forward through them',
          'Lift or drive them to the mat'
        ],
        keyCues: [
          'Shoot low and fast',
          'Keep your back straight',
          'Drive with your legs',
          'Head position protects your neck'
        ],
        mistakes: [
          'Shooting from too far away',
          'Rounded back position',
          'Not driving through',
          'Poor head position'
        ],
        safety: 'Be careful with explosive movements and control the landing to protect both athletes.'
      },
      {
        id: 'uchiMata',
        name: 'Uchi Mata',
        tagline: 'Inner thigh throw from Judo',
        category: 'Judo Throw',
        level: 'Intermediate',
        overview: 'Uchi Mata is a powerful Judo throw where you lift your opponent using your inner thigh while breaking their balance forward and to the side. It is one of the most popular throws in competition.',
        steps: [
          'Establish grip fighting position',
          'Break their balance forward and to side',
          'Turn your body in',
          'Step deep with support leg',
          'Drive lifting leg into their inner thigh',
          'Lift and sweep them over',
          'Follow through with rotation'
        ],
        keyCues: [
          'Break balance before entering',
          'Deep turn and penetration',
          'Lifting leg drives up and back',
          'Keep pulling with grips throughout',
          'Full hip rotation'
        ],
        mistakes: [
          'Not breaking balance first',
          'Shallow entry',
          'Weak leg drive',
          'Not committing to the throw',
          'Poor grip control'
        ],
        safety: 'High amplitude throw. Practice on mats with proper instruction. Control the finish to prevent injuries.'
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
  const [quizSection, setQuizSection] = useState(null);

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

  const startQuiz = (sectionKey) => {
    setQuizSection(sectionKey);
    setCurrentPage('quiz');
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
            startQuiz={startQuiz}
          />
        )}
        
        {currentPage === 'section' && (
          <SectionPage 
            section={bjjData[currentSection]}
            setCurrentPage={setCurrentPage}
            setCurrentMove={setCurrentMove}
            startQuiz={() => startQuiz(currentSection)}
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

        {currentPage === 'quiz' && (
          <QuizPage
            section={bjjData[quizSection]}
            sectionKey={quizSection}
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

function HomePage({ setCurrentPage, setCurrentSection, mode, setMode, startQuiz }) {
  const sections = [
    { key: 'chokes', ...bjjData.chokes },
    { key: 'armLocks', ...bjjData.armLocks },
    { key: 'legLocks', ...bjjData.legLocks },
    { key: 'guardPasses', ...bjjData.guardPasses },
    { key: 'sweeps', ...bjjData.sweeps },
    { key: 'wrestling', ...bjjData.wrestling },
  ];

  const handleSectionClick = (sectionKey) => {
    if (mode === 'quiz') {
      startQuiz(sectionKey);
    } else {
      setCurrentSection(sectionKey);
      setCurrentPage('section');
    }
  };

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
            mode={mode}
            onClick={() => handleSectionClick(section.key)}
          />
        ))}
      </div>
    </div>
  );
}

function SectionCard({ section, onClick, mode }) {
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
        <span>
          {mode === 'quiz' 
            ? `${section.quizCount} quizzes` 
            : `${section.moveCount} moves • ${section.quizCount} quizzes`
          }
        </span>
        <ChevronRight className="group-hover:text-green-400 group-hover:translate-x-1 transition" />
      </div>
      <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 w-0"></div>
      </div>
    </div>
  );
}

function SectionPage({ section, setCurrentPage, setCurrentMove, startQuiz }) {
  return (
    <div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 text-gray-400 hover:text-green-400 transition flex items-center gap-2"
      >
        <ChevronRight className="rotate-180" size={20} />
        Back to Home
      </button>

      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold mb-2">{section.title}</h2>
          <p className="text-gray-400 text-lg">{section.description}</p>
        </div>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition flex items-center gap-2"
        >
          <Brain size={20} />
          Start Quiz
        </button>
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
      const data = await fetch(`${API}/api/comments/${move.id}`)
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
      const response = await fetch(`${API}/api/comments`, {
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

function QuizPage({ section, sectionKey, setCurrentPage, userName, promptForName }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [results, setResults] = useState({});
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const currentQuestion = section.quizzes[currentQuestionIndex];

  useEffect(() => {
    loadResults();
  }, [currentQuestion]);

  const loadResults = async () => {
    setIsLoadingResults(true);
    try {
      const response = await fetch(`${API}/api/quiz/${sectionKey}/results/${currentQuestion.id}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error loading results:', error);
      setResults({});
    }
    setIsLoadingResults(false);
  };

  const handleAnswerSelect = async (answer) => {
    if (hasAnswered) return;

    if (!userName) {
      promptForName(() => submitAnswer(answer));
      return;
    }

    await submitAnswer(answer);
  };

  const submitAnswer = async (answer) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    try {
      await fetch(`${API}/api/quiz/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: sectionKey,
          questionId: currentQuestion.id,
          userName: userName,
          answer: answer
        })
      });
      
      await loadResults();
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < section.quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / section.quizzes.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-5xl font-bold text-green-400 mb-2">
            {score}/{section.quizzes.length}
          </div>
          <p className="text-2xl text-gray-400 mb-8">{percentage}% Correct</p>
          
          {percentage < 60 && (
            <p className="text-gray-300 mb-8">
              Keep training! Review the moves and try again.
            </p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-gray-300 mb-8">
              Good job! You're on the right track.
            </p>
          )}
          {percentage >= 80 && (
            <p className="text-gray-300 mb-8">
              Excellent work! You've mastered this section!
            </p>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetakeQuiz}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 text-gray-400 hover:text-green-400 transition flex items-center gap-2"
      >
        <ChevronRight className="rotate-180" size={20} />
        Back to Home
      </button>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{section.title} Quiz</h2>
          <div className="text-lg">
            <span className="text-gray-400">Question </span>
            <span className="text-green-400 font-bold">
              {currentQuestionIndex + 1}/{section.quizzes.length}
            </span>
            <span className="text-gray-400 ml-4">Score: </span>
            <span className="text-green-400 font-bold">
              {score}/{currentQuestionIndex + (hasAnswered ? 1 : 0)}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showResult = hasAnswered;
              
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition font-medium ";
              
              if (!showResult) {
                buttonClass += "border-gray-600 hover:border-green-400 hover:bg-gray-700";
              } else if (isCorrect) {
                buttonClass += "border-green-500 bg-green-500/20 text-green-400";
              } else if (isSelected && !isCorrect) {
                buttonClass += "border-red-500 bg-red-500/20 text-red-400";
              } else {
                buttonClass += "border-gray-600 opacity-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={hasAnswered}
                  className={buttonClass}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {showResult && isCorrect && <span className="text-xl">✓</span>}
                    {showResult && isSelected && !isCorrect && <span className="text-xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {hasAnswered && (
          <div className="mb-6">
            <div className={`p-4 rounded-lg border-l-4 ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-500/20 border-green-500' 
                : 'bg-red-500/20 border-red-500'
            }`}>
              <p className="font-bold mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-gray-300">{currentQuestion.explanation}</p>
            </div>

            {!isLoadingResults && Object.keys(results).length > 0 && (
              <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-3 text-green-400">Live Results:</h4>
                {currentQuestion.options.map((option) => {
                  const voters = results[option] || [];
                  const total = Object.values(results).flat().length;
                  const percentage = total > 0 ? Math.round((voters.length / total) * 100) : 0;
                  
                  return (
                    <div key={option} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{option}</span>
                        <span className="text-gray-400">{percentage}% ({voters.length})</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      {voters.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {voters.join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {hasAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition"
          >
            {currentQuestionIndex < section.quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

