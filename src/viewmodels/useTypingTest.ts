'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  WORD_LIST,
  TIME_OPTIONS,
  type TimeOption,
} from '@/constants/typing-test';

export interface TypingResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  duration: TimeOption;
  date: string;
}

interface WordState {
  word: string;
  typed: string;
  status: 'pending' | 'current' | 'correct' | 'incorrect';
}

type TestStatus = 'idle' | 'running' | 'finished';

const STORAGE_KEY = 'typing-test-results';
const MAX_RESULTS = 50;

function generateWords(count: number): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  }
  return words;
}

function loadResults(): TypingResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveResult(result: TypingResult) {
  const results = loadResults();
  results.unshift(result);
  if (results.length > MAX_RESULTS) results.length = MAX_RESULTS;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function useTypingTest() {
  const [duration, setDuration] = useState<TimeOption>(30);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [status, setStatus] = useState<TestStatus>('idle');
  const [words, setWords] = useState<WordState[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [result, setResult] = useState<TypingResult | null>(null);
  const [history, setHistory] = useState<TypingResult[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize words
  const initializeTest = useCallback(() => {
    const generated = generateWords(200);
    setWords(
      generated.map((w, i) => ({
        word: w,
        typed: '',
        status: i === 0 ? 'current' : 'pending',
      }))
    );
    setCurrentWordIndex(0);
    setCurrentInput('');
    setCorrectChars(0);
    setIncorrectChars(0);
    setTotalTypedChars(0);
    setTimeLeft(duration);
    setStatus('idle');
    setResult(null);
  }, [duration]);

  // Load history on mount
  useEffect(() => {
    setHistory(loadResults());
    initializeTest();
  }, [initializeTest]);

  // Timer
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setStatus('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  // Finish test
  useEffect(() => {
    if (status !== 'finished') return;

    const elapsedSeconds = duration - timeLeft || duration;
    const elapsedMinutes = elapsedSeconds / 60;

    const netWpm = Math.round(correctChars / 5 / elapsedMinutes);
    const rawWpm = Math.round(totalTypedChars / 5 / elapsedMinutes);
    const accuracy =
      totalTypedChars > 0
        ? Math.round((correctChars / totalTypedChars) * 100)
        : 0;

    const testResult: TypingResult = {
      wpm: Math.max(0, netWpm),
      rawWpm: Math.max(0, rawWpm),
      accuracy,
      correctChars,
      incorrectChars,
      totalChars: totalTypedChars,
      duration,
      date: new Date().toISOString(),
    };

    setResult(testResult);
    saveResult(testResult);
    setHistory(loadResults());
  }, [
    status,
    duration,
    timeLeft,
    correctChars,
    incorrectChars,
    totalTypedChars,
  ]);

  const startTest = useCallback(() => {
    setStatus('running');
    startTimeRef.current = Date.now();
    setTimeLeft(duration);
  }, [duration]);

  const handleInput = useCallback(
    (value: string) => {
      if (status === 'finished') return;

      // Start on first keystroke
      if (status === 'idle') {
        startTest();
      }

      // Space pressed = submit word
      if (value.endsWith(' ')) {
        const typedWord = value.trimEnd();
        const currentWord = words[currentWordIndex];

        if (!currentWord) return;

        const isCorrect = typedWord === currentWord.word;

        // Count chars for this word (include space)
        const wordChars = typedWord.length + 1; // +1 for the space
        setTotalTypedChars((prev) => prev + wordChars);

        if (isCorrect) {
          setCorrectChars((prev) => prev + wordChars);
        } else {
          // Count per-character correctness
          let correct = 0;
          let incorrect = 0;
          const maxLen = Math.max(typedWord.length, currentWord.word.length);
          for (let i = 0; i < maxLen; i++) {
            if (typedWord[i] === currentWord.word[i]) {
              correct++;
            } else {
              incorrect++;
            }
          }
          setCorrectChars((prev) => prev + correct);
          setIncorrectChars((prev) => prev + incorrect);
        }

        // Update word states
        setWords((prev) =>
          prev.map((w, i) => {
            if (i === currentWordIndex) {
              return {
                ...w,
                typed: typedWord,
                status: isCorrect ? 'correct' : 'incorrect',
              };
            }
            if (i === currentWordIndex + 1) {
              return { ...w, status: 'current' };
            }
            return w;
          })
        );

        setCurrentWordIndex((prev) => prev + 1);
        setCurrentInput('');
        return;
      }

      setCurrentInput(value);
    },
    [status, words, currentWordIndex, startTest]
  );

  const changeDuration = useCallback((newDuration: TimeOption) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
  }, []);

  const restart = useCallback(() => {
    initializeTest();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [initializeTest]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return {
    // State
    duration,
    timeLeft,
    status,
    words,
    currentWordIndex,
    currentInput,
    result,
    history,
    inputRef,
    // Actions
    handleInput,
    changeDuration,
    restart,
    clearHistory,
    timeOptions: TIME_OPTIONS,
  };
}
