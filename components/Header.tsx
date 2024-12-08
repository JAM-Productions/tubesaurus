import React from 'react';

function Header({title}: {title: string}) {
    return (
        <div className="mb-7 flex items-center space-x-2">
        {/* TODO: ICON */}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    );
};

export default Header;