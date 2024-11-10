import React from 'react';

const pagewrapper = ({ children, className = '' }) => {
    return (
        <div className={`page-wrapper ${className}`}>
            {children}
        </div>
    );
};

export default pagewrapper;
