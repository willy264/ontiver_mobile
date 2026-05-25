import { Image as RNImage } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCssElement } from 'react-native-css';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const AnimatedExpoImage = Animated.createAnimatedComponent(RNImage);

type DeferredImageProps = React.ComponentProps<typeof RNImage> & {
  animationDelay?: number;
  animationDuration?: number;
  lazyMount?: boolean;
  placeholderColor?: string;
  revealOnLoad?: boolean;
};

function DeferredImage({
  animationDelay = 0,
  animationDuration = 340,
  lazyMount = true,
  placeholderColor = 'rgba(9, 5, 79, 0.08)',
  revealOnLoad = true,
  source,
  style,
  transition = 220,
  ...props
}: DeferredImageProps) {
  const [shouldRender, setShouldRender] = React.useState(!lazyMount);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const opacity = useSharedValue(revealOnLoad ? 0 : 1);
  const translateY = useSharedValue(revealOnLoad ? 14 : 0);
  const scale = useSharedValue(revealOnLoad ? 0.985 : 1);

  const flattenedStyle = StyleSheet.flatten(style) || {};
  // @ts-ignore remap CSS-like object fit props to expo-image props
  const { objectFit, objectPosition, ...imageStyle } = flattenedStyle;

  React.useEffect(() => {
    if (!lazyMount) {
      return;
    }

    const timer = setTimeout(() => setShouldRender(true), 0);
    return () => clearTimeout(timer);
  }, [lazyMount]);

  React.useEffect(() => {
    if (!hasLoaded || !revealOnLoad) {
      return;
    }

    opacity.value = withDelay(
      animationDelay,
      withTiming(1, {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      })
    );
    translateY.value = withDelay(
      animationDelay,
      withTiming(0, {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      })
    );
    scale.value = withDelay(
      animationDelay,
      withTiming(1, {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [animationDelay, animationDuration, hasLoaded, opacity, revealOnLoad, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  if (!shouldRender) {
    return <View style={[imageStyle, { backgroundColor: placeholderColor }]} />;
  }

  return (
    <View style={[imageStyle, { backgroundColor: hasLoaded ? 'transparent' : placeholderColor, overflow: 'hidden' }]}>
      <AnimatedExpoImage
        cachePolicy="memory-disk"
        contentFit={objectFit}
        contentPosition={objectPosition}
        onLoad={(event) => {
          setHasLoaded(true);
          props.onLoad?.(event);
        }}
        priority="normal"
        source={typeof source === 'string' ? { uri: source } : source}
        transition={transition}
        {...props}
        style={[imageStyle, animatedStyle]}
      />
    </View>
  );
}

function CSSImage(props: DeferredImageProps) {
  return <DeferredImage {...props} />;
}

export const Image = (props: DeferredImageProps & { className?: string }) => {
  return useCssElement(CSSImage, props, { className: 'style' });
};

Image.displayName = 'CSS(Image)';
