$(function () {
    let poke=[];
    let colorArr=["s","h","d","c"];
    let flag={};

    for(let i=0;i<52;i++){
        let index=Math.floor(Math.random()*colorArr.length);
        let color=colorArr[index];
        let number=Math.round(Math.random()*12+1);

        while (flag[color+"_"+number]){
            index=Math.floor(Math.random()*colorArr.length);
            color=colorArr[index];
            number=Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color+"_"+number]=true;
    }
    console.log(poke);

//发牌
    let index=-1;
    for (let i=0;i<7;i++){
        for (let j=0;j<=i;j++){
            index++;
            let obj=poke[index];
            let lefts=350-50*i+100*j,tops=50*i;
            $("<div>").addClass("poke")
                .css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg`})
                .appendTo(".box")
                .attr("id",i+"_"+j)
                .data("number",obj.number)
                .delay(index*100)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }

//剩下的牌
    for(;index<52;index++){
        let obj=poke[index];
        $("<div>").addClass("poke left")
            .css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg`})
            .appendTo(".box")
            .attr("id","-2_-2")
            .data("number",obj.number)
            .delay(index*100)
            .animate({left:0,top:480,opacity:1})
    }

    //点击上移选择未压住的牌
    let first=null;
    $(".box").on("click",".poke",function(){
        let _this=$(this);
        let [i,j]=_this.attr("id").split("_");
        console.log(_this.attr("id"));
        let id1=i*1+1+"_"+j;
        let id2=i*1+1+"_"+(j*1+1);

        //对象
        if($("#"+id1).length||$("#"+id2).length){
            return;
        }
        if(_this.hasClass("active")){
            $(this).removeClass("active").animate({top:"+=30px"})
        }else{
            $(this).addClass("active").animate({top:"-=30px"})
        }

        if(!first){
            first=_this;
        }else{
            //判断
            let number1=first.data("number");
            let number2=_this.data("number");
            if((number1+number2)%2===0){
                $(".active").animate({top:0,left:710,opacity:0},function(){
                    $(this).remove();
                });
            }else {
                $(".active").animate({top:"+=30px"},function () {
                    $(this).removeClass("active");
                })
            }
            first=null;
        }
    });

    //按钮切换
    let n=0;
    $(`.rightbtn`).on(`click`,function(){
        $(`.left`).last().css(`zIndex`,n++).animate({left:707},function(){
            $(this).removeClass(`left`).addClass(`right`)
        })
    });
    $(`.leftbtn`).on(`click`,function(){
        $(`.right`).last().css(`zIndex`,n++).animate({left:0},function(){
            $(this).removeClass(`right`).addClass(`left`)
        })
    })
    // let n=0;
    // $(".right").on("click",function () {
    //     $(".left").last().css("zIndex",n++).animate({left:707},function () {
    //         $(this).removeClass("leftbtn").addClass("right")
    //     })
    // })


});