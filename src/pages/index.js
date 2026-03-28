import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import Features from '@site/src/components/Features';
import About from '@site/src/components/About';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Immersive learning experience`}
      description="LEIA (Learning Enabling Intelligent Assistant) boost the learning process with immersive experiences."
      wrapperClassName="homepage"
    >
      <div className="min-h-screen bg-transparent">
        <main>
          <Hero />
          {/* 
          <Features /> 
          <About />
          */}
        </main>
      </div>
     <meta name="algolia-site-verification"  content="B4D79223C8F75C32" />
    </Layout>
  );
}
