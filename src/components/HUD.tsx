"use client";

import { useGameStore } from "@/store/use-game-store";
import { Mic, Trophy, Music } from "lucide-react";

export function HUD() {
    const { score, isGameOver, gameStarted, startGame, currentPitch, resetGame } = useGameStore();

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-8 text-white">
            {/* Top Bar */}
            <div className="w-full flex justify-between items-start">
                <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                    <Trophy className="text-yellow-400" />
                    <div>
                        <p className="text-xs uppercase tracking-widest text-slate-400">Score</p>
                        <p className="text-2xl font-bold">{score}</p>
                    </div>
                </div>

                {currentPitch && (
                    <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <Music className="text-cyan-400" />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">Pitch</p>
                            <p className="text-2xl font-bold font-mono">{Math.round(currentPitch)}Hz</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Center - Start/GameOver Overlay */}
            {!gameStarted && (
                <div className="pointer-events-auto flex flex-col items-center gap-6 bg-slate-950/80 backdrop-blur-xl p-12 rounded-4xl border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="bg-cyan-500/20 p-6 rounded-full">
                        <Mic size={48} className="text-cyan-400" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-5xl font-black mb-2 tracking-tight">Singing Sphere</h1>
                        <p className="text-slate-400 max-w-xs">
                            Sing to move up and down. Pass through the glowing holes!
                        </p>
                    </div>
                    <button
                        onClick={startGame}
                        className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                    >
                        START GAME
                    </button>
                </div>
            )}

            {isGameOver && (
                <div className="pointer-events-auto flex flex-col items-center gap-6 bg-red-950/80 backdrop-blur-xl p-12 rounded-4xl border border-red-500/20 shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="text-center">
                        <h2 className="text-4xl font-black mb-2 text-red-400">GAME OVER</h2>
                        <p className="text-slate-400">Final Score: {score}</p>
                    </div>
                    <button
                        onClick={startGame}
                        className="px-10 py-5 bg-slate-50 hover:bg-white text-slate-950 font-black rounded-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        TRY AGAIN
                    </button>
                </div>
            )}

            {/* Bottom - Instructions */}
            {gameStarted && !isGameOver && (
                <div className="bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 text-sm text-slate-300">
                    Sing higher to go up, lower to go down
                </div>
            )}
        </div>
    );
}
