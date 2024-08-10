// localStorage.clear()
// DEFINING VARIABLES
const newTask = document.getElementById("new-task");
const TaskContainer = document.getElementById("task-list");
const addTask = document.getElementById("add-task");

let isEditing = false;
let editabelATTTIBUT = "";
// EVENT LESTENERS
let valuesArray = [];
//
valuesArray = Object.values(localStorage).filter((element) => {
  return element !== "ERROR";
});
let keysArray = [];
for (let i = 0; i < localStorage.length; i++) {
  if (localStorage.key(i) !== "loglevel") {
    keysArray.push(localStorage.key(i));
  }
}
// let StorageEntries = Object.entries(localStorage).filter((element)=>{return element[0] !== "loglevel"})
// console.log(StorageEntries[0]);

addTask.addEventListener("click", (element) => {
  if (newTask.value !== "" && isEditing == false) {
    valuesArray.push(newTask.value);
    localStorage.setItem(
      `${valuesArray.indexOf(newTask.value)}`,
      `${newTask.value}`
    );

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) !== "loglevel") {
        if (keysArray.includes(localStorage.key(i)) === false) {
          if (localStorage.key(0) == 0) {
            keysArray.splice(1, 0, localStorage.key(i));
          } else {
            keysArray.unshift(localStorage.key(i));
          }
        }
      }
    }

    newTask.value = "";
  }
  if (isEditing == true) {
    localStorage.setItem(editabelATTTIBUT, newTask.value);
    isEditing = false;
    newTask.value = "";
  }

  parsingTASKS();
});

function Thedeleter() {
  const deletTask = document.querySelectorAll("#delete-button");
  const editTask = document.querySelectorAll("#edit-button");
  const tasksList = document.querySelectorAll(".task")
  deletTask.forEach((element) => {
    element.addEventListener("click", () => {
      keysArray = keysArray.filter((arrayValue) => {
        return arrayValue !== `${element.getAttribute("data-key")}`;
      });

      console.log(element.getAttribute("data-key"));
      localStorage.removeItem(element.getAttribute("data-key"));
      console.log(keysArray);
      // console.log(valuesArray);
      console.dir(localStorage);
      newTask.value = ''
      parsingTASKS();
    });
  });

  editTask.forEach((element) => {
    element.addEventListener("click", () => {
      tasksList.forEach((element)=>{
        element.id = ''
      })
      isEditing = true;
      newTask.value = localStorage.getItem(element.getAttribute("data-key"));
      editabelATTTIBUT = element.getAttribute("data-key");
      const beignEdited = document.querySelector(`[ data-key = "${editabelATTTIBUT}"]`)
      beignEdited.id = "editing"
    });
  });
}

function parsingTASKS() {
  TaskContainer.innerHTML = "";

  keysArray.forEach((keys) => {
    TaskContainer.innerHTML += `<li class="task"  data-key=${keys}>
            <span class="task-text">${localStorage.getItem(keys)}</span>
            <div class="task-buttons">
                <button class="edit-button" id="edit-button" data-key=${keys}><svg style="fill: white;" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 32 32">
                    <path d="M 23.900391 3.9726562 C 22.853426 3.9726562 21.805365 4.3801809 20.992188 5.1933594 L 5.1796875 21.007812 L 3.7246094 28.275391 L 10.992188 26.820312 L 11.207031 26.607422 L 26.806641 11.007812 C 28.432998 9.381456 28.432998 6.8197164 26.806641 5.1933594 C 25.993462 4.3801809 24.947355 3.9726563 23.900391 3.9726562 z M 23.900391 5.8769531 C 24.403426 5.8769531 24.905757 6.1206004 25.392578 6.6074219 C 26.366221 7.5810649 26.366221 8.620107 25.392578 9.59375 L 24.699219 10.285156 L 21.714844 7.3007812 L 22.40625 6.6074219 C 22.893072 6.1206004 23.397355 5.8769531 23.900391 5.8769531 z M 20.300781 8.7148438 L 23.285156 11.699219 L 11.175781 23.810547 C 10.519916 22.5187 9.4812999 21.480084 8.1894531 20.824219 L 20.300781 8.7148438 z M 6.9042969 22.576172 C 8.0686534 23.064699 8.9374718 23.931222 9.4257812 25.095703 L 6.2753906 25.726562 L 6.9042969 22.576172 z"></path>
                    </svg></button>
                <button class="delete-button" id="delete-button" data-key=${keys}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(3.55556,3.55556)"><path d="M33,13c-1.105,0 -2,0.895 -2,2v1h-13c-2.209,0 -4,1.791 -4,4c0,1.97365 1.43236,3.60263 3.3125,3.92969l2.39453,28.73437c0.343,4.113 3.84661,7.33594 7.97461,7.33594h18.63672c4.128,0 7.63161,-3.22194 7.97461,-7.33594l2.39453,-28.73437c1.88014,-0.32705 3.3125,-1.95604 3.3125,-3.92969c0,-2.209 -1.791,-4 -4,-4h-13v-1c0,-1.105 -0.895,-2 -2,-2z"></path></g></g>
                    </svg></button>
            </div>
        </li>`;
  });
  Thedeleter();
}

parsingTASKS();
