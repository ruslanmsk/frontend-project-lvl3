const ru = {
  translation: {
    loading: {
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
    feeds: 'Фиды',
    posts: 'Посты',
    preview: 'Просмотр',
  },
};

const en = {
  translation: {
    loading: {
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
    feeds: 'Feeds',
    posts: 'Posts',
    preview: 'Preview',
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
