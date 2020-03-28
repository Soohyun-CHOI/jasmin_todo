import '../scss/main.scss';

const X_IMAGE = "/x.93083e62.svg";

/*
1. Card Delete
 - X 버튼을 눌렀을 때, 카드가 삭제됨.

2. Category Create
 - 카테고리를 입력하고 + 버튼을 눌렀을 때, 카테고리가 생성됨.
 - 이름을 비워놓았으면 알람, 이미 존재하는 카테고리면 알람

3. Modal Show
 - 카테고리에 있는 + 버튼을 눌렀을 때, 모달을 보여줌

4. Modal Close
 - 모달에서 취소를 눌렀을 때, 모달을 숨김

5. Options Create
 - 모달에서 셀렉트 박스의 옵션을 채워넣기

6. Card Create
 - 모달에서 저장을 했을 때, 카드가 생성됨

7. Category Delete
 - 카테고리 이름을 비웠을 때, 카테고리 삭제
 - 확인 메세지를 통해 삭제 여부 확인

8. LocalStorage Load
 - 로컬스토리지에서 투두리스트 불러오기
 - example) {"개발":[{"title":"자스민 2주차 과제","description":"노마드 코더 메인페이지 클로닝 하기"},{"title":"자스민 1주차 과제","description":"유튜브 메인페이지 클로닝 하기"}],"집안일":[{"title":"장보기","description":"세제, 치약 사기"},{"title":"설거지","description":"라면 포트 설거지하기"},{"title":"청소","description":"화장실 청소하기"}],"업무":[{"title":"프론트 작업","description":"모바일 프론트 작업 및 리팩토링"}]}

9. Event Check
 - 새로 생성되는 객체에 대해 이벤트 달아주기

10. LocalStorage Update
 - 투두리스트에 변경점이 생길 때마다 로컬스토리지를 업데이트

11. Auto Increse Textarea
 - 자동으로 높이가 늘어나는 Textarea
*/


// js파일이 포함된 html이 다 로드가 되었을 때 실행
window.onload = () => {
    const cardDeleteBtns = document.querySelectorAll(".card .delete-btn");
    console.log(cardDeleteBtns);
    
    cardDeleteBtns.forEach(cardDeleteBtns => {
        cardDeleteBtns.addEventListener("click", cardDeleteHandler);
    })

    const categoryAddBtn = document.querySelector("nav .category-add-btn");
    categoryAddBtn.addEventListener("click", categoryAddHandler);

    const cardAddBtns = document.querySelectorAll(".column .add-btn");
    cardAddBtns.forEach(cardAddBtns => {
        cardAddHandler.addEventListener("click", showModalHandler);
    })

    const cancelBtn = document.querySelector(".modal .cancel-btn");
    cancelBtn.addEventListener("click", closeModalHandler);
}

// 5
const findCategory = (event) => {
    const currentInput = event.target.parentNode.querySelector(".category");
    return currentInput.value;
}

const updateSelectbox = (event) => {
    const selectBox = document.querySelector(".modal select");
    selectBox.innerText = "";

    const categories = document.querySelectorAll(".column .category");
    categories.forEach(category => {
        const categoryOption = document.createElement("option");
        categoryOption.innerText = category.value;

        selectBox.appendChild(categoryOption);
    })

    const currentCategory = findCategory(event);
    selectBox.value = currentCategory;
}
// end 5

// 4
const cancelModalHandler = (event) => {
    const modalContainer = document.querySelector(".modal-container");
    const body = document.querySelector("body");

    modalContainer.classlist.add("dp-none");
    body.classlist.remove("stop-scroll");
}
// end 4

// 3
const showModalHandler = (event) => {
    const modalContainer = document.querySelector(".modal-container");
    const body = document.querySelector("body");

    modalContainer.classlist.remove("dp-none");
    modalContainer.style.top = '${window.scrollY}px';
    body.classlist.add("stop-scroll");

    updateSelectbox(event);
}
// end 3

// 2
const createColumn = (categoryTitle) => {
    const column = document.createElement("div");
    column.classList.add("column");

    const todoCategory = document.createElement("div");
    column.classList.add("todo-category");

    const categoryInput = document.createElement("input");
    categoryInput.classList.add("todo-category");
    categoryInput.value = categoryTitle;

    const addBtn = document.createElement("img");
    addBtn.classList.add("add-btn");
    addBtn.src = X_IMAGE;

    todoCategory.appendChild(categoryInput);
    todoCategory.appendChild(addBtn);
    column.appendChild(todoCategory);

    return column;
}

const categoryAddHandler = () => {
    // (1) input 값 가져오기
    const categoryTitle = document.querySelector("input.category-title");
    console.log(categoryTitle.value);

    // (2) 값 검증 : 이름이 없을 때, 중복되는 이름이 있을 때
    if(categoryTitle.value == "") {
        alert("카테고리 이름을 작성해주세요.");
        return;
    }

    const categories = document.querySelectorAll(".column .category");
    for(var i = 0; i < categories.length; i++) {
        if (categories[i].value == categoryTitle.value) {
            alert("이미 존재하는 카테고리입니다.");
            return;
        }
    }

    // (3) 컬럼 만들기
    const column = createColumn(categoryTitle.value);
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.appendChild(column);

    // (4) 뒷정리
    categoryTitle.value = "";
}
// end 2


// 1
const findTargetClass = (node, targetClass) => {
    while(node.classlist.contains(targetClass) == false) {
        node = node.parentNode;
    }
    return node;
}

const cardDeleteHandler = (event) => {
    const card = findTargetClass(event.target, "card");
    card.remove();
}
// end 1
