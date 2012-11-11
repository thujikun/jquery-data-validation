!function($){
    $(document).ready(function(){

        /** do realtime check about all validation target */
        $('[data-role*="validation"]').each(function(){
            var element = $(this).validate().setValidation();

            element.on('inputcheck', function(e, result){

                /** do function for error */
                if(result.error){
                    console.log(result.errorMessage);
                }
            });
            return true;
        });

        /** if you don't want to do realtime check, do as below */
        $('form').on('submit', function(){
            var result = $('form').formValidate({}, false).getResult();

            if(result.error){
                /** do function for error */
                console.log(result.results);
                return false;
            }
        });

        return false;
    });
}.call(window, jQuery);