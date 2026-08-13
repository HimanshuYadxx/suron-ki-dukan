"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { track } from "@vercel/analytics";

/* ==========================================================================
   TYPES & SONG DATA (ALL 55 TRACKS)
   ========================================================================== */

export interface Track {
  id: number;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: string;
  videoId: string;
  youtubeId?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

export const songs: Track[] = [
  // â€” 1989 â€”
  { id: 1,  title: "Dil Deewana",               film: "Maine Pyar Kiya",           year: 1989, artist: "S. P. Balasubrahmanyam, Lata Mangeshkar", duration: "5:55", videoId: "1ZBp6hIqCfI", youtubeId: "1ZBp6hIqCfI" },
  { id: 2,  title: "Aate Jaate Hanste Gaate",   film: "Maine Pyar Kiya",           year: 1989, artist: "S. P. Balasubrahmanyam, Lata Mangeshkar", duration: "3:29", videoId: "L0e6QyX1QY4", youtubeId: "L0e6QyX1QY4" },

  // â€” 1990 â€”
  { id: 3,  title: "Sharaab Pee Lena",           film: "Nasha",                     year: 1990, artist: "Anuradha Paudwal", duration: "4:12", videoId: "pkCwb8xvTxY", youtubeId: "pkCwb8xvTxY" },
  { id: 4,  title: "Tu Meri Zindagi Hai",        film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", duration: "4:44", videoId: "oEg_iXEWlt4", youtubeId: "oEg_iXEWlt4" },
  { id: 5,  title: "Nazar Ke Saamne",            film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", duration: "5:36", videoId: "wrKndqHFNaQ", youtubeId: "wrKndqHFNaQ" },
  { id: 6,  title: "Dheere Dheere Se",           film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", duration: "5:27", videoId: "esEEitsh7iE", youtubeId: "esEEitsh7iE" },
  { id: 7,  title: "Ab Tere Bin Jee Lenge",      film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu", duration: "5:46", videoId: "Q0w4hJ5_2E0", youtubeId: "Q0w4hJ5_2E0" },
  { id: 8,  title: "Saanson Ki Zaroorat Hai",    film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu", duration: "6:08", videoId: "42_sL8EaTyo", youtubeId: "42_sL8EaTyo" },
  { id: 9,  title: "Mujhe Neend Na Aaye",        film: "Dil",                      year: 1990, artist: "Udit Narayan, Anuradha Paudwal", duration: "6:15", videoId: "19m5Y9kLdO4", youtubeId: "19m5Y9kLdO4" },
  { id: 10, title: "O Priya Priya",              film: "Dil",                      year: 1990, artist: "Anuradha Paudwal, Suresh Wadkar", duration: "6:02", videoId: "y-R_a3BwXk4", youtubeId: "y-R_a3BwXk4" },
  { id: 11, title: "Jab Koi Baat Bigad Jaye",   film: "Jurm",                     year: 1990, artist: "Kumar Sanu, Sadhana Sargam", duration: "5:08", videoId: "0M_N_XJ_C2g", youtubeId: "0M_N_XJ_C2g" },

  // â€” 1991 â€”
  { id: 12, title: "Dil Hai Ki Manta Nahin",     film: "Dil Hai Ki Manta Nahin",   year: 1991, artist: "Kumar Sanu, Anuradha Paudwal", duration: "6:10", videoId: "mXfK0s5P__0", youtubeId: "mXfK0s5P__0" },
  { id: 13, title: "Mera Dil Bhi Kitna Pagal Hai", film: "Saajan",                 year: 1991, artist: "Kumar Sanu, Alka Yagnik", duration: "5:28", videoId: "FsNc7I33w60", youtubeId: "FsNc7I33w60" },
  { id: 14, title: "Bahut Pyar Karte Hain",      film: "Saajan",                   year: 1991, artist: "Anuradha Paudwal", duration: "4:25", videoId: "4-2o15N5Ld4", youtubeId: "4-2o15N5Ld4" },
  { id: 15, title: "Dekhta Hoon Main",           film: "Saajan",                   year: 1991, artist: "Kumar Sanu", duration: "6:12", videoId: "8zG-f8B8w2w", youtubeId: "8zG-f8B8w2w" },
  { id: 16, title: "Woh Kaali Kaali Aankhen",    film: "Sanam Bewafa",             year: 1991, artist: "Vipin Sachdeva", duration: "5:15", videoId: "xX0-4_L2kX8", youtubeId: "xX0-4_L2kX8" },

  // â€” 1992 â€”
  { id: 17, title: "Teri Umeed Tera Intezaar",   film: "Deewana",                  year: 1992, artist: "Kumar Sanu, Sadhana Sargam", duration: "6:20", videoId: "Y8J0q0u0sYo", youtubeId: "Y8J0q0u0sYo" },
  { id: 18, title: "Pehla Nasha",                film: "Jo Jeeta Wohi Sikandar",   year: 1992, artist: "Udit Narayan, Sadhana Sargam", duration: "4:50", videoId: "Ki41AKu0iHc", youtubeId: "Ki41AKu0iHc" },
  { id: 19, title: "Saat Samundar Paar",         film: "Vishwatma",                year: 1992, artist: "Sadhana Sargam", duration: "6:35", videoId: "0U6X4h2kP_4", youtubeId: "0U6X4h2kP_4" },

  // â€” 1993 â€”
  { id: 20, title: "Yeh Kaali Kaali Aankhen",   film: "Baazigar",                 year: 1993, artist: "Kumar Sanu, Anu Malik", duration: "7:52", videoId: "8P9G0N_g_Y4", youtubeId: "8P9G0N_g_Y4" },
  { id: 21, title: "Ae Mere Humsafar",           film: "Baazigar",                 year: 1993, artist: "Vinod Rathod, Alka Yagnik", duration: "5:40", videoId: "fF7-N1L5mGk", youtubeId: "fF7-N1L5mGk" },
  { id: 22, title: "Jaadu Teri Nazar",           film: "Darr",                     year: 1993, artist: "Udit Narayan", duration: "4:41", videoId: "I1mX3113Nzo", youtubeId: "I1mX3113Nzo" },

  // â€” 1994 â€”
  { id: 23, title: "Ek Ladki Ko Dekha",          film: "1942: A Love Story",       year: 1994, artist: "Kumar Sanu", duration: "4:35", videoId: "6wjvHEiOrtA", youtubeId: "6wjvHEiOrtA" },
  { id: 24, title: "Kuch Na Kaho",               film: "1942: A Love Story",       year: 1994, artist: "Kumar Sanu", duration: "6:05", videoId: "wT0R5k_sXy0", youtubeId: "wT0R5k_sXy0" },
  { id: 25, title: "Pyar Hua Chupke Se",         film: "1942: A Love Story",       year: 1994, artist: "Kavita Krishnamurthy", duration: "5:12", videoId: "R_c_0kM5Y24", youtubeId: "R_c_0kM5Y24" },
  { id: 26, title: "Meri Neend Mera Chain",      film: "Mohra",                    year: 1994, artist: "Sadhana Sargam", duration: "5:20", videoId: "f2_0wN8_xN0", youtubeId: "f2_0wN8_xN0" },
  { id: 27, title: "Chura Ke Dil Mera",          film: "Main Khiladi Tu Anari",    year: 1994, artist: "Kumar Sanu, Alka Yagnik", duration: "7:55", videoId: "Yqj1_V90KJo", youtubeId: "Yqj1_V90KJo" },
  { id: 28, title: "Ole Ole",                    film: "Yeh Dillagi",              year: 1994, artist: "Abhijeet Bhattacharya", duration: "4:30", videoId: "M_g8G22j_9g", youtubeId: "M_g8G22j_9g" },
  { id: 29, title: "Pehla Pehla Pyar Hai",       film: "Hum Aapke Hain Koun",      year: 1994, artist: "S. P. Balasubrahmanyam", duration: "4:25", videoId: "f4G0_14m4Y0", youtubeId: "f4G0_14m4Y0" },
  { id: 30, title: "Jaana O Meri Jaana",         film: "Andaaz Apna Apna",         year: 1994, artist: "Abhijeet Bhattacharya", duration: "4:40", videoId: "5f8R0n1nN1k", youtubeId: "5f8R0n1nN1k" },

  // â€” 1995 â€”
  { id: 31, title: "Ruk Ja O Dil Deewane",       film: "Dilwale Dulhania Le Jayenge", year: 1995, artist: "Udit Narayan", duration: "5:14", videoId: "x8mY9w08wKw", youtubeId: "x8mY9w08wKw" },
  { id: 32, title: "Mere Khwabon Mein Jo Aaye",  film: "Dilwale Dulhania Le Jayenge", year: 1995, artist: "Lata Mangeshkar", duration: "4:18", videoId: "a2m3X54wQ-4", youtubeId: "a2m3X54wQ-4" },
  { id: 33, title: "Kitna Pyara Tujhe Rab Ne",   film: "Raja",                     year: 1995, artist: "Udit Narayan, Alka Yagnik", duration: "6:15", videoId: "f3120N-f4N0", youtubeId: "f3120N-f4N0" },

  // â€” 1996 â€”
  { id: 34, title: "Aaj Main Upar",              film: "Khamoshi: The Musical",    year: 1996, artist: "Kavita Krishnamurthy, Kumar Sanu", duration: "5:30", videoId: "3P_fN4P74M0", youtubeId: "3P_fN4P74M0" },
  { id: 35, title: "Aaye Ho Meri Zindagi Mein",  film: "Raja Hindustani",          year: 1996, artist: "Udit Narayan", duration: "6:02", videoId: "e_sK0X0F_40", youtubeId: "e_sK0X0F_40" },
  { id: 36, title: "Pardesi Pardesi",            film: "Raja Hindustani",          year: 1996, artist: "Udit Narayan, Alka Yagnik", duration: "7:31", videoId: "W5lusYuAW0s", youtubeId: "W5lusYuAW0s" },

  // â€” 1997 â€”
  { id: 37, title: "Sona Kitna Sona Hai",        film: "Hero No. 1",               year: 1997, artist: "Udit Narayan, Poornima", duration: "4:50", videoId: "G8F2-f8w-40", youtubeId: "G8F2-f8w-40" },
  { id: 38, title: "Ek Din Aap",                 film: "Hero No. 1",               year: 1997, artist: "Kumar Sanu, Alka Yagnik", duration: "4:30", videoId: "1w2m4P5q0k8", youtubeId: "1w2m4P5q0k8" },
  { id: 39, title: "Ye Dil Deewana",             film: "Pardes",                   year: 1997, artist: "Sonu Nigam", duration: "7:00", videoId: "s3e3F1N5A4k", youtubeId: "s3e3F1N5A4k" },
  { id: 40, title: "Do Dil Mil Rahe Hain",       film: "Pardes",                   year: 1997, artist: "Kumar Sanu", duration: "6:35", videoId: "m8A2x0g5f9k", youtubeId: "m8A2x0g5f9k" },
  { id: 41, title: "Meri Mehbooba",              film: "Pardes",                   year: 1997, artist: "Kumar Sanu, Alka Yagnik", duration: "4:55", videoId: "1x9M8A7k6q5", youtubeId: "1x9M8A7k6q5" },

  // â€” 1998 â€”
  { id: 42, title: "Mere Mehboob Mere Sanam",    film: "Duplicate",                year: 1998, artist: "Udit Narayan, Alka Yagnik", duration: "6:58", videoId: "P3fN4M2_X4g", youtubeId: "P3fN4M2_X4g" },
  { id: 43, title: "Ladki Badi Anjani Hai",      film: "Kuch Kuch Hota Hai",       year: 1998, artist: "Kumar Sanu, Alka Yagnik", duration: "6:23", videoId: "m1g2x4g0k8M", youtubeId: "m1g2x4g0k8M" },
  { id: 44, title: "Tujhe Yaad Na Meri Aayi",    film: "Kuch Kuch Hota Hai",       year: 1998, artist: "Udit Narayan, Alka Yagnik", duration: "7:05", videoId: "HeFM4VFZL1M", youtubeId: "HeFM4VFZL1M" },

  // â€” 2000 â€”
  { id: 45, title: "Chand Sitare",               film: "Kaho Naa... Pyaar Hai",    year: 2000, artist: "Kumar Sanu", duration: "6:30", videoId: "5N1m2g3P4q0", youtubeId: "5N1m2g3P4q0" },
  { id: 46, title: "Ek Pal Ka Jeena",            film: "Kaho Naa... Pyaar Hai",    year: 2000, artist: "Lucky Ali", duration: "6:36", videoId: "aGbPyM6lzBs", youtubeId: "aGbPyM6lzBs" },
  { id: 47, title: "Na Tum Jano Na Hum",         film: "Kaho Naa... Pyaar Hai",    year: 2000, artist: "Lucky Ali", duration: "6:18", videoId: "P1m2g3x4f5k", youtubeId: "P1m2g3x4f5k" },
  { id: 48, title: "Dil Ne Yeh Kaha Hai Dil Se", film: "Dhadkan",                  year: 2000, artist: "Sonu Nigam, Alka Yagnik", duration: "7:06", videoId: "-QcF-aPEtRU", youtubeId: "-QcF-aPEtRU" },

  // â€” 2001 â€”
  { id: 49, title: "Tere Naam",                  film: "Tere Naam",                year: 2001, artist: "Udit Narayan, Alka Yagnik", duration: "6:33", videoId: "6f9N0M1g2X3", youtubeId: "6f9N0M1g2X3" },
  { id: 50, title: "Kyun Ho Gaya Na",            film: "Kyun Ho Gaya Na",          year: 2001, artist: "Shankar Mahadevan, Shaan", duration: "5:20", videoId: "2x3P4f5g6N0", youtubeId: "2x3P4f5g6N0" },

  // â€” 2002 â€”
  { id: 51, title: "Mere Yaar Ki Shaadi Hai",    film: "Mere Yaar Ki Shaadi Hai",  year: 2002, artist: "Udit Narayan, Alka Yagnik", duration: "5:42", videoId: "3f4N5g6P7k8", youtubeId: "3f4N5g6P7k8" },
  { id: 52, title: "Mujhse Dosti Karoge",        film: "Mujhse Dosti Karoge",      year: 2002, artist: "Asha Bhosle, Udit Narayan", duration: "5:03", videoId: "4g5P6N7m8X9", youtubeId: "4g5P6N7m8X9" },
  { id: 53, title: "Yeh Dil Aashiqana",          film: "Yeh Dil Aashiqana",        year: 2002, artist: "Kumar Sanu, Alka Yagnik", duration: "5:35", videoId: "5f6N7P8m9X0", youtubeId: "5f6N7P8m9X0" },

  // â€” 2003 â€”
  { id: 54, title: "Dil Ka Rishta",              film: "Dil Ka Rishta",            year: 2003, artist: "Kumar Sanu, Alka Yagnik", duration: "5:00", videoId: "6g7N8P9m0X1", youtubeId: "6g7N8P9m0X1" },
  { id: 55, title: "Saathiya",                   film: "Saathiya",                 year: 2002, artist: "Sonu Nigam", duration: "5:57", videoId: "7f8N9P0m1X2", youtubeId: "7f8N9P0m1X2" },
];

export const playlists: Playlist[] = [
  {
    id: "90s-romance",
    name: "90s Romantic Hits",
    description: "The golden era of Indian romantic duets and iconic film melodies.",
    tracks: songs.slice(0, 22),
  },
  {
    id: "golden-era",
    name: "Golden 90s Melodies",
    description: "Blockbuster tracks from 1994 to 1998 that defined a generation.",
    tracks: songs.slice(22, 44),
  },
  {
    id: "2000s-nostalgia",
    name: "Millennium Nostalgia",
    description: "Heartwarming hits from the turn of the millennium (2000â€“2003).",
    tracks: songs.slice(44),
  },
];

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/* ==========================================================================
   MODULE-SCOPE SUB-COMPONENTS (PREVENTS RE-MOUNTING ON STATE TICKS)
   ========================================================================== */

// 1. Clock Component
const Clock = () => {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  const parts = timeStr.match(/^(\d+)(:)(\d+)(\s*[AP]M)?$/i);

  return (
    <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide text-white/90 flex items-center gap-1 shadow-lg backdrop-blur-md">
      <span className="text-amber-400 font-semibold text-[10px] uppercase tracking-wider mr-1">IST</span>
      {parts ? (
        <>
          <span>{parts[1]}</span>
          <span className="animate-blink text-amber-400 font-bold">:</span>
          <span>{parts[3]}</span>
          {parts[4] && <span className="text-[10px] text-white/70 ml-0.5">{parts[4].trim()}</span>}
        </>
      ) : (
        <span>{timeStr}</span>
      )}
    </div>
  );
};

// 2. Live Listeners Badge
const LiveListeners = ({ count }: { count: number }) => {
  return (
    <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 flex items-center gap-2 shadow-lg backdrop-blur-md">
      <span className="relative flex h-2 w-2">
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { track } from "@vercel/analytics";

/* ==========================================================================
   TYPES & SONG DATA (ALL 55 TRACKS)
   ========================================================================== */

export interface Track {
  id: number;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: string;
  videoId: string;
  youtubeId?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

export const songs: Track[] = [
  // â€” 1989 â€”
  { id: 1,  title: "Dil Deewana",               film: "Maine Pyar Kiya",           year: 1989, artist: "S. P. Balasubrahmanyam, Lata Mangeshkar", duration: "5:55", videoId: "1ZBp6hIqCfI", youtubeId: "1ZBp6hIqCfI" },
  { id: 2,  title: "Aate Jaate Hanste Gaate",   film: "Maine Pyar Kiya",           year: 1989, artist: "S. P. Balasubrahmanyam, Lata Mangeshkar", duration: "3:29", videoId: "L0e6QyX1QY4", youtubeId: "L0e6QyX1QY4" },

  // â€” 1990 â€”
  { id: 3,  title: "Sharaab Pee Lena",           film: "Nasha",                     year: 1990, artist: "Anuradha Paudwal", duration: "4:12", videoId: "pkCwb8xvTxY", youtubeId: "pkCwb8xvTxY" },
  { id: 4,  title: "Tu Meri Zindagi Hai",        film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", duration: "4:44", videoId: "oEg_iXEWlt4", youtubeId: "oEg_iXEWlt4" },
  { id: 5,  title: "Nazar Ke Saamne",            film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", duration: "5:36", videoId: "wrKndqHFNaQ", youtubeId: "wrKndqHFNaQ" },
  { id: 6,  title: "Dheere Dheere Se",           film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", duration: "5:27", videoId: "esEEitsh7iE", youtubeId: "esEEitsh7iE" },
  { id: 7,  title: "Ab Tere Bin Jee Lenge",      film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu", duration: "5:46", videoId: "Q0w4hJ5_2E0", youtubeId: "Q0w4hJ5_2E0" },
  { id: 8,  title: "Saanson Ki Zaroorat Hai",    film: "Aashiqui",                 year: 1990, artist: "Kumar Sanu", duration: "6:08", videoId: "42_sL8EaTyo", youtubeId: "42_sL8EaTyo" },
  { id: 9,  title: "Mujhe Neend Na Aaye",        film: "Dil",                      year: 1990, artist: "Udit Narayan, Anuradha Paudwal", duration: "6:15", videoId: "19m5Y9kLdO4", youtubeId: "19m5Y9kLdO4" },
  { id: 10, title: "O Priya Priya",              film: "Dil",                      year: 1990, artist: "Anuradha Paudwal, Suresh Wadkar", duration: "6:02", videoId: "y-R_a3BwXk4", youtubeId: "y-R_a3BwXk4" },
  { id: 11, title: "Jab Koi Baat Bigad Jaye",   film: "Jurm",                     year: 1990, artist: "Kumar Sanu, Sadhana Sargam", duration: "5:08", videoId: "0M_N_XJ_C2g", youtubeId: "0M_N_XJ_C2g" },

  // â€” 1991 â€”
  { id: 12, title: "Dil Hai Ki Manta Nahin",     film: "Dil Hai Ki Manta Nahin",   year: 1991, artist: "Kumar Sanu, Anuradha Paudwal", duration: "6:10", videoId: "mXfK0s5P__0", youtubeId: "mXfK0s5P__0" },
  { id: 13, title: "Mera Dil Bhi Kitna Pagal Hai", film: "Saajan",                 year: 1991, artist: "Kumar Sanu, Alka Yagnik", duration: "5:28", videoId: "FsNc7I33w60", youtubeId: "FsNc7I33w60" },
  { id: 14, title: "Bahut Pyar Karte Hain",      film: "Saajan",                   year: 1991, artist: "Anuradha Paudwal", duration: "4:25", videoId: "4-2o15N5Ld4", youtubeId: "4-2o15N5Ld4" },
  { id: 15, title: "Dekhta Hoon Main",           film: "Saajan",                   year: 1991, artist: "Kumar Sanu", duration: "6:12", videoId: "8zG-f8B8w2w", youtubeId: "8zG-f8B8w2w" },
  { id: 16, title: "Woh Kaali Kaali Aankhen",    film: "Sanam Bewafa",             year: 1991, artist: "Vipin Sachdeva", duration: "5:15", videoId: "xX0-4_L2kX8", youtubeId: "xX0-4_L2kX8" },

  // â€” 1992 â€”
  { id: 17, title: "Teri Umeed Tera Intezaar",   film: "Deewana",                  year: 1992, artist: "Kumar Sanu, Sadhana Sargam", duration: "6:20", videoId: "Y8J0q0u0sYo", youtubeId: "Y8J0q0u0sYo" },
  { id: 18, title: "Pehla Nasha",                film: "Jo Jeeta Wohi Sikandar",   year: 1992, artist: "Udit Narayan, Sadhana Sargam", duration: "4:50", videoId: "Ki41AKu0iHc", youtubeId: "Ki41AKu0iHc" },
  { id: 19, title: "Saat Samundar Paar",         film: "Vishwatma",                year: 1992, artist: "Sadhana Sargam", duration: "6:35", videoId: "0U6X4h2kP_4", youtubeId: "0U6X4h2kP_4" },

  // â€” 1993 â€”
  { id: 20, title: "Yeh Kaali Kaali Aankhen",   film: "Baazigar",                 year: 1993, artist: "Kumar Sanu, Anu Malik", duration: "7:52", videoId: "8P9G0N_g_Y4", youtubeId: "8P9G0N_g_Y4" },
  { id: 21, title: "Ae Mere Humsafar",           film: "Baazigar",                 year: 1993, artist: "Vinod Rathod, Alka Yagnik", duration: "5:40", videoId: "fF7-N1L5mGk", youtubeId: "fF7-N1L5mGk" },
  { id: 22, title: "Jaadu Teri Nazar",           film: "Darr",                     year: 1993, artist: "Udit Narayan", duration: "4:41", videoId: "I1mX3113Nzo", youtubeId: "I1mX3113Nzo" },

  // â€” 1994 â€”
  { id: 23, title: "Ek Ladki Ko Dekha",          film: "1942: A Love Story",       year: 1994, artist: "Kumar Sanu", duration: "4:35", videoId: "6wjvHEiOrtA", youtubeId: "6wjvHEiOrtA" },
  { id: 24, title: "Kuch Na Kaho",               film: "1942: A Love Story",       year: 1994, artist: "Kumar Sanu", duration: "6:05", videoId: "wT0R5k_sXy0", youtubeId: "wT0R5k_sXy0" },
  { id: 25, title: "Pyar Hua Chupke Se",         film: "1942: A Love Story",       year: 1994, artist: "Kavita Krishnamurthy", duration: "5:12", videoId: "R_c_0kM5Y24", youtubeId: "R_c_0kM5Y24" },
  { id: 26, title: "Meri Neend Mera Chain",      film: "Mohra",                    year: 1994, artist: "Sadhana Sargam", duration: "5:20", videoId: "f2_0wN8_xN0", youtubeId: "f2_0wN8_xN0" },
  { id: 27, title: "Chura Ke Dil Mera",          film: "Main Khiladi Tu Anari",    year: 1994, artist: "Kumar Sanu, Alka Yagnik", duration: "7:55", videoId: "Yqj1_V90KJo", youtubeId: "Yqj1_V90KJo" },
  { id: 28, title: "Ole Ole",                    film: "Yeh Dillagi",              year: 1994, artist: "Abhijeet Bhattacharya", duration: "4:30", videoId: "M_g8G22j_9g", youtubeId: "M_g8G22j_9g" },
  { id: 29, title: "Pehla Pehla Pyar Hai",       film: "Hum Aapke Hain Koun",      year: 1994, artist: "S. P. Balasubrahmanyam", duration: "4:25", videoId: "f4G0_14m4Y0", youtubeId: "f4G0_14m4Y0" },
  { id: 30, title: "Jaana O Meri Jaana",         film: "Andaaz Apna Apna",         year: 1994, artist: "Abhijeet Bhattacharya", duration: "4:40", videoId: "5f8R0n1nN1k", youtubeId: "5f8R0n1nN1k" },

  // â€” 1995 â€”
  { id: 31, title: "Ruk Ja O Dil Deewane",       film: "Dilwale Dulhania Le Jayenge", year: 1995, artist: "Udit Narayan", duration: "5:14", videoId: "x8mY9w08wKw", youtubeId: "x8mY9w08wKw" },
  { id: 32, title: "Mere Khwabon Mein Jo Aaye",  film: "Dilwale Dulhania Le Jayenge", year: 1995, artist: "Lata Mangeshkar", duration: "4:18", videoId: "a2m3X54wQ-4", youtubeId: "a2m3X54wQ-4" },
  { id: 33, title: "Kitna Pyara Tujhe Rab Ne",   film: "Raja",                     year: 1995, artist: "Udit Narayan, Alka Yagnik", duration: "6:15", videoId: "f3120N-f4N0", youtubeId: "f3120N-f4N0" },

  // â€” 1996 â€”
  { id: 34, title: "Aaj Main Upar",              film: "Khamoshi: The Musical",    year: 1996, artist: "Kavita Krishnamurthy, Kumar Sanu", duration: "5:30", videoId: "3P_fN4P74M0", youtubeId: "3P_fN4P74M0" },
  { id: 35, title: "Aaye Ho Meri Zindagi Mein",  film: "Raja Hindustani",          year: 1996, artist: "Udit Narayan", duration: "6:02", videoId: "e_sK0X0F_40", youtubeId: "e_sK0X0F_40" },
  { id: 36, title: "Pardesi Pardesi",            film: "Raja Hindustani",          year: 1996, artist: "Udit Narayan, Alka Yagnik", duration: "7:31", videoId: "W5lusYuAW0s", youtubeId: "W5lusYuAW0s" },

  // â€” 1997 â€”
  { id: 37, title: "Sona Kitna Sona Hai",        film: "Hero No. 1",               year: 1997, artist: "Udit Narayan, Poornima", duration: "4:50", videoId: "G8F2-f8w-40", youtubeId: "G8F2-f8w-40" },
  { id: 38, title: "Ek Din Aap",                 film: "Hero No. 1",               year: 1997, artist: "Kumar Sanu, Alka Yagnik", duration: "4:30", videoId: "1w2m4P5q0k8", youtubeId: "1w2m4P5q0k8" },
  { id: 39, title: "Ye Dil Deewana",             film: "Pardes",                   year: 1997, artist: "Sonu Nigam", duration: "7:00", videoId: "s3e3F1N5A4k", youtubeId: "s3e3F1N5A4k" },
  { id: 40, title: "Do Dil Mil Rahe Hain",       film: "Pardes",                   year: 1997, artist: "Kumar Sanu", duration: "6:35", videoId: "m8A2x0g5f9k", youtubeId: "m8A2x0g5f9k" },
  { id: 41, title: "Meri Mehbooba",              film: "Pardes",                   year: 1997, artist: "Kumar Sanu, Alka Yagnik", duration: "4:55", videoId: "1x9M8A7k6q5", youtubeId: "1x9M8A7k6q5" },

  // â€” 1998 â€”
  { id: 42, title: "Mere Mehboob Mere Sanam",    film: "Duplicate",                year: 1998, artist: "Udit Narayan, Alka Yagnik", duration: "6:58", videoId: "P3fN4M2_X4g", youtubeId: "P3fN4M2_X4g" },
  { id: 43, title: "Ladki Badi Anjani Hai",      film: "Kuch Kuch Hota Hai",       year: 1998, artist: "Kumar Sanu, Alka Yagnik", duration: "6:23", videoId: "m1g2x4g0k8M", youtubeId: "m1g2x4g0k8M" },
  { id: 44, title: "Tujhe Yaad Na Meri Aayi",    film: "Kuch Kuch Hota Hai",       year: 1998, artist: "Udit Narayan, Alka Yagnik", duration: "7:05", videoId: "HeFM4VFZL1M", youtubeId: "HeFM4VFZL1M" },

  // â€” 2000 â€”
  { id: 45, title: "Chand Sitare",               film: "Kaho Naa... Pyaar Hai",    year: 2000, artist: "Kumar Sanu", duration: "6:30", videoId: "5N1m2g3P4q0", youtubeId: "5N1m2g3P4q0" },
  { id: 46, title: "Ek Pal Ka Jeena",            film: "Kaho Naa... Pyaar Hai",    year: 2000, artist: "Lucky Ali", duration: "6:36", videoId: "aGbPyM6lzBs", youtubeId: "aGbPyM6lzBs" },
  { id: 47, title: "Na Tum Jano Na Hum",         film: "Kaho Naa... Pyaar Hai",    year: 2000, artist: "Lucky Ali", duration: "6:18", videoId: "P1m2g3x4f5k", youtubeId: "P1m2g3x4f5k" },
  { id: 48, title: "Dil Ne Yeh Kaha Hai Dil Se", film: "Dhadkan",                  year: 2000, artist: "Sonu Nigam, Alka Yagnik", duration: "7:06", videoId: "-QcF-aPEtRU", youtubeId: "-QcF-aPEtRU" },

  // â€” 2001 â€”
  { id: 49, title: "Tere Naam",                  film: "Tere Naam",                year: 2001, artist: "Udit Narayan, Alka Yagnik", duration: "6:33", videoId: "6f9N0M1g2X3", youtubeId: "6f9N0M1g2X3" },
  { id: 50, title: "Kyun Ho Gaya Na",            film: "Kyun Ho Gaya Na",          year: 2001, artist: "Shankar Mahadevan, Shaan", duration: "5:20", videoId: "2x3P4f5g6N0", youtubeId: "2x3P4f5g6N0" },

  // â€” 2002 â€”
  { id: 51, title: "Mere Yaar Ki Shaadi Hai",    film: "Mere Yaar Ki Shaadi Hai",  year: 2002, artist: "Udit Narayan, Alka Yagnik", duration: "5:42", videoId: "3f4N5g6P7k8", youtubeId: "3f4N5g6P7k8" },
  { id: 52, title: "Mujhse Dosti Karoge",        film: "Mujhse Dosti Karoge",      year: 2002, artist: "Asha Bhosle, Udit Narayan", duration: "5:03", videoId: "4g5P6N7m8X9", youtubeId: "4g5P6N7m8X9" },
  { id: 53, title: "Yeh Dil Aashiqana",          film: "Yeh Dil Aashiqana",        year: 2002, artist: "Kumar Sanu, Alka Yagnik", duration: "5:35", videoId: "5f6N7P8m9X0", youtubeId: "5f6N7P8m9X0" },

  // â€” 2003 â€”
  { id: 54, title: "Dil Ka Rishta",              film: "Dil Ka Rishta",            year: 2003, artist: "Kumar Sanu, Alka Yagnik", duration: "5:00", videoId: "6g7N8P9m0X1", youtubeId: "6g7N8P9m0X1" },
  { id: 55, title: "Saathiya",                   film: "Saathiya",                 year: 2002, artist: "Sonu Nigam", duration: "5:57", videoId: "7f8N9P0m1X2", youtubeId: "7f8N9P0m1X2" },
];

export const playlists: Playlist[] = [
  {
    id: "90s-romance",
    name: "90s Romantic Hits",
    description: "The golden era of Indian romantic duets and iconic film melodies.",
    tracks: songs.slice(0, 22),
  },
  {
    id: "golden-era",
    name: "Golden 90s Melodies",
    description: "Blockbuster tracks from 1994 to 1998 that defined a generation.",
    tracks: songs.slice(22, 44),
  },
  {
    id: "2000s-nostalgia",
    name: "Millennium Nostalgia",
    description: "Heartwarming hits from the turn of the millennium (2000â€“2003).",
    tracks: songs.slice(44),
  },
];

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/* ==========================================================================
   MODULE-SCOPE SUB-COMPONENTS (PREVENTS RE-MOUNTING ON STATE TICKS)
   ========================================================================== */

// 1. Clock Component
const Clock = () => {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  const parts = timeStr.match(/^(\d+)(:)(\d+)(\s*[AP]M)?$/i);

  return (
    <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide text-white/90 flex items-center gap-1 shadow-lg backdrop-blur-md">
      <span className="text-amber-400 font-semibold text-[10px] uppercase tracking-wider mr-1">IST</span>
      {parts ? (
        <>
          <span>{parts[1]}</span>
          <span className="animate-blink text-amber-400 font-bold">:</span>
          <span>{parts[3]}</span>
          {parts[4] && <span className="text-[10px] text-white/70 ml-0.5">{parts[4].trim()}</span>}
        </>
      ) : (
        <span>{timeStr}</span>
      )}
    </div>
  );
};

// 2. Live Listeners Badge
const LiveListeners = ({ count }: { count: number }) => {
  return (
    <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 flex items-center gap-2 shadow-lg backdrop-blur-md">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="font-mono text-emerald-300 font-semibold">{count.toLocaleString("en-IN")}</span>
      <span className="text-white/70 hidden sm:inline text-[11px]">listening</span>
    </div>
  );
};

// 3. Spinning Vinyl Disc
interface VinylDiscProps {
  size: "sm" | "lg";
  isPlaying: boolean;
}

const VinylDisc = ({ size, isPlaying }: VinylDiscProps) => {
  const dimensions = size === "lg" ? "w-[80px] h-[80px]" : "w-[64px] h-[64px]";

  return (
    <div className={`relative ${dimensions} flex-shrink-0 rounded-full shadow-2xl group`}>
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 border border-white/20 overflow-hidden ${
          isPlaying ? "animate-spin-vinyl" : ""
        }`}
        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
      >
        <div className="absolute inset-1 rounded-full border border-white/10" />
        <div className="absolute inset-3 rounded-full border border-white/5" />
        <div className="absolute inset-5 rounded-full border border-white/10" />

        <div className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex items-center justify-center p-0.5 border border-white/30 shadow-inner">
          <div className="w-full h-full rounded-full border border-amber-300/40 flex items-center justify-center">
            <span className="text-[6px] text-amber-100 font-bold uppercase tracking-widest text-center leading-none">
              90s
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-black/80 ring-2 ring-white/40 shadow-inner z-10 pointer-events-none" />
    </div>
  );
};

// 4. Touch-Safe Seek Bar
interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
}

const SeekBar = ({ currentTime, duration, onSeek }: SeekBarProps) => {
  const percentage = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));
    onSeek(ratio * duration);
  };

  return (
    <div
      className="group py-2.5 -my-2.5 cursor-pointer touch-none relative flex items-center w-full"
      onPointerDown={handlePointer}
    >
      <div className="h-6 w-full absolute inset-0 -top-1.5" />
      <div className="h-[3px] w-full bg-white/15 rounded-full relative overflow-hidden flex-1">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className="absolute w-3.5 h-3.5 rounded-full bg-amber-400 border border-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -translate-x-1/2"
        style={{ left: `${percentage}%` }}
      />
    </div>
  );
};

        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden text-white font-sans">
      {/* 1. Fixed Background Image */}
      <div className="fixed inset-0 -z-20 hero-bg bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* 2. Fixed Grain SVG Overlay */}
      <svg className="fixed inset-0 -z-10 h-full w-full pointer-events-none mix-blend-overlay opacity-30">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* 3. Fixed Top Row (Clock, Title, Listeners, Playlist Modal Trigger) */}
      <header className="fixed top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] right-[max(1rem,env(safe-area-inset-right))] z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <Clock />
        </div>

        <div className="pointer-events-auto flex flex-col items-center gap-1">
          <div className="glass-panel px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent tracking-wide">
              à¤¸à¥à¤°à¥‹à¤‚ à¤•à¥€ à¤¦à¥à¤•à¤¾à¤¨
            </span>
          </div>
          <LiveListeners count={listenersCount} />
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setShowDrawer(true)}
            className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 hover:text-white hover:bg-white/20 transition-all shadow-lg flex items-center gap-1.5"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <path d="M4 6h16M4 12h16M4 18h10" />
            </svg>
            <span className="hidden sm:inline">Songs</span>
          </button>
        </div>
      </header>

       {/* Top Centre: Logo Badge with Image & Live Count */}
<div className="pointer-events-auto flex flex-col items-center gap-1">
  <div className="glass-panel px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-white/20 flex items-center justify-center">
    <img 
      src="/logo.png" 
      alt="सुरों की दुकान" 
      className="h-8 sm:h-11 w-auto object-contain drop-shadow-[0_2px_12px_rgba(245,158,11,0.6)]" 
      onError={(e) => {
        // अगर logo.png ना मिले तो ऑटोमैटिक सुनहरे टेक्स्ट में बदल जाएगा
        e.currentTarget.style.display = 'none';
        const fallback = e.currentTarget.nextElementSibling;
        if (fallback) fallback.classList.remove('hidden');
      }}
    />
    <span className="hidden text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent tracking-wide">
      सुरों की दुकान
    </span>
  </div>
  <LiveListeners count={listenersCount} />
</div>

      {/* Visible YouTube Player Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden p-3 border border-white/20">
            <div className="flex justify-between items-center pb-2 px-1">
              <span className="text-xs font-medium text-amber-300 truncate">
                {currentTrack.title} â€” {currentTrack.film}
              </span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-white/60 hover:text-white text-xs font-mono"
              >
                Close âœ•
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden shadow-inner">
              <div id="youtube-player-element" className="w-full h-full" />
            </div>
          </div>
        </div>
      )}

      {/* Hidden container when video modal is closed */}
      <div className={showVideoModal ? "hidden" : "fixed -bottom-96 opacity-0 pointer-events-none"}>
        <div id="youtube-player-element" />
      </div>

      {/* 4. Bottom Anchored Player */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl z-30">
        {/* DESKTOP PLAYER */}
        <div className="hidden sm:flex glass-panel rounded-full p-3 pr-5 items-center gap-4 border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]">
          <div onClick={() => setShowVideoModal(true)} className="cursor-pointer" title="Click to view video">
            <VinylDisc size="lg" isPlaying={isPlaying} />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-white truncate leading-tight">
                  {currentTrack.title}
                </h3>
                <p className="text-[12.5px] text-white/70 truncate leading-tight mt-0.5">
                  {currentTrack.artist} â€¢ <span className="italic">{currentTrack.film}</span> ({currentTrack.year})
                </p>
              </div>
              <button
                onClick={() => setShowVideoModal(true)}
                className="text-[10px] font-mono px-2 py-1 rounded bg-white/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
              >
                VIDEO ðŸŽ¬
              </button>
            </div>

            <div className="mt-2">
              <SeekBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
            </div>

            <div className="flex justify-between text-[10.5px] font-mono text-white/60 tabular-nums mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <button
              onClick={handlePrevTrack}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="Previous Track"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-11 h-11 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 ring-1 ring-white/25 shadow-[0_4px_20px_rgba(245,158,11,0.4)] flex items-center justify-center text-black hover:scale-105 transition-transform"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={handleNextTrack}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="Next Track"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            <button
              onClick={handleToggleMute}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors ml-1"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE PLAYER */}
        <div className="sm:hidden glass-panel rounded-[26px] p-4 flex flex-col gap-3 border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]">
          <div className="flex items-center gap-3">
            <div onClick={() => setShowVideoModal(true)} className="cursor-pointer">
              <VinylDisc size="sm" isPlaying={isPlaying} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-semibold text-white truncate leading-tight">
                {currentTrack.title}
              </h3>
              <p className="text-[12px] text-white/70 truncate leading-tight mt-0.5">
                {currentTrack.artist} â€¢ <span className="italic">{currentTrack.film}</span>
              </p>
            </div>

            <button
              onClick={() => setShowVideoModal(true)}
              className="text-[10px] font-mono px-2 py-1 rounded bg-white/10 text-amber-300 border border-amber-500/30"
            >
              ðŸŽ¬
            </button>
          </div>

          <div className="w-full">
            <SeekBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] font-mono text-white/60 tabular-nums">
              <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevTrack}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white/80 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                onClick={handleTogglePlay}
                className="w-[52px] h-[52px] rounded-full bg-gradient-to-b from-amber-400 to-amber-600 ring-1 ring-white/25 shadow-[0_4px_20px_rgba(245,158,11,0.4)] flex items-center justify-center text-black active:scale-95"
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white/80 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <TrackDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        activePlaylist={activePlaylist}
        onSelectPlaylist={handlePlaylistChange}
        currentTrack={currentTrack}
        onSelectTrack={(idx) => setCurrentTrackIndex(idx)}
      />
    </main>
  );
            }
