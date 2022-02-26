const taskList = [];

const badList = [];

const weekHrs = 168;

const taskListElm = document.getElementById("task-list");

const badListElm = document.getElementById("bad-list");

const handleOnSubmit = (e) => {
  const frmDt = new FormData(e);
  const task = frmDt.get("task");
  const hr = +frmDt.get("hr");
  if (hr < 1) {
    return alert("Please Enter Valid Hour ");
  }

  const obj = {
    task,
    hr,
  };

  const tt1Hr = taskTotalHrs();
  const tt1BadHour = badTotalHours();
  if (tt1Hr + tt1BadHour + hr > weekHrs) {
    return alert("You have exceeded the weekly hours");
  }

  taskList.push(obj);

  display();
};

// Display task lint in the dom

const display = () => {
  let str = "";

  // loop through task list and convert in to tr string

  taskList.map((items, i) => {
    str += `
     <tr>
        <td>
                      <input type="checkbox" />
                    </td>
                    <td>${items.task}</td>
                    <td>${items.hr}</td>
                    <td>
                      <button class="btn btn-danger" onclick="deleteTaskList(${i})">
                        <i class="fas fa-trash-alt"></i>
                      </button>

                      <button class="btn btn-primary" onclick="markAsNotToDo(${i})">
                        <i class="fa-solid fa-arrow-right-long"></i>
                      </button>
                    </td>
     </tr>

    `;
  });

  taskListElm.innerHTML = str;
  taskTotalHrs();
};

// Display bad list in the bad list

const displayBadList = () => {
  let str = "";

  badList.map((item, i) => {
    str += `
         <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button class="btn btn-warning" onclick=" markAsTask(${i})" >
                        <i class="fas fa-long-arrow-left"></i>
                      </button>

                      <button class="btn btn-danger g-3" onclick="deleteBadList(${i})">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>`;
  });

  badListElm.innerHTML = str;
  taskTotalHrs();
};

// Delete item for the task list

const deleteTaskList = (i) => {
  const itm = taskList.splice(i, 1);

  display();

  return itm[0];
};

// mark task as to not to do item

const markAsNotToDo = (i) => {
  const badItm = deleteTaskList(i);
  badList.push(badItm);
  displayBadList();
};

const deleteBadList = (i) => {
  const item = badList.splice(i, 1);
  displayBadList();

  return item[0];
};

const markAsTask = (i) => {
  const badItm = deleteBadList(i);
  taskList.push(badItm);
  display();
};

// Total hours

// Display total hours

const taskTotalHrs = () => {
  const total = taskList.reduce((acc, item) => acc + item.hr, 0);
  const tt1BadHour = badTotalHours();
  const grandTotal = total + tt1BadHour;

  document.getElementById("total-hr").innerHTML = grandTotal;
  return grandTotal;
};

// Display bad hours

const badTotalHours = () => {
  const total = badList.reduce((acc, item) => acc + item.hr, 0);

  document.getElementById("bad-hr").innerHTML = total;
  return total;
};
