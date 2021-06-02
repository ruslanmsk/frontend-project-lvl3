export default function parseRSS(xml) {
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(xml, 'text/xml');

  if (doc.querySelector('parsererror')) {
    const error = new Error('invalidRss');
    error.isRssParsingError = true;
    throw error;
  }

  return {
    title: doc.querySelector('channel > title').textContent,
    description: doc.querySelector('channel > description').textContent,
    link: doc.querySelector('channel > link').textContent,
    items: Array.from(doc.querySelectorAll('item')).map((item) => ({
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
    })),
  };
}
