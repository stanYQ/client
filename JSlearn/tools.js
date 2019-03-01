function type(target) {//完善typeof
    var typeStr = typeof (target);
    var toStr = Object.prototype.toString;
    var objStr = {
        "[object Object]": "objecat - Object",
        "[object Array]": "array - Object",
        "[object Number]": "array - Object",
        "[object Boolean]": "boolean - Object",
        "[object String]": "string - Object"
    }

    if (target === null) {
        return null;
    } else if (typeStr === "function") {
        return "function";
    }
    if (typeStr !== "object") {
        return typeStr;
    } else {
        return objStr[toStr.call(target)];
    }
}

Array.prototype.unique = function () {//数组去重
    var temp = {},// 拿来判断数组arr是否有这个值  因为 对象的属性名不可以重复
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = "abc";
            arr.push(this[i]);
        }
    }
    return arr;
}
//返回元素的第N个父节点
function retParent(elem, n) {
    while (n) {
        if (elem != null) {
            elem = elem.parentElement;
            n--;
        } else {
            n = 0;
            console.log("elem == null");
        }
    }
    return elem;
}

//返回元素的第N个兄弟节点  当n大于0 返回后一个元素  当n小于0 返回前一个元素  此方法兼容性不好
function retSibling(elem, n) {
    while (elem && n) { //判断elem 是否为null
        if (n > 0) {
            elem = elem.nextElementSibling;
            n--;
        } else {
            elem = elem.previousElementSibling;
            n++;
        }
    }
    return elem;
}

//解决上一方法兼容性不好的问题
function retSibling2(elem, n) {
    while (elem && n) { //判断elem 是否为null
        if (n > 0) {
            if (elem.nextElementSibling) {
                elem = elem.nextElementSibling;
            } else {//容错 确保elem 存在且有意义  
                for (elem = elem.nextSibling; elem && elem.nodeType != 1; elem = elem.nextSibling); // for循环的新应用  一种递归的思维
            }
            n--;
        } else {
            if (elem = elem.previousElementSibling) {
                elem = elem.previousElementSibling
            } else {
                for (elem = elem.previousSibling; elem && elem.nodeType != 1; elem = elem.previousSibling);
            }
            n++;
        }
    }
    return elem;
}
//用于代替for的递归函数  查找前一个兄弟节点的递归函数同理
//    function foo(e){
//             if(e && e.nodeType != 1){    
//                e = e.nextSibling;
//                foo(e);
//             }
//             if(e && e.nodeType === 1) return e;
//         }


//用myChildren 方法实现  Children  解决兼容性的问题
//功能 打印子元素
Element.prototype.myChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) { // 区分节点类型
            arr.push(child[i]);
        }
    }
    return arr;
}

//类似insertAfter的方法 将targetNode插入到afterNode 后面
// 思路： 找出afterNode的后一个兄弟节点 利用 insertBefore 将目标节点插入到此节点前
Element.prototype.insertAfter = function (targetNode, afterNode) {
    var beforNode = afterNode.nextElementSibling;
    if (beforNode == null) {//容错
        this.appendChild(targetNode);
    } else {
        this.insertBefore(targetNode, beforNode);
    }
}

//获取滚动条距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }

    }else{
        return{
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//获取可视窗口尺寸
function getViewportOffset(){
    if(window.innerWidth){
        return{
            w : window.innerWidth,
            h : window.innerHeight,
        }
    }else{
        if(document.compatMode === "BackCompat"){//是否为怪异模式
            return{
                w : document.body.clientWidth,
                h : document.body.clientHeight,
            }
        }else{
            return{
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight,
            }
        }
    }
}

//查询样式的封装  解决兼容性问题
function getStyle(ele,prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele, null)[prop];
    }else{
        ele.currentStyle[prop];
    }
}

//封装绑定事件的函数 解决兼容性
function addEvent(elem, type, handle){// handdle: function(){}
    if(elem.addEventListener){
        elem.addEventListener(type, handle, false);
    }else if(elem.attachEvent){
        elem.attachEvent("on" + type, function(){
            handle.call(elem);
        });
    }else{
        elem['on' + type] = handle;
    }
}

//取消冒泡事件
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

//阻止默认事件
function cancelHandler(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

// IE6 以下没有fixed  没有解决兼容   直接获取TOP值 使用 elem.offsetTop  return  NUMBER
function setFixed(elem) {
    var elemTop = elem.offsetTop;
    window.onscroll = function () {
        elem.style.top = elemTop + window.pageYOffset + "px";
    }
}

