/*global $: false, console: false */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4, white: true */

if (typeof window.ENO !== 'undefined') {
    throw 'ENO already in use.';
} else {
    var ENO = null;
}

ENO = {
    pool: {
        notes: ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'],
        tempo: [20, 200], // BPM
        duration: [1, 100], // Bars
        signature: [[1, 8], [1, 2, 4, 8, 16]],
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
            self.outputs[item] = $('<dd>&nbsp;</dd>');
            $pool.append(self.outputs[item]);
        }

        $('body').append($pool).append($cast);

        // Event Handlers

        $cast.click(function (event) {
            self.cast();
        });
    },
    cast: function () {
        var self = this,
            item,
            random,
            i,
            ii,
            poolList = [];

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

        function pickRandomMember(pool) {
            return pool[Math.floor((Math.random() * pool.length))];
        }

        function spaceStrings(strings) {
            var spacedOut = '';

            strings.forEach(function (item) {
                spacedOut += item + ' ';
            });

            return spacedOut;
        }

        function changeValue(element, text) {
            element = $(element); // Accept Element of jQuery Collection

            element.fadeTo(0, 0);
            element.text(text);
            element.fadeTo(400, 1);
        }

        function typeText(element, text) {
            var i = 0;

            element = $(element);
            text = '' + text; // Cast as String

            element.fadeTo(0, 0).text(' ').fadeTo(400, 1);

            function writeLetter(index) {
                if (i <= text.length) {
                    element.append(text[i]);
                    i++;

                    setTimeout(function () {
                        writeLetter(i);
                    }, 30);
                }
            }

            writeLetter(i);
        }

        function generateValue(type) {
            var value;

            switch (type) {
                case 'notes':
                    value = spaceStrings(pickRandomSubset(self.pool[type]));
                break;

                case 'tempo':
                    value = randomizeBetween(self.pool[type][0], self.pool[type][1]) + ' bpm';
                break;

                case 'duration':
                    value = randomizeBetween(self.pool[type][0], self.pool[type][1]) + ' bars';
                break;

                case 'signature':
                    value = randomizeBetween(self.pool[type][0][0], self.pool[type][0][1]) + ' / ' + pickRandomMember(self.pool[type][1]);
                break;

                case 'tracks':
                    value = randomizeBetween(self.pool[type][0], self.pool[type][1]);
                break;
            }

            return value;
        }

        function animateList(list) {
            var output;

            if (list.length) {
                typeText(self.outputs[list[0]], generateValue(list[0]));
                list.shift();

                setTimeout(function() {
                    animateList(list);
                }, 100);
            }
        }

        for (item in self.pool) {
            poolList.push(item);
        }

        animateList(poolList);
    }
};

$(document).ready(function () {
    ENO.init();
    ENO.cast();
});
