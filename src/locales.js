const ru = {
  translation: {
    feeds: 'Фиды',
    posts: 'Посты',
    preview: 'Просмотр',
    success: 'RSS успешно загружен',
    errors: {
      rssExists: 'RSS уже существует',
      required: 'Не должно быть пустым',
      invalidURL: 'Ссылка должна быть валидным URL',
      invalidRss: 'Ресурс не содержит валидный RSS',
      network: 'Ошибка сети',
      unknown: 'Неизвестная ошибка. Что-то пошло не так.',
    },
  },
};

const en = {
  translation: {
    feeds: 'Feeds',
    posts: 'Posts',
    preview: 'Preview',
    success: 'Rss has been loaded',
    errors: {
      rssExists: 'Rss already exists',
      required: 'Field required',
      invalidURL: 'Must be valid url',
      invalidRss: 'This source doesn\'t contain valid rss',
      network: 'Network error',
      unknown: 'Something went wrong',
    },
  },
};

export const yupLocale = {
  string: {
    url: () => ({ key: 'invalidURL' }),
  },
  mixed: {
    required: () => ({ key: 'required' }),
    notOneOf: () => ({ key: 'rssExists' }),
  },
};

export default { en, ru };
