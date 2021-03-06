import onChange from 'on-change';

export default (elements, initState, i18next) => {
  const renderForm = (state) => {
    const { form: { valid, error } } = state;
    const { input, feedback } = elements;
    if (valid) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');
      feedback.textContent = i18next.t([`errors.${error}`, 'errors.unknown']);
    }
  };

  const renderLoadingStatus = (state) => {
    const { loadingProcess } = state;
    const { submit, input, feedback } = elements;

    switch (loadingProcess.status) {
      case 'failed':
        submit.disabled = false;
        input.removeAttribute('readonly');
        feedback.classList.add('text-danger');
        feedback.textContent = i18next.t([`errors.${loadingProcess.error}`, 'errors.unknown']);
        break;
      case 'neutral':
        submit.disabled = false;
        input.removeAttribute('readonly');
        input.value = '';
        feedback.classList.add('text-success');
        feedback.textContent = i18next.t('success');
        break;
      case 'loading':
        submit.disabled = true;
        input.setAttribute('readonly', true);
        feedback.classList.remove('text-success');
        feedback.classList.remove('text-danger');
        feedback.innerHTML = '';
        break;
      default:
        throw new Error(`Unknown loadingProcess status: '${loadingProcess.status}'`);
    }
  };

  const renderFeeds = (state) => {
    const { feeds } = state;
    const { feedsBox } = elements;
    const fragment = document.createDocumentFragment();
    const feedsTitle = document.createElement('h2');
    feedsTitle.textContent = i18next.t('feeds');
    fragment.appendChild(feedsTitle);

    const feedsList = document.createElement('ul');
    feedsList.classList.add('list-group', 'mb-5');

    const feedsListItems = feeds.map((feed) => {
      const element = document.createElement('li');
      element.classList.add('list-group-item');
      const title = document.createElement('h3');
      title.textContent = feed.title;
      const description = document.createElement('p');
      description.textContent = feed.description;
      element.append(title, description);
      return element;
    });

    feedsList.append(...feedsListItems);
    fragment.appendChild(feedsList);
    feedsBox.innerHTML = '';
    feedsBox.appendChild(fragment);
  };

  const renderPosts = (state) => {
    const { posts, viewedPosts } = state;
    const { postsBox } = elements;
    const fragment = document.createDocumentFragment();
    const postsTitle = document.createElement('h2');
    postsTitle.textContent = i18next.t('posts');
    fragment.appendChild(postsTitle);

    const postsList = document.createElement('ul');
    postsList.classList.add('list-group');

    const postsListItems = posts.map((post) => {
      const element = document.createElement('li');
      element.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      const link = document.createElement('a');
      link.setAttribute('href', post.link);
      const className = viewedPosts.has(post.id) ? 'fw-normal' : 'fw-bold';
      link.classList.add(className);
      link.dataset.id = post.id;
      link.textContent = post.title;
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      element.appendChild(link);
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('btn', 'btn-primary', 'btn-sm');
      button.dataset.id = post.id;
      button.dataset.toggle = 'modal';
      button.dataset.target = '#previewPost';
      button.textContent = i18next.t('preview');
      element.appendChild(button);
      return element;
    });

    postsList.append(...postsListItems);
    fragment.appendChild(postsList);
    postsBox.innerHTML = '';
    postsBox.appendChild(fragment);
  };

  const renderModal = (state) => {
    const post = state.posts.find(({ id }) => id === state.modalPostId);

    const title = elements.modal.querySelector('.modal-title');
    title.textContent = post.title;

    const body = elements.modal.querySelector('.modal-body');
    body.textContent = post.description;

    const fullArticleBtn = elements.modal.querySelector('.full-post');
    fullArticleBtn.href = post.link;
  };

  const watchedState = onChange(initState, (path) => {
    switch (path) {
      case 'form':
        renderForm(initState);
        break;
      case 'feeds':
        renderFeeds(initState);
        break;
      case 'loadingProcess.status':
        renderLoadingStatus(initState);
        break;
      case 'posts':
      case 'viewedPosts':
        renderPosts(initState);
        break;
      case 'modalPostId':
        renderModal(initState);
        break;
      default:
        break;
    }
  });

  return watchedState;
};
