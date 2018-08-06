$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button to begin name
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        // clickSound.play();
            $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        // clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        // clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/nope.png'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 4500);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        // $("#mainArea").append(imageArray[questionCounter])
        setTimeout(wait, 4500);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/nope.png'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 4500); //  change to 4000 or other amount
    }
    
    function generateQuestions() {
        $("#mainArea").prepend(qimageArray[questionCounter])
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>45</span></p></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " +answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
        
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateQuestions();
        counter = 45;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(fourtySeconds, 1000);
        function fourtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 45;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 45;
    var questionArray = 
    [ "At which Charlotte, North Carolina brewery would you find this light and refreshing IPA?", 
    "When a brewer steeps hops in fermenting beer instead of adding them while the liquid is boiling, this creates a strong aroma and brings out the sweet and fruity notes in the hops. What is this process called?", 
    "The very first craft beer I ever tasted was from this brewery and it almost scared me away from craft beer due to it's strong flavor of banana funk. What type of beer would this be?", 
    "Probably my new favorite IPA, what South Carolina brewery would you look to in order to find this taste of heaven?", 
    "How do you pronounce Gose?", 
    "When brewing coffee to make a coffee stout or porter, what is the preferred water temperature for the coffee?", 
    "Aging a stout in a bourbon barrel beer brings the taste to an all new level. One beer stands out among the rest. Do you know what it is?", 
    "What exactly is a 'farmhouse ale'?" ];


    var qimageArray = new Array(); 
    qimageArray[0] = "<img class='center-block' src='assets/images/juicyjay.png'>";
    qimageArray[1] = "<img class='center-block' src='assets/images/dryhopping.png'>"; 
    qimageArray[2] = "<img class='center-block' src='assets/images/magichat.png'>"; 
    qimageArray[3] = "<img class='center-block' src='assets/images/somethinglikethatbefore-01.png>";  
    qimageArray[4] = "<img class='center-block' src='assets/images/gosequestion.png'>"; 
    qimageArray[5] = "<img class='center-block' src='assets/images/coffeehop.jpg'>"; 
    qimageArray[6] = "<img class='center-block' src='assets/images/bourbons2.png'>"; 
    qimageArray[7] = "<img class='center-block' src='assets/images/farmhouseale.png'>"; 

    var answerArray = [
        ["Heist", "Legion", "Sycamore", "Bird Song"], 
        ["Fresh Hopping","Wet Hopping","Sweet Hopping","Dry Hopping"], 
        ["An IPA", "A Porter", "A Hefeweizen", "A Lager"], 
        ["Frothy Beard Brewing Company", "COAST Brewing Company", "Charles Town Fermentory", "Holy City Brewing"], 
        ["Rhymes with rose", "Rhymes with rosé", "Like goes-uh", "Like goo-zé"], 
        ["Cold","Hot","Warm","It doesn't matter."], 
        ["Wild Turkey Bourbon Barrel Stout", "CBS", "Dragon's Milk", "KBS"], 
        ["A hop-heavy beer with bitter, floral, earthy, citrusy, piney, and fruity flavors.","A dark beer that includes roasted malt or roasted barley, hops, water and yeast.","Does anyone actually know? Sometimes they are good, sometimes they are bad. Most times they are funky. Always taste first.","A beer which has an intentionally acidic, tart or sour taste."], ];

    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block' src='assets/images/legionlogo.png'>";
    imageArray[1] = "<img class='center-block' src='assets/images/dryhopping.png'>"; 
    imageArray[2] = "<img class='center-block' src='assets/images/circusboyanswer.png'>"; 
    imageArray[3] = "<img class='center-block' src='assets/images/charlestown.jpg>";  
    imageArray[4] = "<img class='center-block' src='assets/images/goesuganswer.png'>"; 
    imageArray[5] = "<img class='center-block' src='assets/images/coffeestout.jpg'>"; 
    imageArray[6] = "<img class='center-block' src='assets/images/kbs.jpg'>"; 
    imageArray[7] = "<img class='center-block' src='assets/images/farmhouswin.jpg'>"; 

    var correctAnswers = 
    [ "B. Legion", 
    "D. Dry Hopping", 
    "C. A Hefeweizen", 
    "C. Charles Town Fermentory", 
    "C. Like goes-uh", 
    "A. Cold", 
    "D. KBS", 
    "C. Does anyone actually know? Sometimes they are good, sometimes they are bad. Most times they are funky. Always taste first."];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    // var clickSound = new Audio("assets/sounds/click-sound.mp3");