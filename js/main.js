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

// tab (nomi sono quelli di w3schools)
function openCity(evt, cityName) {
  // dichiaro variabili
  var i, tabcontent, tablinks;

  // elementi con class="tabcontent" da nascondere
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // elementi class="tablinks" senza "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // mostro tab cliccata/attiva, aggiuno "active" come classe al bottone che l'ha aperta
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// zoom sulla hero image durante lo scroll
window.addEventListener('scroll', function() {
        var hero = document.querySelector('.hero_image');
        var scrollY = window.scrollY;
        
        // calcola zoom: parte da 100% e arriva fino a 130%
        // maggiore è scrollY, più si zoomma
        var zoomLevel = 100 + (scrollY * 0.06);
        
        // limita lo zoom massimo (evita che diventi troppo grande)
        if (zoomLevel > 130) zoomLevel = 130;
        if (zoomLevel < 100) zoomLevel = 100;
        
        hero.style.backgroundSize = zoomLevel + '%';
    });

// sort table, cliccando l'header della colonna si sistemano i contenuti della colonna
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //direzione ascendente:
  dir = "asc"; 
  //loop per far continuare finchè non smettono di switchare
  while (switching) {
    //all'inizio dire nessuno switching:
    switching = false;
    rows = table.rows;
    // loop per tutte le righe tranne la prima (header)
    for (i = 1; i < (rows.length - 1); i++) {
      //inizio dicendo che non deve switchare
      shouldSwitch = false;
      //prendi elementi da comparare sulla linea corrente e sulla seguente
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      //guarda se dovrebbero switchare
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //se devono fai lo switch e finisci il loop
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //vedi sopra
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      // se lo switch è fatto marcalo come fatto
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //e quindi aumenta il conto
      switchcount ++;      
    } else {
      //se non ci sono switch e direzione è asc, cambia la dirzione e fallo di nuovo.
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
