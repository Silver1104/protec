import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { bearAPI } from '../../utils/api';
import toast from 'react-hot-toast';

// Enhanced animal configurations with better proportions and details
const animalConfigs = {
    bear: {
        emoji: '🧸',
        name: 'Bear',
        bodyShape: (x, y, color) => `
            <defs>
                <radialGradient id="bearBodyGrad-${color}" cx="50%" cy="30%">
                    <stop offset="0%" stop-color="${adjustBrightness(color, 20)}" />
                    <stop offset="100%" stop-color="${color}" />
                </radialGradient>
                <radialGradient id="bearBellyGrad" cx="50%" cy="40%">
                    <stop offset="0%" stop-color="#FFF5E6" />
                    <stop offset="100%" stop-color="#FFE4C4" />
                </radialGradient>
            </defs>
            <!-- Body -->
            <ellipse cx="${x}" cy="${y + 75}" rx="55" ry="68" fill="url(#bearBodyGrad-${color})" />
            <!-- Belly patch -->
            <ellipse cx="${x}" cy="${y + 85}" rx="38" ry="48" fill="url(#bearBellyGrad)" opacity="0.9" />
            <!-- Head -->
            <circle cx="${x}" cy="${y}" r="45" fill="url(#bearBodyGrad-${color})" />
            <!-- Ears -->
            <circle cx="${x - 32}" cy="${y - 28}" r="20" fill="url(#bearBodyGrad-${color})" />
            <circle cx="${x + 32}" cy="${y - 28}" r="20" fill="url(#bearBodyGrad-${color})" />
            <!-- Inner ears -->
            <circle cx="${x - 32}" cy="${y - 26}" r="13" fill="#FFB3BA" />
            <circle cx="${x + 32}" cy="${y - 26}" r="13" fill="#FFB3BA" />
            <!-- Arms -->
            <ellipse cx="${x - 48}" cy="${y + 50}" rx="18" ry="35" fill="url(#bearBodyGrad-${color})" transform="rotate(-20 ${x - 48} ${y + 50})" />
            <ellipse cx="${x + 48}" cy="${y + 50}" rx="18" ry="35" fill="url(#bearBodyGrad-${color})" transform="rotate(20 ${x + 48} ${y + 50})" />
            <!-- Legs -->
            <ellipse cx="${x - 25}" cy="${y + 120}" rx="22" ry="28" fill="url(#bearBodyGrad-${color})" />
            <ellipse cx="${x + 25}" cy="${y + 120}" rx="22" ry="28" fill="url(#bearBodyGrad-${color})" />
            <!-- Paw pads -->
            <ellipse cx="${x - 25}" cy="${y + 130}" rx="18" ry="14" fill="#FFB3BA" />
            <ellipse cx="${x + 25}" cy="${y + 130}" rx="18" ry="14" fill="#FFB3BA" />
        `,
        face: (x, y) => `
            <!-- Snout -->
            <ellipse cx="${x}" cy="${y + 8}" rx="22" ry="18" fill="#FFE4C4" />
            <!-- Eyes -->
            <circle cx="${x - 16}" cy="${y - 6}" r="6" fill="#2C3E50" />
            <circle cx="${x + 16}" cy="${y - 6}" r="6" fill="#2C3E50" />
            <!-- Eye shine -->
            <circle cx="${x - 14}" cy="${y - 8}" r="2.5" fill="white" />
            <circle cx="${x + 18}" cy="${y - 8}" r="2.5" fill="white" />
            <!-- Nose -->
            <ellipse cx="${x}" cy="${y + 12}" rx="9" ry="7" fill="#2C3E50" />
            <ellipse cx="${x - 2}" cy="${y + 10}" rx="3" ry="2.5" fill="white" opacity="0.6" />
            <!-- Mouth -->
            <path d="M ${x} ${y + 12} L ${x} ${y + 18}" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" />
            <path d="M ${x} ${y + 18} Q ${x - 8} ${y + 22} ${x - 12} ${y + 18}" stroke="#2C3E50" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <path d="M ${x} ${y + 18} Q ${x + 8} ${y + 22} ${x + 12} ${y + 18}" stroke="#2C3E50" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <!-- Blush -->
            <ellipse cx="${x - 28}" cy="${y + 5}" rx="8" ry="6" fill="#FFB3BA" opacity="0.5" />
            <ellipse cx="${x + 28}" cy="${y + 5}" rx="8" ry="6" fill="#FFB3BA" opacity="0.5" />
        `
    },
    cat: {
        emoji: '🐱',
        name: 'Cat',
        bodyShape: (x, y, color) => `
            <defs>
                <radialGradient id="catBodyGrad-${color}" cx="50%" cy="30%">
                    <stop offset="0%" stop-color="${adjustBrightness(color, 20)}" />
                    <stop offset="100%" stop-color="${color}" />
                </radialGradient>
            </defs>
            <!-- Body -->
            <ellipse cx="${x}" cy="${y + 75}" rx="50" ry="62" fill="url(#catBodyGrad-${color})" />
            <!-- Belly -->
            <ellipse cx="${x}" cy="${y + 85}" rx="35" ry="45" fill="white" opacity="0.9" />
            <!-- Head -->
            <circle cx="${x}" cy="${y}" r="42" fill="url(#catBodyGrad-${color})" />
            <!-- Cheek fluff -->
            <ellipse cx="${x - 28}" cy="${y + 8}" rx="16" ry="20" fill="url(#catBodyGrad-${color})" />
            <ellipse cx="${x + 28}" cy="${y + 8}" rx="16" ry="20" fill="url(#catBodyGrad-${color})" />
            <!-- Ears -->
            <path d="M ${x - 38} ${y - 28} L ${x - 28} ${y - 48} L ${x - 18} ${y - 28} Z" fill="url(#catBodyGrad-${color})" />
            <path d="M ${x + 18} ${y - 28} L ${x + 28} ${y - 48} L ${x + 38} ${y - 28} Z" fill="url(#catBodyGrad-${color})" />
            <!-- Inner ears -->
            <path d="M ${x - 34} ${y - 28} L ${x - 28} ${y - 42} L ${x - 22} ${y - 28} Z" fill="#FFB3BA" />
            <path d="M ${x + 22} ${y - 28} L ${x + 28} ${y - 42} L ${x + 34} ${y - 28} Z" fill="#FFB3BA" />
            <!-- Tail -->
            <path d="M ${x + 45} ${y + 100} Q ${x + 60} ${y + 80} ${x + 65} ${y + 55} Q ${x + 68} ${y + 35} ${x + 60} ${y + 20}" 
                  stroke="url(#catBodyGrad-${color})" stroke-width="20" fill="none" stroke-linecap="round" />
            <!-- Legs -->
            <ellipse cx="${x - 22}" cy="${y + 120}" rx="18" ry="26" fill="url(#catBodyGrad-${color})" />
            <ellipse cx="${x + 22}" cy="${y + 120}" rx="18" ry="26" fill="url(#catBodyGrad-${color})" />
            <!-- Front paws -->
            <ellipse cx="${x - 38}" cy="${y + 90}" rx="14" ry="30" fill="url(#catBodyGrad-${color})" />
            <ellipse cx="${x + 38}" cy="${y + 90}" rx="14" ry="30" fill="url(#catBodyGrad-${color})" />
        `,
        face: (x, y) => `
            <!-- Snout area -->
            <ellipse cx="${x}" cy="${y + 10}" rx="18" ry="14" fill="white" />
            <!-- Eyes -->
            <ellipse cx="${x - 16}" cy="${y - 5}" rx="8" ry="10" fill="#2ECC71" />
            <ellipse cx="${x + 16}" cy="${y - 5}" rx="8" ry="10" fill="#2ECC71" />
            <!-- Pupils -->
            <ellipse cx="${x - 16}" cy="${y - 4}" rx="3" ry="6" fill="black" />
            <ellipse cx="${x + 16}" cy="${y - 4}" rx="3" ry="6" fill="black" />
            <!-- Eye shine -->
            <circle cx="${x - 15}" cy="${y - 7}" r="2" fill="white" />
            <circle cx="${x + 17}" cy="${y - 7}" r="2" fill="white" />
            <!-- Nose -->
            <path d="M ${x} ${y + 8} L ${x - 4} ${y + 14} L ${x + 4} ${y + 14} Z" fill="#FF9AB5" />
            <!-- Mouth -->
            <path d="M ${x} ${y + 14} L ${x} ${y + 18}" stroke="#2C3E50" stroke-width="2" />
            <path d="M ${x} ${y + 18} Q ${x - 8} ${y + 20} ${x - 10} ${y + 16}" stroke="#2C3E50" stroke-width="2" fill="none" stroke-linecap="round" />
            <path d="M ${x} ${y + 18} Q ${x + 8} ${y + 20} ${x + 10} ${y + 16}" stroke="#2C3E50" stroke-width="2" fill="none" stroke-linecap="round" />
            <!-- Whiskers -->
            <line x1="${x - 20}" y1="${y + 8}" x2="${x - 42}" y2="${y + 5}" stroke="#2C3E50" stroke-width="1.5" />
            <line x1="${x - 20}" y1="${y + 12}" x2="${x - 42}" y2="${y + 12}" stroke="#2C3E50" stroke-width="1.5" />
            <line x1="${x + 20}" y1="${y + 8}" x2="${x + 42}" y2="${y + 5}" stroke="#2C3E50" stroke-width="1.5" />
            <line x1="${x + 20}" y1="${y + 12}" x2="${x + 42}" y2="${y + 12}" stroke="#2C3E50" stroke-width="1.5" />
            <!-- Blush -->
            <ellipse cx="${x - 26}" cy="${y + 8}" rx="7" ry="5" fill="#FFB3BA" opacity="0.5" />
            <ellipse cx="${x + 26}" cy="${y + 8}" rx="7" ry="5" fill="#FFB3BA" opacity="0.5" />
        `
    },
    penguin: {
        emoji: '🐧',
        name: 'Penguin',
        bodyShape: (x, y, color) => `
            <defs>
                <radialGradient id="penguinBodyGrad" cx="50%" cy="30%">
                    <stop offset="0%" stop-color="#34495E" />
                    <stop offset="100%" stop-color="#2C3E50" />
                </radialGradient>
            </defs>
            <!-- Body back -->
            <ellipse cx="${x}" cy="${y + 85}" rx="58" ry="78" fill="url(#penguinBodyGrad)" />
            <!-- Belly -->
            <ellipse cx="${x}" cy="${y + 90}" rx="42" ry="62" fill="white" />
            <!-- Wings/Flippers -->
            <ellipse cx="${x - 52}" cy="${y + 70}" rx="15" ry="50" fill="url(#penguinBodyGrad)" transform="rotate(-25 ${x - 52} ${y + 70})" />
            <ellipse cx="${x + 52}" cy="${y + 70}" rx="15" ry="50" fill="url(#penguinBodyGrad)" transform="rotate(25 ${x + 52} ${y + 70})" />
            <!-- Head back -->
            <circle cx="${x}" cy="${y}" r="38" fill="url(#penguinBodyGrad)" />
            <!-- Head front (white area) -->
            <ellipse cx="${x}" cy="${y + 5}" rx="32" ry="30" fill="white" />
            <!-- Feet -->
            <ellipse cx="${x - 20}" cy="${y + 148}" rx="18" ry="12" fill="#FFA500" />
            <ellipse cx="${x + 20}" cy="${y + 148}" rx="18" ry="12" fill="#FFA500" />
            <!-- Foot details -->
            <path d="M ${x - 28} ${y + 148} L ${x - 32} ${y + 155}" stroke="#E67E22" stroke-width="3" stroke-linecap="round" />
            <path d="M ${x - 20} ${y + 150} L ${x - 20} ${y + 158}" stroke="#E67E22" stroke-width="3" stroke-linecap="round" />
            <path d="M ${x - 12} ${y + 148} L ${x - 8} ${y + 155}" stroke="#E67E22" stroke-width="3" stroke-linecap="round" />
            <path d="M ${x + 12} ${y + 148} L ${x + 8} ${y + 155}" stroke="#E67E22" stroke-width="3" stroke-linecap="round" />
            <path d="M ${x + 20} ${y + 150} L ${x + 20} ${y + 158}" stroke="#E67E22" stroke-width="3" stroke-linecap="round" />
            <path d="M ${x + 28} ${y + 148} L ${x + 32} ${y + 155}" stroke="#E67E22" stroke-width="3" stroke-linecap="round" />
        `,
        face: (x, y) => `
            <!-- Eyes -->
            <circle cx="${x - 14}" cy="${y - 2}" r="5" fill="black" />
            <circle cx="${x + 14}" cy="${y - 2}" r="5" fill="black" />
            <!-- Eye shine -->
            <circle cx="${x - 12}" cy="${y - 4}" r="2" fill="white" />
            <circle cx="${x + 16}" cy="${y - 4}" r="2" fill="white" />
            <!-- Beak -->
            <ellipse cx="${x}" cy="${y + 10}" rx="7" ry="10" fill="#FFA500" />
            <path d="M ${x - 5} ${y + 8} L ${x + 5} ${y + 8}" stroke="#E67E22" stroke-width="1.5" />
            <!-- Blush -->
            <ellipse cx="${x - 24}" cy="${y + 6}" rx="8" ry="5" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="${x + 24}" cy="${y + 6}" rx="8" ry="5" fill="#FFB6C1" opacity="0.6" />
        `
    },
    bunny: {
        emoji: '🐰',
        name: 'Bunny',
        bodyShape: (x, y, color) => `
            <defs>
                <radialGradient id="bunnyBodyGrad-${color}" cx="50%" cy="30%">
                    <stop offset="0%" stop-color="${adjustBrightness(color, 20)}" />
                    <stop offset="100%" stop-color="${color}" />
                </radialGradient>
            </defs>
            <!-- Body -->
            <ellipse cx="${x}" cy="${y + 80}" rx="52" ry="64" fill="url(#bunnyBodyGrad-${color})" />
            <!-- Belly -->
            <ellipse cx="${x}" cy="${y + 90}" rx="36" ry="48" fill="white" opacity="0.9" />
            <!-- Head -->
            <circle cx="${x}" cy="${y}" r="40" fill="url(#bunnyBodyGrad-${color})" />
            <!-- Cheeks -->
            <ellipse cx="${x - 26}" cy="${y + 10}" rx="18" ry="16" fill="url(#bunnyBodyGrad-${color})" />
            <ellipse cx="${x + 26}" cy="${y + 10}" rx="18" ry="16" fill="url(#bunnyBodyGrad-${color})" />
            <!-- Long ears -->
            <ellipse cx="${x - 18}" cy="${y - 38}" rx="12" ry="48" fill="url(#bunnyBodyGrad-${color})" transform="rotate(-18 ${x - 18} ${y - 38})" />
            <ellipse cx="${x + 18}" cy="${y - 38}" rx="12" ry="48" fill="url(#bunnyBodyGrad-${color})" transform="rotate(18 ${x + 18} ${y - 38})" />
            <!-- Inner ears -->
            <ellipse cx="${x - 18}" cy="${y - 35}" rx="7" ry="38" fill="#FFB3BA" transform="rotate(-18 ${x - 18} ${y - 35})" />
            <ellipse cx="${x + 18}" cy="${y - 35}" rx="7" ry="38" fill="#FFB3BA" transform="rotate(18 ${x + 18} ${y - 35})" />
            <!-- Legs -->
            <ellipse cx="${x - 24}" cy="${y + 125}" rx="22" ry="24" fill="url(#bunnyBodyGrad-${color})" />
            <ellipse cx="${x + 24}" cy="${y + 125}" rx="22" ry="24" fill="url(#bunnyBodyGrad-${color})" />
            <!-- Paws -->
            <ellipse cx="${x - 24}" cy="${y + 132}" rx="18" ry="12" fill="white" />
            <ellipse cx="${x + 24}" cy="${y + 132}" rx="18" ry="12" fill="white" />
            <!-- Fluffy tail -->
            <circle cx="${x + 48}" cy="${y + 100}" r="16" fill="white" opacity="0.95" />
        `,
        face: (x, y) => `
            <!-- Eyes -->
            <circle cx="${x - 16}" cy="${y - 4}" r="6" fill="#2C3E50" />
            <circle cx="${x + 16}" cy="${y - 4}" r="6" fill="#2C3E50" />
            <!-- Eye shine -->
            <circle cx="${x - 14}" cy="${y - 6}" r="2.5" fill="white" />
            <circle cx="${x + 18}" cy="${y - 6}" r="2.5" fill="white" />
            <!-- Nose -->
            <circle cx="${x}" cy="${y + 10}" r="5" fill="#FF9AB5" />
            <ellipse cx="${x - 1.5}" cy="${y + 8}" rx="2" ry="1.5" fill="white" opacity="0.7" />
            <!-- Mouth line -->
            <path d="M ${x} ${y + 10} L ${x} ${y + 16}" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" />
            <!-- Smile -->
            <path d="M ${x} ${y + 16} Q ${x - 8} ${y + 20} ${x - 11} ${y + 16}" stroke="#2C3E50" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <path d="M ${x} ${y + 16} Q ${x + 8} ${y + 20} ${x + 11} ${y + 16}" stroke="#2C3E50" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <!-- Front teeth -->
            <rect x="${x - 5}" y="${y + 16}" width="4" height="6" rx="1" fill="white" />
            <rect x="${x + 1}" y="${y + 16}" width="4" height="6" rx="1" fill="white" />
            <!-- Blush -->
            <ellipse cx="${x - 28}" cy="${y + 8}" rx="8" ry="6" fill="#FFB3BA" opacity="0.6" />
            <ellipse cx="${x + 28}" cy="${y + 8}" rx="8" ry="6" fill="#FFB3BA" opacity="0.6" />
        `
    },
    panda: {
        emoji: '🐼',
        name: 'Panda',
        bodyShape: (x, y, color) => `
            <defs>
                <radialGradient id="pandaBodyGrad" cx="50%" cy="30%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="100%" stop-color="#F5F5F5" />
                </radialGradient>
            </defs>
            <!-- Body -->
            <ellipse cx="${x}" cy="${y + 75}" rx="56" ry="66" fill="url(#pandaBodyGrad)" />
            <!-- Head -->
            <circle cx="${x}" cy="${y}" r="44" fill="url(#pandaBodyGrad)" />
            <!-- Ear patches (black) -->
            <circle cx="${x - 30}" cy="${y - 22}" r="18" fill="#2C3E50" />
            <circle cx="${x + 30}" cy="${y - 22}" r="18" fill="#2C3E50" />
            <!-- Inner ears -->
            <circle cx="${x - 30}" cy="${y - 20}" r="12" fill="#34495E" />
            <circle cx="${x + 30}" cy="${y - 20}" r="12" fill="#34495E" />
            <!-- Arms -->
            <ellipse cx="${x - 48}" cy="${y + 55}" rx="20" ry="38" fill="#2C3E50" transform="rotate(-15 ${x - 48} ${y + 55})" />
            <ellipse cx="${x + 48}" cy="${y + 55}" rx="20" ry="38" fill="#2C3E50" transform="rotate(15 ${x + 48} ${y + 55})" />
            <!-- Legs -->
            <ellipse cx="${x - 26}" cy="${y + 120}" rx="24" ry="30" fill="#2C3E50" />
            <ellipse cx="${x + 26}" cy="${y + 120}" rx="24" ry="30" fill="#2C3E50" />
            <!-- Paw pads -->
            <ellipse cx="${x - 26}" cy="${y + 130}" rx="18" ry="14" fill="#34495E" />
            <ellipse cx="${x + 26}" cy="${y + 130}" rx="18" ry="14" fill="#34495E" />
        `,
        face: (x, y) => `
            <!-- Eye patches (black) -->
            <ellipse cx="${x - 18}" cy="${y - 3}" rx="14" ry="18" fill="#2C3E50" transform="rotate(-15 ${x - 18} ${y - 3})" />
            <ellipse cx="${x + 18}" cy="${y - 3}" rx="14" ry="18" fill="#2C3E50" transform="rotate(15 ${x + 18} ${y - 3})" />
            <!-- Eyes (white) -->
            <circle cx="${x - 18}" cy="${y - 3}" r="6" fill="white" />
            <circle cx="${x + 18}" cy="${y - 3}" r="6" fill="white" />
            <!-- Pupils -->
            <circle cx="${x - 18}" cy="${y - 2}" r="4" fill="#2C3E50" />
            <circle cx="${x + 18}" cy="${y - 2}" r="4" fill="#2C3E50" />
            <!-- Eye shine -->
            <circle cx="${x - 16}" cy="${y - 4}" r="2" fill="white" />
            <circle cx="${x + 20}" cy="${y - 4}" r="2" fill="white" />
            <!-- Snout -->
            <ellipse cx="${x}" cy="${y + 12}" rx="20" ry="16" fill="white" />
            <!-- Nose -->
            <ellipse cx="${x}" cy="${y + 14}" rx="9" ry="7" fill="#2C3E50" />
            <ellipse cx="${x - 2}" cy="${y + 12}" rx="3" ry="2" fill="white" opacity="0.6" />
            <!-- Mouth -->
            <path d="M ${x} ${y + 14} L ${x} ${y + 20}" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" />
            <path d="M ${x} ${y + 20} Q ${x - 8} ${y + 24} ${x - 11} ${y + 20}" stroke="#2C3E50" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <path d="M ${x} ${y + 20} Q ${x + 8} ${y + 24} ${x + 11} ${y + 20}" stroke="#2C3E50" stroke-width="2.5" fill="none" stroke-linecap="round" />
        `
    },
    fox: {
        emoji: '🦊',
        name: 'Fox',
        bodyShape: (x, y, color) => `
            <defs>
                <radialGradient id="foxBodyGrad-${color}" cx="50%" cy="30%">
                    <stop offset="0%" stop-color="${adjustBrightness(color, 20)}" />
                    <stop offset="100%" stop-color="${color}" />
                </radialGradient>
            </defs>
            <!-- Body -->
            <ellipse cx="${x}" cy="${y + 78}" rx="52" ry="62" fill="url(#foxBodyGrad-${color})" />
            <!-- Chest fluff (white) -->
            <ellipse cx="${x}" cy="${y + 60}" rx="30" ry="35" fill="white" />
            <!-- Head -->
            <circle cx="${x}" cy="${y}" r="40" fill="url(#foxBodyGrad-${color})" />
            <!-- Pointed ears -->
            <path d="M ${x - 38} ${y - 12} L ${x - 26} ${y - 42} L ${x - 12} ${y - 18} Z" fill="url(#foxBodyGrad-${color})" />
            <path d="M ${x + 12} ${y - 18} L ${x + 26} ${y - 42} L ${x + 38} ${y - 12} Z" fill="url(#foxBodyGrad-${color})" />
            <!-- Inner ears (white) -->
            <path d="M ${x - 32} ${y - 14} L ${x - 26} ${y - 34} L ${x - 20} ${y - 18} Z" fill="white" />
            <path d="M ${x + 20} ${y - 18} L ${x + 26} ${y - 34} L ${x + 32} ${y - 14} Z" fill="white" />
            <!-- Face white area -->
            <circle cx="${x}" cy="${y + 8}" r="28" fill="white" />
            <path d="M ${x} ${y - 12} L ${x - 22} ${y + 8} L ${x - 8} ${y + 18} L ${x + 8} ${y + 18} L ${x + 22} ${y + 8} Z" fill="white" />
            <!-- Bushy tail -->
            <ellipse cx="${x + 52}" cy="${y + 95}" rx="28" ry="45" fill="url(#foxBodyGrad-${color})" transform="rotate(25 ${x + 52} ${y + 95})" />
            <ellipse cx="${x + 58}" cy="${y + 108}" rx="18" ry="28" fill="white" transform="rotate(25 ${x + 58} ${y + 108})" />
            <!-- Legs -->
            <ellipse cx="${x - 24}" cy="${y + 120}" rx="18" ry="28" fill="url(#foxBodyGrad-${color})" />
            <ellipse cx="${x + 24}" cy="${y + 120}" rx="18" ry="28" fill="url(#foxBodyGrad-${color})" />
            <!-- Paws (black) -->
            <ellipse cx="${x - 24}" cy="${y + 132}" rx="14" ry="10" fill="#2C3E50" />
            <ellipse cx="${x + 24}" cy="${y + 132}" rx="14" ry="10" fill="#2C3E50" />
        `,
        face: (x, y) => `
            <!-- Eyes -->
            <circle cx="${x - 14}" cy="${y - 2}" r="6" fill="#2C3E50" />
            <circle cx="${x + 14}" cy="${y - 2}" r="6" fill="#2C3E50" />
            <!-- Eye shine -->
            <circle cx="${x - 12}" cy="${y - 4}" r="2.5" fill="white" />
            <circle cx="${x + 16}" cy="${y - 4}" r="2.5" fill="white" />
            <!-- Nose -->
            <path d="M ${x} ${y + 10} L ${x - 4} ${y + 17} L ${x + 4} ${y + 17} Z" fill="#2C3E50" />
            <ellipse cx="${x - 1}" cy="${y + 12}" rx="2" ry="1.5" fill="white" opacity="0.6" />
            <!-- Mouth -->
            <path d="M ${x} ${y + 17} L ${x} ${y + 21}" stroke="#2C3E50" stroke-width="2" stroke-linecap="round" />
            <path d="M ${x} ${y + 21} Q ${x - 7} ${y + 24} ${x - 10} ${y + 20}" stroke="#2C3E50" stroke-width="2" fill="none" stroke-linecap="round" />
            <path d="M ${x} ${y + 21} Q ${x + 7} ${y + 24} ${x + 10} ${y + 20}" stroke="#2C3E50" stroke-width="2" fill="none" stroke-linecap="round" />
            <!-- Blush -->
            <ellipse cx="${x - 26}" cy="${y + 8}" rx="7" ry="5" fill="#FFB3BA" opacity="0.5" />
            <ellipse cx="${x + 26}" cy="${y + 8}" rx="7" ry="5" fill="#FFB3BA" opacity="0.5" />
        `
    }
};

