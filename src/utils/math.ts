export const MIN_FREQ = 100; // C2
export const MAX_FREQ = 1000; // ~C6
export const MIN_Y = -5;
export const MAX_Y = 5;

export function frequencyToY(freq: number): number {
    if (!freq) return 0;

    // Logarithmic scaling for musical pitch
    const logMin = Math.log(MIN_FREQ);
    const logMax = Math.log(MAX_FREQ);
    const logFreq = Math.log(Math.max(MIN_FREQ, Math.min(MAX_FREQ, freq)));

    const t = (logFreq - logMin) / (logMax - logMin);
    return MIN_Y + t * (MAX_Y - MIN_Y);
}

export function yToFrequency(y: number): number {
    const t = (y - MIN_Y) / (MAX_Y - MIN_Y);
    const logMin = Math.log(MIN_FREQ);
    const logMax = Math.log(MAX_FREQ);
    const logFreq = logMin + t * (logMax - logMin);
    return Math.exp(logFreq);
}
