import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
export type IconName =
  | 'book'
  | 'quiz'
  | 'game'
  | 'tools'
  | 'bolt'
  | 'bookmark'
  | 'share'
  | 'back';
const paths: Record<IconName, string> = {
  book: 'M12 5C9 3 5 3 3 4v16c3-1 6-1 9 1m0-16c3-2 7-2 9-1v16c-3-1-6-1-9 1V5',
  quiz: 'M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01',
  game: 'M7 7h10c3 0 5 10 3 11-2 1-4-3-5-3H9c-1 0-3 4-5 3-2-1 0-11 3-11Zm0 3v4m-2-2h4m7-1h.01m2 2h.01',
  tools: 'M4 19a9 9 0 1 1 16 0M12 14l4-5M6 10l1 1m5-6v2m6 3-1 1',
  bolt: 'm14 2-9 12h6l-1 8 9-13h-6l1-7Z',
  bookmark: 'M6 3h12v18l-6-4-6 4V3Z',
  share: 'M12 15V3m-4 4 4-4 4 4M6 11H4v10h16V11h-2',
  back: 'm15 5-7 7 7 7',
};
export function Icon({
  name,
  color,
  size = 24,
  filled = false,
}: {
  name: IconName;
  color: string;
  size?: number;
  filled?: boolean;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === 'quiz' && <Circle cx={12} cy={12} r={10} />}
      <Path d={paths[name]} fill={filled ? color : 'none'} />
    </Svg>
  );
}
