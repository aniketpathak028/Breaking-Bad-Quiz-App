//selecting all necessary elements from DOM

const start_btn = document.querySelector("#start-button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

// function for making options using characters array

const makeOptions = (options) => {
  for (let i = 0; i < 4; i++) {
    let randomNumber = Math.floor(Math.random() * 49) + 0; // random number between 0 to 50
    let res = characters[randomNumber];
    let option = res;
    options.push(option);
  }
  return options;
}

// function for creating questions using API and options using makeOptions function and then 
// passing it to makeQuestions

const getQuestions = async () => {
  for (let i = 0; i <10 ; i++){
        let res = await axios.get('https://breakingbadapi.com/api/quote/random');
        let quote = res.data[0].quote;
        let author = res.data[0].author;
        let r = i % 4;
        let options = [];
        // "Walter White", `${author}`, "Skyler White", "Jesse Pinkman"
        options = makeOptions(options);
        options[r] = `${author}`;
        makeQuestions(i, quote, author, options);
    }
}

// when the continue button is clicked, create 10 questions 

continue_btn.addEventListener('click', async (e) => {
   await getQuestions();
})

// make a question using the parameters

const makeQuestions = (n, q, a, o) => {
    questions[n].numb = n+1;
    questions[n].question = `"${q}" - ?`;
    questions[n].answer = a;
    questions[n].options = o
}

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

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz clicked get questions again

restart_quiz.addEventListener('click', async (e) => {
   await getQuestions();
})

// if restartQuiz button clicked

restart_quiz.onclick = () => {
    setTimeout(() => {
      quiz_box.classList.add("activeQuiz"); //show quiz box
      result_box.classList.remove("activeResult"); //hide result box
      que_count = 0;
      que_numb = 1;
      userScore = 0;
      widthValue = 0;
      showQuetions(que_count); //calling showQestions function
      queCounter(que_numb); //passing que_numb value to queCounter
      clearInterval(counter); //clear counter
      clearInterval(counterLine); //clear counterLine
      next_btn.classList.remove("show"); //hide the next button
    }, 4000);
}

// if quitQuiz button clicked

quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}