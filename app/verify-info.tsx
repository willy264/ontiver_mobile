import {
    AUTH_COLORS,
    AuthField,
    AuthScreenFrame,
    FlowProgress,
    PrimaryAuthButton,
} from '@/components/auth/auth-ui';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Text, View } from '@/src/tw';
import { useRouter } from 'expo-router';
import React from 'react';

export default function VerifyInfoScreen() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    fullName: 'Grace Henderson George',
    dob: '24th March, 1993',
    idNumber: '234109058028058',
    expiryDate: '15th March 2026',
    gender: 'Male',
    nationality: 'Nigerian',
  });

  return (
    <AuthScreenFrame showBackButton title="">
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
          <FlowProgress current={4} />
          <Text
            className="font-inter font-extrabold text-center"
            style={{ color: AUTH_COLORS.ink, fontSize: 24, lineHeight: 30, marginTop: 22 }}
          >
            Verify your info
          </Text>
          <Text
            className="font-inter text-center"
            style={{ color: '#646182', fontSize: 15, lineHeight: 20, marginTop: 8 }}
          >
            We extracted this from your ID. Please review carefully.
          </Text>

          <View style={{ marginTop: 20 }}>
            <AuthField
              label="Full Name"
              onChangeText={(value) => setFormData((state) => ({ ...state, fullName: value }))}
              placeholder=""
              value={formData.fullName}
            />
            <AuthField
              label="Date of Birth"
              onChangeText={(value) => setFormData((state) => ({ ...state, dob: value }))}
              placeholder=""
              value={formData.dob}
            />
            <AuthField
              label="ID Number"
              onChangeText={(value) => setFormData((state) => ({ ...state, idNumber: value }))}
              placeholder=""
              value={formData.idNumber}
            />
            <AuthField
              label="Expiry Date"
              onChangeText={(value) => setFormData((state) => ({ ...state, expiryDate: value }))}
              placeholder=""
              value={formData.expiryDate}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <View style={{ flex: 1 }}>
              <Text
                className="font-inter"
                style={{ color: '#4B4868', fontSize: 16, lineHeight: 22, marginBottom: 8 }}
              >
                Gender
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  borderColor: '#E4E3EF',
                  borderRadius: 14,
                  borderWidth: 1,
                  flexDirection: 'row',
                  height: 54,
                  justifyContent: 'space-between',
                  paddingHorizontal: 14,
                }}
              >
                <Text className="font-inter" style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}>
                  {formData.gender}
                </Text>
                <IconSymbol color={AUTH_COLORS.ink} name="chevron.down" size={18} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                className="font-inter"
                style={{ color: '#4B4868', fontSize: 16, lineHeight: 22, marginBottom: 8 }}
              >
                Nationality
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  borderColor: '#E4E3EF',
                  borderRadius: 14,
                  borderWidth: 1,
                  flexDirection: 'row',
                  height: 54,
                  justifyContent: 'space-between',
                  paddingHorizontal: 14,
                }}
              >
                <Text className="font-inter" style={{ color: AUTH_COLORS.ink, fontSize: 15, lineHeight: 20 }}>
                  {formData.nationality}
                </Text>
                <IconSymbol color={AUTH_COLORS.ink} name="chevron.down" size={18} />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 24 }}>
            <PrimaryAuthButton label="Confirm & Continue" onPress={() => router.push('/liveness')} />
          </View>
          <PressableText label="Retake photos" onPress={() => router.back()} />
        </View>
      </View>
    </AuthScreenFrame>
  );
}

function PressableText({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Text
      className="font-inter text-center"
      onPress={onPress}
      style={{ color: AUTH_COLORS.ink, fontSize: 16, lineHeight: 20, marginTop: 16 }}
    >
      {label}
    </Text>
  );
}
