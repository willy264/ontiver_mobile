import {
    AUTH_COLORS,
    AuthIllustration,
    OtpBoxes,
    PrimaryAuthButton,
    StatusToast,
} from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Pressable, Text, View } from '@/src/tw';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OTP_LENGTH = 6;
const SUCCESS_CODE = '123456';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export default function OtpVerificationScreen() {
  const insets = useSafeAreaInsets();
  const inputRef = React.useRef<RNTextInput>(null);
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string | string[] }>();
  const [code, setCode] = React.useState('');
  const [secondsLeft, setSecondsLeft] = React.useState(60);
  const [hasError, setHasError] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [verified, setVerified] = React.useState(false);

  const emailParam = Array.isArray(params.email) ? params.email[0] : params.email;
  const email = emailParam || 'designerslive@gmail.com';

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  React.useEffect(() => {
    if (verified || secondsLeft === 0) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, verified]);

  React.useEffect(() => {
    if (!showToast) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [showToast]);

  const handleCodeChange = (nextValue: string) => {
    const sanitizedValue = nextValue.replace(/\D/g, '').slice(0, OTP_LENGTH);
    setCode(sanitizedValue);

    if (hasError) {
      setHasError(false);
    }
  };

  const handleVerify = () => {
    if (code.length < OTP_LENGTH) {
      return;
    }

    if (code !== SUCCESS_CODE) {
      setHasError(true);
      return;
    }

    setVerified(true);
  };

  const handleResend = () => {
    setCode('');
    setHasError(false);
    setSecondsLeft(60);
    setShowToast(true);
    inputRef.current?.focus();
  };

  if (verified) {
    return (
      <Screen className="bg-white" safe={false}>
      <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              paddingBottom: Math.max(insets.bottom, 24) + 60,
              paddingHorizontal: 24,
              paddingTop: insets.top + 24,
            }}
          >
            <AuthIllustration
              height={140}
              source={require('@/assets/images/Group 4.png')}
              width={140}
            />

            <Text
              className="font-inter font-extrabold text-center"
              style={{ color: AUTH_COLORS.navy, fontSize: 20, lineHeight: 26, marginTop: 34 }}
            >
              You have been verified
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#5B5976', fontSize: 15, lineHeight: 22, marginTop: 8 }}
            >
              Your email has been successfully confirmed. Let&apos;s secure your vault.
            </Text>

            <View style={{ marginTop: 36, width: '100%' }}>
              <PrimaryAuthButton
                label="Continue"
                onPress={() => router.replace('/biometric-setup')}
              />
            </View>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen className="bg-white" safe={false}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: insets.top + 14 }}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={{ alignItems: 'center', height: 40, justifyContent: 'center', width: 40 }}
          >
            <IconSymbol color={AUTH_COLORS.ink} name="chevron.left" size={20} />
          </Pressable>
        </View>

        <StatusToast
          message={`Code resent to ${email}`}
          onClose={() => setShowToast(false)}
          visible={showToast}
        />

        <View
          style={{
            alignItems: 'center',
            flex: 1,
            paddingBottom: Math.max(insets.bottom, 24) + 24,
            paddingHorizontal: 24,
            paddingTop: 32,
          }}
        >
          <AuthIllustration
            height={120}
            source={require('@/assets/images/all-mail 1.png')}
            width={120}
          />

          <Text
            className="font-inter font-extrabold text-center"
            style={{ color: AUTH_COLORS.ink, fontSize: 20, lineHeight: 26, marginTop: 28 }}
          >
            Check Your Email
          </Text>
          <Text
            selectable
            className="font-inter text-center"
            style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 22, marginTop: 8 }}
          >
            We sent a 6-digit code to{'\n'}
            {email}. It expires in 10 minutes
          </Text>

          <View style={{ marginTop: 26 }}>
            <OtpBoxes error={hasError} onPress={() => inputRef.current?.focus()} value={code} />
          </View>

          {hasError ? (
            <Text
              selectable
              className="font-inter"
              style={{
                alignSelf: 'flex-start',
                color: AUTH_COLORS.error,
                fontSize: 12,
                lineHeight: 16,
                marginTop: 8,
              }}
            >
              Incorrect code. Please try again
            </Text>
          ) : null}

          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 8, marginTop: 28 }}>
            <MaterialCommunityIcons color={AUTH_COLORS.ink} name="clock-outline" size={20} />
            <Text
              className="font-inter"
              style={{
                color: AUTH_COLORS.ink,
                fontSize: 15,
                fontVariant: ['tabular-nums'],
                lineHeight: 20,
              }}
            >
              {formatTime(secondsLeft)}
            </Text>
          </View>

          <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 22 }}>
            <Text
              className="font-inter"
              style={{ color: '#A2A1B6', fontSize: 15, lineHeight: 20 }}
            >
              Didn&apos;t get the code?{' '}
            </Text>
            <Pressable
              accessibilityRole="button"
              disabled={secondsLeft > 0}
              onPress={handleResend}
            >
              <Text
                className="font-inter"
                style={{
                  color: secondsLeft > 0 ? '#A2A1B6' : AUTH_COLORS.ink,
                  fontSize: 15,
                  lineHeight: 20,
                }}
              >
                Resend
              </Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 'auto', width: '100%' }}>
            <PrimaryAuthButton
              disabled={code.length < OTP_LENGTH}
              label="Verify Code"
              onPress={handleVerify}
            />
          </View>
        </View>

        <RNTextInput
          autoComplete="one-time-code"
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          onChangeText={handleCodeChange}
          ref={inputRef}
          style={{ height: 1, opacity: 0, position: 'absolute', width: 1 }}
          textContentType="oneTimeCode"
          value={code}
        />
      </View>
    </Screen>
  );
}
