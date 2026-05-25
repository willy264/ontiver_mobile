import {
    AUTH_COLORS,
    FlowProgress,
    StatusBanner,
} from '@/components/auth/auth-ui';
import { Screen } from '@/components/screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Pressable, Text, View } from '@/src/tw';

type CaptureState =
  | 'front'
  | 'blur'
  | 'glare'
  | 'dark'
  | 'front-ok'
  | 'back'
  | 'back-ok';

const FRONT_PREVIEW = require('@/assets/images/Group 2684.svg');
const BACK_PREVIEW = require('@/assets/images/Group 2684 (1).svg');

export default function DocumentCaptureScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [state, setState] = React.useState<CaptureState>('front');

  const bannerMessage =
    state === 'blur'
      ? 'Image too blurry - try again.'
      : state === 'glare'
        ? 'Too much glare - move to shade.'
        : state === 'dark'
          ? 'Too dark - find better lighting.'
          : '';

  const isErrorState = state === 'blur' || state === 'glare' || state === 'dark';
  const isPreviewState = state !== 'front' && state !== 'back';
  const isBackStep = state === 'back' || state === 'back-ok';
  const previewSource = state === 'back-ok' ? BACK_PREVIEW : FRONT_PREVIEW;

  return (
    <Screen className="bg-[#09054F]" safe={false}>
      <View style={{ backgroundColor: AUTH_COLORS.navy, flex: 1, overflow: 'hidden' }}>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top + 10,
            paddingBottom: Math.max(insets.bottom, 20) + 4,
            paddingHorizontal: 16,
          }}
        >
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              style={{ height: 40, justifyContent: 'center', width: 40 }}
            >
              <MaterialCommunityIcons color="#FFFFFF" name="arrow-left" size={24} />
            </Pressable>

            <View style={{ alignItems: 'center', flex: 1, marginRight: 40 }}>
              <FlowProgress current={2} light />
            </View>
          </View>

          {isErrorState ? (
            <View style={{ marginTop: 18, paddingLeft: 160 }}>
              <StatusBanner message={bannerMessage} onClose={() => setState('front')} tone="error" />
            </View>
          ) : null}

          <Text
            className="font-inter text-center"
            style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 22, marginTop: isErrorState ? 18 : 44 }}
          >
            {isBackStep
              ? 'Position back of ID inside the frame'
              : 'Position front of ID inside the frame'}
          </Text>

          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', paddingBottom: 12 }}>
            <CaptureCard previewSource={isPreviewState ? previewSource : null} />

            <View style={{ marginTop: 34 }}>
              {state === 'front' || state === 'back' ? (
                <CaptureShutter
                  onPress={() => setState(state === 'front' ? 'blur' : 'back-ok')}
                />
              ) : (
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 44 }}>
                  <ActionCircle
                    icon="autorenew"
                    onPress={() => {
                      if (state === 'blur') setState('glare');
                      else if (state === 'glare') setState('dark');
                      else if (state === 'dark') setState('front-ok');
                      else if (state === 'front-ok') setState('front');
                      else setState('back');
                    }}
                  />
                  <ActionCircle
                    icon="check"
                    onPress={() => {
                      if (state === 'back-ok') {
                        router.push('/verify-info');
                        return;
                      }

                      setState('back');
                    }}
                  />
                </View>
              )}
            </View>

            <Text
              className="font-inter text-center"
              style={{ color: '#FFFFFF', fontSize: 16, lineHeight: 20, marginTop: 32 }}
            >
              Make sure to have:
            </Text>
            <Text
              className="font-inter text-center"
              style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 22, marginTop: 8 }}
            >
              Good lighting, Flat surface and No glare
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

function CaptureCard({ previewSource }: { previewSource: number | null }) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 360,
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: previewSource ? '#DAD8E8' : '#FFFFFF',
          borderCurve: 'continuous',
          borderRadius: 26,
          height: 330,
          overflow: 'hidden',
          width: 260,
        }}
      >
        {previewSource ? (
          <Image
            animationDelay={80}
            animationDuration={380}
            contentFit="cover"
            lazyMount
            revealOnLoad
            source={previewSource}
            style={{ flex: 1 }}
          />
        ) : null}
        <Corner position="top-left" />
        <Corner position="top-right" />
        <Corner position="bottom-left" />
        <Corner position="bottom-right" />
      </View>
    </View>
  );
}

function CaptureShutter({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 999,
        height: 74,
        justifyContent: 'center',
        width: 74,
      }}
    >
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: AUTH_COLORS.navy,
          borderRadius: 999,
          borderWidth: 8,
          height: 32,
          width: 32,
        }}
      />
    </Pressable>
  );
}

function Corner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const vertical = position.includes('top') ? { top: 14 } : { bottom: 14 };
  const horizontal = position.includes('left') ? { left: 14 } : { right: 14 };
  const shape =
    position === 'top-left'
      ? { borderLeftWidth: 8, borderTopWidth: 8, borderTopLeftRadius: 14 }
      : position === 'top-right'
        ? { borderRightWidth: 8, borderTopWidth: 8, borderTopRightRadius: 14 }
        : position === 'bottom-left'
          ? { borderBottomWidth: 8, borderLeftWidth: 8, borderBottomLeftRadius: 14 }
          : { borderBottomWidth: 8, borderRightWidth: 8, borderBottomRightRadius: 14 };

  return (
    <View
      style={{
        borderColor: AUTH_COLORS.navy,
        height: 44,
        position: 'absolute',
        width: 44,
        ...shape,
        ...vertical,
        ...horizontal,
      }}
    />
  );
}

function ActionCircle({
  icon,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 999,
        height: 74,
        justifyContent: 'center',
        width: 74,
      }}
    >
      <MaterialCommunityIcons color={AUTH_COLORS.navy} name={icon} size={38} />
    </Pressable>
  );
}
