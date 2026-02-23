"use client";

import { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";

export function usePitch() {
    const [pitch, setPitch] = useState<number | null>(null);
    const [clarity, setClarity] = useState<number>(0);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        let animationFrameId: number;

        async function setupAudio() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;

                const context = new AudioContext();
                audioContextRef.current = context;

                const analyser = context.createAnalyser();
                analyser.fftSize = 2048;
                analyserRef.current = analyser;

                const source = context.createMediaStreamSource(stream);
                source.connect(analyser);

                const detector = PitchDetector.forFloat32Array(analyser.fftSize);
                const input = new Float32Array(detector.inputLength);
                const sampleRate = context.sampleRate;

                const updatePitch = () => {
                    analyser.getFloatTimeDomainData(input);
                    const [detectedPitch, detectedClarity] = detector.findPitch(input, sampleRate);

                    if (detectedClarity > 0.8) {
                        setPitch(detectedPitch);
                        setClarity(detectedClarity);
                    } else {
                        setPitch(null);
                        setClarity(detectedClarity);
                    }

                    animationFrameId = requestAnimationFrame(updatePitch);
                };

                updatePitch();
            } catch (err) {
                console.error("Error accessing microphone:", err);
            }
        }

        setupAudio();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return { pitch, clarity };
}
