import React, { useRef, useState } from 'react';
import { Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { View, Text, Pressable, AnimatedScrollView } from '@/src/tw';
import { Screen } from '@/components/screen';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, Extrapolation, useAnimatedScrollHandler, SharedValue } from 'react-native-reanimated';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 0,
    title: 'Verify Once. Share Forever',
    description: 'Stop submitting your ID over and over. Verify once and share instantly with any platform',
    image: require('@/assets/images/onboarding-3.svg'),
    buttonText: 'Get Started',
  },
  {
    id: 1,
    title: 'Your Identity. All in One Place.',
    description: 'Store your government ID, phone, address, and more — safely encrypted on your device.',
    image: require('@/assets/images/onboarding-2.svg'),
    buttonText: 'Next',
  },
  {
    id: 2,
    title: 'You Decide Who Sees What.',
    description: "Share only what's needed — nothing more. Zero-knowledge proofs protect your privacy.",
    image: require('@/assets/images/onboarding-1.svg'),
    buttonText: 'Next',
  }
];

function PaginationDot({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [16, 40, 16],
      Extrapolation.CLAMP
    );
    
    const bgColorInterpolation = scrollX.value >= (index - 0.5) * width && scrollX.value <= (index + 0.5) * width 
      ? '#0A0B1A' 
      : '#D1D5DB';

    return {
      width: widthInterpolation,
      backgroundColor: bgColorInterpolation,
    };
  });

  return (
    <Animated.View style={[{ height: 6, borderRadius: 3, marginHorizontal: 4 }, animatedStyle]} />
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  // @ts-ignore
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/register');
    }
  };

  return (
    <Screen className="bg-white flex-1" safe={true}>
      <View className="flex-1">
        <AnimatedScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onMomentumScrollEnd}
          className="flex-1"
        >
          {SLIDES.map((slide) => (
            <View key={slide.id} style={{ width }} className="flex-1 items-center justify-center px-6">
              <Image 
                source={slide.image} 
                style={{ width: '100%', height: width * 1.2 }} 
                contentFit="contain" 
              />
            </View>
          ))}
        </AnimatedScrollView>
      </View>

      <View className="px-8 pb-10 pt-4">
        {/* Text Content */}
        <View className="h-32 mb-4 justify-end">
           <Text className="text-slate-900 font-inter text-[26px] font-extrabold mb-3 leading-tight">
             {SLIDES[currentIndex].title}
           </Text>
           <Text className="text-slate-600 font-inter text-[15px] leading-6">
             {SLIDES[currentIndex].description}
           </Text>
        </View>

        {/* Action Buttons & Pagination Row */}
        <View className="flex-col">
          {/* Pagination */}
          <View className="flex-row items-center justify-center mb-8">
            {SLIDES.map((_, i) => (
              <PaginationDot key={i} index={i} scrollX={scrollX} />
            ))}
          </View>

          <Pressable
            onPress={handleNext}
            className="bg-[#0A0B1A] py-4 rounded-2xl flex-row items-center justify-center mb-6 h-[56px]"
          >
            <Text className="text-white font-inter font-bold text-lg mr-2">
              {SLIDES[currentIndex].buttonText}
            </Text>
            {currentIndex > 0 && <IconSymbol name="arrow.right" size={20} color="white" />}
          </Pressable>

          <Pressable className="items-center pb-2" onPress={() => router.push('/login')}>
            <Text className="text-slate-600 font-inter text-[15px]">
              Already have an account? <Text className="text-slate-900 font-bold">Log in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
