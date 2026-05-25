import {
    AUTH_COLORS,
    AuthScreenFrame,
    DigitPad,
    PinCells,
    VaultaShieldArt,
} from '@/components/auth/auth-ui';
import { Pressable, Text, View } from '@/src/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

const CORRECT_PIN = '123456';
const LOCK_SECONDS = 29 * 60 + 42;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function PinLoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ state?: string | string[] }>();
  const initialState = Array.isArray(params.state) ? params.state[0] : params.state;
  const [pin, setPin] = React.useState('');
  const [attemptsLeft, setAttemptsLeft] = React.useState(initialState === 'error' ? 5 : 6);
  const [hasError, setHasError] = React.useState(initialState === 'error');
  const [lockTimer, setLockTimer] = React.useState(initialState === 'locked' ? LOCK_SECONDS : 0);

  React.useEffect(() => {
    if (lockTimer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setLockTimer((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [lockTimer]);

  React.useEffect(() => {
    if (pin.length < 6 || lockTimer > 0) {
      return;
    }

    if (pin === CORRECT_PIN) {
      router.replace('/(tabs)?mode=full');
      return;
    }

    const remaining = attemptsLeft - 1;
    setAttemptsLeft(remaining);
    setHasError(true);
    setPin('');

    if (remaining <= 0) {
      setLockTimer(LOCK_SECONDS);
    }
  }, [attemptsLeft, lockTimer, pin, router]);

  const isLocked = lockTimer > 0;

  return (
    <AuthScreenFrame title="">
<View style={{ flex: 1 }}>

        <View style={{ paddingHorizontal: 14, paddingTop: 16 }}>
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
            style={{ color: '#F4F3FF', fontSize: 16, lineHeight: 21, marginTop: 8, maxWidth: 240 }}
          >
            Enter your 6-digit PIN to access your vault.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            flex: 1,
            marginTop: 28,
            paddingHorizontal: 14,
            paddingTop: 34,
          }}
        >
          {isLocked ? (
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text
                className="font-inter font-extrabold text-center"
                style={{ color: AUTH_COLORS.ink, fontSize: 20, lineHeight: 28, maxWidth: 250 }}
              >
                Account locked for 30 minutes for security.
              </Text>
              <View style={{ marginTop: 22 }}>
                <VaultaShieldArt size={180} variant="lock" />
              </View>
              <Text
                className="font-inter font-extrabold"
                style={{
                  color: AUTH_COLORS.navy,
                  fontSize: 34,
                  fontVariant: ['tabular-nums'],
                  lineHeight: 38,
                  marginTop: 16,
                }}
              >
                {formatTime(lockTimer)}
              </Text>
              <View style={{ marginTop: 'auto', marginBottom: 24 }}>
                <Pressable onPress={() => router.push('/recovery-entry')}>
                  <Text
                    className="font-inter"
                    style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}
                  >
                    Forgot PIN or lost device?
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <PinCells error={hasError} onPress={() => {}} value={pin} />
              {hasError ? (
                <Text
                  selectable
                  className="font-inter"
                  style={{
                    color: AUTH_COLORS.error,
                    fontSize: 12,
                    lineHeight: 16,
                    marginTop: 8,
                  }}
                >
                  Incorrect PIN. {attemptsLeft} attempts remaining.
                </Text>
              ) : null}

              <View style={{ marginTop: 'auto', alignItems: 'center' }}>
                <Pressable onPress={() => router.push('/recovery-entry')} style={{ marginBottom: 24 }}>
                  <Text
                    className="font-inter"
                    style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}
                  >
                    Forgot PIN or lost device?
                  </Text>
                </Pressable>
                <DigitPad
                  onBackspace={() => setPin((value) => value.slice(0, -1))}
                  onDigit={(digit) => {
                    setHasError(false);
                    setPin((value) => `${value}${digit}`.slice(0, 6));
                  }}
                  onLeftKey={() => {}}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </AuthScreenFrame>
  );
}
