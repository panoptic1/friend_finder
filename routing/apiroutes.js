var friendsData = require("../app/data/friends");
var path = require('path');

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);

    });

    app.post("/api/friends", function (req, res) {
        var userData = req.body;
        var userResponses = userData.scores;
        var matchName = '';
        var matchImage = '';
        var totalDifference = 100;

        for (var i = 0; i < friendsData.length; i++) {
            var difference = 0;
            for (var j = 0; j < userResponses.length; j++) {
                difference += Math.abs(friendsData[i].scores[j] - userResponses[j]);
                //Loop through friends object, loop through users response object.  Then using math.abs set the difference from 0 to friends scores minus new users scores. Now we have the absolute difference between the two.

            }
            console.log('difference is for '+friendsData[i].name+' is '+difference);
            //console logging the difference for each friend.
            if (difference < totalDifference) {
                console.log(difference+" "+totalDifference);
                totalDifference = difference;
                matchName = friendsData[i].name;
                matchImage = friendsData[i].photo;
                //if match has lowest difference record  the match
            }
        
        }
        friendsData.push(userData);
        res.json({ status: 'OK', matchName: matchName, matchImage: matchImage })
        console.log('Match for user is: '+matchName+' link for match is'+matchImage);
    });

};
