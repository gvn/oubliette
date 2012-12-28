if (typeof window.ENO !== 'undefined') {
    throw 'ENO already in use.';
}

window.ENO = {
    pool: {
        notes: ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'],
        tempo: [20, 200], // BPM
        duration: [1, 100], // Bars
        signature: [1, 8],
        // topics: [], // Connect to random word API? http://randomword.setgetgo.com/get.php
        // instruments: [], // Abstract > Concrete
        tracks: [1, 16]
    },
    init: function () {
        var self = this,
            item,
            $pool,
            $cast;

        // Element Cache

        $cast = $('<button>Cast</button>');

        // Build Pool HTML

        self.outputs = {}; // Hash table of DD elements references for display

        $pool = $('<dl/>');

        for (item in self.pool) {
            $pool.append('<dt>' + item + '</dt>');
            self.outputs[item] = $('<dd/>');
            $pool.append(self.outputs[item]);
        }

        $('body').append($pool).append($cast);

        // Event Handlers

        $cast.click(function(event) {
            self.cast();
        });
    },
    cast: function () {
        var self = this,
            item,
            random,
            i,
            ii;

        function randomizeBetween(lower, upper) {
            var randomNumber;

            randomNumber = upper - lower;
            randomNumber *= Math.random();
            randomNumber += lower;
            randomNumber = Math.floor(randomNumber);

            return randomNumber;
        }

        function pickRandomSubset(pool) {
            var subset = [];

            pool.forEach(function (item) {
                if (Math.random() >= 0.5) {
                    subset.push(item);
                }
            });

            return subset;
        }

        function spaceStrings(strings) {
            var spacedOut = '';

            strings.forEach(function (item) {
                spacedOut += item + ' ';
            });

            return spacedOut;
        }

        for (item in self.pool) {
            if (typeof self.pool[item][0] === 'string') {
                self.outputs[item].text(spaceStrings(pickRandomSubset(self.pool[item])));
            } else if (typeof self.pool[item][0] === 'number') {
                self.outputs[item].text(randomizeBetween(self.pool[item][0], self.pool[item][1]));
            }
        }
    }
};

$(document).ready(function () {
    ENO.init();
    ENO.cast();
});