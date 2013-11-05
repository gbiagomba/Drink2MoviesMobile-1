function showSelect() {
    $.ajax({
        type: "GET",
        url: "../xml/shows.xml",
        dataType: "xml",
        success: function (xml) {
            var dropdown1 = document.getElementById('choice');
            var selection = dropdown1.options[dropdown1.selectedIndex].value;
            var x = 1;
            var ruleCount = 1;
            var row = "<tr>";
            var rowEnd = "</tr>";
            var header = "<th>";
            var headerEnd = "</th>";
            var cell = "<td>";
            var cellEnd = "</td>";
            var drink = "";
            var category = "";

            $(xml).find('shows > show').each(function () {                                                  
                var title = $(this).find('title').text();                                                       //Title
                title = row + header + headerEnd + header + "<h1>" + title + "</h1>" + headerEnd + rowEnd;
                
                    category = row + header + headerEnd + header + "Take a Drink When: " + headerEnd + rowEnd; //Take a Drink When:
                    $(xml).find('drink > rule').each(function () {
                        var rule = $(this).text();
                        drink = drink + row + cell + ruleCount + cellEnd + cell + rule + cellEnd + rowEnd;      //Cram all rules into one variable
                        ruleCount++;
                    });
                    output = category + drink;                                                                  //Nice Rule Category + Rules
                    category = row + header + headerEnd + header + "Take 2 Drinks When: " + headerEnd + rowEnd; //Take 2 drinks when
                    drink = "";                                                                                 //Rinse
                    $(xml).find('twodrinks > rule').each(function () {
                        rule = $(this).text();
                        drink = drink + row + cell + ruleCount + cellEnd + cell + rule + cellEnd + rowEnd;      //Repeat
                        ruleCount++;
                    });
                    output = output + category + drink;
                    category = row + header + headerEnd + header + "Take A Gulp When: " + headerEnd + rowEnd;
                    drink = "";
                    $(xml).find('gulp > rule').each(function () {
                        rule = $(this).text();
                        drink = drink + row + cell + ruleCount + cellEnd + cell + rule + cellEnd + rowEnd;
                        ruleCount++;
                    });
                    output = output + category + drink;
                    category = row + header + headerEnd + header + "Finish Your Drink When: " + headerEnd + rowEnd;
                    drink = "";
                    $(xml).find('finish > rule').each(function () {
                        rule = $(this).text();
                        drink = drink + row + cell + ruleCount + cellEnd + cell + rule + cellEnd + rowEnd; //Rinse and Repeat
                        ruleCount++;
                    });
                if (x == selection) {
                    output = title + output + category + drink;
                    $("#rules").html(output);                  
                }
                else {
                    output = "";
                    drink = "";
                    category = "";
                    ruleCount = 1;
                    $("#rules").html(output);
                }
                x++;

            }
        )
        }
    })
};