'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useTypingTest, type TypingResult } from '@/viewmodels/useTypingTest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateRight,
  faKeyboard,
  faClock,
  faBullseye,
  faTrash,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ThemeToggle } from '@/views/components/ThemeToggle';

const TypingTest = () => {
  const {
    duration,
    timeLeft,
    status,
    words,
    currentWordIndex,
    currentInput,
    result,
    history,
    inputRef,
    handleInput,
    changeDuration,
    restart,
    clearHistory,
    timeOptions,
  } = useTypingTest();

  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll words container to keep current word visible
  useEffect(() => {
    if (activeWordRef.current && wordsContainerRef.current) {
      const container = wordsContainerRef.current;
      const activeWord = activeWordRef.current;
      const containerRect = container.getBoundingClientRect();
      const wordRect = activeWord.getBoundingClientRect();

      // If the word is below the visible area or past halfway
      if (wordRect.top > containerRect.top + containerRect.height * 0.6) {
        container.scrollTop +=
          wordRect.top - containerRect.top - containerRect.height * 0.3;
      }
    }
  }, [currentWordIndex]);

  // Focus input on mount and restart
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  // Handle focus on click anywhere
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Best WPM from history
  const bestWpm = useMemo(() => {
    if (history.length === 0) return 0;
    return Math.max(...history.map((r) => r.wpm));
  }, [history]);

  // Average WPM from last 10
  const avgWpm = useMemo(() => {
    if (history.length === 0) return 0;
    const recent = history.slice(0, 10);
    return Math.round(
      recent.reduce((sum, r) => sum + r.wpm, 0) / recent.length
    );
  }, [history]);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-gray-100 to-sky-100/40 dark:from-[#0a0f1a] dark:via-[#0d1320] dark:to-[#0f172a] text-black dark:text-gray-100 transition-colors duration-300"
      onClick={handleContainerClick}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-black/60 dark:text-gray-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
            <span>Portfolio</span>
          </Link>
          <span className="text-black/20 dark:text-gray-700">|</span>
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <FontAwesomeIcon icon={faKeyboard} className="text-sm" />
            <span className="text-sm font-medium tracking-wide">
              typing test
            </span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 max-w-4xl mx-auto w-full">
        {status !== 'finished' ? (
          <>
            {/* Duration selector + Timer */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-1 bg-gray-200/60 dark:bg-white/5 rounded-lg p-1">
                {timeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => changeDuration(t)}
                    disabled={status === 'running'}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      duration === t
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-black/50 dark:text-gray-500 hover:text-black dark:hover:text-gray-300 disabled:opacity-50'
                    }`}
                  >
                    {t}s
                  </button>
                ))}
              </div>

              <div
                className={`text-2xl font-mono font-bold tabular-nums transition-colors ${
                  timeLeft <= 5 && status === 'running'
                    ? 'text-red-500'
                    : 'text-sky-500 dark:text-sky-400'
                }`}
              >
                {timeLeft}
              </div>

              <button
                onClick={restart}
                className="p-2 text-black/40 dark:text-gray-600 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                title="Restart (Tab + Enter)"
              >
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
            </div>

            {/* Words Display */}
            <div
              ref={wordsContainerRef}
              className="relative w-full h-[7.5rem] overflow-hidden text-xl md:text-2xl leading-relaxed font-mono select-none mb-6"
            >
              {/* Fade overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-100 dark:from-[#0a0f1a] to-transparent z-10 pointer-events-none" />

              <div className="flex flex-wrap gap-x-2.5 gap-y-2">
                {words.map((w, wordIdx) => (
                  <span
                    key={wordIdx}
                    ref={wordIdx === currentWordIndex ? activeWordRef : null}
                    className={`relative inline-block transition-colors duration-100 ${
                      w.status === 'correct'
                        ? 'text-sky-500 dark:text-sky-400'
                        : w.status === 'incorrect'
                          ? 'text-red-500 dark:text-red-400'
                          : w.status === 'current'
                            ? 'text-black dark:text-white'
                            : 'text-black/25 dark:text-gray-600'
                    }`}
                  >
                    {/* Underline for current word */}
                    {w.status === 'current' && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-sky-500/50 rounded-full" />
                    )}
                    {w.word.split('').map((char, charIdx) => {
                      if (w.status !== 'current') return char;

                      // Highlight typed chars in current word
                      const typedChar = currentInput[charIdx];
                      let charClass = 'text-black/25 dark:text-gray-600'; // not yet typed

                      if (typedChar !== undefined) {
                        charClass =
                          typedChar === char
                            ? 'text-sky-500 dark:text-sky-400'
                            : 'text-red-500 dark:text-red-400 bg-red-500/10';
                      }

                      return (
                        <span
                          key={charIdx}
                          className={`${charClass} transition-colors duration-75`}
                        >
                          {char}
                        </span>
                      );
                    })}
                    {/* Extra typed chars beyond word length */}
                    {w.status === 'current' &&
                      currentInput.length > w.word.length && (
                        <span className="text-red-500/60 dark:text-red-400/60">
                          {currentInput.slice(w.word.length)}
                        </span>
                      )}
                  </span>
                ))}
              </div>
            </div>

            {/* Caret cursor blink */}
            {status === 'idle' && (
              <p className="text-xs text-black/40 dark:text-gray-600 mt-2 animate-pulse">
                Start typing to begin...
              </p>
            )}

            {/* Hidden input */}
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  restart();
                }
              }}
              className="sr-only"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Type here"
            />
          </>
        ) : result ? (
          /* Results Screen */
          <ResultsScreen
            result={result}
            bestWpm={bestWpm}
            onRestart={restart}
          />
        ) : null}

        {/* Stats Bar */}
        {history.length > 0 && status !== 'finished' && (
          <div className="flex items-center gap-6 mt-8 text-xs text-black/40 dark:text-gray-600">
            <div className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faBullseye} className="text-[10px]" />
              <span>
                Best:{' '}
                <strong className="text-black/60 dark:text-gray-400">
                  {bestWpm}
                </strong>{' '}
                wpm
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faClock} className="text-[10px]" />
              <span>
                Avg:{' '}
                <strong className="text-black/60 dark:text-gray-400">
                  {avgWpm}
                </strong>{' '}
                wpm
              </span>
            </div>
            <span className="text-black/20 dark:text-gray-700">|</span>
            <span>{history.length} tests</span>
          </div>
        )}
      </main>

      {/* History */}
      {history.length > 0 && (
        <footer className="max-w-4xl mx-auto w-full px-4 md:px-8 pb-8 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-widest text-black/40 dark:text-gray-600 font-medium">
              Recent Results
            </h3>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-[10px] text-black/30 dark:text-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-colors uppercase tracking-widest"
            >
              <FontAwesomeIcon icon={faTrash} className="text-[9px]" />
              Clear
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {history.slice(0, 10).map((r, i) => (
              <div
                key={i}
                className="bg-gray-200/40 dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/5 rounded-lg px-3 py-2 text-center"
              >
                <div className="text-lg font-mono font-bold text-sky-600 dark:text-sky-400">
                  {r.wpm}
                </div>
                <div className="text-[10px] text-black/40 dark:text-gray-600">
                  {r.accuracy}% · {r.duration}s
                </div>
              </div>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
};

/* Results Screen Component */
function ResultsScreen({
  result,
  bestWpm,
  onRestart,
}: {
  result: TypingResult;
  bestWpm: number;
  onRestart: () => void;
}) {
  const isNewBest = result.wpm >= bestWpm && result.wpm > 0;

  return (
    <div className="text-center space-y-8">
      {isNewBest && (
        <div className="text-xs uppercase tracking-widest text-sky-500 font-medium">
          New Personal Best!
        </div>
      )}

      {/* Main WPM */}
      <div>
        <div className="text-6xl md:text-8xl font-mono font-bold text-sky-500 dark:text-sky-400 tabular-nums">
          {result.wpm}
        </div>
        <div className="text-sm text-black/40 dark:text-gray-600 uppercase tracking-widest mt-2">
          words per minute
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex justify-center gap-8 md:gap-12">
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-black/70 dark:text-gray-300 tabular-nums">
            {result.accuracy}%
          </div>
          <div className="text-[10px] text-black/40 dark:text-gray-600 uppercase tracking-widest mt-1">
            Accuracy
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-black/70 dark:text-gray-300 tabular-nums">
            {result.rawWpm}
          </div>
          <div className="text-[10px] text-black/40 dark:text-gray-600 uppercase tracking-widest mt-1">
            Raw WPM
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-black/70 dark:text-gray-300 tabular-nums">
            {result.correctChars}/{result.totalChars}
          </div>
          <div className="text-[10px] text-black/40 dark:text-gray-600 uppercase tracking-widest mt-1">
            Characters
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-black/70 dark:text-gray-300 tabular-nums">
            {result.duration}s
          </div>
          <div className="text-[10px] text-black/40 dark:text-gray-600 uppercase tracking-widest mt-1">
            Duration
          </div>
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30"
      >
        <FontAwesomeIcon icon={faRotateRight} />
        <span>Try Again</span>
      </button>

      <p className="text-[10px] text-black/30 dark:text-gray-700">
        Press{' '}
        <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-white/5 rounded text-black/50 dark:text-gray-500">
          Tab
        </kbd>{' '}
        to restart
      </p>
    </div>
  );
}

export default TypingTest;
