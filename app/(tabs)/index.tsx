import React from 'react';
import { View, Text, ScrollView, Pressable, MotiView, AnimatedView } from '@/src/tw';
import { Screen } from '@/components/screen';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay } from 'react-native-reanimated';

export default function HubScreen() {
  const progressValue = useSharedValue(0);

  React.useEffect(() => {
    progressValue.value = withDelay(500, withTiming(0.68, { duration: 1500, easing: Easing.out(Easing.cubic) }));
  }, [progressValue]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      borderWidth: 12,
      borderColor: '#6C3FF5',
      borderRadius: 100,
      width: 160,
      height: 160,
      position: 'absolute' as const,
      borderTopColor: 'transparent',
      borderRightColor: progressValue.value > 0.25 ? '#6C3FF5' : 'transparent',
      borderBottomColor: progressValue.value > 0.5 ? '#6C3FF5' : 'transparent',
      transform: [
        { rotate: `${progressValue.value * 360 - 45}deg` },
      ]
    };
  });

  return (
    <Screen className="bg-[#F5F6FA] flex-1">
      <View className="px-6 pt-12 pb-4 flex-row justify-between items-center bg-white z-10">
        <Text className="text-slate-900 font-inter font-extrabold text-2xl tracking-tight">VAULTA</Text>
        <Pressable className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
          <IconSymbol name="bell.fill" size={20} color="#0F172A" />
          <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Core Score Card */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="bg-slate-900 rounded-3xl p-6 mb-6 overflow-hidden relative"
        >
          <Text className="text-white/80 font-inter font-medium text-sm mb-6 uppercase tracking-wider">
            Privacy Score
          </Text>

          <View className="items-center justify-center my-4">
            <View className="w-[160px] h-[160px] items-center justify-center relative">
              {/* Background Ring */}
              <View className="absolute inset-0 rounded-full border-[12px] border-white/10" />
              
              {/* Animated Foreground Ring */}
              <AnimatedView style={progressStyle} />

              <View className="items-center">
                <Text className="text-white font-inter text-5xl font-black">68</Text>
                <Text className="text-white/60 font-inter text-xs mt-1">out of 100</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between items-center mt-6 pt-4 border-t border-white/10">
            <Text className="text-white/60 font-inter text-sm">Status: <Text className="text-brand-violet font-semibold">Good</Text></Text>
            <Text className="text-white/40 font-inter text-xs">Updated just now</Text>
          </View>
        </MotiView>

        {/* Notification/Alert Bar */}
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 200 }}
          className="bg-white rounded-2xl p-4 mb-8 flex-row items-center border border-slate-200"
        >
          <View className="w-10 h-10 bg-amber-100 rounded-full items-center justify-center mr-3">
            <IconSymbol name="exclamationmark.circle.fill" size={20} color="#D97706" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-900 font-bold text-base mb-0.5">2 requests pending</Text>
            <Text className="text-slate-500 text-xs">Action required to secure account</Text>
          </View>
          <View className="flex-row gap-2">
            <Pressable className="px-3 py-1.5 bg-slate-100 rounded-lg">
              <Text className="text-slate-600 font-medium text-xs">Ignore</Text>
            </Pressable>
            <Pressable className="px-3 py-1.5 bg-slate-900 rounded-lg">
              <Text className="text-white font-medium text-xs">Review</Text>
            </Pressable>
          </View>
        </MotiView>

        {/* My Credentials */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400 }}
          className="mb-8"
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 font-inter text-xl font-bold">My Credentials</Text>
            <Pressable>
              <Text className="text-brand-violet font-medium text-sm">View All</Text>
            </Pressable>
          </View>

          <Pressable className="bg-white rounded-2xl p-4 flex-row items-center border border-slate-200 mb-3">
            <View className="w-12 h-12 bg-blue-50 rounded-xl items-center justify-center mr-4">
              <IconSymbol name="person.crop.rectangle.fill" size={24} color="#007AFF" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-900 font-bold text-base mb-0.5">National ID Card</Text>
              <Text className="text-slate-500 text-xs">Added 24 Mar 2024</Text>
            </View>
            <View className="w-6 h-6 bg-blue-100 rounded-full items-center justify-center">
              <IconSymbol name="checkmark.seal.fill" size={14} color="#007AFF" />
            </View>
          </Pressable>
          
          <Pressable className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex-row items-center justify-center">
            <IconSymbol name="plus.circle.fill" size={20} color="#64748B" />
            <Text className="text-slate-600 font-semibold text-sm ml-2">Add New Credential</Text>
          </Pressable>
        </MotiView>
        
        <View className="h-10" />
      </ScrollView>
    </Screen>
  );
}
