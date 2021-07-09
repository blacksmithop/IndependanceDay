function makeTable() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var g = response; //parsed json
            var output = "";
            for (var i = 0; i < g.length; i++) {
                output += `
                <tr>
                <td>${g[i].SNo}</td>
                <td>${g[i].Name}</td>
                <td>${g[i].Quantity}</td>
                <td>${g[i].Unit}</td>
                <td>${g[i].Department}</td>
                <td>${g[i].Notes}</td>
              </tr>`;
            }
            document.getElementsByClassName("table-inner")[0].innerHTML = output;
        }
    };
    xhttp.open("GET", "./data.json", true);
    xhttp.send();
}
