const ru = {
  translation: {
    feeds: 'Фиды',
    posts: 'Посты',
    preview: 'Просмотр',
    notification: {
      success: 'RSS успешно загружен',
    },
    errors: {
      exists: 'RSS уже существует',
      required: 'Не должно быть пустым',
      notUrl: 'Ссылка должна быть валидным URL',
      noRss: 'Ресурс не содержит валидный RSS',
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
    notification: {
      success: 'Rss has been loaded',
    },
    errors: {
      exists: 'Rss already exists',
      required: 'Field required',
      notUrl: 'Must be valid url',
      noRss: 'This source doesn\'t contain valid rss',
      network: 'Network error',
      unknown: 'Something went wrong',
    },
  },
};

export const yupLocale = {
  string: {
    url: () => ({ key: 'notUrl' }),
  },
  mixed: {
    required: () => ({ key: 'required' }),
    notOneOf: () => ({ key: 'exists' }),
  },
};

export default { en, ru };
