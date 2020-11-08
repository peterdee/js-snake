/**
 * Show Highscores modal
 * @returns {Promise<*>}
 */
async function highscores() {
  try {
    $('#modal').empty().append(`
      <div class="modal-background" id="background"></div>
      <div class="flex direction-column modal-body">
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

    // TODO: load the data
    const stub = [
      {
        id: 1,
        name: 'Jack',
        score: 50,
      },
      {
        id: 2,
        name: 'Kayle',
        score: 40,
      },
      {
        id: 3,
        name: 'Lionell',
        score: 30,
      },
    ];

    // display the data
    stub.forEach((item) => $('#hs-content').append(`
      <div class="flex hs-row" id="${item.id}">
        <div class="hs-col">${item.name}</div>
        <div class="hs-col">${item.score}</div>
      </div>
    `));

    // close modal via backdrop
    $('#background').on('click', () => $('#modal').empty());
    $('#hs-close').on('click', () => $('#modal').empty());
  } catch (error) {
    
  }
}
