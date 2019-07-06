var drag_type;
var drop_type;
function drag(event){
drag_type = event.target.getAttribute('data-value');
// console.log(type);
event.dataTransfer.setData(drag_type, event.target.id);
}
function allow_drop(event){
event.preventDefault();
}

function drop(event){
let status = document.getElementById('status');
drop_type = event.target.getAttribute('data-value');
if(drop_type != drag_type){
status.innerHTML = 'Wrong';
status.classList.remove('correct');
status.classList.add('wrong');
}
else{
status.innerHTML = 'Correct';
status.classList.remove('wrong');
status.classList.add('correct');
let data = event.dataTransfer.getData(drag_type);
event.target.appendChild(document.getElementById(data));
}
}