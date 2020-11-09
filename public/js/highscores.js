/**
 * Show Highscores modal
 * @returns {Promise<*>}
 */
async function highscores() {
  try {
    $('#modal').empty().append(`
      <div class="modal-background" id="background"></div>
      <div class="flex direction-column modal-body noselect">
        <div class="title mb-16 text-center">TOP-10 highscores</div>
        <div class="flex direction-column justify-content-between">
          <div class="content mb-16" id="hs-content"></div>
          <div class="flex justify-content-center">
            <button
              class="button pointer"
              id="hs-close"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    `)

    $('#hs-content').empty().append(`
      <div class="text-center">
        Loading...
      </div>
    `);

    // load highscores
    const { data = [] } = await $.ajax({
      method: 'GET',
      url: 'http://localhost:7111/api/highscores',
    });

    // display the data
    $('#hs-content').empty();
    data.forEach((item) => $('#hs-content').append(`
      <div class="flex hs-row" id="${item.id}">
        <div class="hs-col">${item.name}</div>
        <div class="hs-col">${item.score}</div>
      </div>
    `));

    // close modal via backdrop
    $('#background').on('click', () => $('#modal').empty());
    return $('#hs-close').on('click', () => $('#modal').empty());
  } catch (error) {
    return $('#hs-content').empty().append(`
      <div class="text-center error">
        Error loading the highscores!
      </div>
    `);
  }
}
