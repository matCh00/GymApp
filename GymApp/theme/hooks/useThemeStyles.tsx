/**
 * Hook łaczący motyw z customowymi stylami
 */

import useTheme from "./useTheme";

const useThemedStyles = (styles: any) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemedStyles;
