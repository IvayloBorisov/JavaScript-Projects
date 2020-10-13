const BASE_URL = 'https://quizapi.io/api/v1/questions?apiKey=';
const API_KEY = 'BcB837k2L202zOrkasDAkgklsCFasct1sjOuQWU4';

let allData = [];
let currentQuiz = 0;
const myAnswers = [];
const button = document.createElement('button');
    button.innerText = 'Answer';
    button.classList.add('btn');
const quizContainer = document.querySelector('.quiz-container');
const answerContainer = document.querySelector('.answer-container');  

   function getData() {
    fetch(`${ BASE_URL }${ API_KEY }`)
    .then(res => res.json())
    .then(data => {
        allData = data;
        loadQuiz(allData);
    });
   } 

   getData();
   
    button.addEventListener('click', function(event) {
        if(button.innerText == 'Try again') {
            return window.location.reload();
        }
        getChecked();
        currentQuiz > allData.length - 1 ? printResult() : loadQuiz(allData);
    });

function loadQuiz(data) {

    answerContainer.innerHTML = '';
    const question = document.querySelector('.question-title');
    question.innerText = data[currentQuiz].question;
    
    const answerArr = Object.values(data[currentQuiz].answers);
    for(let i = 0; i < answerArr.length; i++ ) {
        if(answerArr[i]) {
            const li = document.createElement('li');
            const input = document.createElement('input');
            const label = document.createElement('label');
          
            input.type = 'radio';
            input.name = 'option';
            input.value = `answer_${String.fromCodePoint(97 + i)}_correct`;
            input.id = input.value;
            label.textContent = answerArr[i];
            label.htmlFor = input.id;
            li.appendChild(input);
            li.appendChild(label);  
            answerContainer.appendChild(li);
        }
    }
    quizContainer.appendChild(button);
}

function getChecked() {
    const answers = document.querySelectorAll('li input');
        let value = 'Wrong!';
    answers.forEach(answer => {
        const answerValue = allData[currentQuiz].correct_answers[`${answer.value}`];
      
        if(answerValue == 'true' && answer.checked) {
          value = 'Correct!';
        }
    });
    currentQuiz++;
    myAnswers.push(value);
    return myAnswers;
}

function printResult() {
        console.log(myAnswers);
        quizContainer.removeChild(answerContainer);
        const list = document.createElement('ul');
        myAnswers.map((el, index) => {
           
          const listItem = document.createElement('li')
          const questionSpan = document.createElement('span');
          questionSpan.innerText = `Question ${ index + 1 }: `;
          const answerSpan = document.createElement('span');
          answerSpan.innerText = el;
          listItem.appendChild(questionSpan);
          listItem.appendChild(answerSpan);
          console.log(questionSpan, answerSpan)
          addClass(questionSpan, answerSpan);

          list.appendChild(listItem);
      });
      const h3 = document.querySelector('h3');
      h3.innerText = 'Result';
      button.innerText = 'Try again';
      quizContainer.insertBefore(list, button);
}

function addClass(question, result) {
     question.classList.add('question');
     result.innerText == 'Correct!' 
        ? result.classList.add('answer-correct') 
        : result.classList.add('answer-wrong');
}


      
          
            
        


     
                   

   
       
     
        
        

     

    