import {
    AUTH_COLORS,
    AuthScreenFrame,
    PrimaryAuthButton,
    StatusBanner,
    VaultaShieldArt,
} from '@/components/auth/auth-ui';
import { Pressable, Text, View } from '@/src/tw';
import { useRouter } from 'expo-router';
import React from 'react';

const BANK = ['seed', 'fire', 'kill', 'dash', 'nope', 'tore', 'word'];

export default function RecoveryPhraseScreen() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(['seed', 'nope', 'word']);
  const [words] = React.useState<string[]>([
    'seed',
    'word',
    'fill',
    'dash',
    'kill',
    'tore',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  if (showSuccess) {
    return (
      <AuthScreenFrame title="">
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 24,
            }}
          >
            <VaultaShieldArt size={132} variant="check" />
            <Text
              className="font-inter font-extrabold text-center"
              style={{ color: AUTH_COLORS.navy, fontSize: 26, lineHeight: 30, marginTop: 22 }}
            >
              Account Restored!
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#56547B', fontSize: 15, lineHeight: 21, marginTop: 10 }}
            >
              Your Vaulta account and credentials have been fully restored.
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#56547B', fontSize: 15, lineHeight: 21, marginTop: 10 }}
            >
              Your privacy score and activity log are intact.
            </Text>
            <View style={{ marginTop: 30, width: '100%' }}>
              <PrimaryAuthButton
                label="Go to my Vault"
                onPress={() => router.replace('/pin-setup?next=dashboard&title=reset')}
              />
            </View>
          </View>
        </View>
      </AuthScreenFrame>
    );
  }

  return (
    <AuthScreenFrame showBackButton title="">
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
          <Text
            className="font-inter font-extrabold"
            style={{ color: AUTH_COLORS.ink, fontSize: 20, lineHeight: 26 }}
          >
            Enter Recovery Phrase
          </Text>
          <Text
            className="font-inter"
            style={{ color: '#B0AFC0', fontSize: 15, lineHeight: 20, marginTop: 6 }}
          >
            Enter all 12 words in the correct order.
          </Text>

          <View style={{ marginTop: 12 }}>
            <StatusBanner
              message={
                showError
                  ? 'Incorrect phrase. Please check the words and order.'
                  : 'Never share your recovery phrase with anyone, including Vaulta support.'
              }
              onClose={() => setShowError(false)}
              tone={showError ? 'error' : 'warning'}
            />
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
            {words.map((word, index) => (
              <View
                key={`slot-${index}`}
                style={{
                  backgroundColor: '#ECEEF7',
                  borderRadius: 14,
                  height: 52,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  width: '22%',
                }}
              >
                <Text
                  className="font-inter"
                  style={{ color: '#666482', fontSize: 10, lineHeight: 12 }}
                >
                  {index + 1}
                </Text>
                <Text
                  className="font-inter"
                  style={{ color: '#8E8BA7', fontSize: 15, lineHeight: 18, marginTop: 3 }}
                >
                  {word}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
            {BANK.map((word) => {
              const active = selected.includes(word);
              return (
                <Pressable
                  key={word}
                  onPress={() => {
                    setSelected((current) =>
                      current.includes(word)
                        ? current.filter((item) => item !== word)
                        : [...current, word]
                    );
                    setShowError(false);
                  }}
                  style={{
                    alignItems: 'center',
                    backgroundColor: active ? AUTH_COLORS.navy : '#FFFFFF',
                    borderColor: active ? AUTH_COLORS.navy : '#C9C6DF',
                    borderCurve: 'continuous',
                    borderRadius: 999,
                    borderWidth: 1,
                    justifyContent: 'center',
                    minWidth: 72,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    className="font-inter"
                    style={{
                      color: active ? '#FFFFFF' : '#7C79A0',
                      fontSize: 15,
                      lineHeight: 18,
                    }}
                  >
                    {word}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ marginTop: 22 }}>
            <PrimaryAuthButton
              label="Verify Phrase"
              onPress={() => {
                if (selected.includes('nope')) {
                  setShowError(true);
                  return;
                }
                setShowSuccess(true);
              }}
            />
          </View>
        </View>
      </View>
    </AuthScreenFrame>
  );
}
