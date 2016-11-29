var parkingSpot = {};

function getData() {
    $.ajax({
        async: false
        , url: 'data.json'
        , data: ""
        , accepts: 'application/json'
        , dataType: 'json'
        , success: function (data) {
            var i;
            for (i = 1; i < data.length + 1; i++) {
                let spotNumber = i;
                parkingSpot[spotNumber] = {
                    timeParked: data[i - 1].timeparked
                    , timeVacant: data[i - 1].timevacant
                    , vacant: data[i - 1].vacant
                    , justVacated: false
                }
            }
        }
    });
}
window.onload = start;
console.log(parkingSpot);
window.setInterval(updateParking, 5000);
window.setInterval(changeRandomValue, 2000);
$(".spot").hover(function () {
    var currentId = parseInt($(this).attr('id'));
    let spotNumber = currentId;
    if (parkingSpot[spotNumber].timeParked != 0) {
        $(".parkinginfo").html("Parking spot: " + spotNumber + "<br>" + "Time occupied: " + parkingSpot[spotNumber].timeParked);
    }
    else {
        $(".parkinginfo").html("Parking spot: " + spotNumber + "<br>" + "Time vacant: " + parkingSpot[spotNumber].timeVacant);
    }
    if (parkingSpot[spotNumber].vacant) $(".parkinginfo").append("<br> Currently Vacant")
    else $(".parkinginfo").append("<br> Currently Occupied");
});

function changeValues() {
    for (let i = 1; i <= Object.keys(parkingSpot).length; i++) {
        let spotNumber = i;
        let _vacant = (Math.floor(Math.random() * 2));
        if (_vacant) {
            parkingSpot[spotNumber].vacant = true;
            parkingSpot[spotNumber].timeVacant = (Math.floor(Math.random() * 10000));
            parkingSpot[spotNumber].timeParked = 0;
        }
        else {
            parkingSpot[spotNumber].vacant = false;
            parkingSpot[spotNumber].timeVacant = 0;
            parkingSpot[spotNumber].timeParked = (Math.floor(Math.random() * 10000));
        }
    }
}

function changeRandomValue() {
    let amount = (Math.floor(Math.random() * 4));
    for (let i = 0; i < amount; i++) {
        let num = (Math.ceil(Math.random() * 10))
        let _vacant = (Math.floor(Math.random() * 2));
        if (_vacant) {
            if (!parkingSpot[num].vacant) parkingSpot[num].justVacated = true;
            parkingSpot[num].vacant = true;
            parkingSpot[num].timeVacant = (Math.floor(Math.random() * 10000));
            parkingSpot[num].timeParked = 0;
        }
        else {
            parkingSpot[num].justVacated = false;
            parkingSpot[num].vacant = false;
            parkingSpot[num].timeVacant = 0;
            parkingSpot[num].timeParked = (Math.floor(Math.random() * 10000));
        }
    }
}

function updateParking() {
    var el;
    for (var i = 1; el = document.getElementById(i); i++) {
        let num = i;
        if (parkingSpot[num].vacant) {
            $(el).css({
                'color': 'green'
            });
        }
        else $(el).css({
            'color': 'red'
        });
        if (parkingSpot[num].justVacated) {
            $("#" + num).addClass("flash");
            setTimeout(function () {
                $("#" + num).removeClass("flash")
            }, 1500);
            $("#" + num + "+.opened").html(" -- Just opened up!");
            setTimeout(function () {
                $(".opened").html("");
            }, 2500);
            parkingSpot[num].justVacated = false;
        }
    }
}

function start() {
    getData();
    updateParking();
}

function getps() {
    console.log(parkingSpot);
}