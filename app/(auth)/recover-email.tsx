import {
    AUTH_COLORS,
    AuthField,
    AuthScreenFrame,
    DigitPad,
    OtpBoxes,
    PrimaryAuthButton
} from '@/components/auth/auth-ui';
import { Pressable, Text, View } from '@/src/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

type Mode = 'otp' | 'code';

export default function RecoverEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string | string[] }>();
  const routeMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const [mode, setMode] = React.useState<Mode>(routeMode === 'code' ? 'code' : 'otp');
  const [otp, setOtp] = React.useState('');
  const [recoveryCode, setRecoveryCode] = React.useState('XXX-XXX');
  const [otpError, setOtpError] = React.useState(false);
  const [codeError, setCodeError] = React.useState(false);
  const [timer, setTimer] = React.useState(34);

  React.useEffect(() => {
    if (mode !== 'otp' || timer === 0) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, timer]);

  return (
    <AuthScreenFrame showBackButton title="">
        <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
          {mode === 'otp' ? (
            <>
              <Text
                className="font-inter font-extrabold"
                style={{ color: AUTH_COLORS.ink, fontSize: 20, lineHeight: 26 }}
              >
                Check your email
              </Text>
              <Text
                selectable
                className="font-inter"
                style={{ color: '#B0AFC0', fontSize: 15, lineHeight: 20, marginTop: 8 }}
              >
                We sent a reset link to alpha....@gmail.com enter 6 digit code that mentioned in the
                email
              </Text>

              <View style={{ marginTop: 24 }}>
                <OtpBoxes error={otpError} onPress={() => {}} value={otp} />
              </View>

              <View style={{ marginTop: 20 }}>
                <PrimaryAuthButton
                  disabled={otp.length < 6}
                  label="Verify Code"
                  onPress={() => {
                    if (otp === '123456') {
                      setMode('code');
                      setOtpError(false);
                      return;
                    }
                    setOtpError(true);
                  }}
                />
              </View>

              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <Text
                  className="font-inter"
                  style={{ color: '#A4A2B8', fontSize: 13, lineHeight: 18 }}
                >
                  Haven&apos;t got the email yet?{' '}
                  <Text style={{ color: '#7391FF' }}>
                    Resend code {timer > 0 ? `in 00:${timer.toString().padStart(2, '0')}` : ''}
                  </Text>
                </Text>
              </View>

              <View style={{ marginTop: 18 }}>
                <DigitPad
                  onBackspace={() => setOtp((value) => value.slice(0, -1))}
                  onDigit={(digit) => {
                    setOtpError(false);
                    setOtp((value) => `${value}${digit}`.slice(0, 6));
                  }}
                  onLeftKey={() => {}}
                />
              </View>
            </>
          ) : (
            <>
              <Text
                className="font-inter font-extrabold"
                style={{ color: AUTH_COLORS.ink, fontSize: 20, lineHeight: 26 }}
              >
                Enter Your Recovery Code
              </Text>
              <Text
                className="font-inter"
                style={{ color: '#B0AFC0', fontSize: 15, lineHeight: 20, marginTop: 8 }}
              >
                Enter the 8-character code you saved when setting up Vaulta.
              </Text>

              <View style={{ marginTop: 22 }}>
                <AuthField
                  error={codeError ? 'Too many attempts. Contact support.' : ''}
                  label=""
                  onChangeText={(value) => {
                    setRecoveryCode(value.toUpperCase());
                    setCodeError(false);
                  }}
                  placeholder="XXX-XXX"
                  value={recoveryCode}
                />
              </View>

              <View style={{ marginTop: 8 }}>
                <PrimaryAuthButton
                  disabled={recoveryCode.trim().length < 7}
                  label="Verify Code"
                  onPress={() => {
                    if (recoveryCode.replace(/\s/g, '') === 'XXX-XXX') {
                      router.push('/recovery-phrase');
                      return;
                    }
                    setCodeError(true);
                  }}
                />
              </View>

              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <Pressable onPress={() => setMode('otp')}>
                  <Text
                    className="font-inter"
                    style={{ color: '#7391FF', fontSize: 13, lineHeight: 18 }}
                  >
                    Haven&apos;t got the email yet? Resend code
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </AuthScreenFrame>
  );
}
