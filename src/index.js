import 'bootstrap/dist/css/bootstrap.min.css';
import get from './api/api';

const form = document.querySelector('.rss-form');
const input = form.querySelector('input');
const feedback = document.querySelector('.feedback');

const feedsSet = new Set();

function setFeedback(text, type = 'error') {
  feedback.textContent = text;
  feedback.style.display = 'block';
  if (type === 'error') {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('border-danger');
  } else if (type === 'success') {
    feedback.classList.add('text-success');
    feedback.classList.remove('text-danger');
    input.classList.remove('border-danger');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const feedUrl = input.value;

  if (!input.validity.valid) {
    setFeedback('Must be valid url');
    return;
  }

  if (feedsSet.has(feedUrl)) {
    setFeedback('Rss already exists');
    return;
  }

  get().then((response) => {
    setFeedback('Rss has been loaded', 'success');
    input.value = '';
    const data = parseRSS(response.data);

    feedsSet.add(feedUrl);

    addFeeds(data);
  });
});

function addFeeds(data) {
  const feedsContainer = document.querySelector('.feeds-container');
  feedsContainer.style.display = 'block';

  addFeedRow(data);
  addPosts(data);
}

function addFeedRow(data) {
  const feedsContainer = document.querySelector('.feeds-container');
  const feedsList = feedsContainer.querySelector('.feeds-list');

  // XSS?
  const row = `
    <li class="list-group-item">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
    </li>`;

  feedsList.insertAdjacentHTML('beforeend', row);
}

function addPosts(data) {
  data.posts.forEach((post) => {
    addPostRow(post);
  });
}

function addPostRow(post) {
  const postsList = document.querySelector('.posts-list');

  // XSS?
  const row = `
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <a
        href="${post.link}"
        class="font-weight-bold"
        data-id="200"
        target="_blank"
        rel="noopener noreferrer"
        >${post.title}
      </a>
  </li>`;

  postsList.insertAdjacentHTML('beforeend', row);
}

function parseRSS(xml) {
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(xml, 'text/xml');

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
