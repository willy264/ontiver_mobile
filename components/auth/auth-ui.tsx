import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import type { KeyboardTypeOptions, TextInputProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image, Pressable, ScrollView, Text, TextInput, View } from '@/src/tw';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

export const AUTH_COLORS = {
  navy: '#09054F',
  ink: '#1D184E',
  muted: '#8F8DAA',
  border: '#E4E3EF',
  disabled: '#A7A5C2',
  error: '#FF6B6B',
  success: '#A8E63D',
  successDeep: '#7CB518',
  toast: '#B3F238',
  soft: '#F7F7FB',
  warning: '#FFC246',
  warningText: '#5A3600',
  successSoft: '#E9F9C6',
};

type AuthScreenFrameProps = {
  children: React.ReactNode;
  showBackButton?: boolean;
  title: string;
};

export function AuthScreenFrame({
  children,
  showBackButton = false,
  title,
}: AuthScreenFrameProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: AUTH_COLORS.navy }}>
      <View
        style={{
          paddingTop: insets.top + 14,
          paddingBottom: 24,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 44 }}>
          {showBackButton ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              style={{
                alignItems: 'center',
                height: 40,
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                width: 40,
              }}
            >
              <IconSymbol color="#FFFFFF" name="chevron.left" size={20} />
            </Pressable>
          ) : null}

          <Text
            className="font-inter font-extrabold text-white"
            style={{ fontSize: 18, lineHeight: 24 }}
          >
            {title}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
          flex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
}

type AuthSheetScrollProps = {
  children: React.ReactNode;
  contentStyle?: ViewStyle;
};

export function AuthSheetScroll({ children, contentStyle }: AuthSheetScrollProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 32,
        },
        contentStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {children}
    </ScrollView>
  );
}

type AuthFieldProps = {
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  error?: string;
  helperText?: string;
  helperTone?: 'default' | 'error' | 'success';
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onChangeText: (value: string) => void;
  onToggleVisibility?: () => void;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  visible?: boolean;
};

