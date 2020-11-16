/**
 * Show About modal
 * @returns {void}
 */
function about() {
  $('#modal').empty().append(`
    <div class="modal-background" id="background"></div>
    <div class="flex direction-column modal-body">
      <div class="title mb-16 text-center">About</div>
      <div class="flex direction-column justify-content-between h100">
        <div class="content mb-16" id="about-content"></div>
        <div class="flex justify-content-center">
          <button
            class="button pointer"
            id="about-close"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `)

  $('#about-content').empty().append(`
    <div class="flex direction-column justify-content-between">
      <div class="mb-16">
        This is a simple Snake game.
      </div>
      <div>
        Frontend repository:
      </div>
      <div class="mb-16">
        <a href="https://github.com/peterdee/js-snake">
          https://github.com/peterdee/js-snake
        </a>
      </div>
      <div>
        Backend repository:
      </div>
      <div class="mb-16">
        <a href="https://github.com/peterdee/deno-snake">
          https://github.com/peterdee/deno-snake
        </a>
      </div>
      <div>
        Hosted on <a href="https://www.heroku.com/">Heroku</a>.
      </div>
    </div>
  `)

  // close modal
  $('#background').on('click', () => $('#modal').empty());
  $('#about-close').on('click', () => $('#modal').empty());
}
