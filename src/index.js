import 'bootstrap/dist/css/bootstrap.min.css';

function generateComponent() {
  const element = document.createElement('div');

  element.innerHTML = `<div class="jumbotron">
  <h1 class="display-4">Hello, world3!</h1>
  <form style="display: inline-block;">
    <input>
  </form>
  <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
</div>`;

  return element;
}

document.body.appendChild(generateComponent());