// Helper function to adjust color brightness
function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

// Enhanced accessory configurations
const accessories = {
    bow: (x, y, color) => `
        <g transform="translate(${x}, ${y - 50})">
            <defs>
                <radialGradient id="bowGrad-${color}" cx="40%" cy="40%">
                    <stop offset="0%" stop-color="${adjustBrightness(color, 30)}" />
                    <stop offset="100%" stop-color="${color}" />
                </radialGradient>
            </defs>
            <ellipse cx="-16" cy="0" rx="14" ry="10" fill="url(#bowGrad-${color})" />
            <ellipse cx="16" cy="0" rx="14" ry="10" fill="url(#bowGrad-${color})" />
            <circle cx="0" cy="0" r="6" fill="url(#bowGrad-${color})" />
            <ellipse cx="-16" cy="-2" rx="6" ry="4" fill="${adjustBrightness(color, 40)}" opacity="0.6" />
            <ellipse cx="16" cy="-2" rx="6" ry="4" fill="${adjustBrightness(color, 40)}" opacity="0.6" />
        </g>
    `,
    hat: (x, y) => `
        <g transform="translate(${x}, ${y - 50})">
            <defs>
                <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#444444" />
                    <stop offset="100%" stop-color="#222222" />
                </linearGradient>
            </defs>
            <ellipse cx="0" cy="5" rx="30" ry="6" fill="#1a1a1a" opacity="0.3" />
            <rect x="-28" y="0" width="56" height="10" rx="5" fill="url(#hatGrad)" />
            <rect x="-20" y="-16" width="40" height="18" rx="4" fill="url(#hatGrad)" />
            <rect x="-22" y="-4" width="44" height="6" rx="1" fill="#8B4513" />
        </g>
    `,
    glasses: (x, y) => `
        <g transform="translate(${x}, ${y - 5})">
            <defs>
                <radialGradient id="lensGrad" cx="50%" cy="50%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.3)" />
                    <stop offset="70%" stop-color="rgba(200,230,255,0.2)" />
                    <stop offset="100%" stop-color="rgba(150,200,255,0.1)" />
                </radialGradient>
            </defs>
            <!-- Lenses -->
            <circle cx="-16" cy="0" r="11" fill="url(#lensGrad)" stroke="#2C3E50" stroke-width="3" />
            <circle cx="16" cy="0" r="11" fill="url(#lensGrad)" stroke="#2C3E50" stroke-width="3" />
            <!-- Bridge -->
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#2C3E50" stroke-width="3" stroke-linecap="round" />
            <!-- Temples -->
            <path d="M -27 0 L -35 -2" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 27 0 L 35 -2" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" />
            <!-- Shine effect -->
            <ellipse cx="-18" cy="-4" rx="4" ry="3" fill="white" opacity="0.7" />
            <ellipse cx="14" cy="-4" rx="4" ry="3" fill="white" opacity="0.7" />
        </g>
    `,
    scarf: (x, y, color) => `
        <g transform="translate(${x}, ${y + 30})">
            <defs>
                <linearGradient id="scarfGrad-${color}" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="${adjustBrightness(color, 10)}" />
                    <stop offset="50%" stop-color="${color}" />
                    <stop offset="100%" stop-color="${adjustBrightness(color, 10)}" />
                </linearGradient>
            </defs>
            <!-- Main scarf wrap -->
            <rect x="-28" y="0" width="56" height="14" rx="4" fill="url(#scarfGrad-${color})" />
            <!-- Knit texture lines -->
            <line x1="-25" y1="3" x2="-25" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <line x1="-18" y1="3" x2="-18" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <line x1="-11" y1="3" x2="-11" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <line x1="-4" y1="3" x2="-4" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <line x1="3" y1="3" x2="3" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <line x1="10" y1="3" x2="10" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <line x1="17" y1="3" x2="17" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <line x1="24" y1="3" x2="24" y2="11" stroke="${adjustBrightness(color, -20)}" stroke-width="1" opacity="0.3" />
            <!-- Hanging end -->
            <rect x="12" y="14" width="12" height="35" rx="3" fill="url(#scarfGrad-${color})" />
            <!-- Fringe -->
            <line x1="14" y1="49" x2="14" y2="54" stroke="${color}" stroke-width="2" stroke-linecap="round" />
            <line x1="18" y1="49" x2="18" y2="56" stroke="${color}" stroke-width="2" stroke-linecap="round" />
            <line x1="22" y1="49" x2="22" y2="54" stroke="${color}" stroke-width="2" stroke-linecap="round" />
        </g>
    `,
    flower: (x, y) => `
        <g transform="translate(${x - 32}, ${y - 32})">
            <defs>
                <radialGradient id="flowerPetalGrad" cx="50%" cy="50%">
                    <stop offset="0%" stop-color="#FF85B5" />
                    <stop offset="100%" stop-color="#FF69B4" />
                </radialGradient>
                <radialGradient id="flowerCenterGrad" cx="40%" cy="40%">
                    <stop offset="0%" stop-color="#FFE44D" />
                    <stop offset="100%" stop-color="#FFD700" />
                </radialGradient>
            </defs>
            <!-- Petals -->
            <circle cx="-8" cy="0" r="6" fill="url(#flowerPetalGrad)" />
            <circle cx="8" cy="0" r="6" fill="url(#flowerPetalGrad)" />
            <circle cx="0" cy="-8" r="6" fill="url(#flowerPetalGrad)" />
            <circle cx="0" cy="8" r="6" fill="url(#flowerPetalGrad)" />
            <circle cx="-6" cy="-6" r="5" fill="url(#flowerPetalGrad)" />
            <circle cx="6" cy="-6" r="5" fill="url(#flowerPetalGrad)" />
            <circle cx="-6" cy="6" r="5" fill="url(#flowerPetalGrad)" />
            <circle cx="6" cy="6" r="5" fill="url(#flowerPetalGrad)" />
            <!-- Center -->
            <circle cx="0" cy="0" r="5" fill="url(#flowerCenterGrad)" />
            <!-- Details on center -->
            <circle cx="-1" cy="-1" r="1.5" fill="#FFF5B4" opacity="0.8" />
        </g>
    `,
    crown: (x, y) => `
        <g transform="translate(${x}, ${y - 55})">
            <defs>
                <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#FFE55C" />
                    <stop offset="100%" stop-color="#FFD700" />
                </linearGradient>
                <radialGradient id="gemGrad" cx="40%" cy="40%">
                    <stop offset="0%" stop-color="#FF9EC5" />
                    <stop offset="100%" stop-color="#FF6B9D" />
                </radialGradient>
            </defs>
            <!-- Crown base -->
            <path d="M -24 12 L -18 -8 L -12 8 L 0 -12 L 12 8 L 18 -8 L 24 12 Z" 
                  fill="url(#crownGrad)" stroke="#D4AF37" stroke-width="1.5" />
            <!-- Decorative band -->
            <rect x="-24" y="10" width="48" height="5" rx="1" fill="#D4AF37" />
            <!-- Gems -->
            <circle cx="-18" cy="-8" r="3.5" fill="url(#gemGrad)" />
            <circle cx="0" cy="-12" r="4" fill="url(#gemGrad)" />
            <circle cx="18" cy="-8" r="3.5" fill="url(#gemGrad)" />
            <!-- Gem shine -->
            <circle cx="-17" cy="-9" r="1.5" fill="white" opacity="0.7" />
            <circle cx="1" cy="-13" r="1.5" fill="white" opacity="0.7" />
            <circle cx="19" cy="-9" r="1.5" fill="white" opacity="0.7" />
            <!-- Crown details -->
            <line x1="-22" y1="12" x2="-22" y2="8" stroke="#D4AF37" stroke-width="1" />
            <line x1="-12" y1="8" x2="-12" y2="4" stroke="#D4AF37" stroke-width="1" />
            <line x1="0" y1="-12" x2="0" y2="-16" stroke="#D4AF37" stroke-width="1" />
            <line x1="12" y1="8" x2="12" y2="4" stroke="#D4AF37" stroke-width="1" />
            <line x1="22" y1="12" x2="22" y2="8" stroke="#D4AF37" stroke-width="1" />
        </g>
    `,
    heart: (x, y) => `
        <g transform="translate(${x + 38}, ${y - 8})">
            <defs>
                <radialGradient id="heartGrad" cx="40%" cy="40%">
                    <stop offset="0%" stop-color="#FF9EC5" />
                    <stop offset="100%" stop-color="#FF6B9D" />
                </radialGradient>
            </defs>
            <path d="M 0 10 
                     C 0 5 -4 0 -9 0 
                     C -13 0 -15 3 -15 7 
                     C -15 3 -17 0 -21 0 
                     C -26 0 -30 5 -30 10 
                     C -30 18 -15 26 -15 26 
                     C -15 26 0 18 0 10 Z" 
                  fill="url(#heartGrad)" 
                  stroke="#FF4D82" 
                  stroke-width="1.5"
                  transform="translate(15, -5)" />
            <!-- Shine effect -->
            <ellipse cx="2" cy="3" rx="4" ry="3" fill="white" opacity="0.5" transform="translate(15, -5)" />
            <!-- Pulse effect circle -->
            <circle cx="0" cy="5" r="2" fill="white" opacity="0.7" transform="translate(15, -5)">
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite" />
            </circle>
        </g>
    `
};

