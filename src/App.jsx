import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Lend from "../components/Lend";
import Borrow from "../components/Borrow";
import Stake from "../components/Stake";
import Portfolio from "../components/Portfolio";
import Docs from "../components/Docs";

function App() {
  return (
    <div className="min-h-screen bg-violet-900">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wonders Finance 🧙‍♂️</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="lend" element={<Lend />} />
          <Route path="borrow" element={<Borrow />} />
          <Route path="stake" element={<Stake />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="docs" element={<Docs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
