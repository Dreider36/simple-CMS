import React, { Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import tabsData from './tabs.json';

const sortedTabs = tabsData.sort((a, b) => a.order - b.order);

const LazyImports = {}
sortedTabs.forEach(tab => {
  LazyImports[tab.id] = React.lazy(() => import(`./tabs/${tab.id}`));
});

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <nav>
          <ul>
            <li><Link to="/dummyTable">Dummy Table</Link></li>
            <li><Link to="/dummyChart">Dummy Chart</Link></li>
            <li><Link to="/dummyList">Dummy List</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<DefaultTab />} />
          {sortedTabs.map(tab => (
          <Route key={tab.id} path={`/${tab.id}`} element=
          {<LazyTabRoute tab={tab}/>}
          />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function DefaultTab() {
  return <p>Default Tab Content</p>;
}

const LazyTabRoute = ({ tab }) => {
  const Component = LazyImports[tab.id]
  return (
    <Component/>
  )
};

export default App;