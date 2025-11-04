import { useState, useRef, useEffect } from 'react';
import { div } from 'three/tsl';

const asciiArtName = `
   █████████   ███████████   ███████████    █████████   ██████   █████       
  ███░░░░░███ ░░███░░░░░███ ░░███░░░░░███  ███░░░░░███ ░░██████ ░░███        
 ░███    ░███  ░███    ░███  ░███    ░███ ░███    ░███  ░███░███ ░███        
 ░███████████  ░██████████   ░██████████  ░███████████  ░███░░███░███        
 ░███░░░░░███  ░███░░░░░███  ░███░░░░░░   ░███░░░░░███  ░███ ░░██████        
 ░███    ░███  ░███    ░███  ░███         ░███    ░███  ░███  ░░█████        
 █████   █████ █████   █████ █████        █████   █████ █████  ░░█████       
░░░░░   ░░░░░ ░░░░░   ░░░░░ ░░░░░        ░░░░░   ░░░░░ ░░░░░    ░░░░░        
                                                                             
                                                                             
                                                                             
 ███████████  █████  █████████  █████   ███   █████   █████████    █████████ 
░░███░░░░░███░░███  ███░░░░░███░░███   ░███  ░░███   ███░░░░░███  ███░░░░░███
 ░███    ░███ ░███ ░███    ░░░  ░███   ░███   ░███  ░███    ░███ ░███    ░░░ 
 ░██████████  ░███ ░░█████████  ░███   ░███   ░███  ░███████████ ░░█████████ 
 ░███░░░░░███ ░███  ░░░░░░░░███ ░░███  █████  ███   ░███░░░░░███  ░░░░░░░░███
 ░███    ░███ ░███  ███    ░███  ░░░█████░█████░    ░███    ░███  ███    ░███
 ███████████  █████░░█████████     ░░███ ░░███      █████   █████░░█████████ 
░░░░░░░░░░░  ░░░░░  ░░░░░░░░░       ░░░   ░░░      ░░░░░   ░░░░░  ░░░░░░░░░  

`;

const commandList = ['help', 'about', 'projects', 'skills', 'contact', 'education', 'clear'];
const commandListToShow = [
  'help      - To see available commands',
  'about     - Learn about me',
  'projects  - View my projects',
  'skills    - See my technical skills',
  'contact   - How to reach me',
  'education - My educational background',
  'clear     - Clear the terminal'
];

