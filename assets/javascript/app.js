
$(document).ready(function(){
    // Object of all questions that can be chosen
    var questionBank = [
        ["Which of these NBA franchises has never signed LeBron James?",
        "Boston Celtics",
        "Los Angeles Lakers",
        "Miami Heat",
        "Cleveland Cavaliers",
        1,
        "img1.gif"
        ],
        ["In which language was the book 'War and Peace' originally written?",
        "French",
        "German",
        "Russian",
        "English",
        3,
        "img2.gif"
        ],
        ["What did Alfred Nobel develop?",
        "Nobelium",
        "Gunpowder",
        "Atomic bomb",
        "Dynamite",
        4,
        "img3.gif"
        ],
        ["What is the name of the boxer whose life story is depicted in the 1999 movie 'The Hurricane'?",
        "Rubin Carter",
        "Rocky Marciano",
        "Muhammad Ali",
        "Jake LaMotta",
        1,
        "img4.gif"
        ],
        ["What is the name for the Jewish New Year?",
        "Kwanzaa",
        "Yom Kippur",
        "Rosh Hashanah",
        "Hanukkah",
        3,
        "img5.gif"
        ],
        ["Which actress plays a major role on the TV show 'The Big Bang Theory'?",
        "Emily Deschanel",
        "Sofia Vergara",
        "Kaley Cuoco",
        "Portia de Rossi",
        3,
        "img6.gif"
        ],
        ["Which mammal first reached Earth's orbit alive?",
        "Human",
        "Dog",
        "Cat",
        "Monkey",
        2,
        "img7.gif"
        ],
        ["Adele performed the theme song to which James Bond film?",
        "From Russia With Love",
        "Quantum of Solace",
        "Casino Royale",
        "Skyfall",
        4,
        "img8.gif"
        ],
        ["Which of these chess figures is closely related to 'Bohemian Rhapsody'?",
        "King",
        "Pawn",
        "Queen",
        "Bishop",
        3,
        "img9.gif"
        ],
        ["Which of these cities is closest to London, UK?",
        "Miami, FL",
        "New York, NY",
        "Boston, MA",
        "Atlanta, GA",
        3,
        "img10.gif"
        ],
        ["What is the largest country, by area, that has only one time zone?",
        "Turkey",
        "Australia",
        "China",
        "Russia",
        3,
        "img11.gif"
        ],
        ["What religion is the most practiced one in India?",
        "Hinduism",
        "Shinto",
        "Islam",
        "Sikhism",
        1,
        "img12.gif"
        ],
        ["Which of these antagonist characters was created by novelist J.K. Rowling?",
        "Darth Vader",
        "Professor Moriarty",
        "Lord Farqaad",
        "Lord Voldemort",
        4,
        "img13.gif"
        ],
        ["What funk/soul band was Lionel Richie a member of?",
        "Amigas",
        "Spectrums",
        "Commodores",
        "Ataris",
        3,
        "img14.gif"
        ]
    ]
    // Variables set at the initial stage
    var timeRemaining = 25;
    var indexList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
    var index = 0;
    var win = 0;
    var intervalId;
    var hitlock = true;
    var check = Math.floor(Math.random()*1)
    console.log(check)
    // variable for options
    $(".options").mouseenter(function() {
        $("#hoversound")[0].play();
    });
    var option1 = $("<p>")
    option1.addClass("answeroption")
    var option2 = $("<p>")
    option2.addClass("answeroption")
    var option3 = $("<p>")
    option3.addClass("answeroption")
    var option4 = $("<p>")
    option4.addClass("answeroption")
    var populateQuestions = function(){
        hitlock = false;
        var minorindex = Math.floor(Math.random()*indexList.length)
        index = indexList[minorindex]
        indexList.splice(minorindex,1)
        console.log(index)
        console.log(indexList)
        $("#prompt").text(questionBank[index][0]);
        option1.text(questionBank[index][1])
        option2.text(questionBank[index][2])
        option3.text(questionBank[index][3])
        option4.text(questionBank[index][4])
        $("#op1").html(option1)
        $("#op2").html(option2)
        $("#op3").html(option3)
        $("#op4").html(option4)
    }

    $(".options").on("click", function(){
        if (hitlock) {}
        else {
            hitlock = true;
            var pick = $(this).attr("datavalue")
            if (pick ==questionBank[index][5]) {
                right()
                win++
                timeRemaining = 25
                if (indexList.length==0){
                    setTimeout(winnote,3000)
                } else {                
                setTimeout(function(){
                    populateQuestions(),
                    run()
                    },3000)
                }
            } else {
                wrong()
                timeRemaining = 25
                if (indexList.length==0){
                    setTimeout(winnote,3000)
                } else {                   
                setTimeout(function(){
                    populateQuestions(),
                    run()
                    },3000)
                }             
            }
        }
    })
    function addcircle(value){
        var innernumber = $("<h1 id='timeremain'>"+value+"</h1>")
        var circle = $("<div>")
        circle.addClass("circlecontainer")
        circle.html(innernumber)
        $("#toppage").html(circle)
    }
    function decrement(){

        addcircle(timeRemaining)
        timeRemaining--;
        $("#pop")[0].play();
        if(timeRemaining==0){
            stop()
            wrong()
            timeRemaining = 25                
            setTimeout(function(){
                populateQuestions(),
                run()
                },3000)  
        }
    }
    function stop(){
        clearInterval(intervalId)       
    }
    function run(){
        stop()
        intervalId = setInterval(decrement,1000)
    }

    function right(){
        $("#rightsound")[0].play();
        congrat = $("<p>")
        congrat.text("Conratulation!")
        answer = $("<p>")
        answer.text("The answer is "+questionBank[index][questionBank[index][5]])
        congrat.addClass("cheer")
        answer.addClass("cheer")
        stop()   
        $("#toppage").html(congrat)
        $("#toppage").append(answer)        
    }
    function wrong(){
        $("#wrongsound")[0].play();
        suck = $("<p>")
        suck.text("You suck!")
        answer = $("<p>")
        answer.text("The answer is "+questionBank[index][questionBank[index][5]])
        answer.addClass("cheer")
        suck.addClass("cheer")
        stop()
        $("#toppage").html(suck)    
        $("#toppage").append(answer)           
    }
    function winnote(){
        stop()
        wintag = $("<p>")
        wintag.text("Game over! You answer "+win+"/14 questions correctly. Click to start again.")
        wintag.addClass("cheer winwin")
        $("#toppage").html(wintag)
        $("#prompt").text(null);

    }
    function startgame(){
        populateQuestions()
        run()
    }
    $("#clickhere").on("click", startgame)
    $(document).on("click", ".winwin", function(){
        indexList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
        win = 0
        populateQuestions()
        run()
    })
})
