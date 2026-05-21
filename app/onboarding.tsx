import React from 'react';
import { View, Text, Pressable } from '@/src/tw';
import { Screen } from '@/components/screen';
import { MotiView, MotiText } from 'moti';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

const STEPS = [
  {
    title: 'Secure Your Future',
    description: 'Vaulta helps you save and grow your assets with military-grade security.',
    icon: 'lock.shield.fill',
    color: '#6C3FF5',
  },
  {
    title: 'Smart Vaults',
    description: 'Create individual vaults for your goals and track your progress in real-time.',
    icon: 'briefcase.fill',
    color: '#00C9D4',
  },
  {
    title: 'Instant Transfers',
    description: 'Send and receive assets instantly with zero fees between Vaulta users.',
    icon: 'paperplane.fill',
    color: '#A8E63D',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const router = useRouter();

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const step = STEPS[currentStep];

  return (
    <Screen className="bg-near-black">
      <View className="flex-1 justify-center px-10">
        <MotiView
          key={`icon-${currentStep}`}
          from={{ opacity: 0, scale: 0.5, rotate: '0deg' }}
          animate={{ opacity: 1, scale: 1, rotate: '360deg' }}
          transition={{ type: 'spring' }}
          className="w-32 h-32 rounded-[40px] items-center justify-center mb-12 self-center"
          style={{ backgroundColor: `${step.color}20` }}
        >
          <IconSymbol name={step.icon as any} size={64} color={step.color} />
        </MotiView>

        <MotiText
          key={`title-${currentStep}`}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="text-white font-inter text-4xl font-extrabold text-center mb-4"
        >
          {step.title}
        </MotiText>

        <MotiText
          key={`desc-${currentStep}`}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100 }}
          className="text-white/60 font-inter text-lg text-center mb-20"
        >
          {step.description}
        </MotiText>

        <View className="flex-row justify-center gap-2 mb-10">
          {STEPS.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full ${i === currentStep ? 'w-8 bg-brand-violet' : 'w-2 bg-white/20'}`}
            />
          ))}
        </View>

        <Pressable
          onPress={next}
          className="bg-brand-violet py-5 rounded-3xl items-center shadow-xl shadow-brand-violet/20"
        >
          <Text className="text-white font-inter font-bold text-lg">
            {currentStep === STEPS.length - 1 ? 'Get Started' : 'Next Step'}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
