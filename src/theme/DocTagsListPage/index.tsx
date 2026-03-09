import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import { useDocsVersion, useVersions } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

interface TagItem {
  label: string;
  permalink: string;
  count: number;
}

interface Props {
  tags: TagItem[];
}

export default function DocTagsListPage({ tags }: Props): React.ReactElement {
  useColorMode();
  const currentVersion = useDocsVersion();
  const versions = useVersions('default');

  const sortedByCount = useMemo(() => [...tags].sort((a, b) => b.count - a.count), [tags]);
  const counts = tags.map((t) => t.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  const totalDocs = useMemo(() => tags.reduce((sum, t) => sum + t.count, 0), [tags]);
  const topTag = sortedByCount[0];

  const getSize = (count: number): number => {
    if (max === min) return 1.15;
    return 1.0 + ((count - min) / (max - min)) * 1.1;
  };

  const getWeight = (count: number): number => {
    if (max === min) return 600;
    const ratio = (count - min) / (max - min);
    return ratio > 0.66 ? 700 : ratio > 0.33 ? 600 : 500;
  };

  const alphaGroups: [string, TagItem[]][] = useMemo(() => {
    const groups: Record<string, TagItem[]> = {};
    const validTags = tags.filter((t) => t?.label);
    for (const tag of [...validTags].sort((a, b) => a.label.localeCompare(b.label))) {
      const letter = tag.label[0]?.toUpperCase() ?? '#';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(tag);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [tags]);

  return (
    <div className={styles.page}>

      {/* ── Header ───────────────────────────── */}
      <div className={styles.header}>
        <h1 className={styles.title}>Tag Cloud</h1>
        <p className={styles.subtitle}>
          Browse documentation by topic — larger tags appear in more docs.
        </p>

        {/* ── Version switcher ──────────────── */}
        <div className={styles.versionSwitcher}>
          {versions.map((v) => (
            <Link
              key={v.name}
              to={`${v.path}/tags`}
              className={`${styles.versionBtn} ${v.name === currentVersion.version ? styles.versionBtnActive : ''}`}
            >
              {v.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Stats ────────────────────────────── */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{tags.length}</span>
          <span className={styles.statLabel}>Unique Tags</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{totalDocs}</span>
          <span className={styles.statLabel}>Tagged Docs</span>
        </div>
        {topTag && (
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{ fontSize: '1.2rem' }}>
              #{topTag.label}
            </span>
            <span className={styles.statLabel}>Most Used · {topTag.count} docs</span>
          </div>
        )}
      </div>

      {/* ── Cloud ────────────────────────────── */}
      <div className={styles.cloud}>
        {sortedByCount.map((tag) => (
          <Link
            key={tag.permalink}
            to={tag.permalink}
            className={styles.tag}
            style={{ fontSize: `${getSize(tag.count)}rem`, fontWeight: getWeight(tag.count) }}
          >
            {tag.label}
            <span className={styles.tagCount}>{tag.count}</span>
          </Link>
        ))}
      </div>

      <p className={styles.cloudNote}>{tags.length} tags · sorted by frequency</p>

      {/* ── Alphabetical list ─────────────────── */}
      <div className={styles.alphaSection}>
        <h2 className={styles.alphaTitle}>All Tags</h2>
        <div className={styles.alphaDivider} />
        {alphaGroups.map(([letter, groupTags]) => (
          <div key={letter} className={styles.alphaRow}>
            <span className={styles.alphaLetter}>{letter}</span>
            <div className={styles.alphaList}>
              {groupTags.map((tag) => (
                <Link key={tag.permalink} to={tag.permalink} className={styles.alphaTag}>
                  {tag.label}
                  <span className={styles.alphaCount}>{tag.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
