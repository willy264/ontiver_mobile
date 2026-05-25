import {
    AUTH_COLORS,
    AuthScreenFrame,
    FlowProgress,
    PrimaryAuthButton,
    ProcessingRings,
    SecondaryAuthButton,
    StatusBanner,
    VaultaShieldArt,
} from '@/components/auth/auth-ui';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image, Pressable, Text, View } from '@/src/tw';
import { useRouter } from 'expo-router';
import React from 'react';

type SelfieState =
  | 'intro'
  | 'straight'
  | 'left'
  | 'right'
  | 'smile'
  | 'smile-light'
  | 'smile-face'
  | 'processing'
  | 'processing-delay'
  | 'success'
  | 'failure';

export default function LivenessScreen() {
  const router = useRouter();
  const [state, setState] = React.useState<SelfieState>('intro');

  React.useEffect(() => {
    if (state !== 'processing') {
      return;
    }
    const timer = setTimeout(() => setState('processing-delay'), 2200);
    return () => clearTimeout(timer);
  }, [state]);

  if (state === 'success') {
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
              style={{ color: AUTH_COLORS.navy, fontSize: 28, lineHeight: 32, marginTop: 20 }}
            >
              Identity Verified!
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#50506E', fontSize: 15, lineHeight: 21, marginTop: 14 }}
            >
              Your Vaulta credential is ready. You can now share your verified identity with any
              app or service.
            </Text>
            <View style={{ marginTop: 28, width: '100%' }}>
              <PrimaryAuthButton label="Go to My Vault" onPress={() => router.replace('/(tabs)?mode=full')} />
            </View>
            <Text
              className="font-inter text-center"
              style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20, marginTop: 18 }}
            >
              Share My Identity
            </Text>
          </View>
        </View>
      </AuthScreenFrame>
    );
  }

  if (state === 'failure') {
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
            <IconSymbol color={AUTH_COLORS.error} name="xmark.circle.fill" size={112} />
            <Text
              className="font-inter font-extrabold text-center"
              style={{ color: AUTH_COLORS.error, fontSize: 28, lineHeight: 32, marginTop: 20 }}
            >
              Verification Unsuccessful
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#50506E', fontSize: 15, lineHeight: 21, marginTop: 14 }}
            >
              Your ID photo was too blurry. Please retake in good lighting on a flat surface.
            </Text>
            <View style={{ marginTop: 28, width: '100%' }}>
              <PrimaryAuthButton label="Try Again" onPress={() => setState('intro')} />
            </View>
            <Text
              className="font-inter text-center"
              style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20, marginTop: 18 }}
            >
              Having trouble? Contact Support
            </Text>
          </View>
        </View>
      </AuthScreenFrame>
    );
  }

  if (state === 'processing' || state === 'processing-delay') {
    return (
      <AuthScreenFrame title="">
        <View style={{ backgroundColor: AUTH_COLORS.navy, flex: 1, overflow: 'hidden' }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 24,
            }}
          >
            <ProcessingRings />
            <Text
              className="font-inter font-extrabold text-center"
              style={{ color: '#FFFFFF', fontSize: 20, lineHeight: 24, marginTop: 26 }}
            >
              {state === 'processing' ? 'Verifying your identity...' : 'Taking longer than usual...'}
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#C8C6E4', fontSize: 14, lineHeight: 20, marginTop: 12 }}
            >
              {state === 'processing'
                ? 'This usually takes 10-30 seconds. Please don’t close the app.'
                : 'Our team is on it. We’ll notify you when it’s ready.'}
            </Text>
            {state === 'processing-delay' ? (
              <View style={{ marginTop: 34, width: '100%' }}>
                <SecondaryAuthButton
                  label="Go to Dashboard"
                  onPress={() => router.replace('/(tabs)?mode=full')}
                />
              </View>
            ) : null}
          </View>
        </View>
      </AuthScreenFrame>
    );
  }

  if (state === 'intro') {
    return (
      <AuthScreenFrame title="">
        <View style={{ backgroundColor: AUTH_COLORS.navy, flex: 1, overflow: 'hidden' }}>
          <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
            <Pressable onPress={() => router.back()}>
              <IconSymbol color="#FFFFFF" name="chevron.left" size={20} />
            </Pressable>
            <View style={{ alignItems: 'center', marginTop: 140 }}>
              <Text
                className="font-inter font-extrabold text-center"
                style={{ color: '#FFFFFF', fontSize: 22, lineHeight: 30 }}
              >
                We&apos;ll take a selfie to{'\n'}match your ID
              </Text>
              <View style={{ marginTop: 26, width: '100%' }}>
                <SecondaryAuthButton label="Ready" onPress={() => setState('straight')} />
              </View>
            </View>
          </View>
        </View>
      </AuthScreenFrame>
    );
  }

  const banner =
    state === 'smile-light'
      ? 'Move to better light'
      : state === 'smile-face'
        ? "We can't see your face clearly. Make sure your face is inside the oval and you're facing forward."
        : '';

  return (
    <AuthScreenFrame title="">
      <View style={{ backgroundColor: AUTH_COLORS.navy, flex: 1, overflow: 'hidden' }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 18 }}>
            <Pressable onPress={() => router.back()}>
              <IconSymbol color="#FFFFFF" name="chevron.left" size={20} />
            </Pressable>
            <FlowProgress current={state === 'straight' ? 1 : state === 'left' ? 2 : state === 'right' ? 3 : 4} light />
          </View>

          {banner ? (
            <View style={{ marginTop: 18 }}>
              <StatusBanner
                message={banner}
                onClose={() => setState('smile')}
                tone="warning"
              />
            </View>
          ) : null}

          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <Image
              animationDelay={100}
              animationDuration={360}
              lazyMount
              revealOnLoad
              source={{ uri: 'https://em-content.zobj.net/source/apple/391/person_1f9d1.png' }}
              style={{ borderRadius: 999, height: 70, width: 70 }}
            />
            {(() => {
              const isSmilePhase =
                state === 'smile' || state === 'smile-light' || state === 'smile-face';

              return (
            <View
              style={{
                  alignItems: 'center',
                  backgroundColor: state === 'smile-face' ? '#7F52FF' : '#FFFFFF',
                  borderColor: isSmilePhase ? '#F1C54B' : '#A6E458',
                  borderRadius: 999,
                  borderStyle: 'dotted',
                  borderWidth: 3,
                  height: 320,
                  justifyContent: 'center',
                  marginTop: 12,
                  width: 220,
                }}
              >
                {state !== 'smile-face' ? (
                  <>
                    <Text
                      className="font-inter font-extrabold text-center"
                      style={{ color: AUTH_COLORS.ink, fontSize: 20, lineHeight: 26 }}
                    >
                      {state === 'straight'
                        ? 'Look straight\nahead.'
                        : state === 'left'
                          ? 'Turn slightly\nleft'
                          : state === 'right'
                            ? 'Turn slightly\nright'
                            : 'Smile'}
                    </Text>
                    {state === 'left' ? (
                      <IconSymbol color={AUTH_COLORS.navy} name="arrow.left" size={34} />
                    ) : null}
                    {state === 'right' ? (
                      <IconSymbol color={AUTH_COLORS.navy} name="arrow.right" size={34} />
                    ) : null}
                    {isSmilePhase ? (
                      <IconSymbol color={AUTH_COLORS.navy} name="face.smiling" size={38} />
                    ) : null}
                  </>
                ) : null}
              </View>
              );
            })()}
          </View>

          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 18 }}>
            {[0, 1, 2, 3].map((index) => {
              const active =
                (state === 'straight' && index === 0) ||
                (state === 'left' && index <= 1) ||
                (state === 'right' && index <= 2) ||
                ((state === 'smile' || state === 'smile-light' || state === 'smile-face') && index <= 3);

              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: active ? '#FFFFFF' : '#6E67A0',
                    borderRadius: 999,
                    height: 10,
                    marginHorizontal: 4,
                    width: 10,
                  }}
                />
              );
            })}
          </View>

          <Text
            className="font-inter text-center"
            style={{ color: '#FFFFFF', fontSize: 12, lineHeight: 16, marginTop: 34 }}
          >
            Powered by Qynara
          </Text>

          <View style={{ marginTop: 18 }}>
            <PrimaryAuthButton
              label={
                state === 'straight'
                  ? 'Continue'
                  : state === 'left'
                    ? 'Continue'
                    : state === 'right'
                      ? 'Continue'
                      : 'Finish'
              }
              onPress={() => {
                if (state === 'straight') setState('left');
                else if (state === 'left') setState('right');
                else if (state === 'right') setState('smile');
                else setState('processing');
              }}
            />
          </View>
          {state === 'smile' ? (
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <SecondaryAuthButton label="Move to better light" onPress={() => setState('smile-light')} />
              <SecondaryAuthButton label="Face not clear" onPress={() => setState('smile-face')} />
            </View>
          ) : null}
          {(state === 'smile-light' || state === 'smile-face') ? (
            <View style={{ marginTop: 12 }}>
              <SecondaryAuthButton label="Looks good now" onPress={() => setState('success')} />
            </View>
          ) : null}
        </View>
      </View>
    </AuthScreenFrame>
  );
}
