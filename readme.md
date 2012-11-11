#jquery-data-validation
======================

JQuery Plugin which enables real time validation with HTML5 custom data property.

## Getting started
All you have to do is only writing check specification to HTML tag and a little js code like below.
-----------------------------------------------------------------------------------------
&lt;form&gt;
    &lt;input type="text" data-role="validation" data-required="true" data-max-length="25" data-format="half-char" data-title="sample"&gt;
&lt;/form&gt;
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

##Demo
* Demo is [here](http://kabocha.orz.hm/test/jquery-data-validation.html)

## License
Copyright (c) 2012 "thujikun" Ryosuke Tsuji  
Licensed under the MIT license.  
<https://github.com/thujikun/extended-local-storage/blob/master/LICENSE-MIT>