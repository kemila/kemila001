//存放新的50个数列
var new_classes = [];
//存放数列
var classes = [];
//对应数列的合适度
var classes_shi = [];
//对应数列的合适度 占总数的百分比
var classes_shi_percent = [];

window.onload = function () {
    for (var j = 0; j < 500; j++) {
        for (var i = 0; i < 50; i++) {
            new_classes[i] = get_ccC_arry();
        }
        get_shi(new_classes);
//        console.log("new_classes", new_classes);
        console.log("classes_shi"+j, classes_shi);
    }
};
function get_ccC_arry(){
    var classtmp = [];
     for (var i = 0; i < 50; i++) {
        classtmp[i] = i + 1;
    }
    //   构造50个例子
    get_classes(50, classtmp);
    //   计算每个例子的适合度   
    get_shi(classes);
    //  计算每个例子被取的百分比；并随机按概率取得对应的i
    var ccA = get_classes_shi_percent();
    var ccB = get_classes_shi_percent();
    while (ccA == ccB) {
        ccB = get_classes_shi_percent();
    }
//    console.log(ccA, ccB);
//    console.log(classes);
    var ccC_arry = [];
    var ccA_arry = classes[ccA];
    var ccB_arry = classes[ccB];
    //80%交叉
    if (Math.random() < 0.8) {
//        console.log("交叉");
        ccC_arry = C_cross(classes[ccA], classes[ccB]);
        if (Math.random() < 0.8) {
//            console.log("交叉变异");
            ccC_arry = mutated(ccC_arry);
//            console.log("ccC_arry", ccC_arry);
            return ccC_arry;
        }
        else {
//            console.log("交叉NO变异");
//            console.log("ccC_arry", ccC_arry);
            return ccC_arry;
        }
    }
    else {
//        console.log("NO交叉");
        if (Math.random() < 0.8) {
            
            ccA_arry = mutated(ccA_arry);
//            console.log("NO交叉变异");
//            console.log("ccA_arry", ccA_arry);
            return ccA_arry;
        }
        else {
//            console.log("NO交叉NO变异");
//            console.log("ccA_arry", ccA_arry);
            return ccA_arry;
        }
    }
    
}

