import { create } from "zustand";

interface GameState {
    score: number;
    isGameOver: boolean;
    gameStarted: boolean;
    currentPitch: number | null;
    targetPitch: number | null;
    yPosition: number;

    setScore: (score: number) => void;
    incrementScore: () => void;
    setGameOver: (isGameOver: boolean) => void;
    startGame: () => void;
    setPitch: (pitch: number | null) => void;
    setYPosition: (y: number) => void;
    setTargetPitch: (pitch: number | null) => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    score: 0,
    isGameOver: false,
    gameStarted: false,
    currentPitch: null,
    targetPitch: null,
    yPosition: 0,

    setScore: (score) => set({ score }),
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    setGameOver: (isGameOver) => set({ isGameOver }),
    startGame: () => set({ gameStarted: true, isGameOver: false, score: 0 }),
    setPitch: (currentPitch) => set({ currentPitch }),
    setYPosition: (yPosition) => set({ yPosition }),
    setTargetPitch: (targetPitch) => set({ targetPitch }),
    resetGame: () => set({ score: 0, isGameOver: false, gameStarted: false, yPosition: 0 }),
}));
