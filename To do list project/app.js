let section = document.querySelector("section");

let add = document.querySelector("form button");
add.addEventListener("click", e => {
    e.preventDefault();

    //get input value
    let form = e.target.parentElement;
    let todoText = form.children[0].value
    let todoMonth = form.children[1].value
    let todoDate = form.children[2].value

    if (todoText === ""){
        alert("請輸入文字");
        return;
    }
    if (todoMonth > 12 || todoMonth < 0){
        alert("請輸入正確月份");
        return;
    }
    if (todoDate > 31 || todoDate < 0){
        alert("請輸入正確日期");
        return;
    }


    //create todo item
    let todo = document.createElement("div");
    todo.classList.add("todo");

    let text = document.createElement("p");
    text.innerText = todoText;
    text.classList.add("todo-text");
    let time = document.createElement("p");
    time.innerText = todoMonth + "/" + todoDate;
    time.classList.add("todo-time");

    todo.appendChild(text);
    todo.appendChild(time);

    //create check and trash icon
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completeButton.addEventListener("click", e =>{
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationend", e => {
            //remove from local storage
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) =>{
            if(item.todoText == text){
                myListArray.splice(index, 1);
                localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })

            todoItem.remove();
        })
        // todoItem.remove();
        todoItem.style.animation = "scaleDown 0.3s forwards"
    })

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards"

    //create an object
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate
    }

    //store data into an array of object
    let myList = localStorage.getItem("list");
    // console.log(myList);
    if (myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));
    }else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
    console.log(JSON.parse(localStorage.getItem("list")));

    // clear input
    form.children[0].value = "";
    form.children[1].value = "";
    form.children[2].value = "";

    section.appendChild(todo);
})

loadData();

function loadData(){
    //load localstorage data
    let myList = localStorage.getItem("list");
    if (myList !== null){
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {

            //create a todo
            let todo = document.createElement("div");
            todo.classList.add("todo");
            let text = document.createElement("p");
            text.classList.add("todo-text");
            text.innerText = item.todoText;
            let time = document.createElement("p");
            time.classList.add("todo-time");
            time.innerText = item.todoMonth + "/" + item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);

            //create check and trash icon
            let completeButton = document.createElement("button");
            completeButton.classList.add("complete");
            completeButton.innerHTML = '<i class="fa-solid fa-check"></i>'
            completeButton.addEventListener("click", e =>{
                let todoItem = e.target.parentElement;
                todoItem.classList.toggle("done");
            })
        
            let trashButton = document.createElement("button");
            trashButton.classList.add("trash");
            trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        
            trashButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
        
                todoItem.addEventListener("animationend", e => {
                    //remove from local storage
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem("list"));
                    myListArray.forEach((item, index) =>{
                        if(item.todoText == text){
                            myListArray.splice(index, 1);
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }
                    })
                    
                    todoItem.remove();
                })
                // todoItem.remove();
                todoItem.style.animation = "scaleDown 0.3s forwards"
            })

            todo.appendChild(completeButton);
            todo.appendChild(trashButton);

            section.appendChild(todo);
        })
    }
}


//marge sort
function margeTime(arr1, arr2){
    let result = [];
    let i = 0;
    let j = 0;

    while(i < arr1.length && j < arr2.length){
        if(Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)){
            result.push(arr2[j]);
            j++;
        }else if(Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)){
            result.push(arr1[i]);
            i++;
        }else if(Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)){
            if(Number(arr1[i].todoDate) > Number(arr2[j].todoDate)){
                result.push(arr2[j]);
                j++;
            }else{
                result.push(arr1[i]);
                i++;
            }
        }
    }
    while(i < arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while(j < arr2.length){
        result.push(arr2[j]);
        j++;
    }

    return result;
}

function margeSort(arr){
    if(arr.length === 1){
        return arr;
    }else{
        let middle = Math.floor(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle, arr.length);
        return margeTime(margeSort(left), margeSort(right));
    }
}
// console.log(margeSort(JSON.parse(localStorage.getItem("list"))));

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", e => {
    //sort data
    let sortedArray = margeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    //remove data
    let len = section.children.length;
    for (let i = 0 ; i < len ; i++){
        section.children[0].remove();
    }

    //load data
    loadData();
})