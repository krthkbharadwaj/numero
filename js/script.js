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

    $('li').attr('class', 'decorate');
}