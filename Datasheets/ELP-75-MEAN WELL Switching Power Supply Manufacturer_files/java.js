

$(window).load(function () {

    $('#sc').each(function () {

        if ($('#sc').val() != '' && $('#si').val() != '') {

            // var scID = 'tag-' + $('#sc').val() + '-' + $('#si').val();
            var scID = location.hash.replace("#", "");
            $('body').scrollTo($('#' + scID), 800);

        }

    });


});


$(document).ready(function () {

    $("body").delegate(".changInqQty", "change", function () {

        useAjax('changInqQty', $(this).attr("data-id") + "," + $(this).val())


    });
    $("body").delegate(".delInqPro", "click", function () {


        var thisID = $(this).attr('data-value');


        var topDiv3 = $('#v_' + thisID).parents('.form-group');
        var topDiv2 = $('#v_' + thisID).parents('.item2');
        var topDiv1 = $('#v_' + thisID).parents('.service-series-tag');
        var topDiv = topDiv1.prev('.service-series-name');


        $('#v_' + thisID).remove();


        if (topDiv3.find('.col-sm-10').html().trim() == '') {
            topDiv3.remove();
        }

        if (topDiv2.find('div').html() == null) {
            topDiv2.remove();
        }
        if (topDiv1.find('div').html() == null) {
            topDiv1.remove();
        }
        if (topDiv.next('.service-series-tag').html() == null) {
            topDiv.remove();
        }

        useAjax('removeInqData', thisID);
    });
    //加入諮詢商品
    $("body").delegate(".addInq", "click", function () {

        var addID = "";

        $('.selPro').each(function () {


            if ($(this).prop("checked") == true) {
                addID += $(this).parents('.content').find("#seriesName").html() + "~" + $(this).parents('.content').find("#groupsName").html() + "~" + $(this).attr("data-pt") + "~" + "i" + $(this).val() + "|";

            }

        });

        //alert(addID);
        if (addID == "") {
            alert("Please select any product!");
            return false;
        }
        else {

            useAjax('saveInqProduct', addID);

        }
    });


    //取得諮詢商品
    $('.getinqData').click(function () {

        $('#seriesName').html($(this).attr('data-series'));
        $('#groupsName').html($(this).attr('data-group'));


        useAjax('getinqData', $(this).attr("data-id"));
    });





    if (location.pathname.indexOf("Meanwell_Products.html") != -1) {

        $('#header').hide();
        $('#footer').hide();
    }

    //顯示代理商說明
    $('.viewNotes').click(function () {


        $('#ViewMsg').html("");
        $('#profile_title').html("");

        useAjax('viewNotes', $(this).attr("data-id") + "," + $(this).attr("data-table"));

    });


    //點分享
    $('.clickShare').click(function () {

        useAjax('clickShare', $(this).attr("data-note"));

    });


    //點選ALL
    $(".sALL").click(function () {
        $("#proList").html('');
        $('.fastTop.active').trigger("click");
    });


    $("#myTable").each(function () {
        $("#myTable").tablesorter();
    });


    //FB分享
    $(".fb_s").click(function (e) {
        var thisURL = location.href;
        window.open('http://www.facebook.com/share.php?u='.concat(thisURL), 'pop', config = 'height=500,width=500');
    });

    //表單驗證
    var ProLay = "topLeft";


    if ($("#sForm").length) {
        $("#sForm").validationEngine({
            inlineValidation: false,
            promptPosition: ProLay,
            success: true,
            scroll: false,
            onValidationComplete: function (form, status) {
                if (status == true) {
                    $("#sForm").bind('submit', function (e) {
                        e.preventDefault();
                    });
                    //判斷驗證
                    /*   if ($('.Re_mess').val() != null)
                    {
                        $('.Re_mess').val($('#Re_mess').val().replace(/\,/g, '，').replace(/\'/g, '&rsquo;').replace(/\"/g, '&quot;').replace(/\’/g, '&rsquo;').replace(/\"/g, '&#34;'));
                    }

                  if ($('#info').val() != null) {
                        $('#info').val($('#info').val().replace(/\,/g, '，').replace(/\,/g, '，').replace(/\'/g, '&rsquo;').replace(/\"/g, '&quot;').replace(/\’/g, '&rsquo;').replace(/\"/g, '&#34;'));
                    }
                    */

                    //if ($('.Re_mess').val() != null) {
                    //    // $('.Re_mess').val(encodeURI($.base64.encode($('.Re_mess').val()).replace(/\=/g, '@@@')));

                    //    $('.Re_mess').val(encodeURI($('.Re_mess').val().replace(/\,/g, "，").replace(/\'/g, "&rsquo;").replace(/\"/g, '&#34;')));
                    //}




                    setLoadPlayer('', 'center', 'center');
                    /*    var vals = $('#sForm').serialize();
    
                        $('.numQty').each(function () {
                            
    
                            vals += "&" + $(this).attr('id') + "=" + $(this).val();
    
                        });
                        */


                    var valsTemp = $("#sForm").serializeArray();


                    $('.numQty').each(function () {


                        //  vals += "&" + $(this).attr('id') + "=" + $(this).val();

                        var valsTemp = new Array();
                        var arr = new Object();
                        arr.name = $(this).attr('id');
                        arr.value = $(this).val();
                        valsTemp.push(arr);

                    });



                    var vals = JSON.stringify(valsTemp);





                    //vals = decodeURIComponent(vals, true);
                    console.log(vals);

                    useAjax('saveRequestData', vals);
                    return false;

                }
                else {
                    $("#sForm").bind('submit', function (e) {
                        e.preventDefault();
                    });

                }
            }
        });
    }

    //誠信信箱
    if ($("#iForm").length) {
        $("#iForm").validationEngine({
            inlineValidation: false,
            promptPosition: ProLay,
            success: true,
            scroll: false,
            onValidationComplete: function (form, status) {
                if (status == true) {
                    $("#iForm").bind('submit', function (e) {
                        e.preventDefault();
                    });
                    //if ($('.Re_mess').val() != null) {
                    //    $('.Re_mess').val(encodeURI($('.Re_mess').val().replace(/\,/g, "，").replace(/\'/g, "&rsquo;").replace(/\"/g, '&#34;')));
                    //}
                    setLoadPlayer('', 'center', 'center');
                    var valsTemp = $("#iForm").serializeArray();

                    $('.numQty').each(function () {
                        var valsTemp = new Array();
                        var arr = new Object();
                        arr.name = $(this).attr('id');
                        arr.value = $(this).val();
                        valsTemp.push(arr);
                    });

                    var vals = JSON.stringify(valsTemp);
                    //vals = decodeURIComponent(vals, true);
                    console.log(vals);

                    useAjax('saveRequestDataIn', vals);
                    return false;
                }
                else {
                    $("#iForm").bind('submit', function (e) {
                        e.preventDefault();
                    });
                }
            }
        });
    }

    if ($("#rForm").length) {
        $("#rForm").validationEngine({
            inlineValidation: false,
            promptPosition: ProLay,
            success: true,
            scroll: false,
            onValidationComplete: function (form, status) {
                if (status == true) {
                    $("#rForm").bind('submit', function (e) {
                        e.preventDefault();
                    });
                    //判斷驗證

                    setLoadPlayer('', 'center', 'center');

                    var vals = $('#rForm').serialize();
                    vals = decodeURIComponent(vals, true);



                    useAjax('reServiceData', vals);

                    return false;

                }
                else {
                    $("#rForm").bind('submit', function (e) {
                        e.preventDefault();
                    });

                }
            }
        });
    }

    //RMA全球保固頁面
    if ($("#rmaForm").length) {
        $("#rmaForm").validationEngine({
            inlineValidation: false,
            promptPosition: ProLay,
            success: true,
            scroll: false,
            onValidationComplete: function (form, status) {
                if (status == true) {
                    $("#rmaForm").bind('submit', function (e) {
                        e.preventDefault();
                    });

                    if ($('.Re_mess').val() != null) {
                        // $('.Re_mess').val(encodeURI($.base64.encode($('.Re_mess').val()).replace(/\=/g, '@@@')));

                        $('.Re_mess').val(encodeURI($('.Re_mess').val().replace(/\,/g, "，").replace(/\'/g, "&rsquo;").replace(/\"/g, '&#34;')));
                    }

                    setLoadPlayer('', 'center', 'center');
  
                    var id = getUrlParameter("i"); //URL參數i代表經銷商代碼
                    $("#Re_bus").val(id);  //Re_bus存經銷商代碼

                    var valsTemp = $("#rmaForm").serializeArray();
                    $('.numQty').each(function () {
                        //  vals += "&" + $(this).attr('id') + "=" + $(this).val();
                        var valsTemp = new Array();
                        var arr = new Object();
                        arr.name = $(this).attr('id');
                        arr.value = $(this).val();
                        valsTemp.push(arr);
                    });

                    var vals = JSON.stringify(valsTemp);
                    vals = decodeURIComponent(vals, true);
                    console.log(vals);
                    useAjax('saveRMAData', vals);
                    return false;
                }
                else {
                    $("#sForm").bind('submit', function (e) {
                        e.preventDefault();
                    });
                }
            }
        });
    }

    $('#RMA_btn').click(function () {
        var valsTemp = $("#ChkSnForm").serializeArray();
        var vals = JSON.stringify(valsTemp);
        vals = decodeURIComponent(vals, true);
        console.log(vals);
        useAjax('ckWarranty', vals);
        return false;
    });


    //代理商產品線
    $('.proLineChk').click(function () {

        $('#chkAll').prop("checked", false);
        if ($(this).prop("checked") == true) {
            $('#chkProLine').val($('#chkProLine').val() + $(this).val() + ',');
        }
        else {

            $('#chkProLine').val($('#chkProLine').val().replace($(this).val() + ',', ""));
        }
    });
    //代理商產品線(選擇全部)
    $('#chkAll').click(function () {

        $('.proLineChk').prop("checked", false);
        $('#chkProLine').val('');
    });


    //代理商搜尋
    $('.disSearch').click(function () {



        var AddSearch = "";


        if ($('#country1').val() != "" && $('#country2').val() != "") {

            if ($('#country1').val() != "") {
                AddSearch += "&c1=" + $('#country1').val();

            }
            if ($('#country2').val() != null && $('#country2').val() != "") {
                AddSearch += "&c2=" + $('#country2').val();
            }
            if ($('#chkProLine').val() != "") {
                AddSearch += "&pro=" + $('#chkProLine').val();
            }

            window.location.href = 'distributors.aspx?s=' + AddSearch;

        }
        else {

            alert("Please select Contry and Area!");
            return false;
        }


    });


    //國家切換
    $('#country2').each(function () {

        if ($('#country1').val() != "") {
            useAjax("getCountry2", $('#country1').val() + ',' + $('#country2Val').val());
        }
    });



    //國家切換
    $('#country1').change(function () {


        useAjax("getCountry2", $(this).val() + ',' + $('#country2Val').val());

    });




    //點選快速搜尋上方大項
    $("body").delegate(".fastTop", "click", function () {


        var op = 2;
        for (var i = op; i <= 10; i++) {

            $('#u_' + $(this).attr('data-note') + '_' + i + ' input[type=checkbox]').each(function () {

                $(this).prop('checked', false);

                if (i >= 3) {
                    $(this).attr('disabled', true);
                }

                $('#u_' + $(this).attr('data-note') + '_sp_' + $(this).val()).attr('style', 'color:#CCCCCC');
            });

            $('#u_' + $(this).attr('data-note') + '_' + i + ' input[type=radio]').each(function () {

                $(this).prop('checked', false);
                $(this).attr('disabled', true);
                $('#u_' + $(this).attr('data-note') + '_sp_' + $(this).val()).attr('style', 'color:#CCCCCC');
            });

        }
        $('#u_' + $(this).attr('data-note') + '_1 input[type=radio]').eq(0).prop("checked", true);


        $('.proFastSearch').attr('data-value', $(this).attr('data-id'));

        $('#compareList').hide();
        $('#proList').html("");



        //重製搜尋
        // useAjax('resetProList', $(this).attr('data-id'));

    });


    //切換下層(chcekbox)
    $('.cbNext').click(function () {


        var needID = "";


        if ($(this).prop('disabled') == false) {

            if ($(this).attr("type") == "radio" && $(this).val() == '17' && $(this).attr('data-lay') == '1') {
                $('#_y1').html('W');
                $('#_y2').html('H');
                $('#_y3').html('D');


            }
            if ($(this).attr("type") == "radio" && $(this).val() != '17' && $(this).attr('data-lay') == '1') {
                $('#_y1').html('L');
                $('#_y2').html('W');
                $('#_y3').html('H');
            }

            var eachID = "u_" + $(this).attr('data-note') + "_" + $(this).attr('data-lay');

            var thisLay = $(this).attr('data-note');


            $('#tab-p' + thisLay + ' input[type=radio]').each(function () {



                if ($(this).prop("checked") == true) {

                    needID += $(this).val() + "|";

                }
            });


            $('#tab-p' + thisLay + ' input[type=checkbox]').each(function () {

                if ($(this).prop("checked") == true) {
                    needID += $(this).val() + "|";
                }
            });

            // alert(needID);


            $('#' + eachID + ' input[type=' + $(this).attr('type') + ']').each(function () {

                if ($(this).prop("checked") == true) {

                    //needID += $(this).val() + "|";

                }
                else {


                    var op = parseInt($(this).attr('data-lay')) + 2;
                    for (var i = op; i <= 10; i++) {

                        $('#u_' + $(this).attr('data-note') + '_' + i + ' input[type=checkbox]').each(function () {

                            $(this).prop('checked', false);
                            $(this).attr('disabled', true);
                            $('#u_' + $(this).attr('data-note') + '_sp_' + $(this).val()).attr('style', 'color:#CCCCCC');
                        });


                        $('#u_' + $(this).attr('data-note') + '_' + (i - 1) + ' input[type=checkbox]').each(function () {

                            $(this).prop('checked', false);

                        });
                    }


                }
            });

            //alert($(this).attr('data-note') + ',' + needID + ',' + $(this).attr('data-lay'));

            useAjax('getProductCbNext', $(this).attr('data-note') + ',' + needID + ',' + $(this).attr('data-lay'));
        }



    });



    $('.proFastSearch').click(function () {

        var needID = "";
        var needLay = "";


        $('#tab-p' + $(this).attr("data-value") + ' input[type=radio]').each(function () {

            if ($(this).prop("checked") == true) {

                needID += $(this).val() + "|";

                needLay += $(this).attr('data-lay') + "|";
            }
        });

        $('#tab-p' + $(this).attr("data-value") + ' input[type=checkbox]').each(function () {

            if ($(this).prop("checked") == true) {
                needID += $(this).val() + "|";
                needLay += $(this).attr('data-lay') + "|";
            }
        });



        // alert(needID + "\n" + needLay);
        var needVal = $(this).attr("data-value") + ',' + needID + ',' + needLay;


        useAjax('getProductFastNext', needVal);


    });

    $('#join_data').each(function () {

        if ($('#join_data').val() != "") {
            useAjax('openCompare', $('#join_data').val());
        }


    });


    //計算比較數

    $('.joinCompare').click(function () {

        var i = 0;
        $('input[name=proID]').each(function () {
            if ($(this).prop("checked") == true) {

                i++;

            }

        });


        var nowChk = $(this);

        if (i > 3) {
            $.MessageBox({
                buttonDone: "OK",
                message: "<h3 class='red' align='center'>Only select three products!</h3>"
            }).done(function () {

                nowChk.prop("checked", false);

                return false;

            }).fail(function () {

            });


        }


    });
    //點選開始比較

    $('.openCompare').click(function () {


        var joinID = "";

        $('input[name=proID]').each(function () {


            if ($(this).prop("checked") == true) {
                joinID = joinID + $(this).val() + ',';
            }

        });



        if (joinID != "") {


            useAjax('openCompare', joinID);
            $('.comparePrint').attr("href", "productPrint.aspx?j=" + joinID);

        }
        else {

            $.MessageBox({
                buttonDone: "OK",
                message: "<h3 class='red' align='center'>Please select at least two products!</h3>"
            }).done(function () {

                return false;

            }).fail(function () {

            });

        }

    });


    //產品查詢送出
    $('.proSearch').click(function () {

        var idArr = $(this).attr('data-note').split(',');


        var sel = $('#sel' + idArr[0] + '_' + idArr[1]);

        if (sel.val() == "") {
            window.location.href = 'productSearch.aspx?c=' + idArr[0] + '&g=' + idArr[1];

        }
        else {

            //window.location.href = 'productPdf.aspx?i=' + sel.val();
            var thisFileRoot = $('#thisFileRoot').val();

            if (thisFileRoot != "") {

                thisFileRoot = thisFileRoot + "/";
            }

            window.location.href = '/webapp/product/search.aspx?prod=' + sel.find(":selected").attr('data-value');


        }
    });


    //選取
    $('.labelSelect').click(function () {

        $('.labelSelect').removeClass('active');
        $(this).addClass('active');

    });

    //讀取地圖
    $('#map').each(function () {

        $.fn.tinyMapConfigure({
            'key': 'AIzaSyDfnjpBIUZtNJdS6N8Gte2AsFGFp2Wojm0',
            'language': 'en'
        });
        $('#map').tinyMap({
            'center': ['25.065270', '121.453866'],
            'zoom': 15,
            'marker': [

                {
                    'addr': ['25.065270', '121.453866'],
                    'text': 'No.28, Wuquan 3rd Rd., Wugu Dist., New Taipei City 24891, Taiwan (R.O.C.)',
                    'css': 'labels',
                    'label': '',
                    // 自訂圖示
                    'icon': {
                        'url': 'styles/images/googemap-icon.png',
                        'scaledSize': [71, 63]
                    },
                    // 動畫效果
                    'animation': 'DROP',

                }

            ]
        });

    });

});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



//AJAX動作
function useAjax(ACT, needVal) {


    $.ajax({
        type: 'POST',
        url: 'includes/WebService1.asmx/HelloWorld',
        data: { Func: ACT, Val: encodeURI(needVal) },
        dataType: 'json',
        beforeSend: function () {



        },
        success: function (json) {


            //回傳判斷 
            switch (ACT) {



                //移除諮詢商品
                case "removeInqData":


                    if (json.re == '0') {
                        alert("You need join any product!");
                        window.location.href = 'productSeries.aspx';
                        return false;
                    }

                    break;


                    //加入諮詢商品
                case "saveInqProduct":

                    $(".addInqOkBut").trigger("click");

                    break;


                    //取得諮詢商品列
                case "getinqData":

                    if (json.re != '') {
                        $('#proList').html(json.re);
                    }


                    break;


                case "viewNotes":


                    $('#ViewMsg').html(json.re);
                    $('#profile_title').html(json.title);

                    break;

                    //取得分享
                case "clickShare":


                    $('#share_url').show();

                    $('#share_url').val(json.re);


                    break;




                    //工單回傳
                case "reServiceData":


                    setLoadPlayer('none', 'center', 'center');
                    if (json.re == 'codeError') {
                        $.MessageBox({
                            buttonDone: "OK",
                            message: "<h3 class='red' align='center'>Verify Code is Error! Please try again.</h3>"
                        }).done(function () {

                            return false;

                        }).fail(function () {

                        });

                    }
                    else {
                        $('#vServiceData').show();
                        $('#sList').html(json.re);
                    }



                    break;

                    //表單回傳
                case "saveRequestData":


                    setLoadPlayer('none', 'center', 'center');

                    if (json.re == 'codeError') {
                        $.MessageBox({
                            buttonDone: "OK",
                            message: "<h3 class='red' align='center'>Verify Code is Error! Please try again.</h3>"
                        }).done(function () {

                            return false;

                        }).fail(function () {

                        });

                    }
                    else {

                        window.location.href = 'serviceSend.aspx?r=' + json.reType;
                    }

                    break;

                    //誠信信箱
                case "saveRequestDataIn":


                    setLoadPlayer('none', 'center', 'center');

                    if (json.re == 'codeError') {
                        $.MessageBox({
                            buttonDone: "OK",
                            message: "<h3 class='red' align='center'>Verify Code is Error! Please try again.</h3>"
                        }).done(function () {

                            return false;

                        }).fail(function () {

                        });

                    }
                    else {

                        window.location.href = 'aboutSend.aspx';
                    }

                    break;

                    //取得國家資料
                case "getCountry2":

                    $('#country2').html(json.re);

                    break;



                    //重製搜尋
                case "resetProList":

                    $('#proList').html(json.re);


                    $('#thisInputTitle').html(json.reTopInTitle);

                    $('#thisOutputTitle').html(json.reTopOpTitle);

                    //計算比較數
                    $('.joinCompare').click(function () {

                        var i = 0;
                        $('input[name=proID]').each(function () {
                            if ($(this).prop("checked") == true) {

                                i++;

                            }

                        });


                        var nowChk = $(this);

                        if (i > 3) {
                            $.MessageBox({
                                buttonDone: "OK",
                                message: "<h3 class='red' align='center'>Only select three products!</h3>"
                            }).done(function () {

                                nowChk.prop("checked", false);

                                return false;

                            }).fail(function () {

                            });
                        }
                    });




                    break;

                    //回傳快速搜尋產品
                case "getProductFastNext":

                    $('#proList').html(json.re);


                    break;


                    //快速搜尋
                case "getProductCbNext":

                    if (json.nextClsList != "") {


                        var nextIDarr = json.nextClsList.split(',');




                        //coeckbox
                        $('#u_' + json.nowTab + ' input[type=checkbox]').each(function () {






                            if (nextIDarr.indexOf($(this).val()) != -1) {

                                $(this).attr('disabled', false);
                                $('#u_' + json.nowTab + '_sp_' + $(this).val()).attr('style', '');


                            }
                            else {

                                $(this).prop('checked', false);
                                $(this).attr('disabled', true);
                                $('#u_' + json.nowTab + '_sp_' + $(this).val()).attr('style', 'color:#CCCCCC');

                            }
                        });

                        //radio
                        $('#u_' + json.nowTab + ' input[type=radio]').each(function () {

                            if (nextIDarr.indexOf($(this).val()) != -1) {

                                $(this).attr('disabled', false);
                                $('#u_' + json.nowTab + '_sp_' + $(this).val()).attr('style', '');

                            }
                            else {

                                $(this).prop('checked', false);
                                $(this).attr('disabled', true);
                                $('#u_' + json.nowTab + '_sp_' + $(this).val()).attr('style', 'color:#CCCCCC');

                            }
                        });

                    }
                    else {
                        //coeckbox
                        $('#u_' + json.nowTab + ' input[type=checkbox]').each(function () {

                            $(this).prop('checked', false);
                            $(this).attr('disabled', true);
                            $('#u_' + json.nowTab + '_sp_' + $(this).val()).attr('style', 'color:#CCCCCC');

                        });

                        //radio
                        $('#u_' + json.nowTab + ' input[type=radio]').each(function () {

                            $(this).prop('checked', false);
                            $(this).attr('disabled', true);
                            $('#u_' + json.nowTab + '_sp_' + $(this).val()).attr('style', 'color:#CCCCCC');

                        });
                    }



                    // $('#proList').html(json.re);

                    //計算比較數
                    $('.joinCompare').click(function () {

                        var i = 0;
                        $('input[name=proID]').each(function () {
                            if ($(this).prop("checked") == true) {

                                i++;

                            }

                        });


                        var nowChk = $(this);

                        if (i > 3) {
                            $.MessageBox({
                                buttonDone: "OK",
                                message: "<h3 class='red' align='center'>Only select three products!</h3>"
                            }).done(function () {

                                nowChk.prop("checked", false);

                                return false;

                            }).fail(function () {

                            });
                        }
                    });


                    break;




                    //比較產品
                case "openCompare":

                    $('#compareList').show();

                    $('#v_title').html('<th class="w-s">Series</th>');
                    $('#v_wattage').html('<th class="table-active">Watts ( W )</th>');
                    $('#v_inputstyle').html('<th class="table-active">Input Style</th>');
                    $('#v_outputvoltage').html('<th class="table-active">Output Voltage</th>');
                    $('#v_pfc').html('<th class="table-active">PFC</th>');
                    $('#v_marker').html('<th class="table-active">Safety Attest</th>');
                    $('#v_longs').html('<th class="table-active">Long(mm)</th>');
                    $('#v_width').html('<th class="table-active">Width(mm)</th>');
                    $('#v_high').html('<th class="table-active">High(mm)</th>');
                    $('#v_warranty').html('<th class="table-active">Warranty ( Year )</th>');
                    $('#v_pdf').html('<th class="table-active">Link</th>');



                    if (json.title != "") {
                        $('#v_title').append(json.title);
                        $('#v_wattage').append(json.wattage);
                        $('#v_inputstyle').append(json.inputstyle);
                        $('#v_outputvoltage').append(json.outputvoltage);
                        $('#v_pfc').append(json.pfc);
                        $('#v_marker').append(json.marker);
                        $('#v_longs').append(json.longs);
                        $('#v_width').append(json.width);
                        $('#v_high').append(json.high);
                        $('#v_warranty').append(json.warranty);
                        $('#v_pdf').append(json.pdf);
                    }

                    break;

                    //顯示區域
                case "cahngDistrict":

                    $('#ContentPlaceHolder2_District').html(json.re);

                    break;
                    //顯示郵遞區號
                case "cahngZip":

                    $('#ContentPlaceHolder2_zip').val(json.re);

                    break;

                    //顯示門市
                case "cahngStore":

                    $('#storeList').html(json.re);

                    //點選門市
                    $('#storeList li').click(function () {
                        $('#storeList li').removeClass("select");
                        $(this).addClass("select");
                        $('#mainData_storeID').val($(this).attr("data-rel"));
                    });

                    break;

                //RMA全球保固維修
                case "saveRMAData":
                    var lang = $("#lang").val();
                    setLoadPlayer('none', 'center', 'center');
                    if (json.re == 'codeError' || json.re == 'modelError' || json.re == 'wtyError' || json.re == 'idError') {
                        var msg = "";
                        if (json.re == 'codeError') {
                            if (lang == "en") {
                                msg = "<h3 class='red' align='center'>Verify Code is Error! Please try again.</h3>";
                            }
                            else if (lang == "tw") {
                                msg = "<h3 class='red' align='center'>驗證碼有誤，請重試!</h3>";
                            }
                            else if (lang == "cn") {
                                msg = "<h3 class='red' align='center'>验证码有误，请重试!</h3>";
                            }
                        }
                        else if (json.re == 'modelError') {
                            
                            if (lang == "en") {
                                msg = "<h3 class='red' align='center'>Product or Serial No. does not exist! Please contact the distributor where the product was purchased from.</h3>";
                            }
                            else if (lang == "tw") {
                                msg = "<h3 class='red' align='center'>產品序號錯誤，請向原購買經銷商聯絡</h3>";
                            }
                            else if (lang == "cn") {
                                msg = "<h3 class='red' align='center'>产品序号错误，请向原购买经销商联络</h3>";
                            }
                        }
                        else if (json.re == 'wtyError') {
                            if (lang == "en") {
                                msg = "<h3 class='red' align='center'>Warranty expired or wrong serial number. Please contact the distributor where the product was purchased from.</h3>";
                            }
                            else if (lang == "tw") {
                                msg = "<h3 class='red' align='center'>保固期已過或產品序號錯誤，請向原購買經銷商聯絡</h3>";
                            }
                            else if (lang == "cn") {
                                msg = "<h3 class='red' align='center'>保固期已过或产品序号错误，请向原购买经销商联络</h3>";
                            }
                        }
                        else if (json.re == 'idError') {
                            if (lang == "en") {
                                msg = "<h3 class='red' align='center'>Please choose a distributor.</h3>";
                            }
                            else if (lang == "tw") {
                                msg = "<h3 class='red' align='center'>請選擇經銷商</h3>";
                            }
                            else if (lang == "cn") {
                                msg = "<h3 class='red' align='center'>请选择经销商</h3>";
                            }
                        }

                        $.MessageBox({
                            buttonDone: "OK",
                            message: msg
                        }).done(function () {
                            return false;
                        }).fail(function () {
                        });
                    }
                    else {
                        $("#rmaForm").hide();
                        $("#msg").text(json.re); 
                        $("#successMsg").show();
                    }
                    break;
                case "checkSN":
                    if (json.re != "OEM") { //外購品的序號因為無法確認是否正確，就不SHOW了
                        if (json.re =="Yes") {
                            $("#authentic").text("(MW)");
                        }
                        else {
                            $("#authentic").text("(NG)");
                        }
                    }
                    break;
                //產品序號查詢
                case "ckWarranty":
                    setLoadPlayer('none', 'center', 'center');
                    if ( json.re.indexOf("h3")) {
                        var msg = json.re;
                        $.MessageBox({
                            buttonDone: "OK",
                            message: msg
                        }).done(function () {
                            return false;
                        }).fail(function () {
                        });
                    }
                    else {
                        alert("查無資料，請與客服人員聯繫");
                        //$("#ChkSnForm").hide();
                        //$("#msg").text(json.re);
                        //$("#successMsg").show();
                    }
                    break;
            }

        },
        complete: function () { //生成分頁條

        },
        error: function () {
            //alert("讀取錯誤!");
        }
    });

}

//調整讀取條位置
function setLoadPlayer(view, left, top) {


    if (view == 'none') {
        $.unblockUI();
    }
    else {
        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });

    }

}

(function () {
    var reloadImg = function (dImg) {
        var sOldUrl = dImg.src;
        var sNewUrl = sOldUrl + "?rnd=" + Math.random();
        dImg.src = sNewUrl;
    };

    var dReloadLink = document.getElementById("reload-img");
    if (dReloadLink != null) {
        var dImg = document.getElementById("rand-img");

        dReloadLink.onclick = function (e) {

            reloadImg(dImg);

            if (e) e.preventDefault();
            return false;
        };
    }
})();

function checkSN() {  //檢查序號是否為正品
    if ($("#Re_no").val() != "") {
        useAjax('checkSN', $("#Re_model").val().trim() + "@" + $("#Re_no").val().trim());
    }
    else {
        $("#authentic").text("");
    }
}
