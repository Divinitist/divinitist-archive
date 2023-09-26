function rgbToHex(rgb) {
    var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return null;
    var hex = '#' + ((1 << 24) | (match[1] << 16) | (match[2] << 8) | match[3]).toString(16).slice(1);
    return hex;
}