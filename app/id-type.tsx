import {
    AUTH_COLORS,
    AuthIllustration,
    FlowProgress,
} from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import { Pressable, Text, View } from '@/src/tw';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INTRO_ART = require('@/assets/images/image 1.svg');

const ID_TYPES = [
  { id: 'nin', title: 'National Identity Number (NIN) Card' },
  { id: 'passport', title: 'Nigerian / International Passport' },
  { id: 'driver', title: "Driver's Licence" },
];

export default function IdTypeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ screen?: string | string[] }>();
  const screen = Array.isArray(params.screen) ? params.screen[0] : params.screen;
  const [selected, setSelected] = React.useState<string | null>(
    screen === 'choose' ? 'nin' : null
  );

  if (screen !== 'choose') {
    return (
      <Screen className="bg-white" safe={false}>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top + 8,
            paddingBottom: Math.max(insets.bottom, 24) + 8,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ paddingTop: 24 }}>
            <Text
              className="font-inter font-extrabold text-center"
              style={{ color: AUTH_COLORS.ink, fontSize: 24, lineHeight: 30 }}
            >
              Verify Your Identity
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#3F3A66', fontSize: 15, lineHeight: 22, marginTop: 8 }}
            >
              Takes 3-5 minutes. You&apos;ll only do{'\n'}this once.
            </Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 28 }}>
            <AuthIllustration height={250} source={INTRO_ART} width={224} />
          </View>

          <Text
            className="font-inter font-extrabold"
            style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 20, marginTop: 18 }}
          >
            What you need:
          </Text>

          <View style={{ gap: 12, marginTop: 14 }}>
            <ChecklistItem text="Government-issued ID." />
            <ChecklistItem text="Good lighting for your selfie." />
            <ChecklistItem text="About 5 minutes of your time." />
          </View>

          <InfoNotice />

          <View style={{ gap: 12, marginTop: 'auto' }}>
            <KycPrimaryButton
              label="Let's Begin"
              onPress={() => router.replace('/id-type?screen=choose')}
            />
            <KycSecondaryButton
              label="Not now"
              onPress={() => router.replace('/(tabs)?mode=full')}
            />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen className="bg-white" safe={false}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 8,
          paddingBottom: Math.max(insets.bottom, 24) + 8,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ height: 40, justifyContent: 'center' }}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace('/id-type')}
            style={{ height: 40, justifyContent: 'center', width: 40 }}
          >
            <MaterialCommunityIcons color={AUTH_COLORS.ink} name="arrow-left" size={24} />
          </Pressable>
        </View>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <FlowProgress current={1} />
        </View>

        <Text
          className="font-inter font-extrabold text-center"
          style={{ color: AUTH_COLORS.ink, fontSize: 24, lineHeight: 30, marginTop: 30 }}
        >
          Choose Your ID Type
        </Text>

        <View style={{ gap: 10, marginTop: 28 }}>
          {ID_TYPES.map((item) => {
            const active = selected === item.id;

            return (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => setSelected(item.id)}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderColor: active ? AUTH_COLORS.navy : '#E9E7F1',
                  borderCurve: 'continuous',
                  borderRadius: 16,
                  borderWidth: active ? 1.5 : 1,
                  flexDirection: 'row',
                  minHeight: 62,
                  paddingHorizontal: 16,
                }}
              >
                <MaterialCommunityIcons
                  color={active ? AUTH_COLORS.navy : '#2C2558'}
                  name={active ? 'check-circle-outline' : 'radiobox-blank'}
                  size={24}
                />
                <Text
                  className="font-inter"
                  style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 22, marginLeft: 12 }}
                >
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: 22 }}>
          <KycPrimaryButton
            disabled={!selected}
            label="Continue"
            onPress={() => router.push('/capture')}
          />
        </View>
      </View>
    </Screen>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <View
        style={{
          alignItems: 'center',
          borderColor: AUTH_COLORS.ink,
          borderRadius: 6,
          borderWidth: 1.5,
          height: 22,
          justifyContent: 'center',
          width: 22,
        }}
      >
        <MaterialCommunityIcons color={AUTH_COLORS.ink} name="check" size={16} />
      </View>
      <Text
        className="font-inter"
        style={{ color: '#2C2558', fontSize: 16, lineHeight: 22, marginLeft: 10 }}
      >
        {text}
      </Text>
    </View>
  );
}

function InfoNotice() {
  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: '#E7E4EF',
        borderCurve: 'continuous',
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 18,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          borderColor: AUTH_COLORS.ink,
          borderRadius: 999,
          borderWidth: 1.5,
          height: 26,
          justifyContent: 'center',
          width: 26,
        }}
      >
        <MaterialCommunityIcons color={AUTH_COLORS.ink} name="shield-check-outline" size={16} />
      </View>
      <Text
        className="font-inter"
        style={{
          color: '#312C59',
          flex: 1,
          fontSize: 12,
          lineHeight: 16,
          marginLeft: 12,
        }}
      >
        Your documents are never stored on Vaulta servers. Only a verified credential is saved -
        encrypted, on this device.
      </Text>
    </View>
  );
}

function KycPrimaryButton({
  disabled = false,
  label,
  onPress,
}: {
  disabled?: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: disabled ? '#B1AEC9' : AUTH_COLORS.navy,
        borderCurve: 'continuous',
        borderRadius: 14,
        height: 52,
        justifyContent: 'center',
      }}
    >
      <Text
        className="font-inter font-extrabold"
        style={{ color: '#FFFFFF', fontSize: 18, lineHeight: 22 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function KycSecondaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: AUTH_COLORS.navy,
        borderCurve: 'continuous',
        borderRadius: 14,
        borderWidth: 1,
        height: 52,
        justifyContent: 'center',
      }}
    >
      <Text
        className="font-inter font-extrabold"
        style={{ color: AUTH_COLORS.navy, fontSize: 18, lineHeight: 22 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
