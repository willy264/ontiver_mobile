import { View, Text, ScrollView, Pressable, Link } from '@/src/tw';
import { Screen } from '@/components/screen';
import { MotiView } from 'moti';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  return (
    <Screen className="bg-near-black">
      <ScrollView className="flex-1 px-5" contentContainerClassName="pb-10 pt-4">
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          className="flex-row justify-between items-center mb-8"
        >
          <View>
            <Text className="text-white/60 font-inter text-xs">Total Balance</Text>
            <Text className="text-white font-inter text-3xl font-extrabold">$24,560.00</Text>
          </View>
          <Pressable className="bg-brand-violet/20 p-3 rounded-full border border-brand-violet/30">
            <IconSymbol name="bell" size={24} color="#6C3FF5" />
          </Pressable>
        </MotiView>

        {/* Action Buttons */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 200, type: 'timing' }}
          className="flex-row gap-4 mb-10"
        >
          <Pressable className="flex-1 bg-brand-violet py-4 rounded-2xl flex-row justify-center items-center">
            <IconSymbol name="plus" size={20} color="white" />
            <Text className="text-white font-inter font-semibold ml-2">Add Fund</Text>
          </Pressable>
          <Pressable className="flex-1 bg-white/10 py-4 rounded-2xl flex-row justify-center items-center border border-white/5">
            <IconSymbol name="paperplane" size={20} color="white" />
            <Text className="text-white font-inter font-semibold ml-2">Transfer</Text>
          </Pressable>
        </MotiView>

        {/* My Vaults Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, type: 'timing' }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white font-inter text-xl font-bold">My Vaults</Text>
            <Text className="text-electric-cyan font-inter font-semibold">View All</Text>
          </View>

          {/* Vault Card 1 */}
          <Link href={"/vault/personal" as any} asChild>
            <Pressable className="bg-white/5 p-5 rounded-3xl border border-white/10 mb-4">
              <View className="flex-row justify-between items-start mb-6">
                <View className="bg-electric-cyan/20 p-3 rounded-2xl">
                  <IconSymbol name="lock.fill" size={24} color="#00C9D4" />
                </View>
                <View className="bg-lime-green/20 px-3 py-1 rounded-full">
                  <Text className="text-lime-green font-inter text-[10px] font-bold">ACTIVE</Text>
                </View>
              </View>
              <Text className="text-white/60 font-inter text-sm mb-1">Personal Savings</Text>
              <Text className="text-white font-inter text-2xl font-bold mb-4">$12,400.00</Text>
              <View className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <View className="h-full bg-electric-cyan w-3/4 rounded-full" />
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-white/40 font-inter text-[10px]">75% of $15,000 goal</Text>
              </View>
            </Pressable>
          </Link>

          {/* Vault Card 2 */}
          <Pressable className="bg-white/5 p-5 rounded-3xl border border-white/10">
            <View className="flex-row justify-between items-start mb-6">
              <View className="bg-amber-yellow/20 p-3 rounded-2xl">
                <IconSymbol name="airplane" size={24} color="#FFB800" />
              </View>
            </View>
            <Text className="text-white/60 font-inter text-sm mb-1">Vacation Trip</Text>
            <Text className="text-white font-inter text-2xl font-bold mb-4">$3,200.00</Text>
            <View className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <View className="h-full bg-amber-yellow w-1/4 rounded-full" />
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-white/40 font-inter text-[10px]">25% of $12,000 goal</Text>
            </View>
          </Pressable>
        </MotiView>
      </ScrollView>
    </Screen>
  );
}
