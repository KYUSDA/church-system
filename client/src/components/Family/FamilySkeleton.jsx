import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const FamilySkeleton = () => {
  return (
    <div className="app__work-item app__flex">
      <div className="app__work-img app__flex">
        <Skeleton height={200} width="100%" />
      </div>
      <div className="app__work-content app__flex">
        <Skeleton width="60%" height={20} />
        <Skeleton width="80%" height={15} style={{ marginTop: 10 }} />
        <div className="app__work-tag app__flex">
          <Skeleton width="40%" height={15} />
        </div>
      </div>
    </div>
  );
};

export default FamilySkeleton;