export function AuthField({
  autoCapitalize = 'none',
  autoComplete,
  error,
  helperText,
  helperTone = 'default',
  keyboardType,
  label,
  onChangeText,
  onToggleVisibility,
  placeholder,
  secureTextEntry = false,
  value,
  visible = false,
}: AuthFieldProps) {
  const accentColor = error
    ? AUTH_COLORS.error
    : helperTone === 'success'
      ? AUTH_COLORS.success
      : '#C9C9D8';

  const helperColor =
    helperTone === 'error'
      ? AUTH_COLORS.error
      : helperTone === 'success'
        ? AUTH_COLORS.successDeep
        : AUTH_COLORS.muted;

  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 22, marginBottom: 10 }}
      >
        {label}
      </Text>

      <View
        style={{
          alignItems: 'center',
          borderColor: error ? AUTH_COLORS.error : AUTH_COLORS.border,
          borderCurve: 'continuous',
          borderRadius: 14,
          borderWidth: 1,
          flexDirection: 'row',
          minHeight: 56,
          paddingHorizontal: 18,
        }}
      >
        <TextInput
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B3B2C4"
          secureTextEntry={secureTextEntry && !visible}
          style={{
            color: AUTH_COLORS.ink,
            flex: 1,
            fontFamily: 'Inter',
            fontSize: 15,
            lineHeight: 20,
            paddingVertical: 14,
          }}
          value={value}
        />

        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={onToggleVisibility}
            style={{ paddingLeft: 12 }}
          >
            <MaterialCommunityIcons
              color={AUTH_COLORS.ink}
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              size={22}
            />
          </Pressable>
        ) : null}
      </View>

      {helperText ? (
        <View style={{ marginTop: 8 }}>
          <View
            style={{
              backgroundColor: accentColor,
              borderRadius: 999,
              height: 1.5,
              marginBottom: 4,
              width: '100%',
            }}
          />
          <Text
            selectable
            className="font-inter"
            style={{ color: helperColor, fontSize: 12, lineHeight: 16 }}
          >
            {helperText}
          </Text>
        </View>
      ) : error ? (
        <Text
          selectable
          className="font-inter"
          style={{
            color: AUTH_COLORS.error,
            fontSize: 12,
            lineHeight: 16,
            marginTop: 6,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

type AuthCheckboxProps = {
  checked: boolean;
  onPress: () => void;
};

export function AuthCheckbox({ checked, onPress }: AuthCheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      onPress={onPress}
      style={{ alignItems: 'flex-start', flexDirection: 'row', gap: 10 }}
    >
      <View
        style={{
          alignItems: 'center',
          borderColor: AUTH_COLORS.ink,
          borderRadius: 6,
          borderWidth: 1.5,
          height: 20,
          justifyContent: 'center',
          marginTop: 2,
          width: 20,
        }}
      >
        {checked ? <MaterialCommunityIcons color={AUTH_COLORS.ink} name="check" size={16} /> : null}
      </View>

      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, flex: 1, fontSize: 14, lineHeight: 18 }}
      >
        I agree to Vaulta&apos;s Terms of Service and Privacy Policy.
      </Text>
    </Pressable>
  );
}

type ButtonProps = {
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

export function PrimaryAuthButton({ disabled = false, label, onPress }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: disabled ? AUTH_COLORS.disabled : AUTH_COLORS.navy,
        borderCurve: 'continuous',
        borderRadius: 12,
        height: 44,
        justifyContent: 'center',
      }}
    >
      <Text
        className="font-inter font-extrabold"
        style={{ color: '#FFFFFF', fontSize: 17, lineHeight: 22 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function SecondaryAuthButton({ disabled = false, label, onPress }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: AUTH_COLORS.ink,
        borderCurve: 'continuous',
        borderRadius: 12,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
      }}
    >
      <Text
        className="font-inter font-extrabold"
        style={{ color: AUTH_COLORS.ink, fontSize: 17, lineHeight: 22 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function SocialAuthRow() {
  return (
    <View style={{ gap: 18 }}>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 }}>
        <View style={{ backgroundColor: '#8280A2', flex: 1, height: 1 }} />
        <Text
          className="font-inter"
          style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}
        >
          or continue with
        </Text>
        <View style={{ backgroundColor: '#8280A2', flex: 1, height: 1 }} />
      </View>

      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
        <SocialIconButton icon="google" />
        <SocialIconButton icon="apple" />
      </View>
    </View>
  );
}

function SocialIconButton({ icon }: { icon: 'apple' | 'google' }) {
  return (
    <Pressable
      accessibilityRole="button"
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#ECEBF3',
        borderCurve: 'continuous',
        borderRadius: 24,
        borderWidth: 1,
        boxShadow: '0 10px 20px rgba(9, 5, 79, 0.08)',
        height: 46,
        justifyContent: 'center',
        width: 46,
      }}
    >
      <MaterialCommunityIcons
        color={icon === 'google' ? '#EA4335' : '#111111'}
        name={icon}
        size={28}
      />
    </Pressable>
  );
}

type FooterPromptProps = {
  actionLabel: string;
  onPress: () => void;
  prompt: string;
};

export function FooterPrompt({ actionLabel, onPress, prompt }: FooterPromptProps) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}
      >
        {prompt}{' '}
      </Text>
      <Pressable accessibilityRole="button" onPress={onPress}>
        <Text
          className="font-inter"
          style={{ color: AUTH_COLORS.ink, fontSize: 15, fontWeight: '700', lineHeight: 20 }}
        >
          {actionLabel}
        </Text>
      </Pressable>
    </View>
  );
}

type OtpBoxesProps = {
  error?: boolean;
  length?: number;
  onPress: () => void;
  value: string;
};

