function getRootPageArticles() {
  // fetch("http://127.0.0.1:5000/api/web-link") // development
  fetch("http://5nuts-env.eba-3b7dh5h5.ap-southeast-2.elasticbeanstalk.com/api/web-link") // production
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let articles = data.articles_data;
    // console.log(articles);
    // console.log(typeof articles);

    parseData(articles);
  })
  .catch((err) => console.log(err));
}

/**
 * parse list to table format
 * @param list table data
 */
function parseData(list) {
  // separate table head and table body
  let theadData = list[0];
  let tbodyData = list.slice(1);

  let articleSection = document.getElementById("articles");
  let table = document.createElement("table");
  table.setAttribute("class", "table caption-top table-striped table-hover fade-in-down");

  let caption = table.createCaption();
  caption.innerHTML = "<strong>Useful Articles</strong>";
  table.appendChild(caption);

  let thead = createTableHead(theadData);
  table.appendChild(thead);

  let tbody = createTableBody(tbodyData);
  table.appendChild(tbody);

  articleSection.appendChild(table);
}

/**
 * create thead tag
 * @param data data for thead
 * @returns {HTMLTableSectionElement}
 */
function createTableHead(data) {
  let thead = document.createElement("thead");
  let tr = createTableRow(data, true)
  thead.appendChild(tr);
  return thead;
}

/**
 * create tbody tag
 * @param data data for tbody
 * @returns {HTMLTableSectionElement}
 */
function createTableBody(data) {
  let tbody = document.createElement("tbody");
  for (let i = 0; i < data.length; i++) {
    let tr = createTableRow(data[i], false);
    tbody.appendChild(tr);
  }
  return tbody;
}

/**
 * create tr tag and append to thead or tbody
 * @param data data need to be add in the table
 * @param thead boolean value, true if current row is thead, false otherwise
 * @returns {HTMLTableRowElement}
 */
function createTableRow(data, thead) {
  let tr = document.createElement('tr');
  for (let i = 0; i < data.length; i++) {
    if (!thead) {
      let td = document.createElement("td");
      let text = data[i];
      if (i == 1) {
        let a = document.createElement("a");
        let aHref = document.createTextNode(text);
        a.appendChild(aHref)
        a.href = text;
        a.setAttribute("target", "_blank");
        td.appendChild(a);
      } else {
        td.appendChild(document.createTextNode(text));
      }
      tr.appendChild(td);
    } else {
      let th = document.createElement("th");
      th.setAttribute("scope", "col");
      th.appendChild(document.createTextNode(data[i]));
      tr.appendChild(th);
    }
  }
  return tr;
}

getRootPageArticles();