import {
    AuthIllustration,
    PrimaryAuthButton,
    WhiteSheetCard,
} from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import { Pressable, Text, View } from '@/src/tw';
import { useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BiometricLoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Screen className="bg-[#09054F]" safe={false}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: insets.top + 26 }}>
          <Text
            className="font-inter font-extrabold"
            style={{ color: '#FFFFFF', fontSize: 20, lineHeight: 24 }}
          >
            Welcome back
          </Text>
          <Text
            className="font-inter font-extrabold"
            style={{ color: '#FFFFFF', fontSize: 30, lineHeight: 36, marginTop: 2 }}
          >
            Chris Doe
          </Text>
          <Text
            className="font-inter"
            style={{ color: '#F4F3FF', fontSize: 16, lineHeight: 21, marginTop: 8, maxWidth: 230 }}
          >
            Use your biometric to access your vault.
          </Text>
        </View>

        <WhiteSheetCard
          style={{
            marginTop: 28,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              paddingHorizontal: 24,
            }}
          >
            <AuthIllustration
              height={210}
              source={require('@/assets/images/svg8.svg')}
              width={210}
            />

            <View style={{ marginTop: 40, width: '100%' }}>
              <PrimaryAuthButton
                label="Use PIN instead"
                onPress={() => router.push('/pin-login')}
              />
            </View>

            <Pressable onPress={() => router.push('/recovery-entry')} style={{ marginTop: 30 }}>
              <Text
                className="font-inter"
                style={{ color: '#B1AFCA', fontSize: 15, lineHeight: 20 }}
              >
                Forgot PIN or lost device?
              </Text>
            </Pressable>
          </View>
        </WhiteSheetCard>
      </View>
    </Screen>
  );
}
