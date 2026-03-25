import React from 'react';
import styles from './ImportDataCard.module.css';

export interface ImportDataCardProps {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

const ImportDataCard: React.FC<ImportDataCardProps> = ({
  title,
  description,
  href,
  linkLabel,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <a
        className={styles.link}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkLabel}
      </a>
    </div>
  );
};

export default ImportDataCard;
