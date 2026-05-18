// accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// tab 
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// zoom sulla hero image durante lo scroll
window.addEventListener('scroll', function() {
        var hero = document.querySelector('.hero_image');
        var scrollY = window.scrollY;
        
        // Calcola lo zoom: parte da 100% e arriva fino a 130%
        // Maggiore è scrollY, più si zoomma
        var zoomLevel = 100 + (scrollY * 0.06);
        
        // Limita lo zoom massimo (evita che diventi troppo grande)
        if (zoomLevel > 130) zoomLevel = 130;
        if (zoomLevel < 100) zoomLevel = 100;
        
        hero.style.backgroundSize = zoomLevel + '%';
    });

// sort table 
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// search bar sulla tabella
// prende gli elementi dalla pagina
const searchInput = document.getElementById("search");
const table = document.getElementById("myTable");

// filtra le righe della tabella
function filterTable(query) {
    // prende tutte le righe della tabella (no intestazione)
    const rows = table.getElementsByTagName("tr");
    
    // la query è vuota, mostra tutte le righe
    if (!query.trim()) {
        for (let i = 1; i < rows.length; i++) {
            rows[i].style.display = "";  // mostra tutte
        }
        return;
    }

    // ricerca case-insensitive
    const searchTerm = query.toLowerCase();
    let risultatiTrovati = 0;

    // scansiona ogni riga (parte da 1 per saltare intestazione)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        let testoRiga = "";
        
        // prende il testo da tutte le celle della riga
        const cells = row.getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
            testoRiga += cells[j].textContent.toLowerCase() + " ";
        }
        
        // se la riga contiene la parola cercata, la mostra, altrimenti la nasconde
        if (testoRiga.includes(searchTerm)) {
            row.style.display = "";
            risultatiTrovati++;
        } else {
            row.style.display = "none";
        }
    }
    
    // messaggio per nessun risultato
    const existingMsg = document.getElementById("noResultsMsg");
    if (risultatiTrovati === 0 && searchTerm !== "") {
        if (!existingMsg) {
            const msg = document.createElement("tr");
            msg.id = "noResultsMsg";
            msg.innerHTML = `<td colspan="5" style="text-align: center; padding: 40px;">
                                🔍 Nessun risultato trovato per "${query}"
                             </td>`;
            table.appendChild(msg);
        }
    } else if (existingMsg) {
        existingMsg.remove();
    }
}

// fa le cose durante l'evento "input" (mentre scrivo nella search bar)
searchInput.addEventListener("input", function() {
    filterTable(this.value);
});