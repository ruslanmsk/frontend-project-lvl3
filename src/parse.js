export default function parseRSS(xml) {
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(xml, 'text/xml');

  if (doc.querySelector('parsererror')) {
    throw new Error('invalidRss');
  }

  const result = {
    title: doc.querySelector('channel > title').textContent,
    description: doc.querySelector('channel > description').textContent,
    link: doc.querySelector('channel > link').textContent,
    posts: Array.from(doc.querySelectorAll('item')).map((item) => ({
      title: item.querySelector('title').textContent,
      guid: item.querySelector('guid').textContent,
      link: item.querySelector('link').textContent,
      pubDate: item.querySelector('pubDate').textContent,
      description: item.querySelector('description').textContent,
    })),

  };
  return result;
}
