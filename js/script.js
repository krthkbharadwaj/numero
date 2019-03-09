$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $("#datepicker").datepicker("option", "dateFormat", "dd-mm-yy");
    $("#datepicker").datepicker("option", "yearRange", "1900:2019");
    $('#datepicker').on('change', function () {
        //var day = "24-09-1973".split('-');
        var day = $(this).val().split('-');
        var dob = [day[0], day[1], day[2].substring(0, 2), day[2].substring(2, 4)];
        console.log(dob);
        calc(dob);
    });
});

function getSingleDigit(data) {
    if (data > 9) {
        var res = 0;
        var v = data.toString().split('');
        v.forEach(element => {
            res += +element;
        });
        return res;
    } else {
        return data;
    }
}

async function recursive(data) {
    result = [];
    data.forEach(k => {
        var va = k.split('');
        var val = +va[0] + +va[1];
        if (val > 9) {
            var v = val.toString().split('');
            var res = +v[0] + +v[1];
            result.push(res + '');
        } else {
            result.push(val + '');
        }
    });
    return await result;
}

async function calc(dob) {
    var a = dob;
    var b = c = d = f = g = h = healthcheck = [];
    b = await recursive(a);
    c = await recursive([b[0] + b[1], b[2] + b[3]]);
    d = await recursive([b[0] + c[0], b[1] + c[0], c[0] + c[1], b[2] + c[1], b[3] + c[1]]);

    e = await recursive([c[1] + d[2], c[0] + d[2]]);
    f = await recursive([e[0] + e[1]]);
    g = await recursive([e[1] + f[0], e[0] + f[0]]);
    h = await recursive([g[0] + g[1]]);

    healthcheck = [c[0], c[1], d[2], e[0], e[1]];
    var health = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0};

    healthcheck.forEach(i => {
        console.log(i);
        health[i] = healthcheck.filter(v => v == i).length;
    });

    $('#a').html(a.join(' &nbsp '));
    $('#b').html(b.join(' &nbsp '));
    $('#c').html(c.join(' &nbsp '));
    $('#d').html(d.join(' &nbsp '));
    $('#e').html(e.join(' &nbsp '));
    $('#f').html(f);
    $('#g').html(g.join(' &nbsp '));
    $('#h').html(h);

    var chart = '<table class="table">';
    var arrchart = { 'R' : d[2], 'L M': b[0]+b[1], 'N O': b[2]+b[3], 'P Q': c[0]+c[1], 'S T': d[0]+d[1], 'U V': d[3]+d[4],
                     'W X': e[0]+e[1], 'O Q': b[3]+c[1], 'Q': c[1], "Q R": c[1]+d[2], "R W": d[2]+e[1], "L P": b[0]+c[0],
                     "P": c[0], "P R": c[0]+d[2], "R X": d[2]+e[1], "N Q": b[2]+c[1], "Q U": c[1]+d[3], "Q V": c[1]+d[4],
                     "U X": d[3]+e[1], "V X": d[4]+e[1], "X C": e[1]+f[0], "M P": b[1]+c[0], "P T": c[0]+d[1], "P S": c[0]+d[0],
                     "T W": d[1]+e[0], "S W": d[0]+e[0], "W C": e[0]+f[0], "T R": d[1]+d[2], "R U": d[2]+d[3], "O P": b[3]+c[0],
                     "Q S": c[1]+d[0], "V W":d[4]+e[0]
    }

    var count = 1;
    for(var k in arrchart) {
        chart += "<tr class='"+k+" col'><td class=''>"+count+"</td><td class=''>"+k+"</td><td class=''>"+arrchart[k]+"</td></tr>";
        count++;
    }

    chart += '</table>';

    $('li').attr('class', 'decorate');
    $('#32table').show();
    $('#32table div').html(chart);

    var ele = { 1: 'Metal', 2:'Water', 3:'Fire', 4:'Wood', 5:'Earth'};
    var hchart = '<table class="table">';
    for(var j=1; j <= 5; j++) {
        var val = health[j] + health[j+5];
        val = (val == 0 ) ? 'Missing' : val;
        if (val !== 'Missing') { val = romanize(val); }
        var num = (j == 5) ? '' : ', '+(j+5);
        hchart += "<tr class='"+j+" col'><td class=''>"+j+num+"</td><td class=''>"+ele[j]+"</td><td class=''>"+val+"</td></tr>";
    }
    hchart += '</table>';
    $('#hchart').show();
    $('#hchart div').html(hchart);

    var directchart = {'L + M + P':getSingleDigit(+b[0] + +b[1] + +c[0]),
                       'M + N': getSingleDigit(getSingleDigit(+b[0] + +b[1]) * 2 ),
                       'N + O + Q': getSingleDigit(+b[2] + +b[3] + +c[1]),
                       'NW + SW': getSingleDigit(+b[0] + +b[1] + +c[0] + +b[0] + +c[0] + +d[2]),
                       'M + N + P + Q': getSingleDigit(+b[1] + +b[2] + +c[0] + +c[1]),
                       'NE + SE': getSingleDigit(+b[2] + +b[3] + +c[1] + +b[3] + +c[1] + +d[2]),
                       'L + P + R': getSingleDigit(+b[0] + +c[0] + +d[2]),
                       'P + Q + R': getSingleDigit(+c[0] + +c[1] + +d[2]),
                       'O + Q + R': getSingleDigit(+b[3] + +c[1] + +d[2])
    }

    var dchart = '<table class="table">';
    dchart += "<tr class='' col'><td class=''>North-West</br>L + M + P</br>"+directchart['L + M + P']+"</td>"+
                "<td style='border-left: 1px solid #dee2e6 !important;border-right: 1px solid #dee2e6;' class=''>North</br>M + N</br>"+directchart['M + N']+"</td>"+
                "<td class=''>North-East</br>N + O + Q</br>"+directchart['N + O + Q']+"</td>"+
              "</tr>";

    dchart += "<tr class='' col'><td class=''>West</br>NW + SW</br>"+directchart['NW + SW']+"</td>"+
              "<td style='border-left: 1px solid #dee2e6 !important;border-right: 1px solid #dee2e6;' class=''>Center</br>M + N + P + Q</br>"+directchart['M + N + P + Q']+"</td>"+
              "<td class=''>East</br>NE + SE</br>"+directchart['NE + SE']+"</td>"+
            "</tr>";

    dchart += "<tr class='' col'><td class=''>South-West</br>L + P + R</br>"+directchart['L + P + R']+"</td>"+
                "<td style='border-left: 1px solid #dee2e6 !important;border-right: 1px solid #dee2e6;' class=''>South</br>P + Q + R</br>"+directchart['P + Q + R']+"</td>"+
                "<td class=''>South-East</br>O + Q + R</br>"+directchart['O + Q + R']+"</td>"+
              "</tr>";
    dchart += '</table>';

    $('#dchart').show();
    $('#dchart div').html(dchart);

}

function romanize(num) {
    var lookup = {V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
}