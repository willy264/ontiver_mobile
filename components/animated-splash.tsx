import React from 'react';
import { View, Text } from '@/src/tw';
import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';

export function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  return (
    <View className="flex-1 bg-near-black items-center justify-center">
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="items-center"
      >
        <LottieView
          source={{ uri: 'https://assets9.lottiefiles.com/packages/lf20_rj9idmjt.json' }} // A generic safe animation
          autoPlay
          loop={false}
          style={{ width: 200, height: 200 }}
          onAnimationFinish={onFinish}
        />
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 500 }}
        >
          <Text className="text-white font-inter text-4xl font-extrabold tracking-tighter mt-4">
            VAULTA
          </Text>
          <Text className="text-electric-cyan font-inter text-center font-semibold tracking-widest">
            SECURE ASSETS
          </Text>
        </MotiView>
      </MotiView>
    </View>
  );
}
