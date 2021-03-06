// https://github.com/trashify/colors-regex
export const COLOR_REGEX = {
  hex: {
    strict: /^#([a-f0-9]{6}|[a-f0-9]{3})\b$/,
    global: /#([a-f0-9]{6}|[a-f0-9]{3})\b/gi
  },
  hexa: {
    strict: /^#([a-f0-9]{8}|[a-f0-9]{4})\b$/,
    global: /#([a-f0-9]{8}|[a-f0-9]{4})\b/gi
  },
  rgb: {
    strict: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    global: /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/gi
  },
  rgba: {
    strict: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/,
    global: /rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)/gi
  },
  hsl: {
    strict: /^hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)$/,
    global: /hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)/gi
  },
  hsla: {
    strict: /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/,
    global: /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)/gi
  }
};

function testRegex(regex, string) {
  return regex.test(string);
}

export function getRGBAComponents(rgbString) {
  // Simple hack to clone regex. Otherwise it holds state across fn calls
  let rgbRegex = eval(COLOR_REGEX.rgb.global.toString());
  let rgbaRegex = eval(COLOR_REGEX.rgba.global.toString());
  if (COLOR_REGEX.rgb.strict.test(rgbString)) {
    let match = rgbRegex.exec(rgbString);
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: 1
    };
  } else if (COLOR_REGEX.rgba.strict.test(rgbString)) {
    let match = rgbaRegex.exec(rgbString);
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: Number(match[4])
    };
  }
}

export function isColor(string) {
  if (!string) {
    return false;
  }
  let regexes = [];
  let color = false;
  // Test against all variants
  for (let key in COLOR_REGEX) {
    if (testRegex(COLOR_REGEX[key].strict, string) || testRegex(COLOR_REGEX[key].global, string)) {
      color = true;
      break;
    }
  }
  return color;
}
