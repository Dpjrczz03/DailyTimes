import React from 'react';
import SkeletonCard from './SkeletonCard';

const NewsSkeleton = () => {
    return (
        <div className="news-grid">
            {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};

export default NewsSkeleton;
