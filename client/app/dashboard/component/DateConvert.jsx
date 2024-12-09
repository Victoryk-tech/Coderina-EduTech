// TimeAgo.js (or within the same file)
const DateConvert = ({ date }) => {
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = Math.abs(now - date);

    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      return "Today";
    } else if (diffDays < 30) {
      return `${diffDays}d`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths}mon`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears}yr`;
    }
  };

  return <span>{getTimeAgo(date)}</span>;
};

export default DateConvert;
