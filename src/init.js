import 'bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import parseRSS from './parse';
import locales, { yupLocale } from './locales';
import viewWatch from './viewWatch';

const rssTimeout = 5000;

function uniqueId() {
  return Math.random().toString();
}

function addProxy(url) {
  const urlWithProxy = new URL('/get', 'https://hexlet-allorigins.herokuapp.com');
  urlWithProxy.searchParams.set('url', url);
  urlWithProxy.searchParams.set('disableCache', 'true');
  return urlWithProxy.toString();
}

function setIntervalForRSS(watchedState) {
  setTimeout(() => {
    const promises = watchedState.feeds.map((feed) => axios.get(addProxy(feed.url))
      .then((response) => {
        const feedData = parseRSS(response.data.contents);
        const newPosts = feedData.items.map((item) => ({ ...item, channelId: feed.id }));
        const oldPosts = watchedState.posts.filter((post) => post.channelId === feed.id);
        const posts = newPosts
          .filter((post) => !oldPosts.map((oldPost) => oldPost.title).includes(post.title))
          .map((post) => ({ ...post, id: uniqueId() }));
        watchedState.posts.push(...posts);
      }));

    Promise.all(promises).then(() => {
      setIntervalForRSS(watchedState);
    });
  }, rssTimeout);
}

function validateUrl(url, feeds) {
  const schema = yup.string().url().required().notOneOf(feeds);
  return schema.validate(url);
}

function loadRSS(watchedState, feedUrl) {
  watchedState.loadingProcess.status = 'loading';

  axios.get(addProxy(feedUrl)).then((response) => {
    const data = parseRSS(response.data.contents);

    const feed = {
      url: feedUrl, id: uniqueId(), title: data.title, description: data.description,
    };
    const posts = data.items.map((item) => ({ ...item, channelId: feed.id, id: uniqueId() }));

    watchedState.posts.push(...posts);
    watchedState.feeds.push(feed);

    watchedState.loadingProcess.error = null;
    watchedState.loadingProcess.status = 'neutral';
    watchedState.form = {
      ...watchedState.form,
      status: 'filling',
      error: null,
    };
  }).catch((error) => {
    if (error.isAxiosError) {
      watchedState.loadingProcess.error = 'network';
    } else if (error.isRssParsingError) {
      watchedState.loadingProcess.error = 'invalidRss';
    } else {
      watchedState.loadingProcess.error = 'unknown';
    }

    watchedState.loadingProcess.status = 'failed';
  });
}

export default () => {
  const initState = {
    feeds: [],
    posts: [],
    viewedPosts: new Set(),
    modalPostId: null,
    loadingProcess: {
      status: 'neutral',
      error: null,
    },
    form: {
      error: null,
      status: 'filling',
      valid: false,
    },
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.rss-form input'),
    feedback: document.querySelector('.feedback'),
    submit: document.querySelector('.rss-form button[type="submit"]'),
    feedsBox: document.querySelector('.feeds'),
    postsBox: document.querySelector('.posts'),
    modal: document.querySelector('#previewPost'),
  };

  const i18nextInstance = i18next.createInstance();

  return i18nextInstance.init({
    fallbackLng: 'ru',
    lng: 'ru',
    debug: true,
    resources: locales,
  }).then(() => {
    yup.setLocale(yupLocale);
    const watchedState = viewWatch(elements, initState, i18nextInstance);

    elements.postsBox.addEventListener('click', (event) => {
      const { id } = event.target.dataset;
      if (id) {
        watchedState.modalPostId = id;
        watchedState.viewedPosts.add(id);
      }
    });

    elements.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const feedUrl = formData.get('url');

      validateUrl(feedUrl, watchedState.feeds.map((feed) => feed.url)).then(() => {
        watchedState.form = {
          ...watchedState.form,
          valid: true,
          error: null,
        };

        loadRSS(watchedState, feedUrl);
      }, (error) => {
        watchedState.form = {
          ...watchedState.form,
          valid: false,
          error: error.message.key,
        };
      });
    });

    setIntervalForRSS(watchedState);
  });
};
