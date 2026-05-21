import React from 'react';
import { Redirect } from 'expo-router';
import { AnimatedSplash } from '@/components/animated-splash';

export default function Index() {
  const [isReady, setIsReady] = React.useState(false);

  if (!isReady) {
    return <AnimatedSplash onFinish={() => setIsReady(true)} />;
  }

  return <Redirect href="/onboarding" />;
}
