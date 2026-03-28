import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useVersions, useLatestVersion } from '@docusaurus/plugin-content-docs/client';

export default function VersionPage() {
  const {siteConfig} = useDocusaurusContext();
  const versions = useVersions('default');
  const latestVersion = useLatestVersion('default');
  const currentVersion = versions.find((version) => version.name === 'current');
  const pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== 'current',
  );

  return (
    <Layout
      title="Versions"
      description="LEIA documentation versions page">
      <main className="container-max section-padding">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 gradient-text">
            Documentation Versions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access previous versions of LEIA documentation or explore the upcoming changes in the latest development version.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Latest Version (Stable) */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Current version (Stable)
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This is the latest stable version of LEIA documentation. Recommended for most users.
            </p>
            <div className="flex items-center gap-4">
              <Link className="btn-primary" to={latestVersion.path}>
                Documentation
              </Link>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-500">
                {latestVersion.label}
              </span>
            </div>
          </div>

          {/* Next Version (Development) */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary-600 dark:text-primary-400">
               <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Next version (Unreleased)
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore the latest unreleased documentation. Features and details might change.
            </p>
            <div className="flex items-center gap-4">
              <Link className="btn-secondary" to={currentVersion.path}>
                Documentation (Next)
              </Link>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-500">
                Next
              </span>
            </div>
          </div>
        </div>

        {pastVersions.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Past Versions</h2>
            <div className="glass-panel rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-secondary-900/50">
                    <th className="p-4 font-bold border-b border-white/10">Version</th>
                    <th className="p-4 font-bold border-b border-white/10">Documentation</th>
                  </tr>
                </thead>
                <tbody>
                  {pastVersions.map((version) => (
                    <tr key={version.name} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 border-b border-white/5 font-medium">{version.label}</td>
                      <td className="p-4 border-b border-white/5">
                        <Link to={version.path} className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                          View Docs
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