//数组洗牌函数
Array.prototype.shuffle = function () {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
//构造50个例子
function get_classes(n, classtmp) {
    classes = [];
    for (var i = 0; i < n; i++) {
        //需要深层拷贝
        classes[i] = classtmp.shuffle().slice(0);
    }
}
//得到适应度数组
function get_shi(classes) {
    for (var i = 0; i < classes.length; i++) {
        classes_shi[i] = get_sigle_shi(classes[i]);
    }
}
//得到单个适应度数据
//规定 1-5 冲突 6-10冲突 。。。。。。。。 10条规则
//规定 50 分成 10 8 8 8 8 8的形式 返回50 一共的冲突个数
function get_sigle_shi(class_sigle) {
    var i = 0;
    var j = 0;
    //八个分区
    var shi = 0;
    for (i = 0; i < 10; i++) {
        for (j = i + 1; j < i + 10; j++) {
            if (is_conflict(class_sigle[i], class_sigle[j])) {
                shi++;
                break;
            }
        }
    }
    for (i = 10; i < 18; i++) {
        for (j = i + 1; j < i + 8; j++) {
            if (is_conflict(class_sigle[i], class_sigle[j])) {
                shi++;
                break;
            }
        }
    }
    for (i = 18; i < 26; i++) {
        for (j = i + 1; j < i + 8; j++) {
            if (is_conflict(class_sigle[i], class_sigle[j])) {
                shi++;
                break;
            }
        }
    } 
    for (i = 26; i < 34; i++) {
        for (j = i + 1; j < i + 8; j++) {
            if (is_conflict(class_sigle[i], class_sigle[j])) {
                shi++;
                break;
            }
        }
    }
    for (i = 34; i < 42; i++) {
        for (j = i + 1; j < i + 8; j++) {
            if (is_conflict(class_sigle[i], class_sigle[j])) {
                shi++;
                break;
            }
        }
    }
    for (i = 42; i < 50; i++) {
        for (j = i + 1; j < i + 8; j++) {
            if (is_conflict(class_sigle[i], class_sigle[j])) {
                shi++;
                break;
            }
        }
    }
    return (50-shi) / 50;
}
//判断是否冲突
function is_conflict(a, b) {
    if (Math.abs(a - b) < 5) return 1;
    else return 0;
}
//计算百分比 并且按概率随机取出对应的i
function get_classes_shi_percent() {
    var total = 0;
    var i = 0
    for (i = 0; i < classes_shi.length; i++) {
        total += classes_shi[i];
    }
    for (i = 0; i < classes_shi.length; i++) {
        classes_shi_percent[i] = classes_shi[i] / total;
    }
    //    console.log("asdfasdf",Math.random());
    var random_n = Math.random();
    var tmp_total = 0;
    for (i = 0; i < classes_shi_percent.length; i++) {
        tmp_total += classes_shi_percent[i];
        if (random_n < tmp_total) {
            return i;
        }
        else {
            continue;
        }
    }
}
//交叉 a,b 
function C_cross(a, b) {
    //    console.log("ab",a,b);
    var n1 = Math.round(Math.random() * 4 + 1);
    var n2 = Math.round(Math.random() * 4 + 1);
    while (n1 == n2) {
        n2 = Math.round(Math.random() * 4 + 1);
    }
    var b_one = Math.min(n1, n2);
    var b_two = Math.max(n1, n2);
    var ccC = [];
    var ccD = [];
    var n_b_one = 10 + 8 * (b_one - 1);
    var n_b_two = 10 + 8 * (b_two - 1);
    
    for (var i = 0; i < 50; i++) {
        if (i < n_b_one || i >= n_b_two) {
            ccC[i] = a[i];
            ccD[i] = b[i];
        }
        else {
            ccC[i] = b[i];
            ccD[i] = a[i];
        }
    }
    var t_a = a.slice(n_b_one, n_b_two);
    var t_b = b.slice(n_b_one, n_b_two);
    var tmp = [];
    for (var i = n_b_one; i < n_b_two; i++) {
        for (var j = n_b_one; j < n_b_two; j++) {
            if (ccC[i] === ccD[j]) {
                tmp.push(ccC[i]);
            }
        }
    }
    t_a = minous_arry(t_a, tmp);
    t_b = minous_arry(t_b, tmp);
    //重复值替换
//    console.log("ccC",ccC);
    for (var i = 0; i < 50; i++) {
        if (i < n_b_one || i >= n_b_two) {
            for (var j = 0; j < t_b.length; j++)
                if (ccC[i] == t_b[j]) {
                    ccC[i] = t_a[j];
                }
        }
    }
//    console.log("ccC2",ccC);
    return ccC;
}
//变异
function mutated(arr) {
    var a = Math.round(Math.random() * 49 + 1);
    var b = Math.round(Math.random() * 49 + 1);
    var t = 0;
    for (var i = 0;; i++) {
        if (i > 100) {
            break;
        }
        if ((a < 11 || b < 11) && Math.abs(a - b) > 9) {
            t = arr[a];
            arr[a] = arr[b];
            arr[b] = t;
            break;
        }
        else if (Math.abs(a - b) > 7) {
            t = arr[a];
            arr[a] = arr[b];
            arr[b] = t;
            break;
        }
        else {
            b = Math.round(Math.random() * 49 + 1);
        }
    }
    return arr;
}
//数组去重函数
function minous_arry(arr1, arr2) {
    var temp = []; //临时数组1  
    var temparray = []; //临时数组2  
    for (var i = 0; i < arr2.length; i++) {
        temp[arr2[i]] = true; //巧妙地方：把数组B的值当成临时数组1的键并赋值为真  
    };
    for (var i = 0; i < arr1.length; i++) {
        if (!temp[arr1[i]]) {
            temparray.push(arr1[i]); //巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组  
        };
    };
    return temparray;
}