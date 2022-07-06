export const generatePageRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const getWordsFromContent = (content: string, length: number) => {
  const contentArr = content.split(' ');
  return contentArr.length > length
    ? contentArr.splice(0, length).join(' ') + ' ...'
    : content;
};

export const formatTime = (date: string) => {
  const f = new Intl.DateTimeFormat('US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return f.format(new Date(date));
};
