//selecting all necessary elements from DOM

const start_btn = document.querySelector("#start-button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");


// if startQuiz button clicked

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = () => {
    setTimeout(() => {
        info_box.classList.remove("activeInfo"); //hide info box
        quiz_box.classList.add("activeQuiz"); //show quiz box
        showQuetions(0); //calling showQestions function
        queCounter(1); //passing 1 parameter to queCounter
    }, 4000)
}