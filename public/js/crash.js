/**
 * Handle score form
 * @param {Event} event - form event
 * @param {number} score - game score
 * @returns {Promise<void>}
 */
async function handleForm(event, score = 0) {
  event.preventDefault();

  // clear the form error
  $('#form-error').empty();
  
  // check if name is provided
  const name = $('#player-name').val();
  if (!name) {
    return $('#form-error').append('Please provide a name!');
  }
  const trimmedName = name.trim();
  if (!trimmedName) {
    return $('#form-error').append('Please provide a correct name!');
  }

  // publish the score
  try {
    await $.ajax({
      data: JSON.stringify({
        name: trimmedName,
        score: String(score),
      }),
      method: 'POST',
      url: `${BACKEND_URI}/api/highscores`,
    });

    // store player name in the localStorage
    localStorage.setItem('name', name);

    // refresh the window
    return window.location.reload();
  } catch (error) {
    return $('#form-error').append('Error publishing the score!');
  }
}

/**
 * Show Crash modal
 * @param {number} score - game score
 * @returns {Promise<*>}
 */
async function crash(score = 0) {
  try {
    $('#modal').empty().append(`
      <div class="modal-background" id="background"></div>
      <div class="flex direction-column modal-body crash-modal noselect">
        <div class="title mb-16 text-center">Crashed!</div>
        <div class="flex direction-column justify-content-between">
          <div class="content mb-16" id="crash-content"></div>
          <div class="flex justify-content-center"></div>
        </div>
      </div>
    `)

    // show a highscore form
    $('#crash-content').empty().append(`
      <div class="text-center mb-16">
        Your score is ${score} points!
      </div>
      <form id="score-form">
        <input
          class="input mb-16"
          id="player-name"
          name="name"
          placeholder="Name"
          type="text"
        />
        <div
          class="form-error text-center mb-16"
          id="form-error"
        ></div>
        <div
          class="text-center mb-16"
          id="in-top"
        ></div>
        <div class="flex justify-content-between">
          <button
            class="button pointer"
            id="crash-close"
            type="button"
          >
            Cancel
          </button>
          <button
            class="button success pointer"
            type="submit"
          >
            Publish
          </button>
        </div>
      </form>
    `);

    // show 'Loading...'
    $('#in-top').empty().append(`
      <div class="text-center">
        Loading...
      </div>
    `);

    // check if score is in top-10
    const { data: { isInTop = false } = {} } = await $.ajax({
      method: 'GET',
      url: `${BACKEND_URI}/api/highscores/check?score=${score}`,
    });

    // set a name from localStorage (if there are any)
    $('#player-name').val(localStorage.getItem('name') || '');

    // show a layout depending on the check result
    if (isInTop) {
      $('#in-top').empty().append(
        'Congratulations! Your score is in TOP-10!',
      );
    } else {
      $('#in-top').empty().append(
        'Your score is not in TOP-10, but you can still publish it!',
      );
    }
    
    // handle form submit
    $('#score-form').on('submit', (event) => handleForm(event, score));

    // reload the window on closing
    $('#background').on('click', () => window.location.reload());
    return $('#crash-close').on('click', () => window.location.reload());
  } catch (error) {
    return $('#crash-content').empty().append(`
      <div class="text-center error">
        Error publishing the score!
      </div>
    `);
  }
}
