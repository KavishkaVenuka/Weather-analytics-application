import { Trophy, Thermometer, CloudSun, Wind } from 'lucide-react';
import ListView from './ListView.jsx';
import { getScoreColor, getRankIcon } from '../utils/scoreUtils';

const PremiumPodiumCard = ({ city, isWinner = false, isSecond = false, isThird = false }) => {
    const colors = getScoreColor(city.score);

    // Premium Styling based on Rank
    let cardStyle = {
        bg: "bg-white/80 backdrop-blur-md",
        border: "border-white/40",
        shadow: "shadow-xl hover:shadow-2xl",
        height: "h-auto md:h-[400px]",
        transform: "hover:-translate-y-2",
        iconColor: "text-gray-400",
        glow: ""
    };

    if (isWinner) {
        cardStyle = {
            bg: "bg-gradient-to-br from-yellow-50/90 via-white/80 to-amber-50/90 backdrop-blur-lg",
            border: "border-yellow-200/60 ring-1 ring-yellow-400/30",
            shadow: "shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/30",
            height: "h-auto md:h-[460px] z-10",
            transform: "scale-105 hover:scale-110 md:-translate-y-4",
            iconColor: "text-yellow-500",
            glow: "after:absolute after:inset-0 after:bg-yellow-400/20 after:blur-3xl after:-z-10"
        };
    } else if (isSecond) {
        cardStyle = {
            bg: "bg-gradient-to-br from-slate-50/90 via-white/80 to-gray-50/90 backdrop-blur-lg",
            border: "border-gray-200/60 ring-1 ring-gray-300/30",
            shadow: "shadow-xl shadow-gray-400/20 hover:shadow-gray-400/30",
            height: "h-auto md:h-[400px]",
            transform: "hover:-translate-y-2",
            iconColor: "text-slate-400",
            glow: ""
        };
    } else if (isThird) {
        cardStyle = {
            bg: "bg-gradient-to-br from-orange-50/90 via-white/80 to-red-50/90 backdrop-blur-lg",
            border: "border-orange-200/60 ring-1 ring-orange-300/30",
            shadow: "shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30",
            height: "h-auto md:h-[400px]",
            transform: "hover:-translate-y-2",
            iconColor: "text-amber-700",
            glow: ""
        };
    }

    return (
        <div
            className={`relative w-full rounded-3xl border ${cardStyle.border} ${cardStyle.bg} ${cardStyle.shadow} ${cardStyle.height} flex flex-col p-8 transition-all duration-500 ${cardStyle.transform} group overflow-hidden`}
        >
            {/* Glow Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none`} />

            {/* Header: Rank Icon & Number */}
            <div className="relative flex flex-col items-center mb-6">
                <div className={`mb-4 p-4 rounded-full bg-white shadow-lg ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300`}>
                    {getRankIcon(city.rank, `w-12 h-12 ${cardStyle.iconColor}`)}
                </div>
                <h2 className={`font-black text-6xl tracking-tighter ${cardStyle.iconColor} opacity-20 absolute top-10 pointer-events-none scale-150`}>
                    #{city.rank}
                </h2>
            </div>

            {/* Content: City & Country */}
            <div className="relative text-center mb-8 z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">{city.name}</h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{city.country}</p>
            </div>

            {/* Footer: Stats Grid */}
            <div className="mt-auto grid grid-cols-2 gap-4 relative z-10">
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm group-hover:bg-white/80 transition-colors">
                    <Thermometer className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-900 text-lg">{city.temp}°C</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Temp</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm group-hover:bg-white/80 transition-colors">
                    <CloudSun className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-900 text-sm truncate w-full text-center px-1">{city.description}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Condition</span>
                </div>
            </div>

            {/* Score Badge (Floating) */}
            <div className={`absolute top-0 right-0 p-4`}>
                <div className={`flex items-center justify-center w-14 h-14 rounded-full font-black text-lg text-white shadow-lg ring-4 ring-white/50 backdrop-blur-sm ${city.score >= 85 ? 'bg-green-500' : city.score >= 70 ? 'bg-yellow-500' : 'bg-orange-500'} group-hover:scale-110 transition-transform duration-300`}>
                    {city.score}
                </div>
            </div>
        </div>
    );
};

const PodiumView = ({ topCities, otherCities }) => {
    // Sort logic to ensure correct visual order: 2 (Left), 1 (Center), 3 (Right)
    const rank1 = topCities.find(c => c.rank === 1);
    const rank2 = topCities.find(c => c.rank === 2);
    const rank3 = topCities.find(c => c.rank === 3);

    return (
        <div className="container mx-auto max-w-6xl px-4">
            {/* Hero Section */}
            <div className="text-center mb-16 pt-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 font-semibold text-sm mb-6 border border-brand-100 shadow-sm">
                    <Trophy className="w-4 h-4" />
                    <span> Comfort Index Score</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-brand-800 to-gray-900 tracking-tight mb-4">
                    Top 3 Cities
                </h2>
            </div>

            {/* Responsive Podium Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-end mb-24 px-4 md:px-0 relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-brand-500/5 blur-3xl rounded-full -z-10" />

                {/* Rank 2 - Left */}
                <div className="order-2 md:order-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {rank2 && <PremiumPodiumCard city={rank2} isSecond={true} />}
                </div>

                {/* Rank 1 - Center */}
                <div className="order-1 md:order-2 animate-slide-up" style={{ animationDelay: '0s' }}>
                    {rank1 && <PremiumPodiumCard city={rank1} isWinner={true} />}
                </div>

                {/* Rank 3 - Right */}
                <div className="order-3 md:order-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {rank3 && <PremiumPodiumCard city={rank3} isThird={true} />}
                </div>
            </div>

            {/* Divider */}
            <div className="relative flex py-8 items-center mb-12">
                <div className="flex-grow border-t border-gray-200/60"></div>
                <span className="flex-shrink-0 mx-6 text-gray-400 uppercase tracking-widest text-xs font-bold bg-slate-50 px-4">Full Rankings</span>
                <div className="flex-grow border-t border-gray-200/60"></div>
            </div>

            {/* Remaining Cities */}
            <div className="mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <ListView cities={otherCities} />
            </div>
        </div>
    );
};

export default PodiumView;
