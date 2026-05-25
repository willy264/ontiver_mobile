import {
    AUTH_COLORS,
    DigitPad,
    PinCells,
    WhiteSheetCard,
} from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import { Text, View } from '@/src/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PinSetupScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ next?: string | string[]; title?: string | string[] }>();
  const next = Array.isArray(params.next) ? params.next[0] : params.next;
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const [pin, setPin] = React.useState('');
  const [confirmPin, setConfirmPin] = React.useState('');
  const [activeField, setActiveField] = React.useState<'pin' | 'confirm'>('pin');
  const [hasMismatch, setHasMismatch] = React.useState(false);

  React.useEffect(() => {
    if (pin.length === 6 && activeField === 'pin') {
      setActiveField('confirm');
    }
  }, [activeField, pin.length]);

  React.useEffect(() => {
    if (confirmPin.length < 6) {
      return;
    }

    if (confirmPin !== pin) {
      setHasMismatch(true);
      return;
    }

    setHasMismatch(false);

    const timeoutId = setTimeout(() => {
      router.replace(next === 'dashboard' ? '/(tabs)?mode=full' : '/biometric-login');
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [confirmPin, next, pin, router]);

  const handleChange = (nextValue: string) => {
    const sanitized = nextValue.slice(0, 6);

    if (activeField === 'pin') {
      setPin(sanitized);
      if (hasMismatch) {
        setHasMismatch(false);
      }
      return;
    }

    setConfirmPin(sanitized);
    if (hasMismatch) {
      setHasMismatch(false);
    }
  };

  const inputValue = activeField === 'pin' ? pin : confirmPin;

  return (
    <Screen className="bg-white" safe={false}>
      <WhiteSheetCard>
        <View
          style={{
            flex: 1,
            paddingBottom: Math.max(insets.bottom, 24),
            paddingHorizontal: 20,
            paddingTop: insets.top + 26,
          }}
        >
          <Text
            className="font-inter font-extrabold"
            style={{ color: AUTH_COLORS.ink, fontSize: 22, lineHeight: 28 }}
          >
            {title === 'reset' ? 'Set a New PIN' : 'Create Your 6-Digit PIN'}
          </Text>
          <Text
            className="font-inter"
            style={{ color: '#4D4A68', fontSize: 16, lineHeight: 22, marginTop: 8 }}
          >
            This PIN is your backup access method. Keep it private and memorable.
          </Text>

          <View style={{ gap: 28, marginTop: 34 }}>
            <View>
              <Text
                className="font-inter"
                style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 22, marginBottom: 12 }}
              >
                Input Pin
              </Text>
              <PinCells onPress={() => setActiveField('pin')} value={pin} />
            </View>

            <View>
              <Text
                className="font-inter"
                style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 22, marginBottom: 12 }}
              >
                Confirm Pin
              </Text>
              <PinCells
                error={hasMismatch}
                onPress={() => setActiveField('confirm')}
                value={confirmPin}
              />
              {hasMismatch ? (
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
                  PINs don&apos;t match. Try again.
                </Text>
              ) : null}
            </View>
          </View>

          <View style={{ marginTop: 'auto' }}>
            <DigitPad
              onBackspace={() => handleChange(inputValue.slice(0, -1))}
              onDigit={(digit) => handleChange(`${inputValue}${digit}`)}
              onLeftKey={() => {}}
            />
          </View>
        </View>
      </WhiteSheetCard>
    </Screen>
  );
}
