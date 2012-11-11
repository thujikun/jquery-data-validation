#jquery-data-validation
======================

JQuery Plugin which enables real time validation with HTML5 custom data property.

## Getting started
All you have to do is only writing check specification to HTML tag and a little js code like below.
-----------------------------------------------------------------------------------------
<form>
    <input type="text" data-role="validation" data-required="true" data-max-length="25" data-format="half-char" data-title="sample">
</form>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script src="./js/jquery-data-validation-0.5.0.js"></script>
<script>
    !function($){}
        $(document).ready(function){
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
        });
    }.call(window, jQuery);
</script>
-----------------------------------------------------------------------------------------