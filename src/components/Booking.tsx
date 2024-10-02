"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isFuture } from 'date-fns';

// Custom Avatar component
function Avatar({ src, alt, fallback }: { src?: string; alt?: string; fallback: string }) {
  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
      {src ? (
        <img className="w-full h-full object-cover" src={src} alt={alt || fallback} />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
          {fallback.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function BrandGrowthBooking() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1)); // October 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 9, 4)); // October 4, 2024
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (date: Date) => {
    if (isFuture(date) || isToday(date)) {
      setSelectedDate(date);
    }
  };

  const timeSlots = ['2:00pm', '2:30pm', '3:30pm'];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold mb-6">Let's Grow Your <span className="text-orange-500">Brand</span></h1>
      <div className="bg-gray-900 rounded-lg p-6 flex">
        {/* Left Section */}
        <div className="w-1/4 pr-4 border-r border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar fallback="SG" />
            <div>
              <p className="text-white font-medium">Saksham Gaur</p>
              <p className="text-gray-400 text-sm">30 Min Meeting</p>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            <p className="flex items-center mb-2">
              <span className="mr-2">⏱</span> 30m
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2">🎥</span> Zoom Video
            </p>
            <p className="flex items-center">
              <span className="mr-2">🌍</span> Asia/Kolkata ▼
            </p>
          </div>
        </div>

        {/* Middle Section (Calendar) */}
        <div className="w-1/2 px-4">
          <div className="flex justify-between items-center mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevMonth}
              className="text-gray-400 hover:text-white"
            >
              &lt;
            </motion.button>
            <h3 className="text-xl font-semibold text-white">{format(currentMonth, 'MMMM yyyy')}</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextMonth}
              className="text-gray-400 hover:text-white"
            >
              &gt;
            </motion.button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div key={day} className="text-center text-gray-500 text-xs font-medium">
                {day}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMonth.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-7 gap-1"
            >
              {days.map((day: Date) => (
                <motion.button
                  key={day.toString()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDateClick(day)}
                  disabled={!isFuture(day) && !isToday(day)}
                  className={`
                    p-2 rounded-lg text-center transition-colors text-sm
                    ${!isSameMonth(day, currentMonth) && 'text-gray-600'}
                    ${isToday(day) && 'bg-white text-gray-900'}
                    ${selectedDate && day.toDateString() === selectedDate.toDateString() && 'bg-white text-gray-900'}
                    ${(!isFuture(day) && !isToday(day)) ? 'bg-gray-800 text-gray-600' : 'bg-gray-700 text-white'}
                  `}
                >
                  {format(day, 'd')}
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="w-1/4 pl-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-white font-medium">{selectedDate ? format(selectedDate, 'EEE dd') : 'Select a date'}</p>
            <div className="flex space-x-1">
              <button
                onClick={() => setTimeFormat('12h')}
                className={`px-2 py-1 text-xs rounded ${timeFormat === '12h' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                12h
              </button>
              <button
                onClick={() => setTimeFormat('24h')}
                className={`px-2 py-1 text-xs rounded ${timeFormat === '24h' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                24h
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className="w-full p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}