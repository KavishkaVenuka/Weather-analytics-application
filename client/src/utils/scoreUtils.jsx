import { Trophy, Medal, Award } from 'lucide-react';

export const getScoreColor = (score) => {
    if (score >= 85) {
        return {
            text: 'text-green-600',
            bg: 'bg-green-50',
            progress: 'bg-green-500'
        };
    } else if (score >= 70) {
        return {
            text: 'text-yellow-600',
            bg: 'bg-yellow-50',
            progress: 'bg-yellow-500'
        };
    } else if (score >= 55) {
        return {
            text: 'text-orange-600',
            bg: 'bg-orange-50',
            progress: 'bg-orange-500'
        };
    } else {
        return {
            text: 'text-red-600',
            bg: 'bg-red-50',
            progress: 'bg-red-500'
        };
    }
};

export const getScoreBadgeColor = (score) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 55) return 'bg-orange-500';
    return 'bg-red-500';
};

export const getRankIcon = (rank, size = "w-6 h-6") => {
    if (rank === 1) return <Trophy className={`text-yellow-500 ${size}`} />;
    if (rank === 2) return <Medal className={`text-gray-400 ${size}`} />;
    if (rank === 3) return <Award className={`text-amber-700 ${size}`} />;
    return null;
};
