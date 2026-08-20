import { Clock } from 'lucide-react';
import { useCampaign } from '../../hooks/useCampaign';

export default function BirthdayCountdown() {
  const { isActive, timeRemaining } = useCampaign();

  if (!isActive || timeRemaining.isExpired) return null;

  const padZero = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-white/85 backdrop-blur-md border border-[#DFC5FE]/60 rounded-2xl p-4 sm:p-6 shadow-lg max-w-xl mx-auto my-6 text-center">
      <div className="flex items-center justify-center space-x-2 mb-3">
        <Clock className="w-4 h-4 text-[#6DBE45]" />
        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-700">
          BIRTHDAY BASH SALE ENDS IN
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
        {/* Days */}
        <div className="bg-gradient-to-b from-[#F9F6FE] to-white border border-[#DFC5FE]/40 rounded-xl p-2 sm:p-3 shadow-inner">
          <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#6DBE45]">
            {padZero(timeRemaining.days)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Days
          </span>
        </div>

        {/* Hours */}
        <div className="bg-gradient-to-b from-[#F9F6FE] to-white border border-[#DFC5FE]/40 rounded-xl p-2 sm:p-3 shadow-inner">
          <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#6DBE45]">
            {padZero(timeRemaining.hours)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Hours
          </span>
        </div>

        {/* Mins */}
        <div className="bg-gradient-to-b from-[#F9F6FE] to-white border border-[#DFC5FE]/40 rounded-xl p-2 sm:p-3 shadow-inner">
          <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#6DBE45]">
            {padZero(timeRemaining.minutes)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Mins
          </span>
        </div>

        {/* Secs */}
        <div className="bg-gradient-to-b from-[#F9F6FE] to-white border border-[#DFC5FE]/40 rounded-xl p-2 sm:p-3 shadow-inner">
          <span className="block text-2xl sm:text-3xl font-bold font-serif text-[#6DBE45] animate-pulse">
            {padZero(timeRemaining.seconds)}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
}
