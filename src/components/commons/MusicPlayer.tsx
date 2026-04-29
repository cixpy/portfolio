import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type YTPlayer = {
    playVideo: () => void;
    pauseVideo: () => void;
    setVolume: (volume: number) => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    destroy: () => void;
};

declare global {
    interface Window {
        YT?: {
            Player: new (
                elementId: string,
                options: {
                    height?: string;
                    width?: string;
                    videoId: string;
                    playerVars?: Record<string, number>;
                    events?: {
                        onReady?: (event: { target: YTPlayer }) => void;
                        onStateChange?: (event: { data: number }) => void;
                    };
                }
            ) => YTPlayer;
            PlayerState: {
                PLAYING: number;
            };
        };
        onYouTubeIframeAPIReady?: () => void;
    }
}

const VIDEO_ID = 'cKMQz1Rf2ow';
const PLAYER_ID = 'music-player';

export const MusicPlayer = () => {
    const playerRef = useRef<YTPlayer | null>(null);
    const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const stopProgressTimer = useCallback(() => {
        if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current);
            progressTimerRef.current = null;
        }
    }, []);

    const startProgressTimer = useCallback(() => {
        if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current);
            progressTimerRef.current = null;
        }
        progressTimerRef.current = setInterval(() => {
            if (!playerRef.current) {
                return;
            }

            const nextCurrentTime = playerRef.current.getCurrentTime() || 0;
            const nextDuration = playerRef.current.getDuration() || 0;
            setCurrentTime(nextCurrentTime);
            setDuration(nextDuration);
        }, 500);
    }, []);

    useEffect(() => {
        const createPlayer = () => {
            if (!window.YT || playerRef.current) {
                return;
            }

            playerRef.current = new window.YT.Player(PLAYER_ID, {
                height: '0',
                width: '0',
                videoId: VIDEO_ID,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    rel: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    playsinline: 1,
                },
                events: {
                    onReady: (event) => {
                        event.target.setVolume(50);
                        setDuration(event.target.getDuration() || 0);
                        setIsReady(true);
                    },
                    onStateChange: (event) => {
                        if (window.YT) {
                            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
                            if (event.data === window.YT.PlayerState.PLAYING) {
                                startProgressTimer();
                                return;
                            }
                            stopProgressTimer();
                        }
                    },
                },
            });
        };

        if (window.YT?.Player) {
            createPlayer();
            return () => {
                if (playerRef.current) {
                    stopProgressTimer();
                    playerRef.current.destroy();
                    playerRef.current = null;
                }
            };
        }

        const previousReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (previousReady) {
                previousReady();
            }
            createPlayer();
        };

        return () => {
            if (playerRef.current) {
                stopProgressTimer();
                playerRef.current.destroy();
                playerRef.current = null;
            }
            // Restore previous global handler to avoid leaking handlers
            window.onYouTubeIframeAPIReady = previousReady;
        };
    }, [startProgressTimer, stopProgressTimer]);

    const togglePlayback = () => {
        if (!playerRef.current || !isReady) {
            return;
        }

        if (isPlaying) {
            playerRef.current.pauseVideo();
            return;
        }

        playerRef.current.playVideo();
    };

    const updateVolume = (nextVolume: number) => {
        setVolume(nextVolume);
        if (playerRef.current && isReady) {
            playerRef.current.setVolume(nextVolume);
        }
    };

    const formatTime = (value: number) => {
        if (!value || Number.isNaN(value)) {
            return '0:00';
        }
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60)
            .toString()
            .padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

    return (
        <>
            <Script
                id="youtube-iframe-api"
                src="https://www.youtube.com/iframe_api"
                strategy="lazyOnload"
            />
            <div className="fixed bottom-3 right-3 z-40 linux-panel rounded-lg px-2 py-2 w-[210px] border border-dracula-comment/40">
                <div id={PLAYER_ID} className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" />

                <div className="mb-1 flex items-center gap-1.5">
                    <span
                        className={`relative h-2.5 w-2.5 rounded-full border border-dracula-cyan/60 bg-dracula-selection ${isPlaying ? 'animate-spin' : ''}`}
                        aria-hidden="true"
                    >
                        <span className="absolute top-0.5 left-0.5 h-1 w-1 rounded-full bg-dracula-cyan" />
                    </span>
                    <div className="overflow-hidden w-full" title="Post Malone, Swae Lee - Sunflower.mp3">
                        <div className="flex w-max min-w-full animate-marquee-left">
                            <span className="text-[10px] text-dracula-foreground/90 whitespace-nowrap pr-6">
                                Post Malone, Swae Lee - Sunflower.mp3
                            </span>
                            <span className="text-[10px] text-dracula-foreground/90 whitespace-nowrap pr-6">
                                Post Malone, Swae Lee - Sunflower.mp3
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <div className="h-1 rounded-full bg-dracula-selection/80 overflow-hidden">
                        <div
                            className="h-full bg-dracula-cyan transition-[width] duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-dracula-comment terminal-font">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={togglePlayback}
                        className="rounded-md border border-dracula-comment/50 bg-dracula-selection/40 px-2 py-1 text-[10px] terminal-font text-dracula-foreground hover:border-dracula-cyan/50 hover:text-dracula-cyan transition-colors disabled:opacity-50"
                        disabled={!isReady}
                    >
                        {isPlaying ? 'pause' : 'play'}
                    </button>

                    <label className="flex items-center gap-1 text-[10px] text-dracula-comment w-full">
                        vol
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(event) => updateVolume(Number(event.target.value))}
                            className="w-full h-1 accent-dracula-cyan"
                        />
                    </label>
                </div>
            </div>
        </>
    );
};
