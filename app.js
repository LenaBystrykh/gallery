$(function(){ // только после полной загрузки документа
    $("h2").lettering(); // с помощью плагина разбиваем на отдельные буквы
    let current_li;

    // соотнести изображение с текстом
    function setImage(src, id){
        $("#current").attr("src", src); // подставляем в источник полноразмерной картинки параметр
        const path = "descriptions/"+id+".txt"; // путь к файлу с описанием
        // получение описания из файла и подстановка текста в description p
        $.get(path, function(data){
            $("#description p").html(data);
        });
    }
    // при каждом клике на картинку в галерее
    $("#photo-collection img").click(function(){
        const src = $(this).attr("src"); // получаем ее источник
        const id = $(this).attr("id"); // получаем ее ид
        current_li = $(this).parent(); // получаем элемент, к которому она относится
        setImage(src, id); // задать полноразмерную картинку
        $("#picture").fadeIn(); // отобразить полноразмерную картинку
        $("#overlay").fadeIn(); // затемнить всю остальную область
    });

    // при каждом клике на области вне полноразмерной картинки
    $("#overlay").click(function(){
        $(this).fadeOut(); // убрать затемнение
        $("#picture").fadeOut(); // скрыть полноразмерную картинку
    });

    // при каждом клике на стрелочку вправо
    $("#right").click(function(){
        // если текущая картинка последняя
        let next_li;
        if (current_li.is(":last-child"))
        {
            next_li = $("#photo-collection li").first(); // переходим к первой
        }
        else
        {
            next_li = current_li.next(); // иначе запоминаем следующий элемент
        }
        const next_src = next_li.children("img").attr("src"); // запоминаем источник следующей картинки
        const next_id = next_li.children("img").attr("id"); // запоминаем ид следующей картинки
        setImage(next_src, next_id); // задать полноразмерную картинку
        current_li = next_li; // отображать будем следующую картинку
    });

    // при каждом клике на стрелочку влево
    $("#left").click(function(){
        // если текущая картинка первая
        let prev_li;

        if (current_li.is(":first-child"))
        {
            prev_li = $("#photo-collection li").last(); // переходим к последней
        }
        else
        {
            prev_li = current_li.prev(); // иначе запоминаем предыдущий элемент
        }
        const prev_src = prev_li.children("img").attr("src"); // запоминаем источник предыдущей картинки
        const prev_id = prev_li.children("img").attr("id"); // запоминаем ид предыдущей картинки 
        setImage(prev_src, prev_id); // задать полноразмерную картинку
        current_li = prev_li; // отображать будем предыдущую картинку
    });

    // обработка наведения мыши на стрелочки
    $("#left, #right").mouseover(function(){
        $(this).css("opacity", "1");
    });

    $("#left, #right").mouseleave(function(){
        $(this).css("opacity", "0.6");
    });
});