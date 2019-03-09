var a = b = c = d = f = g = h = healthcheck = [];

$(function () {
    $("#datepicker,#datepicker2").datepicker({
        changeMonth: true,
        changeYear: true
    });

    $("#datepicker,#datepicker2").datepicker("option", "dateFormat", "dd-mm-yy");
    $("#datepicker,#datepicker2").datepicker("option", "yearRange", "1900:2019");
    $('#datepicker').on('change', function () {
        var day = $(this).val().split('-');
        var dob = [day[0], day[1], day[2].substring(0, 2), day[2].substring(2, 4)];
        calc(dob);
        $('#datepicker2').val('');
        $('.second').hide();
    });

    $('#datepicker2').on('change', function () {
        if($('#datepicker').val() === '' ) { alert("Fill first chart date of birth"); $('#datepicker2').val(''); return null; }

        var day2 = $(this).val().split('-');
        var day1 = $('#datepicker').val().split('-');

        var dob1 = [day1[0], day1[1], day1[2].substring(0, 2), day1[2].substring(2, 4)];
        var dob2 = [day2[0], day2[1], day2[2].substring(0, 2), day2[2].substring(2, 4)];

        var dob3 = [gSD(+dob1[0] + +dob2[0]), gSD(+dob1[1] + +dob2[1]), gSD(+dob1[2] + +dob2[2]), gSD(+dob1[3] + +dob2[3])];

        dob3[1] = (dob3[1].toString().length == 1) ? '0'+dob3[1] : dob3[1];
        dob3[2] = (dob3[2].toString().length == 1) ? '0'+dob3[2] : dob3[2];
        dob3[3] = (dob3[3].toString().length == 1) ? '0'+dob3[3] : dob3[3];
        dob3[0] = (dob3[0].toString().length == 1) ? '0'+dob3[0] : dob3[0];

        triangle('match',[ dob3[0], dob3[1], dob3[2], dob3[3]]);
        $('.second').show();
    });

});

function gSD(data) {
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
    console.log("Data "+data);
    data.forEach(k => {
        var va = k.toString().split('');
        if (k.toString().length == 2) {
            var val = +va[0] + +va[1];
        } else if (k.length == 3) {
            var val = +va[0] + +va[1] + +va[2];
        }
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

async function triangle(type, dob) {
    a = dob;

    b = await recursive(a);
    c = await recursive([b[0] + b[1], b[2] + b[3]]);
    d = await recursive([b[0] + c[0], b[1] + c[0], c[0] + c[1], b[2] + c[1], b[3] + c[1]]);

    e = await recursive([c[1] + d[2], c[0] + d[2]]);
    f = await recursive([e[0] + e[1]]);
    g = await recursive([e[1] + f[0], e[0] + f[0]]);
    h = await recursive([g[0] + g[1]]);

    if (type == 'single') {
        $('.first #a').html(a.join(' &nbsp '));
        $('.first #b').html(b.join(' &nbsp '));
        $('.first #c').html(c.join(' &nbsp '));
        $('.first #d').html(d.join(' &nbsp '));
        $('.first #e').html(e.join(' &nbsp '));
        $('.first #f').html(f);
        $('.first #g').html(g.join(' &nbsp '));
        $('.first #h').html(h);
    } else {
        $('.second #a').html(a.join(' &nbsp '));
        $('.second #b').html(b.join(' &nbsp '));
        $('.second #c').html(c.join(' &nbsp '));
        $('.second #d').html(d.join(' &nbsp '));
        $('.second #e').html(e.join(' &nbsp '));
        $('.second #f').html(f);
        $('.second #g').html(g.join(' &nbsp '));
        $('.second #h').html(h);
    }
}

async function calc(dob) {

    await triangle('single', dob);

    healthcheck = [c[0], c[1], d[2], e[0], e[1]];
    var health = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0};

    healthcheck.forEach(i => {
        health[i] = healthcheck.filter(v => v == i).length;
    });

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

    var directchart = {'L + M + P':gSD(+b[0] + +b[1] + +c[0]),
                       'M + N': gSD(gSD(+b[1] + +b[2]) * 2 ),
                       'N + O + Q': gSD(+b[2] + +b[3] + +c[1]),
                       'NW + SW': gSD(+b[0] + +b[1] + +c[0] + +b[0] + +c[0] + +d[2]),
                       'M + N + P + Q': gSD(+b[1] + +b[2] + +c[0] + +c[1]),
                       'NE + SE': gSD(+b[2] + +b[3] + +c[1] + +b[3] + +c[1] + +d[2]),
                       'L + P + R': gSD(+b[0] + +c[0] + +d[2]),
                       'P + Q + R': gSD(+c[0] + +c[1] + +d[2]),
                       'O + Q + R': gSD(+b[3] + +c[1] + +d[2])
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