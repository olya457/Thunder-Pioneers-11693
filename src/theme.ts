import { StyleSheet } from 'react-native';
export const colors = {
  background: '#26232F',
  surface: '#363141',
  border: '#665773',
  text: '#E5DDEE',
  muted: '#BCADC8',
  purple: '#A47AD4',
  cyan: '#49B9CD',
  pink: '#D489B8',
  danger: '#CC718F',
};
export const shared = StyleSheet.create({
  title: {
    fontSize: 29,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 22,
  },
  heading: { fontSize: 21, fontWeight: '600', color: colors.text },
  body: { fontSize: 15, lineHeight: 24, color: colors.muted },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gap: { gap: 16 },
  cyan: { color: colors.cyan },
  center: { textAlign: 'center' },
});