export function OtpBoxes({
  error = false,
  length = 6,
  onPress,
  value,
}: OtpBoxesProps) {
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const digits = value.slice(0, length).split('');
  const activeIndex = digits.length < length ? digits.length : undefined;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {Array.from({ length }).map((_, index) => {
            const filled = Boolean(digits[index]);
            const isActive = activeIndex === index;

            return (
              <View
                key={`otp-${index}`}
                style={{
                  alignItems: 'center',
                  borderColor: error ? '#FFB5B5' : AUTH_COLORS.border,
                  borderCurve: 'continuous',
                  borderRadius: 12,
                  borderWidth: 1.5,
                  height: 52,
                  justifyContent: 'center',
                  width: 42,
                }}
              >
                {filled ? (
                  <Text
                    className="font-inter font-extrabold"
                    style={{
                      color: error ? AUTH_COLORS.error : AUTH_COLORS.ink,
                      fontSize: 24,
                      lineHeight: 28,
                    }}
                  >
                    *
                  </Text>
                ) : isActive && cursorVisible ? (
                  <View
                    style={{
                      height: 28,
                      width: 2,
                      backgroundColor: AUTH_COLORS.ink,
                      borderRadius: 1,
                    }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
}

type StatusToastProps = {
  message: string;
  onClose: () => void;
  visible: boolean;
};

export function StatusToast({ message, onClose, visible }: StatusToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: AUTH_COLORS.toast,
        borderCurve: 'continuous',
        borderRadius: 12,
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        position: 'absolute',
        right: 24,
        top: 12,
        zIndex: 20,
      }}
    >
      <MaterialCommunityIcons color="#163300" name="check-circle-outline" size={20} />
      <Text
        selectable
        className="font-inter"
        style={{ color: '#163300', fontSize: 12, lineHeight: 16, maxWidth: 160 }}
      >
        {message}
      </Text>
      <Pressable accessibilityRole="button" hitSlop={10} onPress={onClose}>
        <MaterialCommunityIcons color="#163300" name="close" size={20} />
      </Pressable>
    </View>
  );
}

type IllustrationProps = {
  height: number;
  source: number;
  width: number;
};

export function AuthIllustration({ height, source, width }: IllustrationProps) {
  return (
    <Image
      animationDelay={60}
      animationDuration={420}
      contentFit="contain"
      lazyMount
      revealOnLoad
      source={source}
      style={{ alignSelf: 'center', height, width }}
    />
  );
}

type FeatureBulletProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  text: string;
};

export function FeatureBullet({ icon, text }: FeatureBulletProps) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
      <MaterialCommunityIcons color={AUTH_COLORS.ink} name={icon} size={20} />
      <Text
        className="font-inter"
        style={{ color: AUTH_COLORS.ink, fontSize: 18, lineHeight: 22 }}
      >
        {text}
      </Text>
    </View>
  );
}

type PinCellsProps = {
  error?: boolean;
  onPress: () => void;
  value: string;
};

export function PinCells({ error = false, onPress, value }: PinCellsProps) {
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const activeIndex = value.length < 6 ? value.length : undefined;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
        {Array.from({ length: 6 }).map((_, index) => {
          const filled = Boolean(value[index]);
          const isActive = activeIndex === index;

          return (
            <View
              key={`pin-${index}`}
              style={{
                alignItems: 'center',
                borderColor: error ? '#FFB5B5' : '#D9D9E6',
                borderCurve: 'continuous',
                borderRadius: 10,
                borderWidth: 1.5,
                height: 52,
                justifyContent: 'center',
                flex: 1,
              }}
            >
              {filled ? (
                <Text
                  className="font-inter font-extrabold"
                  style={{
                    color: error ? AUTH_COLORS.error : AUTH_COLORS.ink,
                    fontSize: 24,
                    lineHeight: 28,
                  }}
                >
                  *
                </Text>
              ) : isActive && cursorVisible ? (
                <View
                  style={{
                    height: 28,
                    width: 2,
                    backgroundColor: AUTH_COLORS.ink,
                    borderRadius: 1,
                  }}
                />
              ) : null}
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}



type WhiteCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function WhiteSheetCard({ children, style }: WhiteCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}



type FlowProgressProps = {
  current: number;
  light?: boolean;
  total?: number;
};

export function FlowProgress({
  current,
  light = false,
  total = 5,
}: FlowProgressProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {Array.from({ length: total }).map((_, index) => {
        const active = index < current;

        return (
          <View
            key={`progress-${index}`}
            style={{
              backgroundColor: active
                ? light
                  ? '#FFFFFF'
                  : AUTH_COLORS.navy
                : light
                  ? 'rgba(255,255,255,0.28)'
                  : '#ECE9F8',
              borderRadius: 999,
              height: 4,
              width: 28,
            }}
          />
        );
      })}
    </View>
  );
}



type DigitPadProps = {
  disabled?: boolean;
  leftLabel?: string;
  onBackspace: () => void;
  onDigit: (digit: string) => void;
  onLeftKey?: () => void;
};

export function DigitPad({
  disabled = false,
  leftLabel = '+*#',
  onBackspace,
  onDigit,
  onLeftKey,
}: DigitPadProps) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <View
      style={{
        backgroundColor: '#D6D8E2',
        marginHorizontal: -24,
        marginTop: 12,
        paddingHorizontal: 4,
        paddingTop: 4,
      }}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
        {keys.map((key) => (
          <DigitKey
            key={key}
            disabled={disabled}
            label={key}
            subLabel={digitSubLabel(key)}
            onPress={() => onDigit(key)}
          />
        ))}

        <DigitKey
          disabled={disabled}
          label={leftLabel}
          onPress={onLeftKey}
        />
        <DigitKey disabled={disabled} label="0" onPress={() => onDigit('0')} />
        <DigitKey
          disabled={disabled}
          icon="backspace-outline"
          onPress={onBackspace}
        />
      </View>
    </View>
  );
}

function DigitKey({
  disabled,
  icon,
  label,
  onPress,
  subLabel,
}: {
  disabled?: boolean;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label?: string;
  onPress?: () => void;
  subLabel?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || !onPress}
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#D4D7E2',
        borderCurve: 'continuous',
        borderRadius: 6,
        borderWidth: 1,
        height: 54,
        justifyContent: 'center',
        width: '32.2%',
      }}
    >
      {icon ? (
        <MaterialCommunityIcons color={AUTH_COLORS.ink} name={icon} size={22} />
      ) : (
        <>
          <Text
            className="font-inter"
            style={{ color: AUTH_COLORS.ink, fontSize: 18, lineHeight: 20 }}
          >
            {label}
          </Text>
          {subLabel ? (
            <Text
              className="font-inter"
              style={{
                color: AUTH_COLORS.ink,
                fontSize: 9,
                fontWeight: '700',
                lineHeight: 10,
                marginTop: 1,
              }}
            >
              {subLabel}
            </Text>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

function digitSubLabel(value: string) {
  switch (value) {
    case '2':
      return 'ABC';
    case '3':
      return 'DEF';
    case '4':
      return 'GHI';
    case '5':
      return 'JKL';
    case '6':
      return 'MNO';
    case '7':
      return 'PQRS';
    case '8':
      return 'TUV';
    case '9':
      return 'WXYZ';
    default:
      return '';
  }
}

type StatusBannerProps = {
  message: string;
  onClose?: () => void;
  tone: 'error' | 'success' | 'warning';
};

export function StatusBanner({ message, onClose, tone }: StatusBannerProps) {
  const palette = {
    error: {
      bg: '#FF7378',
      fg: '#3B070C',
      icon: 'alert-circle-outline' as const,
    },
    success: {
      bg: AUTH_COLORS.toast,
      fg: '#173100',
      icon: 'check-circle-outline' as const,
    },
    warning: {
      bg: AUTH_COLORS.warning,
      fg: AUTH_COLORS.warningText,
      icon: 'alert-outline' as const,
    },
  }[tone];

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: palette.bg,
        borderCurve: 'continuous',
        borderRadius: 12,
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <MaterialCommunityIcons color={palette.fg} name={palette.icon} size={20} />
      <Text
        selectable
        className="font-inter"
        style={{ color: palette.fg, flex: 1, fontSize: 12, lineHeight: 16 }}
      >
        {message}
      </Text>
      {onClose ? (
        <Pressable accessibilityRole="button" hitSlop={10} onPress={onClose}>
          <MaterialCommunityIcons color={palette.fg} name="close" size={18} />
        </Pressable>
      ) : null}
    </View>
  );
}

type VaultaShieldArtProps = {
  label?: string;
  size?: number;
  variant?: 'check' | 'lock' | 'plain';
};

export function VaultaShieldArt({
  label,
  size = 220,
  variant = 'plain',
}: VaultaShieldArtProps) {
  const height = size * 1.08;

  return (
    <Svg height={height} viewBox="0 0 240 260" width={size}>
      <Defs>
        <LinearGradient id="shieldOuter" x1="0%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#F6F8FC" />
          <Stop offset="35%" stopColor="#9AA6B8" />
          <Stop offset="60%" stopColor="#E8EEF7" />
          <Stop offset="100%" stopColor="#798395" />
        </LinearGradient>
        <LinearGradient id="shieldInner" x1="5%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#0919AA" />
          <Stop offset="58%" stopColor="#12238F" />
          <Stop offset="100%" stopColor="#00A9DD" />
        </LinearGradient>
        <LinearGradient id="shieldCore" x1="0%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#1820B4" />
          <Stop offset="70%" stopColor="#081A77" />
          <Stop offset="100%" stopColor="#08145E" />
        </LinearGradient>
      </Defs>

      <Path
        d="M120 12C154 32 196 37 214 45V132C214 194 173 233 120 252C67 233 26 194 26 132V45C44 37 86 32 120 12Z"
        fill="url(#shieldOuter)"
      />
      <Path
        d="M120 24C150 41 184 46 198 52V130C198 185 164 219 120 238C76 219 42 185 42 130V52C56 46 90 41 120 24Z"
        fill="url(#shieldInner)"
      />
      <Path
        d="M120 31C147 46 176 50 188 55V128C188 177 158 208 120 226C82 208 52 177 52 128V55C64 50 93 46 120 31Z"
        fill="url(#shieldCore)"
        opacity={0.95}
      />
      <Circle cx="168" cy="90" fill="rgba(255,255,255,0.12)" r="56" />
      <Rect
        fill="rgba(255,255,255,0.1)"
        height="168"
        rx="84"
        transform="rotate(-28 98 120)"
        width="38"
        x="79"
        y="36"
      />

      {label ? (
        <SvgText
          fill="#0E63FF"
          fontSize="24"
          fontWeight="700"
          textAnchor="middle"
          x="120"
          y="152"
        >
          {label}
        </SvgText>
      ) : null}

      {variant === 'check' ? (
        <Path
          d="M94 136L115 158L154 111"
          fill="none"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="18"
        />
      ) : null}

      {variant === 'lock' ? (
        <>
          <Path
            d="M94 115C94 93 104 81 120 81C136 81 146 93 146 115"
            fill="none"
            stroke="#F6F8FC"
            strokeLinecap="round"
            strokeWidth="12"
          />
          <Rect
            fill="#F6F8FC"
            height="52"
            rx="14"
            width="72"
            x="84"
            y="112"
          />
          <Circle cx="120" cy="136" fill="#4D4A68" r="8" />
          <Path
            d="M120 142V156"
            fill="none"
            stroke="#4D4A68"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </>
      ) : null}
    </Svg>
  );
}

type ProcessingRingsProps = {
  size?: number;
};

export function ProcessingRings({ size = 220 }: ProcessingRingsProps) {
  return (
    <Svg height={size} viewBox="0 0 220 220" width={size}>
      <Circle
        cx="110"
        cy="110"
        fill="none"
        opacity={0.2}
        r="84"
        stroke="#7FA6FF"
        strokeDasharray="4 6"
        strokeWidth="3"
      />
      <Circle
        cx="110"
        cy="110"
        fill="none"
        opacity={0.35}
        r="54"
        stroke="#7FA6FF"
        strokeDasharray="4 6"
        strokeWidth="3"
      />
      <Circle
        cx="110"
        cy="110"
        fill="none"
        opacity={0.55}
        r="28"
        stroke="#7FA6FF"
        strokeDasharray="4 6"
        strokeWidth="3"
      />
      <Circle cx="98" cy="110" fill="#FFFFFF" r="2.5" />
      <Circle cx="110" cy="110" fill="#FFFFFF" r="2.5" />
      <Circle cx="122" cy="110" fill="#FFFFFF" r="2.5" />
      <Circle cx="134" cy="110" fill="#FFFFFF" r="2.5" />
    </Svg>
  );
}
