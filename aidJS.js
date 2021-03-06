/*
 * aidJS
 * (c) 2017 ITTEN, Inc. (http://itten.ir)
 * aidJS on github (https://github.com/uxitten/aidJS/)
 * ie9+, chrome5+, firefox4+, opera12+, safari5+
 * 
 * version 0.15.2 2017/01/21
 *  - comment improvemnt
 * 
 * version 0.15.1 2017/01/18
 *  - add deep arg in aidJS.extend method
 * 
 * version 0.15.0 2017/01/17
 *  - add aidJS.extend method
 * 
 * version 0.14.0 2016/11/26
 *  - support html string format in append function
 * 
 * version 0.13.3 2016/11/16
 *  - add Browser support commnet
 *  - fixed bug
 * 
 * version 0.13.2 2016/11/16
 *  - fixed bug in append
 * 
 * version 0.13.1 2016/11/15
 *  - remove aidJS.log
 * 
 * version 0.13.0 2016/11/15
 *  - add multi class remove
 * 
 * version 0.12.1 2016/10/16
 *  - clean code
 * 
 * version 0.12.0 2016/10/15
 *  - add shortcut for Array.prototype.forEach.call
 *  - fixed bug in html function
 * 
 * version 0.11.0 2016/08/14
 *  - add a.copy for copy object
 *  - add clean and remove function in a.queryString
 *  - add a.ready
 * 
 * version 0.10.0 2016/06/01
 *  - add headers arrg in ajax
 * 
 * version 0.9.0 2016/05/29
 *  - add return XMLHttpRequest in ajax method
 * 
 * version 0.8.4 2016/05/29
 *  - fixed bug in on and off method
 * 
 * version 0.8.3 2016/05/22
 *  - remove observable
 * 
 * version 0.8.2 2016/05/22
 *  - fixed bug in addClass
 * 
 * version 0.8.1 2016/05/18
 *  - add data to state in methos set querystring
 *  - add index method
 *  - value method now work with input type checkbox
 *  - add clean method in queryString
 *  - overwrite set in queryString
 * 
 * version 0.8.0 2016/05/15
 *  - add complete handler in ajax
 *  - add queryString feature
 * 
 * version 0.7.0 2016/05/14
 *  - add a.copy method
 *  - fixed bug
 *  - remove version attr in a
 * 
 * version 0.6.2 2016/05/11
 *  - add aidJS.debug
 *  - fixed bug
 * 
 * version 0.6.1 2016/05/10
 *  - add query in console.warn
 * 
 * version 0.6.0 2016/05/09
 *  - add elements prop for access pure elements
 *  - add trigger in a
 *  - add the string appending feature in append
 *  - add event delegation feature in on
 *  - add removeAttr method in a
 *  - fixed bug set value in attr
 *  - fixed bug in parent
 * 
 * version 0.5.0 2016/05/08
 *  - add find method in a
 *  - add closest method in a
 *  - add scrollLeft method in a
 *  - add value method in a
 * 
 * version 0.4.0 2016/05/07
 *  - add observable first version
 * 
 * version 0.3.3 2016/05/07
 *  - performance improvemnt in css
 * 
 * version 0.3.2 2016/05/07
 *  - fixed bug in return property value in css
 *  - fixed bug in eq
 * 
 * version 0.3.1 2016/05/06
 *  - fixed bug in a.ajax
 * 
 * version 0.3.0 2016/05/06
 *  - redesign structure
 * 
 * version 0.2.0 2016/05/05
 *  - add polyfill propertie arrgument in css
 *  - add scrollTop in a
 * 
 * version 0.1.0 2016/05/05
 *  - add count in a
 * 
 * version 0.0.0 2016/05/05
 */


/*
 * select element
 * ie9+
 * version 0.0.0 2016/05/05
 */
