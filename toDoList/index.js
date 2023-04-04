//先取得html的元素
const text = document.getElementById('text');
const date = document.getElementById('date');
const time = document.getElementById('time');
const add = document.getElementById('addBtn');
const del = document.getElementById('delBtn');
const list = document.getElementById('list');

const arr = []

function btn() {
    let htmlStr = ''
    

    arr.forEach(function (items) {
        htmlStr = htmlStr + `
        <div class="item">
            <div id="list">
                <p>內容：${items.text}</p>
                <p>時間：${items.date} ${items.time}</p>
            </div>
            <div>
                <button id="delBtn" class="delBtn">
                    <img src="delete.svg">
                </button> 
            </div>
        </div>
        `
    })

    list.innerHTML = htmlStr
}

add.addEventListener("click",function() {

    if(text.value===""){
        window.alert("紀事欄不可空白喔！");
    }
    else{
        arr.unshift({
            text:text.value,
            date:date.value,
            time:time.value,
        })
        btn()
    }
})

del.addEventListener("click",function(){

    arr.shift({
        text:text.value,
        date:date.value,
        time:time.value,
    })
    btn()
})

