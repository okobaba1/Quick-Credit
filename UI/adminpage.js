const table = document.getElementById('table');
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];
                
    for(let i = 1; i < table.rows.length; i++){
        table.rows[i].onclick = function(){
            
            modal.style.display = "block";
            document.getElementById('name').innerHTML = this.cells[0].innerHTML;
            document.getElementById('loan').innerHTML = this.cells[1].innerHTML;
            document.getElementById('date').innerHTML = this.cells[2].innerHTML;
            // console.log()
            // rIndex = this.rowIndex;
                
        };
    };
span.onclick = function() {
    modal.style.display = "none";
};
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    };
};