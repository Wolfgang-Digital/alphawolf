export const toTitleCase = str => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
};

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) => order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);

export const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

export const countChildren = root => {
  if (!root) return 0;
  let total = root.length;
  total += root.reduce((a, n) => a + countChildren(n._comments), 0);
  return total;
};

export const countVotes = votes => {
  return votes.reduce((a, n) => {
    a.likes += n.value === 1 && 1;
    a.dislikes += n.value === -1 && 1;
    a.score += n.value;
    return a;
  }, { likes: 0, dislikes: 0, score: 0 });
};