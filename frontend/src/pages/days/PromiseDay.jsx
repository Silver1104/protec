import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Hearts } from "../../components/animations/Hearts";
import { promisesAPI } from "../../utils/api";

const LINES = [
    "I am not the best at keeping promises...",
    "We both know that, so I won’t pretend that I am.",
    "But the one promise I will always maintain is this:",
    "This was never just an infatuation.",
    "It has been a crush.",
    "A longing.",
    "An inevitable desire.",
    "And I want to keep working towards and with you.",
];

const SPEED = 70;
const LINE_PAUSE = 700;

export const PromiseDay = () => {
    const [typedLines, setTypedLines] = useState([]);
    const [currentText, setCurrentText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    // ✅ Ref for the scrollable box
    const boxRef = useRef(null);

    // ✅ Mark Promise as Read
    useEffect(() => {
        promisesAPI.markRead().catch(console.error);
    }, []);

    // ✅ Smooth scroll ONLY inside the box
    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }, [typedLines, currentText]);

    // ✅ Typing Engine
    useEffect(() => {
        if (finished) return;

        const currentLine = LINES[lineIndex];

        if (!currentLine) {
            setFinished(true);
            return;
        }

        let timeout;

        if (charIndex < currentLine.length) {
            timeout = setTimeout(() => {
                setCurrentText((prev) => prev + currentLine[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, SPEED);
        } else {
            timeout = setTimeout(() => {
                setTypedLines((prev) => [...prev, currentLine]);
                setCurrentText("");
                setCharIndex(0);
                setLineIndex((prev) => prev + 1);
            }, LINE_PAUSE);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, lineIndex, finished]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 py-10 px-4 relative overflow-hidden">
            <Hearts count={12} />

            <div className="max-w-3xl mx-auto">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-display text-indigo-700 text-center mb-10"
                >
                    🤝 Promise Day 🤝
                </motion.h1>

                {/* Letter Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-2xl p-6 md:p-10"
                >
                    {/* Scrollable Text Area */}
                    <div
                        ref={boxRef}
                        className="
              max-h-[300px]
              md:max-h-[400px]
              overflow-y-auto
              pr-2
              text-xl
              md:text-3xl
              text-gray-800
              leading-relaxed
              space-y-4
            "
                        style={{
                            fontFamily: "'Courier Prime', monospace",
                        }}
                    >
                        {/* Typed Lines */}
                        {typedLines.map((line, idx) => (
                            <motion.p
                                key={idx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {line}
                            </motion.p>
                        ))}

                        {/* Current Typing Line */}
                        {!finished && (
                            <p>
                                {currentText}
                                <span className="inline-block w-[2px] h-6 bg-gray-800 ml-1 animate-pulse" />
                            </p>
                        )}
                    </div>
                </motion.div>

                {/* Final Message */}
                {finished && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white mt-8 rounded-3xl shadow-xl p-6 md:p-8 text-center max-w-xl mx-auto"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 1.8 }}
                            className="text-6xl md:text-7xl mb-4"
                        >
                            💝
                        </motion.div>

                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            This promise is not just words…
                            <br />
                            It’s something I’ll carry with me,
                            <br />
                            today and every day. 💙
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Font Import */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
      `}</style>
        </div>
    );
};
