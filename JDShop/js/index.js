window.onload = () => {

    searchEffect();
    timeBack();
}

searchEffect = () => {
    // 顶部逐渐消失的效果
    //获取轮播图的节点
    const banner = document.querySelector("#banner");
    //获取轮播图的高度
    let bannerHeight = banner.offsetHeight;
    let search = document.getElementById("search");
    window.onscroll = () => {
        //兼容性
        let offsetTop = document.documentElement.scrollTop || document.body.scrollTop;
        let opacity = 0
        if (offsetTop * 5 < bannerHeight) {
            opacity = offsetTop * 5 / bannerHeight;
            search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
        }
    }
}


timeBack = () => {
    // 获取用用于展示时间的div
    var boxs = document.querySelectorAll(".kill_time>div");

    var totalTime = 3600;

    let timeID = setInterval(function () {
        if (totalTime < 0) {
            clearInterval(timeID);
        } else {
            let hour = Math.floor(totalTime / 3600);
            let minute = Math.floor(totalTime % 3600 / 60);
            let second = totalTime % 60;
            if (hour >= 10) {
                boxs[0].innerText = hour;
            } else {
                boxs[0].innerText = "0" + hour;
            }
            if (minute >= 10) {
                boxs[1].innerText = minute;
            } else {
                boxs[1].innerText = "0" + minute;
            }
            if (second >= 10) {
                boxs[2].innerText = second;
            } else {
                boxs[2].innerText = "0" + second;
            }
            totalTime--;
        }
    }, 1000);


    bannerEffect();
}

// 自动轮播图
// 思路1   不推荐   轮播图数量不一样
/*1.在首尾添加图片
 *      1、再开始位子添加原始的最后一张图片
 *      2、在最后位子添加原始的第一张图片
  2.修改页面结构
 *
 *3.修改对应样式
 *
 *4.设置默认偏移：默认应该显示索引 1 的图片
         transform：translateX(-10%)：参照自身
         left：-100%； 参照父容器  
         父容器 position：relative
 */


//  轮播图


bannerEffect = () => {
    /*1.设置 修改轮播图的页面结构
     *     a.在开始的位子添加原始的最后一张图片
     *     b.在结束的位子添加原始的第一张图片
     */
    /**1.1获取轮播图的结构 */
    let banner = document.querySelector(".jd_banner");
    /**获取图片容器 */
    let imgBox = banner.querySelector("ul:first-of-type");
    // 获取第一张图片
    let first = imgBox.querySelector("li:first-of-type");
    // 获取最后一张图片
    let last = imgBox.querySelector("li:last-of-type");
    // cloneNode  复制一个dom 元素
    // 在尾部插入图片
    imgBox.appendChild(first.cloneNode(true));
    //在头部插入图片
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

    /**
     * 2.修改对应的样式
     */
    //获取所有的 li  
    let lis = imgBox.querySelectorAll("li");
    // 获取li 的数量
    let count = lis.length;
    let bannerWidth = banner.offsetWidth;
    // 设置图片盒子的宽度
    imgBox.style.width = count * bannerWidth + "px";
    // 修改li 的宽度
    lis.forEach(li => {
        li.style.width = 100 / count + "%";
    });
    // 3、设置默认偏移
    imgBox.style.left = -bannerWidth + "px";
    
    // 定义图片索引   图片已经有了一个宽度的默认偏移
    let index = 1;
    // 4、监听屏幕变化
    window.onresize = () => {
        // 获取窗口的宽度
        bannerWidth = banner.offsetWidth;
        // 设置图片盒子的宽度
        imgBox.style.width = count * bannerWidth + "px";
        // 修改li 的宽度
        lis.forEach(li => {
            li.style.width = 100 / count + "%";
        });
        // 3、设置默认偏移
        imgBox.style.left = -index*bannerWidth + "px";
    }
    /**
     * 5.实现自动轮播
     */
    setInterval(() => {
        //  5.1 索引的变换
        index++;
        //  5.2 添加过度效果
        imgBox.style.transition = "left 0.5s ease-in-out";
        /**5.3设置偏移 */
        imgBox.style.left = (-index * bannerWidth) + "px";
        //5.4判断是否轮播到最后一张
        //过度效果执行是需要时间
        setTimeout(() => {
            if (index == count - 1) {
                index = 1;
                // 如果一个元素的某个属性之前添加过过度效果，那么过度属性会一直存在，如果想要。则需要清除过度效果
                // 关闭过度效果
                imgBox.style.transition = "none";
                imgBox.style.left = (-index * bannerWidth) + "px";
            }
        },500);

    }, 2000)
}