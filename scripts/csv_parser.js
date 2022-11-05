fetch("https://raw.githubusercontent.com/slocknad/ca-dmv-guesser/main/applications.csv")
   .then(r => r.text())
   .then(t => {
        csv_content = t;
        var info_string = csv_content.substring(67);
        info_string = info_string.replaceAll(/"\w, *(\w|\w\w|\w, \w\w \w\w)"/g, 0);
        const all_info = info_string.match(/".+"(?=,")|(?<=,+)".+"(?=,)|(?<![^,\n])[^,\n]*(?=,)|(?<=,)[^,\n]*/g);
        var i = 0;
        var organized_info = new Array();
        var temp_info = new Object();
        for (info of all_info) {
            switch (i++) {
                case 0:
                    temp_info = new Object();
                    temp_info['plate'] = info;
                    break;
                case 1:
                    break;
                case 2:
                    if (info[0] == '"' && info[info.length - 1] == '"') info = info.slice(1, -1);
                    if (!info.length || info == "NO MICRO") info = "No information provided by customer."
                    info = info.charAt(0).toUpperCase() + info.slice(1).toLowerCase();
                    temp_info['customer'] = info;
                    break;
                case 3:
                    if (info[0] == '"' && info[info.length - 1] == '"') info = info.slice(1, -1);
                    info = info.charAt(0).toUpperCase() + info.slice(1).toLowerCase();
                    temp_info['dmv'] = info;
                    break;
                case 4:
                    temp_info['result'] = info == "Y";
                    organized_info.push(temp_info);
                    i = 0;
                    break;
                default:
                    console.log();
            }
        }
        shuffle(organized_info);
        displayPlate(organized_info);
   }
);