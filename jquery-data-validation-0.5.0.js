/**
 * @fileOverview Input Validation
 * @description depend on jQuery
 * @name validation.js
 * @author Ryosuke Tsuji @thujikun
 * @version 0.1.0
 * Copyright (c) 2012 "thujikun" Ryosuke Tsuji
 * Licensed under the MIT license.
 * https://github.com/thujikun/jquery-data-validation/blob/master/LICENSE-MIT
*/

;!function($){
    jQuery.fn.extend({
        /**
         * @method validate form
         * @description jQuery plugin
         * @param  {Object} options you can override all methods and messages
         * @return this
         */
        formValidate: function(options, hiddenCheckFlag){
            var self = this,
                inputResult,
                formResult = {
                    error: false,
                    results: []
                },
                checkSelector = '[data-role*="validation"]';
            
            if(!hiddenCheckFlag) checkSelector += ':visible';
            
            $(checkSelector, self).each(function(){
                var input = $(this).validate(options);
                inputResult = input.execute().getError();
                
                if(inputResult.error){
                    formResult.error = true;
                    formResult.results.push({
                        element: input,
                        message: inputResult.errorMessage,
                        type:    inputResult.errorType
                    });
                }
                return true;
            });
            
            self.getResult = function(){
                return formResult;
            };
            
            return self;
        },
        /**
         * @method set and validate
         * @description jQuery plugin
         * @param  {Object} options you can override all methods and messages
         * @return this
         */
        validate: function(options){
            var self = this,
                p,
                defaults = {
                    /**
                     * @type Object
                     * @description check method name
                     */
                    'checks': {
                        'required':   {
                            check:   'chkRequired',
                            handler: ['blur']
                        },
                        'required-check':   {
                            check:   'chkRequiredCheck',
                            handler: []
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
                        'half':      /^[\x20-\x7e]*$/,
                        'half-kana': /^[ｦ-ﾝ]*$/,
                        'url':       /^[0-9A-Za-z-_.!~*'()]*$%/,
                        'mail':      /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&''*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/,
                        'all-kana':  /^[ァ-ヶ]*$/,
                        'all-char':  /^[^\x20-\x7eｱ-ﾝﾞﾟｧ-ｫｬ-ｮｰ]*$/
                    },
                    /**
                     * @type Object
                     * @description Messages
                     */
                    'MESSAGES': {
                        'REQUIRED':       '{title}を入力してください。',
                        'REQUIRED-CHECK': '{title}を選択してください。',
                        'MAX-LENGTH':     '{title}は{length}文字以下で入力してください。',
                        'MIN-LENGTH':     '{title}は{length}文字以上で入力してください。',
                        'MAX-NUM':        '{num}以内の数値を入力してください。',
                        'MIN-NUM':        '{num}以上の数値を入力してください。',
                        'REGEXP':         '不正な文字が含まれています。',
                        'FORMAT':         {
                            'NUMBER':    '{title}は半角数字を入力してください。',
                            'HALF-CHAR': '{title}は半角英数字で入力してください。',
                            'HALF':      '{title}は半角で入力してください。',
                            'HALF-KANA': '{title}は半角カナで入力してください。',
                            'URL':       '{title}は有効なURLを入力してください。',
                            'MAIL':      '{title}は有効なメールアドレスを入力してください。',
                            'ALL-KANA':  '{title}は全角カナで入力してください。',
                            'ALL-CHAR':  '{title}は全角で入力してください。'
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
                            self.error = true;
                            self.itemError = true;
                            self.errorMessage = options.MESSAGES['REQUIRED'];
                        }
                        return self;
                    },
                    /**
                     * @method Check required(radio and checkbox and select)
                     * @description Check select something or not
                     * @param {Boolean} required flag
                     * @param {String} validation target
                     * @return this
                     */
                    'chkRequiredCheck': function(required, value){
                        var type = self.attr('type'),
                            name = self.attr('name'),
                            errorFlag = false;
                        if(required){
                            if(type === 'radio' || type === 'checkbox'){
                                errorFlag = !$('input[name="'+ name +'"]:checked').size();
                            }else{
                                errorFlag = !value;
                            }
                            if(errorFlag){
                                self.error = true;
                                self.itemError = true;
                                self.errorMessage = options.MESSAGES['REQUIRED-CHECK'];
                            }
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
                            self.error = true;
                            self.itemError = true;
                            self.errorMessage = options.MESSAGES['MAX-LENGTH'].replace(/{length}/g, length);
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
                            self.error = true;
                            self.itemError = true;
                            self.errorMessage = options.MESSAGES['MIN-LENGTH'].replace(/{length}/g, length);
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
                            self.error = true;
                            self.itemError = true;
                            self.errorMessage = options.MESSAGES['MAX-NUM'].replace(/{num}/g, num);
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
                            self.error = true;
                            self.itemError = true;
                            self.errorMessage = options.MESSAGES['MIN-NUM'].replace(/{num}/g, num);
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
                            self.error = true;
                            self.itemError = true;
                            self.errorMessage = options.MESSAGES['FORMAT'][regType.toUpperCase()];
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
                            self.error = true;
                            self.itemError = true;
                            self.errorMessage = options.MESSAGES['REGEXP'];
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

                        self.itemError = false;
                        for(p in options.checks){
                            param =  self.data(p);
                            if(param && !self.itemError){
                                checks = options.checks[p];
                                if(e && $.inArray(e.type, checks.handler) === -1) continue;
                                value = $.trim(self.val());
                                self[checks.check](param, value);
                                self.errorType = p;
                                self.errorMessage = self.errorMessage && self.errorMessage.replace(/\{title\}/g, self.data('title'));
                                self.trigger('inputcheck', {
                                    error: self.itemError,
                                    errorType: p,
                                    errorMessage: self.errorMessage
                                });
                                
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
                        return {
                            error:        self.error,
                            errorMessage: self.errorMessage,
                            errorType:    self.errorType
                        };
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
                            }
                        });
                        return self;
                    }

                };
            
            /** extend defaults object */
            options = (function(defaults, options){
                for(p in defaults){
                    if(!options[p]) options[p] = {};
                    switch(typeof defaults[p]){
                        case 'object':
                            arguments.callee(defaults[p], options[p]);
                            break;
                        default:
                            options[p] = defaults[p];
                            break;
                    }
                }
                return options;
            })(options, defaults);
            
            for(p in options.checks){
                self[options.checks[p].check] = options[options.checks[p].check];
            }
            
            self.error = false;
            self.errorType;
            self.itemError = false;
            self.errorMessage;
            self.MESSAGES = options.MESSAGES;
            
            self.execute = options.execute;

            self.getError = options.getError;

            self.setValidation = options.setValidation;

            return self;
        }
    });
}.call(window, jQuery);