questionnaire = {
    entries : $(".questions-block li"),
    items : ($(".questions-block li").length - 1),
    active : $(".questions-block li.center"),
    answered : 0,
    prev : function(){
        var active = $(".questions-block li.center");
        var prev = active.prev();
        var next = active.next();
        var answer = prev.attr("data-ans")
        
        if((typeof answer) == "string" && prev.text() != ""){
            active.removeClass("center").addClass("right");
            prev.removeClass("left").addClass("center");
            questionnaire.active = $(".questions-block li.center");
            questionnaire.update_status();
        }
    },
    next : function(){
        var active = $(".questions-block li.center");
        var answer = active.attr("data-ans");
        var prev = active.prev();
        var next = active.next();
        
        if((typeof answer) == "string" && next.text() != ""){
            active.removeClass("center").addClass("left");
            next.removeClass("right").addClass("center");
            questionnaire.active = $(".questions-block li.center");
            questionnaire.update_status();
        }
    },
    update_status : function(){
        var count = questionnaire.entries.index(questionnaire.active) + 1;
        var prev = questionnaire.active.prev();
        var next = questionnaire.active.next();
        var answer = questionnaire.active.attr("data-ans");
        var started = 0;
        var update_answer = function(){
            $(".choices-block li").removeClass("active");
            if((typeof answer) == "string"){
                started = 1;
                $(".choices-block li").each(function(){
                    if($(this).attr("data-ans") == answer){
                        $(this).addClass("active");
                    }
                });
            }
            // Update pointer bar.
            var point_index = questionnaire.entries.index(questionnaire.active);
            if(started == 1){point_index+1}
            var point_percent = Math.round((point_index / questionnaire.items) * 100);
            $("#progress_bar .meter-point").css("width",point_percent+"%");
            // Update progress bar.
            var percent = Math.round((questionnaire.answered / questionnaire.items) * 100);
            $("#progress_bar .progress-load").css("width",percent+"%");
            // When 100%
            if(percent == 100){
                $(".hint-block-kbd").css("display","none");
            }
        }
        // Continue next if not yet at the last question.
        if(count < questionnaire.entries.length){
            // Update arrow buttons.
            if(prev.text() != ""){
                $(".questions-block .arrow-prev").css("display","block");
            }
            else{
                $(".questions-block .arrow-prev").css("display","none");
            }
            if(next.text() != ""){
                $(".questions-block .arrow-next").css("display","block");
            }
            else{
                $(".questions-block .arrow-next").css("display","none");
            }
            setTimeout(update_answer,500);
        }
        else {
            update_answer();
            $(".questions-block .arrow-prev").css("display","none");
            $(".questions-block .arrow-next").css("display","none");
            $(".choices-block").css("visibility","hidden");
        }
    },
    set_answer : function(){
        var active = $(".choices-block li");
        var answer = questionnaire.active.attr("data-ans");
        if((typeof answer) !== "string"){
            questionnaire.answered++;
        }
        // Set or update answer.
        active.removeClass("active");
        $(this).addClass("active");
        questionnaire.active.attr("data-ans",$(this).attr("data-ans"));
        questionnaire.next();
    },
    initialize : function(name){
        if($(window).width() < 480){
            $("header").css("display","none");
            $("#questionnaire_intro").css("display","block");
            $("#questionnaire_intro .tester-name").text(name);
        }
        $("#questionnaire_intro .button-ok").click(function(){$("#questionnaire_intro").css("display","none")});
        $("body").keypress(function(e){
            
            var active = $(".choices-block li");
            var answer = questionnaire.active.attr("data-ans");
            var keybtn1 = $(".choices-block .answer-yes");
            var keybtn2 = $(".choices-block .answer-maybe");
            var keybtn3 = $(".choices-block .answer-no");

            if((typeof answer) !== "string"){
                questionnaire.answered++;
            }

            // Set or update answer.
            active.removeClass("active");
            if(e.which == 49){
                keybtn1.addClass("active");
                questionnaire.active.attr("data-ans",keybtn1.attr("data-ans"));
                questionnaire.next();
            }
            if(e.which == 50){
                keybtn2.addClass("active");
                questionnaire.active.attr("data-ans",keybtn2.attr("data-ans"));
                questionnaire.next();
            }
            if(e.which == 51){
                keybtn3.addClass("active");
                questionnaire.active.attr("data-ans",keybtn3.attr("data-ans"));
                questionnaire.next();
            }
        });
    },
    start : function(e){
        e.preventDefault();
        var post_signup = {}
        var post_answer = {}
        post_signup["name"] = $(this).find('input[name="name"]').val();
        post_signup["gender"] = $('#register_form input[name="gender"]:checked').val();
        post_signup["age16"] = $('#register_form input[name="age16"]:checked').val();
        post_signup["email"] = $(this).find('input[name="email"]').val();
        post_signup["phone"] = $(this).find('input[name="phone"]').val();

        // Initialize questionnaire.
        questionnaire.initialize(post_signup["name"]);

        $("section.description").css({"opacity":"0"});
        $("section.how-it-works").css({"opacity":"0"});
        $("section.what-makes-it-unique").css({"opacity":"0"});
        $("section.the-real-you").css({"opacity":"0"});
        $("section.personal-success").css({"opacity":"0"});
        $("section.questionnaire").css({"opacity":"0"});

        setTimeout(function(){
            $("nav.header-docker").css("display","none");
            $("section.description").css("display","none");
            $("section.how-it-works").css("display","none");
            $("section.what-makes-it-unique").css("display","none");
            $("section.the-real-you").css("display","none");
            $("section.personal-success").css("display","none");
            $("section.questionnaire").css({"display":"block"});
        },500);
        setTimeout(function(){$("section.questionnaire").css({"opacity":"1"})},500);
        //$("section.questionnaire").css({"opacity":"1"});
        console.log(JSON.stringify(post_signup));
    }
}
/* Bootstrap */
$(document).ready(function(){
    questionnaire.update_status();
    $(".questions-block .arrow-prev").click(questionnaire.prev);
    $(".questions-block .arrow-next").click(questionnaire.next);
    $(".choices-block li").click(questionnaire.set_answer);
    $("#register_form").submit(questionnaire.start);
});