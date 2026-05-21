// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<string, ComponentProps<typeof MaterialIcons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'bell.fill': 'notifications',
  'exclamationmark.circle.fill': 'error',
  'exclamationmark.triangle.fill': 'warning',
  'person.crop.rectangle.fill': 'badge',
  'person.crop.rectangle': 'badge',
  'checkmark.seal.fill': 'verified',
  'plus.circle.fill': 'add-circle',
  'shield.fill': 'security',
  'person.text.rectangle': 'badge',
  'sun.max.fill': 'wb-sunny',
  'clock.fill': 'schedule',
  'airplane': 'flight',
  'car.fill': 'directions-car',
  'pencil': 'edit',
  'face.dashed': 'face',
  'arrow.turn.down.left': 'undo',
  'arrow.turn.down.right': 'redo',
  'face.smiling': 'sentiment-satisfied',
  'sparkles': 'auto-awesome',
  'checkmark.shield.fill': 'verified-user',
  'person.fill': 'person',
  'arrow.right': 'arrow-forward',
  'gearshape.fill': 'settings',
  'checkmark.circle.fill': 'check-circle',
  'lock.fill': 'lock',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
