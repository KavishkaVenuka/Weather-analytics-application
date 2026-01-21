import { getScoreColor } from '../utils/scoreUtils';

const ListView = ({ cities }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Rankings</h2>
                <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="space-y-3">
                {cities.map((city) => {
                    const colors = getScoreColor(city.score);

                    return (
                        <div
                            key={city.id}
                            className="bg-white/60 backdrop-blur-md rounded-xl border border-white/40 p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 group"
                        >
                            <div className="flex items-center gap-6 w-full sm:w-auto">
                                {/* Visual Rank Badge */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-gray-600 group-hover:scale-110 transition-transform">
                                    {city.rank}
                                </div>

                                {/* City Info */}
                                <div className="min-w-[120px]">
                                    <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{city.name}</h3>
                                    <p className="text-sm text-gray-500 uppercase font-medium">{city.country}</p>
                                </div>

                                {/* Vertical Divider - Hidden on Mobile */}
                                <div className="hidden sm:block w-px h-10 bg-gray-200/60"></div>

                                {/* Temperature */}
                                <div className="text-center min-w-[100px] hidden sm:block">
                                    <div className="text-xl font-bold text-rose-500">{city.temp}°C</div>
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Temperature</div>
                                </div>

                                {/* Vertical Divider - Hidden on Mobile */}
                                <div className="hidden sm:block w-px h-10 bg-gray-200/60"></div>

                                {/* Condition */}
                                <div className="text-center min-w-[120px] hidden sm:block">
                                    <div className="text-sky-500 font-bold truncate px-2">{city.description}</div>
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Condition</div>
                                </div>
                            </div>

                            {/* Mobile Only: Temp & Condition Row */}
                            <div className="flex sm:hidden w-full justify-between items-center bg-gray-50/50 rounded-lg p-3">
                                <div>
                                    <span className="text-gray-400 text-[10px] uppercase font-bold">Temp</span>
                                    <div className="font-bold text-rose-500">{city.temp}°C</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-400 text-[10px] uppercase font-bold">Condition</span>
                                    <div className="font-bold text-sky-500">{city.description}</div>
                                </div>
                            </div>

                            {/* Vertical Divider - Hidden on Mobile */}
                            <div className="hidden sm:block w-px h-10 bg-gray-200/60"></div>

                            {/* Score Badge */}
                            <div className="text-center min-w-[100px] w-full sm:w-auto">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${colors.bg} ${colors.text} group-hover:scale-105 transition-transform`}>
                                    {city.score}
                                </span>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">Comfort Score</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListView;
