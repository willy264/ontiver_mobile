import React, { useEffect } from 'react';
import { View, Text, Pressable, MotiView, MotiText, AnimatedView } from '@/src/tw';
import { Screen } from '@/components/screen';
import { useSharedValue, useAnimatedStyle, withTiming, Easing, withRepeat } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

const STEPS = [
  { text: 'Look straight ahead', icon: 'face.dashed' },
  { text: 'Turn slightly left', icon: 'arrow.turn.down.left' },
  { text: 'Turn slightly right', icon: 'arrow.turn.down.right' },
  { text: 'Smile!', icon: 'face.smiling' },
  { text: 'Analyzing...', icon: 'sparkles' },
];

export default function LivenessScreen() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const progress = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => ({
    borderWidth: 8,
    borderColor: '#6C3FF5',
    borderRadius: 150,
    width: 280,
    height: 280,
    position: 'absolute' as const,
    borderTopColor: 'transparent',
    borderRightColor: step === 4 ? '#6C3FF5' : 'transparent',
    borderBottomColor: step === 4 ? '#6C3FF5' : 'transparent',
    transform: [{ rotate: `${progress.value * 360}deg` }],
  }));

  useEffect(() => {
    if (step < 4) {
      const timer = setTimeout(() => setStep(s => s + 1), 3000);
      return () => clearTimeout(timer);
    } else {
      progress.value = withRepeat(withTiming(1, { duration: 1500, easing: Easing.linear }), -1, false);
      const timer = setTimeout(() => router.replace('/(tabs)'), 4000);
      return () => clearTimeout(timer);
    }
  }, [progress, router, step]);

  return (
    <Screen className="bg-slate-900 flex-1">
      <View className="px-6 pt-12 flex-row items-center mb-10">
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center bg-white/10 rounded-full">
          <IconSymbol name="chevron.left" size={20} color="white" />
        </Pressable>
        <View className="flex-1 ml-4">
          <View className="h-1.5 bg-white/20 rounded-full w-full overflow-hidden flex-row">
            <View className="bg-brand-violet w-full h-full" />
          </View>
        </View>
      </View>

      <View className="items-center px-6 mb-8">
        <MotiText from={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-2xl font-bold mb-2 text-center">
          Liveness Check
        </MotiText>
        <Text className="text-white/60 text-center">Follow the instructions to verify it&apos;s you.</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="w-[280px] h-[280px] items-center justify-center relative">
          <AnimatedView style={ringStyle} />
          <View className="w-[260px] h-[260px] rounded-full overflow-hidden bg-slate-800 border-4 border-white/10 items-center justify-center">
            {step === 4 ? (
              <MotiView from={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full bg-brand-violet items-center justify-center">
                <IconSymbol name="checkmark.shield.fill" size={80} color="white" />
              </MotiView>
            ) : (
              <View className="items-center justify-center opacity-40">
                <IconSymbol name="person.fill" size={120} color="white" />
              </View>
            )}
          </View>
        </View>

        <MotiView key={`step-${step}`} from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} className="mt-12 items-center">
          <View className="w-16 h-16 bg-white/10 rounded-full items-center justify-center mb-4">
            <IconSymbol name={STEPS[step].icon as any} size={32} color={step === 4 ? '#A8E63D' : '#38BBFF'} />
          </View>
          <Text className="text-white text-xl font-bold">{STEPS[step].text}</Text>
        </MotiView>
      </View>
    </Screen>
  );
}
