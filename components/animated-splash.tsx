import React from 'react';
import { View, Text } from '@/src/tw';
import { MotiView } from 'moti';
import Svg, { Path } from 'react-native-svg';

export function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  React.useEffect(() => {
    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View className="flex-1 bg-[#0A0B1A] items-center justify-center relative">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 90 }}
        className="items-center"
      >
        {/* Custom VAULTA Vector Logo */}
        <Svg height="48" width="220" viewBox="0 0 180 40">
          <Path d="M 4 0 L 14 36 L 24 0" stroke="white" strokeWidth="4.5" strokeLinejoin="miter" fill="none" />
          <Path d="M 34 36 L 44 0 L 54 36" stroke="white" strokeWidth="4.5" strokeLinejoin="miter" fill="none" />
          <Path d="M 64 0 L 64 36 L 84 36 L 84 0" stroke="white" strokeWidth="4.5" strokeLinejoin="miter" fill="none" />
          <Path d="M 94 0 L 94 36 L 114 36" stroke="white" strokeWidth="4.5" strokeLinejoin="miter" fill="none" />
          <Path d="M 120 0 L 148 0 M 134 0 L 134 36" stroke="white" strokeWidth="4.5" strokeLinejoin="miter" fill="none" />
          <Path d="M 154 36 L 164 0 L 174 36" stroke="white" strokeWidth="4.5" strokeLinejoin="miter" fill="none" />
        </Svg>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 800, type: 'timing', duration: 800 }}
        className="absolute bottom-12 w-full items-center"
      >
        <Text className="text-white font-inter text-xs font-bold tracking-wide">
          Powered by Qynara
        </Text>
      </MotiView>
    </View>
  );
}