// --- TERMINAL COMPONENT ---
const Terminal = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showWelcome, setShowWelcome] = useState(true);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  // useEffect for the welcome animation
  useEffect(() => {
    if (showWelcome) {
      const chunkSize = 25;
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i >= asciiArtName.length) {
          clearInterval(typingInterval);
          
          setHistory([{ 
            output: (
              <>
                <div>
                  <p>
                  Initializing arpan@portfolio:~$... <br />System ready. <p className='text-blue-600 font-bold'>Welcome, user.</p> <br /> <br />I'm Arpan Biswas, a Computer Science Student. <br />To begin, type 'help' and press Enter.
                  </p>
                </div>
              </>
            )
          }]);
          setShowWelcome(false);
        } else {
          const chunk = asciiArtName.slice(i, i + chunkSize);
          setWelcomeMessage(prev => prev + chunk);
          i += chunkSize;
        }
      }, 10);

      return () => clearInterval(typingInterval);
    }
  }, [showWelcome]);

  
  useEffect(() => { const handleClick = () => inputRef.current?.focus(); const terminalElement = terminalBodyRef.current; terminalElement?.addEventListener('click', handleClick); return () => terminalElement?.removeEventListener('click', handleClick); }, []);
  useEffect(() => { if (terminalBodyRef.current) { terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight; } }, [history, welcomeMessage]);
  
  // Command processing logic
  const handleCommand = (command) => {
    const cmd = command.trim();
    let output = '';
    switch (cmd) {
      case 'help': output = `Available commands:\n- ${commandListToShow.join('\n- ')}`; break;
      case 'about': output = `👋 Hello, I'm Arpan Biswas!

I'm a Computer Science Student, with a passion for full-stack development and the decentralized web.

My Focus:
- Building dynamic and scalable applications with the MERN stack.
- Exploring the potential of Web3 and blockchain technology.
- Skilled in both front-end (React) and back-end (Node.js, Express) development.
- Currently honing my skills in smart contract development using Foundry.

When I'm not coding, I enjoy diving into novels and learning about spirituality.

Feel free to explore more using the 'projects', 'skills', or 'contact' commands!`; break;


      case 'projects':
        output = (
          <div>
            <p className="text-yellow-300 font-semibold mb-2">Here are some of my projects:</p>

            <p className="mt-2">
              🎮 <span className="font-semibold text-green-400">Tic-Tac-Toe</span><br />
              A real-time multiplayer game built with <span className="text-blue-400">WebSockets</span>. <br />
              Players can create rooms, share room codes with friends, and enjoy online matches.<br />
              <span className="italic text-gray-400">Tech Stack:</span> React (Vercel) + Node.js + Socket.IO
            </p>

            <p className="mt-3">
              🔗 <a
                href="https://arpanstictactoe.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Live Demo
              </a>{' '}
              
            </p>
          </div>
        );
        break;



      case 'skills': output = `> Displaying skill set...

* Languages:          JavaScript, TypeScript, C, C++, Python, Rust, Solidity
* Frontend:           React, Next.js, Vanilla JS, Tailwind CSS
* Backend:            Node.js, Express.js, Flask, FastAPI
* Database:           MongoDB
* DevOps & Tooling:   Docker, CI/CD, Git, GitHub`; break;


      case 'contact':
        output = (
          <div>
            <p className="text-yellow-300 font-semibold mb-2">Get In Touch:</p>

            <p>
              Email:{' '}
              <a
                href="mailto:contactarpan912@gmail.com"
                className="text-blue-400 hover:underline"
              >
                contactarpan912@gmail.com
              </a>
            </p>

            <p>
              GitHub:{' '}
              <a
                href="https://github.com/ArpNova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                github.com/arpnova
              </a>
            </p>

            <p>
              LinkedIn:{' '}
              <a
                href="https://www.linkedin.com/in/arpanbiswas9126"
                target="_blank"
                // rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                /in/arpan-biswas
              </a>
            </p>

            <p>
               X :{' '}
              <a
                href="https://x.com/arpan_sol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                @arpan_sol
              </a>
            </p>

            <p className="mt-2">Feel free to reach out!</p>
          </div>
        );
        break;

      case 'education': output = `Bachelor of Technology (B.Tech) in Computer Science and Engineering  
2nd Year | Kalyani Government Engineering College
`; break;
      case 'clear':
        setHistory([]);
        setWelcomeMessage('');
        setShowWelcome(true);
        return;
      case '': break;
      default: output = `${command}: command not found`; break;
    }
    setHistory(prevHistory => [...prevHistory, { command, output }]);
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const command = input.trim();
    if (command) {
      const newCommandHistory = [...commandHistory, command];
      setCommandHistory(newCommandHistory);
      setHistoryIndex(newCommandHistory.length);
    }
    handleCommand(command);
    setInput('');
  };

  // Handles key presses
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentWord = input.trim();
      const matches = commandList.filter(cmd => cmd.startsWith(currentWord));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (commandHistory.length > 0) {
        setHistoryIndex(0);
        setInput(commandHistory[0]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(commandHistory.length);
        setInput('');
      }
    }
  };

  return (
    <div
      className="bg-black text-white font-mono h-full w-full p-4 overflow-y-auto text-sm md:text-base"
      ref={terminalBodyRef}
    >
      <pre className="text-green-400 whitespace-pre-wrap text-[6px] sm:text-[8px] md:text-xs">{welcomeMessage}</pre>
      
      <div>
        {history.map((entry, index) => (
          <div key={index}>
            
            {entry.command && (
              <div className="flex">
                <span className="text-green-400">arpan@portfolio:~$</span>
                <p className="flex-1 ml-2">{entry.command}</p>
              </div>
            )}
            
           
            {entry.output && (
              <div className="text-gray-300 whitespace-pre-wrap">
                {typeof entry.output === 'string' ? entry.output : entry.output}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <label htmlFor="terminal-input" className="text-green-400">arpan@portfolio:~$</label>
        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          className="bg-transparent border-none text-white w-full focus:outline-none ml-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
        />
        <span className="bg-gray-100 w-2 h-5 cursor-blink"></span>
      </form>
    </div>
  );
}

export default Terminal;
