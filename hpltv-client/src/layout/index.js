import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <React.Fragment>
      {localStorage.getItem('login') === null && <Header />}
      {children}
      {localStorage.getItem('login') === null && <Footer />}
    </React.Fragment>
  );
}

export default Layout;
