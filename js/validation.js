/**
 * @fileOverview Input Validation
 * @description depend on jQuery
 * @name validation.js
 * @author Ryosuke Tsuji @thujikun
 * @version 0.1.0
*/

jQuery.fn.extend({
    /**
     * @method set and validate
     * @description jQuery plugin
     * @param  {Object} options you can override all methods and messages
     * @return this
     */
    validate: function(options){
        var self = this,
            error = false,
            itemError,
            errorMessage = '',
            p;

        options = $.extend({
            /**
             * @type Object
             * @description check method name
             */
            'checks': {
                'required':   {
                    check:   'chkRequired',
                    handler: ['blur']
                },
                'max-length': {
                    check:   'chkMaxLength',
                    handler: ['blur', 'keydown', 'paste', 'cut']
                },
                'min-length': {
                    check:   'chkMinLength',
                    handler: ['blur']
                },
                'max-num':    {
                    check:   'chkMaxNum',
                    handler: ['blur', 'keydown', 'paste', 'cut']
                },
                'min-num':    {
                    check:   'chkMinNum',
                    handler: ['blur', 'keydown', 'paste', 'cut']
                },
                'format':     {
                    check:   'chkFormat',
                    handler: ['blur', 'keydown', 'paste', 'cut']
                },
                'regexp':     {
                    check:   'chkRegexp',
                    handler: ['blur', 'keydown', 'paste', 'cut']
                }
            },
            /**
             * @type Object
             * @description format check RegExp Object
             */
            'format': {
                'number':    /^[0-9]*$/,
                'half-char': /^[0-9A-Za-z]*$/,
                'half':      /^[¥x20-¥x7e]*$/,
                'half-kana': /^[ｦ-ﾝ]*$/,
                'url':       /^[0-9A-Za-z-_.!~*'()]*$%/,
                'mail':      /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&''*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/,
                'all-char':  /^[0-9]*$/
            },
            /**
             * @type Object
             * @description Messages
             */
            'MESSAGES': {
                'REQUIRED':   '必須項目です。',
                'MAX-LENGTH': '{length}文字オーバーです。',
                'MIN-LENGTH': 'あと{length}文字以上入力して下さい。',
                'MAX-NUM':    '{num}以内の数値を入力してください。',
                'MIN-NUM':    '{num}以上の数値を入力してください。',
                'REGEXP':     '不正な文字が含まれています。',
                'FORMAT':     {
                    'NUMBER':    '数値を入力してください。',
                    'HALF-CHAR': '半角英数字で入力してください。',
                    'HALF':      '半角で入力してください。',
                    'HALF-KANA': '半角カナで入力してください。',
                    'URL':       '有効なURLを入力してください。',
                    'MAIL':      '不正なメールアドレスです。',
                    'ALL-CHAR':  '全角文字で入力してください。'
                }
            },
            /**
             * @method Check required
             * @description Check input something or not
             * @param {Boolean} required flag
             * @param {String} validation target
             * @return this
             */
            'chkRequired': function(required, value){
                if(required && !value){
                    error = true;
                    itemError = true;
                    errorMessage = options.MESSAGES['REQUIRED'];
                }
                return self;
            },
            /**
             * @method Check string length
             * @description Check value length
             * @param {Number} Max length
             * @param {String} validation target
             * @return this
             */
            'chkMaxLength': function(length, value){
                if(length < value.length){
                    error = true;
                    itemError = true;
                    errorMessage = options.MESSAGES['MAX-LENGTH'].replace(/{length}/g, value.length - length);
                }
                return self;
            },
            /**
             * @method Check string length
             * @description Check value length
             * @param {Number} Min length
             * @param {String} validation target
             * @return this
             */
            'chkMinLength': function(length, value){
                if(value.length < length){
                    error = true;
                    itemError = true;
                    errorMessage = options.MESSAGES['MIN-LENGTH'].replace(/{length}/g, length - value.length);
                }
                return self;
            },
            /**
             * @method Check number
             * @description Check value number
             * @param {Number} Max nuber
             * @param {Number} validation target
             * @return this
             */
            'chkMaxNum': function(num, value){
                num = parseInt(num, 10);
                value = parseInt(value, 10);
                if(num < value){
                    error = true;
                    itemError = true;
                    errorMessage = options.MESSAGES['MAX-NUM'].replace(/{num}/g, num);
                }
                return self;
            },
            /**
             * @method Check number
             * @description Check value number
             * @param {Number} Min nuber
             * @param {Number} validation target
             * @return this
             */
            'chkMinNum': function(num, value){
                num = parseInt(num, 10);
                value = parseInt(value, 10);
                if(value < num){
                    error = true;
                    itemError = true;
                    errorMessage = options.MESSAGES['MIN-NUM'].replace(/{num}/g, num);
                }
                return self;
            },
            /**
             * @method Check string format
             * @description Check format by regType
             * @param {String} RegExp type
             * @param {String} validation target
             * @return this
             */
            'chkFormat': function(regType, value){
                if(regType === 'url') value = uriEncodeComponent(value);
                if(!value.match(options.format[regType]) && value){
                    error = true;
                    itemError = true;
                    errorMessage = options.MESSAGES['FORMAT'][regType.toUpperCase()];
                }
                return self;
            },
            /**
             * @method Check string regexp
             * @description Check regexp
             * @param {Object} RegExp object
             * @param {String} validation target
             * @return this
             */
            'chkRegexp': function(reg, value){
                if(value.match(reg)){
                    error = true;
                    itemError = true;
                    errorMessage = options.MESSAGES['REGEXP'];
                }
                return self;
            },
            /**
             * @method Execute validation
             * @description Execute validation
             * @return this
             */
            'execute': function(e){
                var p,
                    value,
                    param,
                    checks;

                itemError = false;
                for(p in options.checks){
                    param =  self.data(p);
                    if(param && !itemError){
                        checks = options.checks[p];
                        if($.inArray(e.type, checks.handler) === -1) continue;
                        value = $.trim(self.val());
                        self[checks.check](param, value);
                        self.trigger('inputcheck', {error: itemError, errorMessage: errorMessage});
                    }
                }
                return self;
            },
            /**
             * @method Get error flag
             * @description return error flag
             * @return this
             */
            'getError': function(){
                return error;
            },
            /**
             * @method Set validation
             * @description set realtime validation to textbox
             * @return this
             */
            'setValidation': function(){
                self.bind({
                    'blur':    self.execute,
                    'keydown': function(e){
                        if(e.keyCode === 9 || ((e.ctrlKey || e.metaKey) && (e.keyCode === 86 || e.keyCode === 88))) return true;
                        setTimeout(function(){self.execute(e);}, 0);
                    },
                    'paste':   function(e){
                        setTimeout(function(){self.execute(e);}, 0);
                    },
                    'cut':     function(e){
                        setTimeout(function(){self.execute(e);}, 0);
                    },
                    'cancel':  function(e){
                        setTimeout(function(){self.execute(e);}, 0);
                    }
                });
                return self;
            },
            /**
             * @method Set error message
             * @description Create message DOM and append
             * @param {Object} validation result
             * @return false
             */
            'setErrorMesssage': function(result){
                $('div.errorMessage', self.parent()).remove();
                if(result.error){
                    if(self.data('pos') === 'top'){
                        self.parent().prepend($('<div></div>').addClass('errorMessage').text(result.errorMessage));
                    }else{
                        self.parent().append($('<div></div>').addClass('errorMessage').text(result.errorMessage));
                    }
                }
                return false;
            },
            /**
             * @type Boolean
             * @description Flag display error or not
             */
            defaultErrorDisp: true

        }, options);

        self.refactoring
chkRequired = options.chkRequired;

        self.chkMaxLength = options.chkMaxLength;

        self.chkMinLength = options.chkMinLength;

        self.chkMaxNum = options.chkMaxNum;

        self.chkMinNum = options.chkMinNum;

        self.chkFormat = options.chkFormat;

        self.chkRegexp = options.chkRegexp;

        self.execute = options.execute;

        self.getError = options.getError;

        self.setValidation = options.setValidation;

        /** case display error */
        if(options.defaultErrorDisp){
            self.bind('inputcheck', function(e, result){
                options.setErrorMesssage(result);
            });
        }

        return self;
    }
});

(function($){
    $(document).ready(function(){

        /** check form */
        $('form[data-formvalidate=true]').each(function(){
            var self = $(this);

            if(self.data('realtime-check')){
                /** do realtime check about all validation target */
                $('[data-role*="validation"]').each(function(){
                    $(this).validate().setValidation();
                    return true;
                });
            }

        });

        return false;
    });
}(jQuery));