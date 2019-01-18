function type(target){//完善typeof
        var typeStr = typeof(target);
        var toStr = Object.prototype.toString;
        var objStr = {
            "[object Object]" : "objecat - Object",
            "[object Array]" :  "array - Object",
            "[object Number]" : "array - Object",
            "[object Boolean]" : "boolean - Object",
            "[object String]" :  "string - Object"
        }

        if(target === null){
            return null;
        }else if(typeStr === "function"){
            return "function";
        }
        if(typeStr !== "object"){
            return typeStr;
        }else{
            return objStr[toStr.call(target)];
        }
}

Array.prototype.unique = function(){//数组去重
    var temp = {},// 拿来判断数组arr是否有这个值  因为 对象的属性名不可以重复
        arr = [],
        len = this.length;
    for(var i = 0; i < len; i++ ){
        if(!temp[this[i]]){
            temp[this[i]] = "abc";
            arr.push(this[i]);
        }
    }
    return arr;
}

