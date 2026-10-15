import { useWindowDimensions } from 'react-native';
export function useCompactLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  return {
    compact: width < 375 || height < 700,
    narrow: width < 360 || fontScale > 1.25,
    width,
    height,
    horizontal: width < 375 ? 16 : 20,
  };
}
