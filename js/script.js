$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $("#datepicker").datepicker("option", "dateFormat", "dd-mm-yy");
    $("#datepicker").datepicker("option", "yearRange", "1900:2019");
    $('#datepicker').on('change', function () {
        var day = $(this).val().split('-');
        var dob = [day[0], day[1], day[2].substring(0, 2), day[2].substring(2, 4)];
        console.log(dob);
        calc(dob);
    });
});

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
    var b = c = d = f = g = h = [];
    b = await recursive(a);
    c = await recursive([b[0] + b[1], b[2] + b[3]]);
    d = await recursive([b[0] + c[0], b[1] + c[0], c[0] + c[1], b[2] + c[1], b[3] + c[1]]);

    e = await recursive([c[1] + d[2], c[0] + d[2]]);
    f = await recursive([e[0] + e[1]]);
    g = await recursive([e[1] + f[0], e[0] + f[0]]);
    h = await recursive([g[0] + g[1]]);

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
    $('#32table').html(chart);
}