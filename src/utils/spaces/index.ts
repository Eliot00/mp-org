export function insertZeroWidthSpaces(text: string) {
  // 正则表达式，用于匹配 Org mode 的行内样式
  const patterns = [
    /(?<!\s|\u200B)\*(\S.*?)\*(?!\s|\u200B)/g,
    /(?<!\s|\u200B)\/(\S.*?)\/(?!\s|\u200B)/g,
    /(?<!\s|\u200B)_(\S.*?)_(?!\s|\u200B)/g,
    /(?<!\s|\u200B)=([^=\s].*?)=(?!\s|\u200B)/g,
    /(?<!\s|\u200B)\+(\S.*?)\+(?!\s|\u200B)/g,
    /(?<!\s|\u200B)~(\S.*?)~(?!\s|\u200B)/g,
  ];

  // 对每个模式进行处理
  patterns.forEach((pattern) => {
    text = text.replace(pattern, (match) => {
      // 在匹配的文本前后插入零宽空格（\u200B）
      return `\u200B${match}\u200B`;
    });
  });

  return text;
}
