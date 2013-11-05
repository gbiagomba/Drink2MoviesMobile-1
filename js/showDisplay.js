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

            $(xml).find('show').each(function () {                                                  //Print the Headers + Show Title
                var title = $(this).find('title').text();
                title = row + header + "#" + headerEnd + header + "<h1>" + title +  "</h1>" + headerEnd + rowEnd;
                if (x == selection) {
                    category = row + header + headerEnd + header + "Take a Drink When: " + headerEnd + rowEnd; //Take a Drink When:
                    $(xml).find('drink > rule').each(function () {
                        var rule = $(this).text();
                        drink = drink + row + cell + ruleCount + cellEnd + cell + rule + cellEnd + rowEnd; //Cram all rules into one variable
                        ruleCount++;

                    });
                    output = category + drink;                                                            //Nice Rule Category + Rules
                    category = row + header + headerEnd + header + "Take 2 Drinks When: " + headerEnd + rowEnd; //Take 2 drinks when
                    drink = "";
                    $(xml).find('twodrinks > rule').each(function () {
                        rule = $(this).text();
                        drink = drink + row + cell + ruleCount + cellEnd + cell + rule + cellEnd + rowEnd; //Rinse and Repeat
                        ruleCount++;

                    });
                    output = title + output + category + drink;
                    $("#rules").html(output);
                    var lastSelect = x;
                }
                else {
                    title = ""; //make it blank.
                    output = title;
                    $("#rules").html(output);
                }

            }
        )
        }
    })
};