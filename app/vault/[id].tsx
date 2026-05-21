import React from 'react';
import { View, Text, Pressable } from '@/src/tw';
import { Animated } from '@/src/tw/animated';
import { Screen } from '@/components/screen';
import { useRouter } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function VaultDetailScreen() {
  const router = useRouter();
  const translateX = useSharedValue(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0 && !isOpen) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX > 150) {
        translateX.value = withSpring(300);
        runOnJS(onOpen)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedDoorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, 200], [0, 1]),
      transform: [{ scale: interpolate(translateX.value, [0, 200], [0.8, 1]) }],
    };
  });

  return (
    <Screen className="bg-near-black">
      <View className="flex-1">
        {/* Top Header */}
        <View className="px-5 py-4 flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-4">
            <IconSymbol name="chevron.left" size={24} color="white" />
          </Pressable>
          <Text className="text-white font-inter text-xl font-bold">Personal Vault</Text>
        </View>

        <View className="flex-1 justify-center items-center px-10">
          {/* Background Content (Hidden by door) */}
          <Animated.View style={animatedContentStyle} className="absolute items-center">
            <View className="bg-electric-cyan/20 p-8 rounded-full mb-6">
              <IconSymbol name="checkmark.circle.fill" size={64} color="#00C9D4" />
            </View>
            <Text className="text-white font-inter text-3xl font-extrabold mb-2">Unlocked</Text>
            <Text className="text-white/60 font-inter text-center mb-10">
              You have successfully accessed your personal savings vault.
            </Text>
            <View className="bg-white/10 p-6 rounded-3xl border border-white/10 w-full">
              <Text className="text-white/40 text-xs mb-1">Available Balance</Text>
              <Text className="text-white text-4xl font-extrabold">$12,400.00</Text>
            </View>
          </Animated.View>

          {/* Vault Door (Gesture layer) */}
          {!isOpen && (
            <GestureDetector gesture={gesture}>
              <Animated.View
                style={animatedDoorStyle}
                className="w-full h-[400px] bg-brand-violet rounded-[40px] items-center justify-center shadow-2xl z-10"
              >
                <View className="w-24 h-24 rounded-full border-4 border-white/20 items-center justify-center mb-6">
                  <View className="w-16 h-16 rounded-full bg-white/10 items-center justify-center">
                    <IconSymbol name="lock.fill" size={32} color="white" />
                  </View>
                </View>
                <Text className="text-white font-inter text-xl font-bold mb-2">Swipe to Unlock</Text>
                <View className="flex-row items-center">
                  <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.4)" />
                  <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.6)" />
                  <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.8)" />
                </View>
              </Animated.View>
            </GestureDetector>
          )}

          {isOpen && (
             <Pressable 
              onPress={() => {
                translateX.value = withSpring(0);
                setIsOpen(false);
              }}
              className="mt-10"
             >
               <Text className="text-brand-violet font-inter font-bold">Lock Vault</Text>
             </Pressable>
          )}
        </View>
      </View>
    </Screen>
  );
}
