import { LayoutGrid, Trophy, Sun } from 'lucide-react';

const Header = ({ viewMode, setViewMode }) => {
    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-center sm:text-left group cursor-default">
                        <div className="p-2 bg-gradient-to-br from-brand-500 to-accent-purple rounded-lg shadow-lg group-hover:shadow-brand-500/30 transition-shadow duration-300">
                            <Sun className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-brand-800 to-brand-600">
                                Weather Comfort
                            </h1>
                            <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">Analytics Dashboard</p>
                        </div>
                    </div>

                    <div className="flex p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-inner">
                        <button
                            onClick={() => setViewMode('podium')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${viewMode === 'podium'
                                ? 'bg-white text-brand-600 shadow-sm ring-1 ring-black/5 scale-[1.02]'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-black/5'
                                }`}
                        >
                            <Trophy className={`w-4 h-4 ${viewMode === 'podium' ? 'text-brand-500' : ''}`} />
                            Podium View
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${viewMode === 'grid'
                                ? 'bg-white text-brand-600 shadow-sm ring-1 ring-black/5 scale-[1.02]'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-black/5'
                                }`}
                        >
                            <LayoutGrid className={`w-4 h-4 ${viewMode === 'grid' ? 'text-brand-500' : ''}`} />
                            Grid View
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
