$(document).ready(function(){
    var submit_fx = function(){

        // Process First name
        var full_name = $.trim($("#full_name").val());
        var name_parts = full_name.split(' ');
        var last_index = name_parts.length - 1;
        var fname, lname;
        fname = name_parts[0];
        lname = name_parts[last_index];
        if(name_parts.length > 2){
            for(var i in name_parts){
                if(i != 0 && i !=last_index){
                    fname += ' ' + name_parts[i];
                }
            }
        }
        $('#register_form input[name="fname"]').val(fname);
        $('#register_form input[name="lname"]').val(lname);
        
        var values = $('#register_form').serializeArray();
        var values_array = [];
        var values_final;

        for(var n in values){
            values_array.push('"'+values[n].name+'":"'+values[n].value+'"');
        }

        values_final = '{'+values_array.join(',')+'}';
        values_final = JSON.stringify(JSON.parse(values_final));
        //console.log(values_final);

        // Ajax submit
        $('#register_form input').attr("disabled","true");
        $('#register_form select').attr("disabled","true");
        $.ajax({
            url: 'http://www.oxfordcapacityanalysis.org/oca-service.action', 
            dataType: 'jsonp', 
            data: {
                id: 1, 
                method: 'startOCATest', 
                params: values_final
            }, 
            success: function(data) { 
                if (data.error){
                    $('#register_form input').removeAttr("disabled");
                    $('#register_form select').removeAttr("disabled");
                    return alert('Error starting OCA: ' + data.error);
                }
                else{
                    console.log('OCA started, OCA Id: ' + data.result);
                    goog_report_conversion('http://www.oxfordcapacityanalysis.org/questions.html');
                    //top.location = 'http://www.oxfordcapacityanalysis.org/questions.html';
                } 
            } 
        });
    }
    $("#register_form").paminta(submit_fx);
});