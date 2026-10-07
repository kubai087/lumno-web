// Inline SVGs carry their own filter and gradient ids, so each copy on the page gets a fresh prefix.
let count = 0;
export const nextSceneId = (prefix: string) => `${prefix}-${++count}`;
