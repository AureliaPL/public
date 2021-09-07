import React from 'react';
import {Link} from "react-router-dom";
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <section className="section">
        <div className="container">
      <h1 className="title">
        Hello World
      </h1>
      <p className="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
    </div>
  </section>
    );
};

export default Home;