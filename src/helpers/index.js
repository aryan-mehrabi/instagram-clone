export const calculateTimeAgo = time => {
  const ago = (Date.now() - time) / 1000;
  let diffrence, text;
  if (ago < 60) {
    diffrence = ago;
    text = " seconds ago";
  } else if (ago < 3600) {
    diffrence = ago / 60;
    text = " minutes ago";
  } else if (ago < 21600) {
    diffrence = ago / 3600;
    text = " hours ago";
  } else {
    diffrence = ago / 86400;
    text = " days ago";
  }
  return Math.floor(diffrence) + text;
};
