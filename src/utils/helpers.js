// 날짜 포맷팅 함수
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ko-KR');
};

// 문자열 길이 제한 함수
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// 이메일 유효성 검사 함수
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 숫자 포맷팅 함수
export const formatNumber = (number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
}; 