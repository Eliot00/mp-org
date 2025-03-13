export function insertZeroWidthSpaces(raw: string) {
	let result = raw;
	// 存储匹配到的链接
	const linkMatches: string[] = [];

	// 改进的 Org mode 链接正则表达式
	const linkRegex =
		/\[\[(?:[^\[\]]|\[(?!\[)|\](?!\]))*\](?:\[(?:[^\[\]]|\[(?!\[)|\](?!\]))*\])?\]/g;

	// 替换链接为临时占位符
	result = result.replace(linkRegex, (match) => {
		linkMatches.push(match);
		return `\u200B$LINK$${linkMatches.length - 1}$\u200B`;
	});

	// 正则表达式匹配行内样式（排除已处理的情况）
	const patterns = [
		/(?<!\s|\u200B)\*(\S.*?)\*(?!\s|\u200B)/g, // 粗体
		/(?<!\s|\u200B)\/(\S.*?)\/(?!\s|\u200B)/g, // 斜体
		/(?<!\s|\u200B)_(\S.*?)_(?!\s|\u200B)/g, // 下划线
		/(?<!\s|\u200B)=([^=\s].*?)=(?!\s|\u200B)/g, // 等宽
		/(?<!\s|\u200B)\+(\S.*?)\+(?!\s|\u200B)/g, // 删除线
		/(?<!\s|\u200B)~(\S.*?)~(?!\s|\u200B)/g, // 代码
	];

	// 处理每个模式，添加零宽空格
	for (const pattern of patterns) {
		result = result.replace(pattern, (match) => `\u200B${match}\u200B`);
	}

	// 修复：恢复所有被替换的链接
	for (let i = 0; i < linkMatches.length; i++) {
		const placeholder = `\u200B$LINK$${i}$\u200B`;
		result = result.replace(placeholder, linkMatches[i]);
	}

	return result;
}
