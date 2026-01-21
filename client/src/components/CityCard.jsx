import { getScoreColor } from '../utils/scoreUtils';
import { getRankIcon } from '../utils/scoreUtils';
import { Thermometer, Wind } from 'lucide-react';

const CityCard = ({ city }) => {
    const colors = getScoreColor(city.score);
    const isTop3 = city.rank <= 3;

    return (
        <div className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">

            {/* Ambient Background Glow */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${colors.bg.replace('bg-', 'from-').replace('text-', '')}/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

            {/* Top Section: Header & Score */}
            <div className="relative flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-brand-600 transition-colors duration-300">
                        {city.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{city.country}</span>
                        {isTop3 && (
                            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-200/50">
                                TOP 3
                            </span>
                        )}
                    </div>
                </div>

                {/* Score Circle */}
                <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl shadow-sm border border-white/60 ${colors.bg} ${colors.text} transform group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-xl font-black leading-none">{city.score}</span>
                    <span className="text-[9px] font-bold opacity-70 uppercase mt-0.5">Score</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="relative grid grid-cols-2 gap-3 mb-6">
                <div className="flex flex-col p-3 rounded-2xl bg-white/50 border border-white/40 hover:bg-white/80 transition-colors group/stat">
                    <div className="flex items-center gap-2 mb-2 text-rose-500 group-hover/stat:text-rose-600 transition-colors">
                        <Thermometer className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Temp</span>
                    </div>
                    <span className="text-xl font-bold text-gray-700">{city.temp}°</span>
                </div>

                <div className="flex flex-col p-3 rounded-2xl bg-white/50 border border-white/40 hover:bg-white/80 transition-colors group/stat">
                    <div className="flex items-center gap-2 mb-2 text-sky-500 group-hover/stat:text-sky-600 transition-colors">
                        <Wind className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Cond</span>
                    </div>
                    <span className="text-sm font-bold text-gray-700 truncate" title={city.description}>
                        {city.description}
                    </span>
                </div>
            </div>

            {/* Footer: Rank & Progress */}
            <div className="relative pt-5 border-t border-gray-100/60">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                        {isTop3 ? getRankIcon(city.rank, "w-5 h-5") : <span className="text-gray-400 font-bold text-sm">#</span>}
                        <span className="font-bold text-sm">Rank {city.rank}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">Comfort</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-gray-100/80 rounded-full overflow-hidden p-[2px]">
                    <div
                        className={`h-full rounded-full ${colors.progress} shadow-sm group-hover:shadow-md transition-all duration-1000 ease-out`}
                        style={{ width: `${city.score}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CityCard;
