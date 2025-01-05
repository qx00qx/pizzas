const mapClassNameByStyle = {
  'shadow-hover': 'bg-white shadow-md shadow-gray-200 text-primary',
} as const;

/* гарантирует, что вы можете передавать только те строки, которые определены в объекте mapClassNameByStyle */

type StyleName = keyof typeof mapClassNameByStyle;

export const styleGenerated = (styleName: StyleName) => {
  if (styleName in mapClassNameByStyle) {
    return mapClassNameByStyle[styleName as StyleName];
  } else {
    alert(`Стиль "${styleName}" не найден`);
    return '';
  }
};
