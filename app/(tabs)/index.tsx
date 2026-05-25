import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '@/components/screen';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { VaultaShieldArt } from '@/components/auth/auth-ui';
import { Image, Pressable, ScrollView, Text, View } from '@/src/tw';

const CREDENTIALS = [
  { id: 1, title: 'National ID', date: '15th Apr. 2026', status: 'Verified', tone: 'green' },
  { id: 2, title: 'National ID', date: '15th Apr. 2026', status: 'Pending', tone: 'amber' },
];

const ACTIVITIES = [
  { id: 1, label: 'Credential Added', date: '15th April, 2026', status: 'Verified', tone: 'green' },
  { id: 2, label: 'Credential Added', date: '15th April, 2026', status: 'Pending', tone: 'amber' },
  { id: 3, label: 'Credential Added', date: '15th April, 2026', status: 'Pending', tone: 'red' },
  { id: 4, label: 'Credential Added', date: '15th April, 2026', status: 'Verified', tone: 'green' },
  { id: 5, label: 'Credential Added', date: '15th April, 2026', status: 'Declined', tone: 'red' },
  { id: 6, label: 'Credential Added', date: '15th April, 2026', status: 'Pending', tone: 'amber' },
];

export default function HubScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string | string[] }>();
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const isFull = mode === 'full';

  if (!isFull) {
    return (
      <Screen className="bg-white" safe={false}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 32, paddingHorizontal: 22 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View style={{ alignItems: 'center', marginTop: 68 }}>
            <VaultaShieldArt label="VAULTA" size={230} />
          </View>
          <Text
            className="font-inter font-extrabold text-center"
            style={{ color: '#17153D', fontSize: 28, lineHeight: 32, marginTop: 16 }}
          >
            Welcome to Vaulta!
          </Text>
          <Text
            className="font-inter text-center"
            style={{ color: '#272443', fontSize: 16, lineHeight: 22, marginTop: 10 }}
          >
            Verify your identity to unlock your Privacy Score and start sharing.
          </Text>
          <View style={{ marginTop: 28 }}>
            <Pressable
              onPress={() => router.push('/id-type')}
              style={{
                alignItems: 'center',
                backgroundColor: '#09054F',
                borderRadius: 12,
                height: 48,
                justifyContent: 'center',
              }}
            >
              <Text
                className="font-inter font-extrabold"
                style={{ color: '#FFFFFF', fontSize: 17, lineHeight: 22 }}
              >
                Verify My Identity
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen className="bg-white" safe={false}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 14, paddingTop: 22 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Image
              animationDelay={80}
              animationDuration={360}
              lazyMount
              revealOnLoad
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' }}
              style={{ borderRadius: 999, height: 48, width: 48 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text className="font-inter" style={{ color: '#86839E', fontSize: 14, lineHeight: 18 }}>
                Welcome Back
              </Text>
              <Text
                className="font-inter font-extrabold"
                style={{ color: '#13113A', fontSize: 24, lineHeight: 28 }}
              >
                Gracious
              </Text>
            </View>
          </View>
          <Pressable style={{ padding: 8 }}>
            <IconSymbol color="#18154A" name="bell.fill" size={24} />
            <View
              style={{
                backgroundColor: '#FF4D4D',
                borderColor: '#FFFFFF',
                borderRadius: 999,
                borderWidth: 1,
                height: 8,
                position: 'absolute',
                right: 7,
                top: 7,
                width: 8,
              }}
            />
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: '#1A2A22',
            borderRadius: 18,
            flexDirection: 'row',
            marginTop: 18,
            minHeight: 150,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              backgroundColor: '#2A312F',
              bottom: -90,
              height: 180,
              position: 'absolute',
              right: -50,
              transform: [{ rotate: '12deg' }],
              width: 180,
            }}
          />
          <View style={{ flex: 1, justifyContent: 'space-between', padding: 16 }}>
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.28)',
                borderRadius: 999,
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}
            >
              <Text className="font-inter" style={{ color: '#D8E8DB', fontSize: 12, lineHeight: 16 }}>
                NIN Verified
              </Text>
            </View>
            <View>
              <Text className="font-inter" style={{ color: '#FFFFFF', fontSize: 13, lineHeight: 18 }}>
                Lawrernce
              </Text>
              <Text
                className="font-inter font-extrabold"
                style={{ color: '#FFFFFF', fontSize: 18, lineHeight: 22 }}
              >
                Gracious
              </Text>
              <Text className="font-inter" style={{ color: '#D1D8D2', fontSize: 11, lineHeight: 16 }}>
                15-05-2026
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#16E58B',
                borderRadius: 999,
                height: 110,
                justifyContent: 'center',
                width: 110,
              }}
            >
              <IconSymbol color="#FFFFFF" name="checkmark.circle.fill" size={64} />
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={{
                backgroundColor: index === 0 ? '#2E274D' : '#D5D3E0',
                borderRadius: 999,
                height: 8,
                marginHorizontal: 3,
                width: 8,
              }}
            />
          ))}
        </View>

        <View
          style={{
            alignItems: 'center',
            borderColor: '#F3C57B',
            borderCurve: 'continuous',
            borderRadius: 14,
            borderWidth: 1,
            flexDirection: 'row',
            marginTop: 14,
            paddingHorizontal: 14,
            paddingVertical: 12,
          }}
        >
          <IconSymbol color="#1A173F" name="bell.fill" size={18} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text className="font-inter font-extrabold" style={{ color: '#1B1740', fontSize: 14, lineHeight: 18 }}>
              2 new request waiting
            </Text>
            <Text className="font-inter" style={{ color: '#7C7894', fontSize: 11, lineHeight: 16 }}>
              Paystack and 2 others want to verify...
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
          <Text className="font-inter font-extrabold" style={{ color: '#1A183F', fontSize: 18, lineHeight: 22 }}>
            My Credentials
          </Text>
          <Pressable>
            <Text className="font-inter" style={{ color: '#AAA7BF', fontSize: 14, lineHeight: 18 }}>
              See All
            </Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          {CREDENTIALS.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#F0EEF7',
                borderCurve: 'continuous',
                borderRadius: 16,
                borderWidth: 1,
                flex: 1,
                padding: 14,
              }}
            >
              <Text className="font-inter" style={{ color: '#16A34A', fontSize: 11, lineHeight: 14 }}>
                Nigeria
              </Text>
              <Text
                className="font-inter font-extrabold"
                style={{ color: '#1A183F', fontSize: 18, lineHeight: 22, marginTop: 6 }}
              >
                {item.title}
              </Text>
              <Text className="font-inter" style={{ color: '#83809A', fontSize: 11, lineHeight: 16, marginTop: 8 }}>
                {item.date}
              </Text>
              <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 8 }}>
                <IconSymbol
                  color={item.tone === 'green' ? '#22C55E' : '#FB923C'}
                  name={item.tone === 'green' ? 'checkmark.circle.fill' : 'exclamationmark.triangle.fill'}
                  size={14}
                />
                <Text
                  className="font-inter"
                  style={{
                    color: item.tone === 'green' ? '#22C55E' : '#FB923C',
                    fontSize: 12,
                    lineHeight: 16,
                    marginLeft: 5,
                  }}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 22 }}>
          <Text className="font-inter font-extrabold" style={{ color: '#1A183F', fontSize: 18, lineHeight: 22 }}>
            Recent Activities
          </Text>
          <Pressable>
            <Text className="font-inter" style={{ color: '#AAA7BF', fontSize: 14, lineHeight: 18 }}>
              See All
            </Text>
          </Pressable>
        </View>

        <View style={{ gap: 10, marginTop: 12 }}>
          {ACTIVITIES.map((item) => (
            <View
              key={item.id}
              style={{
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderColor: '#F0EEF7',
                borderCurve: 'continuous',
                borderRadius: 16,
                borderWidth: 1,
                flexDirection: 'row',
                paddingHorizontal: 12,
                paddingVertical: 12,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  borderColor: '#DCD9EA',
                  borderRadius: 12,
                  borderWidth: 1,
                  height: 34,
                  justifyContent: 'center',
                  width: 34,
                }}
              >
                <IconSymbol color="#261F54" name="doc.text.magnifyingglass" size={18} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text className="font-inter" style={{ color: '#1A183F', fontSize: 15, lineHeight: 18 }}>
                  {item.label}
                </Text>
                <Text className="font-inter" style={{ color: '#858299', fontSize: 11, lineHeight: 14, marginTop: 2 }}>
                  {item.date}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    item.tone === 'green' ? '#DDFBE7' : item.tone === 'amber' ? '#FFF2DD' : '#FFE1E1',
                  borderRadius: 999,
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                }}
              >
                <Text
                  className="font-inter"
                  style={{
                    color: item.tone === 'green' ? '#22C55E' : item.tone === 'amber' ? '#F59E0B' : '#EF4444',
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => router.push('/id-type')}
        style={{
          alignItems: 'center',
          backgroundColor: '#09054F',
          borderRadius: 18,
          bottom: 112,
          height: 56,
          justifyContent: 'center',
          position: 'absolute',
          right: 18,
          width: 56,
        }}
      >
        <IconSymbol color="#FFFFFF" name="qrcode.viewfinder" size={30} />
      </Pressable>
    </Screen>
  );
}
