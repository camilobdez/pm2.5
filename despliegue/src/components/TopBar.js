import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <nav>
        <Link to="/" className="title">PM 2.5 預測器</Link>
    </nav>
  );
};

export default TopBar;