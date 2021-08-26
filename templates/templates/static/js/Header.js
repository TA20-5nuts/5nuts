function importHeader() {
  document.write(`
  <div id="header">
      <div class="header-item-left">
        <div id="logo">
          <img src="../static/team-logo.png" alt="logo" class="logo" />
        </div>
        <div>
          <a href="/home" class="header-link"><h5>5 Nuts</h5></a>
        </div>
      </div>
      <div class="header-item-center"></div>
      <div class="header-item-right">
        <div class="header-item">
          <h5>
            <a class="header-link" href="/introduction"
              ><i class="fas fa-info"></i> Allergy</a
            >
          </h5>
        </div>
        <div class="header-item">
          <h5>
            <a class="header-link" href="/resources"
              ><i class="fas fa-book-open"></i> Resources</a
            >
          </h5>
        </div>
        <div class="header-item">
          <h5>
            <a class="header-link" href="/quiz"
              ><i class="fas fa-diagnoses"></i> Quiz</a
            >
          </h5>
        </div>
        <div class="header-item">
          <h5>
            <a class="header-link" href="/game"
              ><i class="fas fa-puzzle-piece"></i> Game</a
            >
          </h5>
        </div>
      </div>
    </div>
    `);
}

importHeader();
