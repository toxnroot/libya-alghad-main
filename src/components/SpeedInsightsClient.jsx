// src/components/SpeedInsightsClient.js
'use client';

import dynamic from 'next/dynamic';

const SpeedInsightsDynamic = dynamic(() => import('@vercel/speed-insights/next'), { ssr: false });
const AnalyticsDynamic = dynamic(() => import('@vercel/analytics/react'), { ssr: false });

const SpeedInsightsClient = () => {
  return (
    <div>
      <SpeedInsightsDynamic />
      <AnalyticsDynamic />
    </div>
  );
};

export default SpeedInsightsClient;
