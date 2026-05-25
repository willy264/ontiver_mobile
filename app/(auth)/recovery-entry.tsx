import {
    AUTH_COLORS,
    AuthScreenFrame,
    PrimaryAuthButton,
    StatusBanner
} from '@/components/auth/auth-ui';
import { Pressable, Text, View } from '@/src/tw';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RecoveryMethod = 'email' | 'phrase' | null;

export default function RecoveryEntryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [method, setMethod] = React.useState<RecoveryMethod>('email');

  return (
    <AuthScreenFrame showBackButton title="">
<View style={{ flex: 1 }}>

        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20 }}>
          <Text
            className="font-inter font-extrabold"
            style={{ color: AUTH_COLORS.ink, fontSize: 20, lineHeight: 26 }}
          >
            Recover Your Account
          </Text>
          <Text
            className="font-inter"
            style={{ color: '#7D7B99', fontSize: 15, lineHeight: 20, marginTop: 6 }}
          >
            Choose a recovery method below.
          </Text>

          <View style={{ gap: 8, marginTop: 24 }}>
            <RecoveryOption
              active={method === 'email'}
              description="We'll send a code to your registered email."
              icon="email-outline"
              onPress={() => setMethod('email')}
              title="Email + Recovery Code"
            />
            <RecoveryOption
              active={method === 'phrase'}
              description="Use the phrase you saved when you set up Vaulta."
              icon="key-variant"
              onPress={() => setMethod('phrase')}
              title="12-Word Recovery Phrase"
            />
          </View>

          <View style={{ marginTop: 14 }}>
            <StatusBanner
              message="Vaulta staff will never ask for your recovery phrase or PIN. Never share them."
              tone="warning"
            />
          </View>

          <View style={{ marginTop: 'auto', paddingTop: 36 }}>
            <PrimaryAuthButton
              disabled={!method}
              label="Continue"
              onPress={() =>
                router.push(method === 'phrase' ? '/recovery-phrase' : '/recover-email')
              }
            />
          </View>
        </View>
      </View>
    </AuthScreenFrame>
  );
}

function RecoveryOption({
  active,
  description,
  icon,
  onPress,
  title,
}: {
  active: boolean;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: active ? AUTH_COLORS.navy : '#ECEAF5',
        borderCurve: 'continuous',
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 14,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <MaterialCommunityIcons color={AUTH_COLORS.ink} name={icon} size={20} />
        <Text
          className="font-inter"
          style={{ color: AUTH_COLORS.ink, flex: 1, fontSize: 16, lineHeight: 20, marginLeft: 10 }}
        >
          {title}
        </Text>
        <View
          style={{
            alignItems: 'center',
            borderColor: active ? AUTH_COLORS.navy : '#BFC1D8',
            borderRadius: 999,
            borderWidth: 1.3,
            height: 18,
            justifyContent: 'center',
            width: 18,
          }}
        >
          {active ? (
            <View style={{ backgroundColor: AUTH_COLORS.navy, borderRadius: 999, height: 8, width: 8 }} />
          ) : null}
        </View>
      </View>
      <Text
        className="font-inter"
        style={{ color: '#6B6886', fontSize: 12, lineHeight: 16, marginTop: 6 }}
      >
        {description}
      </Text>
    </Pressable>
  );
}
