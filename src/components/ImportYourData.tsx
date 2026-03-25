import React from 'react';
import importYourDataImg from '../assets/images/import-your-data.png';

interface ImportYourDataProps {
  className?: string;
}

/**
 * ImportYourData — landing section that encourages users to bring their
 * existing data into the platform.
 */
const ImportYourData: React.FC<ImportYourDataProps> = ({ className }) => {
  return (
    <section className={className}>
      <img
        src={importYourDataImg}
        alt="Illustration showing data being imported into the platform"
      />
      <div>
        <h2>Import Your Data</h2>
        <p>
          Bring your existing projects, issues, and workflows into CodePilot in
          seconds. Connect your tools and we&apos;ll handle the rest.
        </p>
      </div>
    </section>
  );
};

export default ImportYourData;