var aidJS = function (query) {

    if (query === undefined) {
        return undefined;
    }

    /*
     * element
     */
    var elements = null;

    if (query instanceof Array) {
        elements = query;
    } else if (query instanceof Object) {
        elements = [query];
    } else {
        elements = document.querySelectorAll(query);
    }

    if (elements.length == 0) {
        if (aidJS.debug) {
            console.error('aidJS Error:', '0001', 'not found element', query);
        }
    }

    /*
     * array prototype forEach
     * version 0.0.1 2016/10/15
     */
    function forEach(iterator, func) {
        return Array.prototype.forEach.call(iterator, func);
    }

    /*
     * add class
     * - classList
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	8.0  	3.6     10	                11.5	5.1     (Yes)
     * -------------------------------------------------------------------------------
     * - split
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - className
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.2 2016/05/22
     *  - fixed bug
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function addClass(className) {
        if (elements.length > 0) {
            if (elements[0].classList) {
                className = className.split(' ');
                forEach(elements, function (element, index) {
                    className.forEach(function (value) {
                        element.classList.add(value);
                    })
                });
            } else {
                forEach(elements, function (element, index) {
                    element.className += ' ' + className;
                });
            }
        }
        return this;
    }

    /*
     * append
     * - appendChild
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	1.7     (Yes)	            (Yes)	(Yes)   ?
     * -------------------------------------------------------------------------------
     * - insertAdjacentHTML
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1.0 	8.0     4.0	                7.0 	4.0     (Yes)
     * -------------------------------------------------------------------------------
     * version 0.1.0 2016/11/26
     *  - support html string format
     * version 0.0.2 2016/11/16
     *  - fixed bug
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.1.0 2016/05/06
     *  - added the string appending feature
     * version 0.0.0 2016/05/05
     */
    function append(insertElement) {
        if (elements.length > 0) {
            if (typeof (insertElement) === 'object') {
                forEach(elements, function (element, index) {
                    element.appendChild(insertElement);
                });
            } else {
                forEach(elements, function (element, index) {
                    element.insertAdjacentHTML('beforeend', insertElement);
                });
            }
        }
        return this;
    }

    /*
     * attribute
     * - setAttribute
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - getAttribute
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	29   	23      (Yes)	            (Yes)	6       ?
     * -------------------------------------------------------------------------------
     * - attributes
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   6.1 	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.2 2016/11/16
     *  - fixed bug in getAttribute, use attributes for old version
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.1 2016/05/09
     *  - fixed bug set value
     * version 0.0.0 2016/05/05
     */
    function attr(attribute, value) {
        if (value !== undefined) {
            if (elements.length > 0) {
                forEach(elements, function (element, index) {
                    element.setAttribute(attribute, value);
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                if ('getAttribute' in elements[0]) {
                    return elements[0].getAttribute(attribute);
                } else {
                    return elements[0].attributes[attribute].value;
                }
            } else {
                return undefined;
            }
        }
    }

    /*
     * length
     * - length
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.0 2016/05/05
     */
    function length() {
        return elements.length;
    }

    /*
     * closest
     * ?
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function closest(query) {
        if (elements.length > 0) {
            var elementSelector = elements[0];
            var matchesSelector = elementSelector.matches || elementSelector.webkitMatchesSelector || elementSelector.mozMatchesSelector || elementSelector.msMatchesSelector;
            while (elementSelector && elementSelector.tagName.toLowerCase() != 'html') {
                if (matchesSelector.call(elementSelector, query)) {
                    break;
                }
                elementSelector = elementSelector.parentNode;
            }
            return (elementSelector.tagName.toLowerCase() == 'html') ? undefined : a(elementSelector);
        }
        return undefined;
    };

    /*
     * style
     * - length
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - for in
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   6   	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - getComputedStyle
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   9   	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * * - getComputedStyle on pseudo element
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   9   	            15  	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - currentStyle
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(No)	(No)    6   	            No  	(No)    (No)
     * -------------------------------------------------------------------------------
     * version 0.0.4 2016/11/16
     *  - fixed bug getComputedStyle, use currentStyle on old version
     * version 0.0.3 2016/11/14
     *  - fixed bug in for key
     * version 0.0.2 2016/05/14
     *  - fixed bug in value arrg when typeof is number
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.1.2 2016/05/07
     *  - performance improvemnt
     * version 0.1.1 2016/05/07
     *  - fixed bug in return property value
     * version 0.1.0 2016/05/05
     *  - add polyfill property arrgument
     * version 0.0.0 2016/05/05
     */
    function css(property, value) {
        if (typeof (property) === 'object' || (typeof (property) === 'string' && (typeof (value) === 'string' || typeof (value) === 'number'))) {
            if (elements.length > 0) {
                forEach(elements, function (element, index) {
                    if (typeof (property) === 'string') {
                        element.style[property] = value;
                    } else {
                        for (var key in property) {
                            element.style[key] = property[key];
                        }
                    }
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                if (typeof (getComputedStyle) === 'function') {
                    return getComputedStyle(elements[0]).getPropertyValue(property);
                } else {
                    return elements[0].currentStyle[property];
                }
            } else {
                return undefined;
            }
        }
    }

    /*
     * empty
     * - innerHTML
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function empty() {
        if (elements.length > 0) {
            forEach(elements, function (element, index) {
                element.innerHTML = '';
            });
        }
        return this;
    }

    /*
     * eq
     * - any
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.1 2016/05/07
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function eq(index) {
        if (elements.length > 0) {
            return a(elements[index]);
        }
        return this;
    }

    /*
     * find
     * - push
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1   	1       5.5	                (Yes)   (Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - querySelectorAll
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1   	3.5     9	                10      3.2     (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function find(query) {
        var result = [];
        if (elements.length > 0) {
            forEach(elements, function (element, index) {
                forEach(element.querySelectorAll(query), function (children, index) {
                    result.push(children);
                });
            });
        }
        return a(result);
    }

    /*
     * index
     * - call
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - indexOf
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	1.5     9	                (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - parentNode
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	0.2 	1.0     (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * - children
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1.0 	3.5     9	                10	    4.0     38.0
     * -------------------------------------------------------------------------------
     * version 0.0.0 2016/05/17
     */
    function index() {
        if (elements.length > 0) {
            return Array.prototype.indexOf.call(elements[0].parentNode.children, elements[0]);
        }
        return undefined;
    }

    /*
     * has class
     * - RegExp
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function hasClass(className) {
        if (elements.length > 0) {
            if (elements[0].classList)
                return elements[0].classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(elements[0].className);
        }
        return undefined;
    }

    /*
     * hide
     * - any
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.0 2016/05/05
     */
    function hide() {
        css('display', 'none');
        return this;
    }

    /*
     * html
     * - any
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)	(Yes)   (Yes)	            (Yes)	(Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.2 2016/10/15
     *  - fixed bug
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function html(content) {
        if (content !== undefined) {
            if (elements.length > 0) {
                forEach(elements, function (element, index) {
                    element.innerHTML = content;
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                return elements[0].innerHTML;
            } else {
                return undefined;
            }
        }

    }

    /*
     * remove
     * - removeChild
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	?       ?       ?                   ?       ?       ?
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function remove() {
        if (elements.length > 0) {
            forEach(elements, function (element, index) {
                element.parentNode.removeChild(element);
            });
        }
        return this;
    }

    /*
     * removeAttr
     * - removeAttribute
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	?       ?       ?                   ?       ?       ?
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/09
     */
    function removeAttr(attribute) {
        if (elements.length > 0) {
            forEach(elements, function (element, index) {
                element.removeAttribute(attribute);
            });
        }
        return this;
    }

    /*
     * remove class
     * - any
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	?       ?       ?                   ?       ?       ?
     * -------------------------------------------------------------------------------
     * version 0.1.0 2016/11/15
     *  - add remove multi class
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function removeClass(className) {
        if (elements.length > 0) {
            if (elements[0].classList) {
                className = className.split(' ');
                forEach(elements, function (element, index) {
                    className.forEach(function (value) {
                        element.classList.remove(value);
                    })
                });
            }
            else {
                forEach(elements, function (element, index) {
                    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                });
            }
        }
        return this;
    }

    /*
     * remove event listener
     * - removeEventListener
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1.0     1.0     9.0                 7       1.0     (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.2 2016/05/29
     *  - fixed bug
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function off(eventName, eventHandler) {
        if (elements.length > 0) {
            forEach(elements, function (element, index) {
                element.removeEventListener(eventName, eventHandler, false);
            });
        }
        return this;
    }

    /*
     * offset
     * - getBoundingClientRect
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1.0     3.0     4.0                 (Yes)   4.0     (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function offset() {
        if (elements.length > 0) {
            return elements[0].getBoundingClientRect();
        }
        return undefined;
    }

    /*
     * add event listener
     * - addEventListener
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1.0     3.0     9.0                 7       1.0     (Yes)
     * -------------------------------------------------------------------------------
     * version 0.1.2 2016/05/29
     *  - fixed bug
     * version 0.1.1 2016/05/11
     *  - fixed bug
     * version 0.1.0 2016/05/09
     * - added event delegation feature
     * version 0.0.0 2016/05/05
     */
    function on() {
        if (elements.length > 0) {
            var selfArguments = arguments;
            if (selfArguments.length === 3) {
                forEach(elements, function (element, index) {
                    element.addEventListener(selfArguments[0], function (event) {
                        var target = a(event.target).closest(selfArguments[1]);
                        if (target == undefined) return false;
                        if (target.elements.length === 0) return false;
                        selfArguments[2].call(target.elements[0], event);
                    }, false);
                });
            } else {
                forEach(elements, function (element, index) {
                    element.addEventListener(selfArguments[0], selfArguments[1], false);
                });
            }
        }
        return this;
    }

    /*
     * outerWidth
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function outerHeight(withMargin) {
        if (elements.length > 0) {
            if (withMargin) {
                var height = elements[0].offsetHeight;
                var style = getComputedStyle(elements[0]);
                height += parseInt(style.marginTop) + parseInt(style.marginBottom);
                return height;
            } else {
                return elements[0].offsetHeight
            }
        }
        return undefined;
    }

    /*
     * outerWidth
     * ie9+
     * version 0.0.0 2016/05/
     */
    function outerWidth(withMargin) {
        if (elements.length > 0) {
            if (withMargin) {
                var width = elements[0].offsetWidth;
                var style = getComputedStyle(elements[0]);
                width += parseInt(style.marginLeft) + parseInt(style.marginRight);
                return width;
            } else {
                return elements[0].offsetWidth
            }
        }
        return undefined;
    }

    /*
     * parent
     * - parentNode
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	0.2     1.0     (Yes)               (Yes)   (Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/09
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function parent() {
        if (elements.length > 0) {
            return a(elements[0].parentNode);
        }
        return this;
    }

    /*
     * prepend
     * - insertBefore
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1.0     (Yes)   (Yes)               (Yes)   (Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function prepend(insertElement) {
        if (elements.length > 0) {
            forEach(elements, function (element, index) {
                element.insertBefore(insertElement, element.firstChild);
            });
        }
        return this;
    }

    /*
     * scrollLeft
     * - scrollLeft
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)   (Yes)   (Yes)               (Yes)   (Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function scrollLeft() {
        if (elements.length > 0) {
            return elements[0].scrollLeft;
        }
        return undefined;
    }


    /*
     * scrollTop
     * - scrollTop
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)   ?       ?                   ?       ?       ?
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function scrollTop() {
        if (elements.length > 0) {
            return elements[0].scrollTop;
        }
        return undefined;
    }

    /*
     * show
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function show() {
        css('display', '');
        return this;
    }

    /*
     * text content
     * - textContent
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	1       2       9                   9.64    3       (Yes)
     * -------------------------------------------------------------------------------
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function text(content) {
        if (content !== undefined) {
            if (elements.length > 0) {
                forEach(elements, function (element, index) {
                    element.textContent = content;
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                return elements[0].textContent;
            } else {
                return undefined;
            }
        }
    }

    /*
     * trigger
     * - createEvent
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	?       ?       ?                   ?       ?       ?
     * -------------------------------------------------------------------------------
     * version 0.0.2 2016/11/15
     *  - fixed bug
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/09
     */
    function trigger(eventName) {
        if (elements.length > 0) {
            forEach(elements, function (element, index) {
                var event = null;
                if (document.createEvent) {
                    event = document.createEvent("HTMLEvents");
                    event.initEvent(eventName, true, true);
                } else {
                    event = document.createEventObject();
                    event.eventType = eventName;
                }
                event.eventName = eventName;
                if (document.createEvent) {
                    element.dispatchEvent(event);
                } else {
                    element.fireEvent("on" + event.eventType, event);
                }
            });
        }
        return undefined;
    }


    /*
     * value
     * - toLowerCase
     * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
     * Basic support	(Yes)   (Yes)   (Yes)               (Yes)   (Yes)   (Yes)
     * -------------------------------------------------------------------------------
     * version 0.1.0 2016/05/17
     *  - now work with input type checkbox
     * version 0.0.2 2016/05/14
     *  - fixed bug in set value
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function value(value) {
        if (value === undefined) {
            if (elements.length > 0) {
                if (elements[0].tagName.toLowerCase() === 'input'
                    &&
                    elements[0].type.toLowerCase() === 'checkbox') {
                    return elements[0].checked;
                } else {
                    return elements[0].value;
                }
            } else {
                return undefined;
            }
        } else {
            if (elements.length > 0) {
                forEach(elements, function (element, index) {
                    if (element.tagName.toLowerCase() === 'input'
                        &&
                        element.type.toLowerCase() === 'checkbox') {
                        element.checked = value;
                    } else {
                        element.value = value;
                    }
                });
            }
            return this;
        }
    }

    return {
        addClass: addClass,
        append: append,
        attr: attr,
        length: length,
        closest: closest,
        css: css,
        empty: empty,
        eq: eq,
        elements: elements,
        find: find,
        index: index,
        hasClass: hasClass,
        hide: hide,
        html: html,
        remove: remove,
        removeAttr: removeAttr,
        removeClass: removeClass,
        outerHeight: outerHeight,
        outerWidth: outerWidth,
        off: off,
        offset: offset,
        on: on,
        outerWidth: outerWidth,
        parent: parent,
        prepend: prepend,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        show: show,
        text: text,
        trigger: trigger,
        value: value
    };
};

/*
 * ajax
 * - XMLHttpRequest
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	1       1.0     7                   (Yes)   1.2     (Yes)
 * -------------------------------------------------------------------------------
 * version 0.3.0 2016/06/01
 *  - add headers arrg
 * version 0.2.0 2016/05/29
 *  - add return XMLHttpRequest object for abort ...
 * version 0.1.0 2016/05/15
 *  - add complete handler
 * version 0.0.3 2016/05/14
 *  - fixed bug in error handling
 * version 0.0.2 2016/05/11
 *  - fixed bug
 * version 0.0.1 2016/05/06
 *  - fixed bug
 * version 0.0.0 2016/05/05
 */
aidJS.ajax = function (params) {
    params = params || {};
    var request = new XMLHttpRequest();
    request.open(params.method, params.url, true);
    params.headers = params.headers || [];
    params.headers.forEach(function (header) {
        request.setRequestHeader(header.key, header.value);
    });
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            if (params.success instanceof Function) {
                params.success(request);
            }
            if (params.complete instanceof Function) {
                params.complete(request);
            }
        } else {
            if (params.error instanceof Function) {
                params.error(request);
            }
            if (params.complete instanceof Function) {
                params.complete(request);
            }
        }
    };
    request.onerror = function () {
        if (params.error instanceof Function) {
            params.error(request);
        }
        if (params.complete instanceof Function) {
            params.complete(request);
        }
    };
    request.send(JSON.stringify(params.data));
    return request;
};

/*
 * copy object
 * - toLowerCase
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	(Yes)   3.5     8.0                 10.5    4.0     (Yes)
 * -------------------------------------------------------------------------------
 * version 0.0.0 2016/05/14
 */
aidJS.copy = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

/*
 * extend
 * - call
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	(Yes)   (Yes)   (Yes)               (Yes)   (Yes)   (Yes)
 * -------------------------------------------------------------------------------
 * - hasOwnProperty
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	(Yes)   (Yes)   (Yes)               (Yes)   (Yes)   (Yes)
 * -------------------------------------------------------------------------------
 * - for in
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	(Yes)   (Yes)   6                   (Yes)   (Yes)   (Yes)
 * -------------------------------------------------------------------------------
 * version 1.0.0 2017/01/18
 *  - add deep mode
 * version 0.0.0 2017/01/17
 */
aidJS.extend = function () {
    var extended = {},
        deep = false,
        i = 0,
        length = arguments.length;
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
    }
    var merge = function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = aidJS.extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
    }
    return extended;
};

/*
 * queryString
 * - toLowerCase
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	5.0     4.0     10                  11.5    5     (Yes)
 * -------------------------------------------------------------------------------
 * version 0.0.0 2016/05/15
 */
aidJS.queryString = {
    /*
     * clean query string
     */
    clean: function () {
        var _uri = location.toString();
        if (_uri.indexOf("?") > 0) {
            var _cleanUri = _uri.substring(0, _uri.indexOf("?"));
            history.replaceState(null, null, _cleanUri);
        }
    },
    /*
     * set key value
     * version 0.1.0 2016/05/18
     *  - add data to state
     * version 0.0.1 2016/05/17
     *  - overwrite arrg
     * version 0.0.0 2016/05/15
     */
    set: function (key, value, data) {
        if (value === undefined) {
            history.pushState(data, null, key);
        } else {
            var _search = location.search;
            var _reg = new RegExp("([?&])" + key + "=[^&#]*", "i");
            if (_reg.test(_search)) {
                _search = _search.replace(_reg, '$1' + key + "=" + value);
            } else {
                var _separator = /\?/.test(_search) ? "&" : "?";
                _search = _search + _separator + key + "=" + value;
            }
            history.pushState(data, null, _search);
        }
    },
    /*
     * get with key
     * version 0.0.0 2016/05/15
     */
    get: function (key) {
        var url = window.location.href;
        key = key.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    /*
     * remove from query string
     */
    remove: function (key) {
        var uri = location.search.replace('?', '').toString().split('&'),
            tobeRemoved = [];
        for (var i = 0, uriLength = uri.length; i < uriLength; i++) {
            if (uri[i].indexOf(key) > -1) {
                uri.splice(i, 1);
                i--;
                uriLength--;
            }
        }
        history.replaceState(null, null, location.origin + location.pathname + '?' + uri.join('&'));
    }
}

/*
 * for debug mode
 * version 0.0.0 206/05/11
 */
aidJS.debug = true;

window.a = window.aidJS = aidJS;