export const TeddyDay = () => {
    const { width, height } = useWindowSize();
    const [companion, setCompanion] = useState({
        animalType: 'bear',
        bodyColor: '#D2691E',
        outfitColor: '#FF6B9D',
        accessory: 'bow',
        name: '',
    });
    const [saved, setSaved] = useState(false);
    const [showFinalScene, setShowFinalScene] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        bearAPI.get()
            .then(res => {
                if (res.data) {
                    setCompanion(res.data);
                    setSaved(true);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleSave = async () => {
        try {
            await bearAPI.save(companion);
            setSaved(true);
            toast.success('Your companion has been saved! 🧸');
        } catch (error) {
            console.error(error);
            toast.error('Failed to save companion');
        }
    };

    const handleRandomize = () => {
        const animals = Object.keys(animalConfigs);
        const colors = ['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460', '#FFE4C4', '#FAEBD7', '#FFFFFF', '#FFB6C1', '#FFC0CB', '#87CEEB', '#B0E0E6', '#98FB98', '#F0E68C'];
        const outfits = ['#FF6B9D', '#FF85A1', '#FFA5C3', '#4ECDC4', '#45B7D1', '#95E1D3', '#F38181', '#FF6F61', '#AA96DA', '#C5A3FF', '#FCBAD3', '#FFD93D', '#FFA94D', '#6BCB77'];
        const accessoryOptions = ['none', 'bow', 'hat', 'glasses', 'scarf', 'flower', 'crown', 'heart'];
        const names = ['Cuddles', 'Sweetie', 'Fluffy', 'Snuggles', 'Honey', 'Sugar', 'Love', 'Angel', 'Buddy', 'Joy', 'Muffin', 'Cookie', 'Marshmallow', 'Coco', 'Mocha', 'Luna', 'Sunny', 'Star'];

        setCompanion({
            animalType: animals[Math.floor(Math.random() * animals.length)],
            bodyColor: colors[Math.floor(Math.random() * colors.length)],
            outfitColor: outfits[Math.floor(Math.random() * outfits.length)],
            accessory: accessoryOptions[Math.floor(Math.random() * accessoryOptions.length)],
            name: names[Math.floor(Math.random() * names.length)]
        });
    };

    const handleCreateAndView = () => {
        if (!companion.name.trim()) {
            toast.error('Please give your companion a name first! 💕');
            return;
        }
        setShowFinalScene(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const renderCompanionSVG = (x = 100, y = 80, scale = 1) => {
        const config = animalConfigs[companion.animalType];

        return (
            <g transform={`scale(${scale})`}>
                <g dangerouslySetInnerHTML={{ __html: config.bodyShape(x, y, companion.bodyColor) }} />
                <g dangerouslySetInnerHTML={{ __html: config.face(x, y) }} />
                {companion.accessory !== 'none' && accessories[companion.accessory] && (
                    <g dangerouslySetInnerHTML={{ __html: accessories[companion.accessory](x, y, companion.outfitColor) }} />
                )}
            </g>
        );
    };

    const ColorButton = ({ color, selected, onClick }) => (
        <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`w-14 h-14 rounded-full border-4 transition-all shadow-md ${selected ? 'border-pink-500 shadow-xl ring-4 ring-pink-200' : 'border-gray-300 hover:border-pink-300'
                }`}
            style={{ backgroundColor: color }}
        >
            {selected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xl"
                >
                    ✓
                </motion.div>
            )}
        </motion.button>
    );

    return (
        <>
            {/* Floating Hearts Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-3xl opacity-20"
                        initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
                        animate={{
                            y: '-10vh',
                            rotate: 360,
                            opacity: [0, 0.2, 0.2, 0]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: 'linear'
                        }}
                    >
                        {['💕', '💖', '💗', '💝', '💓', '🌸', '✨'][Math.floor(Math.random() * 7)]}
                    </motion.div>
                ))}
            </div>

            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-12 px-4 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <motion.header
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-sm"
                            style={{ fontFamily: 'Pacifico, cursive' }}>
                            💕 Teddy Day Builder 💕
                        </h1>
                        <p className="text-xl text-gray-700 font-medium">
                            Create your perfect companion with love!
                        </p>
                    </motion.header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Preview Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-pink-100">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Your Companion Preview
                                </h2>
                                <motion.div
                                    className="relative w-full max-w-md mx-auto"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    style={{
                                        background: 'radial-gradient(circle at 50% 50%, rgba(255,182,193,0.15), transparent 70%)',
                                        borderRadius: '20px',
                                        padding: '2rem'
                                    }}
                                >
                                    <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-2xl">
                                        {/* Background glow */}
                                        <defs>
                                            <filter id="glow">
                                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        <circle cx="100" cy="140" r="90" fill="rgba(255,255,255,0.5)" filter="url(#glow)" />
                                        {renderCompanionSVG()}
                                    </svg>
                                </motion.div>
                                <AnimatePresence>
                                    {companion.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="text-center mt-6"
                                        >
                                            <p className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent drop-shadow-sm"
                                                style={{ fontFamily: 'Pacifico, cursive' }}>
                                                {companion.name} 💕
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2 font-medium">
                                                {animalConfigs[companion.animalType].name} Friend
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>

                        {/* Controls Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Choose Animal */}
                            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow border-l-4 border-pink-500">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    🐾 Choose Your Companion Type
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {Object.entries(animalConfigs).map(([type, config]) => (
                                        <motion.button
                                            key={type}
                                            whileHover={{ y: -4, scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCompanion({ ...companion, animalType: type })}
                                            className={`p-5 rounded-xl border-3 transition-all ${companion.animalType === type
                                                    ? 'border-pink-500 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 shadow-lg ring-4 ring-pink-200'
                                                    : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="text-5xl mb-2">{config.emoji}</div>
                                            <div className="text-sm font-bold text-gray-700">{config.name}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </Card>

                            {/* Body Color */}
                            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow border-l-4 border-purple-500">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 Body Color</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460', '#FFE4C4', '#FAEBD7', '#FFFFFF', '#FFB6C1', '#FFC0CB', '#87CEEB', '#B0E0E6', '#98FB98', '#F0E68C'].map(color => (
                                        <ColorButton
                                            key={color}
                                            color={color}
                                            selected={companion.bodyColor === color}
                                            onClick={() => setCompanion({ ...companion, bodyColor: color })}
                                        />
                                    ))}
                                </div>
                            </Card>

                            {/* Accessories */}
                            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow border-l-4 border-green-500">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">✨ Accessories & Style</h3>
                                <div className="grid grid-cols-4 gap-3">
                                    {[
                                        { value: 'none', label: 'None', emoji: '🚫' },
                                        { value: 'bow', label: 'Bow', emoji: '🎀' },
                                        { value: 'hat', label: 'Hat', emoji: '🎩' },
                                        { value: 'glasses', label: 'Glasses', emoji: '👓' },
                                        { value: 'scarf', label: 'Scarf', emoji: '🧣' },
                                        { value: 'flower', label: 'Flower', emoji: '🌸' },
                                        { value: 'crown', label: 'Crown', emoji: '👑' },
                                        { value: 'heart', label: 'Heart', emoji: '💝' }
                                    ].map(acc => (
                                        <motion.button
                                            key={acc.value}
                                            whileHover={{ scale: 1.08, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCompanion({ ...companion, accessory: acc.value })}
                                            className={`p-4 rounded-xl border-3 text-center text-sm font-bold transition-all ${companion.accessory === acc.value
                                                    ? 'border-pink-500 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 shadow-lg'
                                                    : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{acc.emoji}</div>
                                            <div className="text-xs">{acc.label}</div>
                                        </motion.button>
                                    ))}
                                </div>
                                {companion.accessory !== 'none' && (
                                    <div className="mt-4">
                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                            Accessory Color:
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {['#FF6B9D', '#FF85A1', '#4ECDC4', '#45B7D1', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#FFD93D', '#6BCB77'].map(color => (
                                                <ColorButton
                                                    key={color}
                                                    color={color}
                                                    selected={companion.outfitColor === color}
                                                    onClick={() => setCompanion({ ...companion, outfitColor: color })}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>

                            {/* Name Input */}
                            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow border-l-4 border-yellow-500">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">💕 Name Your Companion</h3>
                                <input
                                    type="text"
                                    value={companion.name}
                                    onChange={(e) => setCompanion({ ...companion, name: e.target.value })}
                                    placeholder="Enter a cute name..."
                                    maxLength={20}
                                    className="w-full px-5 py-4 border-3 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none text-lg font-semibold transition-all shadow-sm"
                                />
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleRandomize}
                                    className="flex-1 py-4 bg-white border-3 border-pink-500 text-pink-600 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl"
                                >
                                    🎲 Surprise Me!
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCreateAndView}
                                    className="flex-1 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all shadow-lg"
                                >
                                    💝 Create & View
                                </motion.button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                disabled={saved}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${saved
                                        ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white cursor-default'
                                        : 'bg-gradient-to-r from-green-500 to-teal-600 text-white'
                                    }`}
                            >
                                {saved ? '✓ Saved Successfully!' : '💾 Save My Companion'}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Final Scene Modal */}
            <AnimatePresence>
                {showFinalScene && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-300 z-50 flex items-center justify-center overflow-auto p-4"
                        onClick={() => setShowFinalScene(false)}
                    >
                        {showConfetti && (
                            <Confetti
                                width={width}
                                height={height}
                                numberOfPieces={300}
                                recycle={false}
                                colors={['#FF6B9D', '#FFB6C1', '#DDA0DD', '#E0BBE4', '#957DAD', '#FEC8D8', '#FFDFD3']}
                            />
                        )}

                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            onClick={() => setShowFinalScene(false)}
                            className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center text-3xl font-bold hover:bg-pink-50 transition-colors z-10"
                        >
                            ✕
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center max-w-3xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.h1
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-6xl md:text-7xl font-bold text-white mb-12 drop-shadow-2xl"
                                style={{ fontFamily: 'Pacifico, cursive' }}
                            >
                                Meet {companion.name}! 💕
                            </motion.h1>

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className="relative bg-white/20 backdrop-blur-md rounded-3xl p-12 shadow-2xl"
                            >
                                <svg viewBox="0 0 600 700" className="w-full max-w-2xl mx-auto drop-shadow-2xl">
                                    <defs>
                                        <linearGradient id="girlSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#FFE0BD" />
                                            <stop offset="100%" stopColor="#FFCBA4" />
                                        </linearGradient>
                                        <linearGradient id="dress" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#FFB6C1" />
                                            <stop offset="100%" stopColor="#FF9AB5" />
                                        </linearGradient>
                                        <radialGradient id="bgGlow" cx="50%" cy="50%">
                                            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                        </radialGradient>
                                    </defs>

                                    {/* Background glow */}
                                    <circle cx="300" cy="400" r="200" fill="url(#bgGlow)" />

                                    {/* Sparkles */}
                                    {[...Array(12)].map((_, i) => (
                                        <motion.g
                                            key={i}
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                rotate: [0, 180, 360],
                                                opacity: [0.7, 1, 0.7]
                                            }}
                                            transition={{
                                                duration: 2 + (i % 3),
                                                repeat: Infinity,
                                                delay: i * 0.2
                                            }}
                                        >
                                            <path
                                                d={`M ${150 + (i % 4) * 100} ${150 + Math.floor(i / 4) * 150} 
                                                    L ${154 + (i % 4) * 100} ${160 + Math.floor(i / 4) * 150} 
                                                    L ${164 + (i % 4) * 100} ${164 + Math.floor(i / 4) * 150} 
                                                    L ${154 + (i % 4) * 100} ${168 + Math.floor(i / 4) * 150} 
                                                    L ${150 + (i % 4) * 100} ${178 + Math.floor(i / 4) * 150} 
                                                    L ${146 + (i % 4) * 100} ${168 + Math.floor(i / 4) * 150} 
                                                    L ${136 + (i % 4) * 100} ${164 + Math.floor(i / 4) * 150} 
                                                    L ${146 + (i % 4) * 100} ${160 + Math.floor(i / 4) * 150} Z`}
                                                fill="#FFD700"
                                            />
                                        </motion.g>
                                    ))}

                                    {/* Girl illustration - Enhanced */}
                                    <g transform="translate(300, 350)">
                                        {/* Dress */}
                                        <ellipse cx="0" cy="120" rx="90" ry="110" fill="url(#dress)" />
                                        <path d="M -90 120 Q -90 80 -70 60 L -70 230 L 70 230 L 70 60 Q 90 80 90 120 Z"
                                            fill="url(#dress)" opacity="0.9" />

                                        {/* Arms */}
                                        <ellipse cx="-75" cy="80" rx="28" ry="70" fill="url(#girlSkin)"
                                            transform="rotate(-30 -75 80)" />
                                        <ellipse cx="75" cy="80" rx="28" ry="70" fill="url(#girlSkin)"
                                            transform="rotate(30 75 80)" />

                                        {/* Companion in arms */}
                                        <g transform="translate(-30, 100) scale(0.55)">
                                            {renderCompanionSVG(100, 80, 1)}
                                        </g>

                                        {/* Head */}
                                        <circle cx="0" cy="-20" r="55" fill="url(#girlSkin)" />

                                        {/* Hair */}
                                        <path d="M -50 -40 Q -60 -60 -50 -70 Q -30 -75 0 -75 Q 30 -75 50 -70 Q 60 -60 50 -40"
                                            fill="#3D2817" />
                                        <ellipse cx="-45" cy="-30" rx="25" ry="40" fill="#3D2817" />
                                        <ellipse cx="45" cy="-30" rx="25" ry="40" fill="#3D2817" />
                                        <path d="M -55 -30 Q -60 10 -50 30 L -40 20 Q -45 -10 -45 -30 Z" fill="#3D2817" />
                                        <path d="M 55 -30 Q 60 10 50 30 L 40 20 Q 45 -10 45 -30 Z" fill="#3D2817" />

                                        {/* Face */}
                                        <circle cx="-18" cy="-20" r="5" fill="#2D3436" />
                                        <circle cx="18" cy="-20" r="5" fill="#2D3436" />
                                        <circle cx="-16" cy="-22" r="2" fill="white" />
                                        <circle cx="20" cy="-22" r="2" fill="white" />

                                        {/* Happy smile */}
                                        <path d="M -20 0 Q 0 10 20 0"
                                            stroke="#FF6B9D"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round" />

                                        {/* Blush */}
                                        <ellipse cx="-35" cy="-10" rx="12" ry="9" fill="#FFB6C1" opacity="0.6" />
                                        <ellipse cx="35" cy="-10" rx="12" ry="9" fill="#FFB6C1" opacity="0.6" />
                                    </g>
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8"
                            >
                                <p className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-3"
                                    style={{ fontFamily: 'Quicksand, sans-serif' }}>
                                    Your {animalConfigs[companion.animalType].name} companion is ready! 🎉
                                </p>
                                <p className="text-xl md:text-2xl text-white/95 drop-shadow-md">
                                    Spreading love and joy this Teddy Day! 💝✨
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
