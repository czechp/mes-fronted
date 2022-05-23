const { default: colors } = require("configuration/colors");

const colorSpecifier = {
  report: (current, expect) => {
    const difference = expect - current;
    let color = colors.danger;
    if (difference < 5) color = colors.success;
    else if (difference >= 5 && difference < 10) color = colors.warning;
    return color;
  },
};

export default colorSpecifier;
