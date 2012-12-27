if (typeof window.ENO !== 'undefined') {
    throw 'ENO already in use.';
}

window.ENO = {
	pool: {
		notes: ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'],
		tempo: [20, 200], // BPM
		duration: [1, 100], // Bars
		signature: [1, 8],
		// topics: [],
		// instruments: [],
		tracks: [1, 16]
	},
    init: function () {
        var self = this,
        	item,
        	$pool,
        	$cast;

        $cast = $('button');

        // Build Pool HTML

        self.outputs = {}; // Hash table of DD elements references for display

        $pool = $('<dl/>');

        for (item in self.pool) {
        	$pool.append('<dt>' + item + '</dt>');
        	self.outputs[item] = $('<dd/>');
        	$pool.append(self.outputs[item]);
        }

        // Append Pool DL
        $('body').append($pool);

        $cast.click(function(event) {
        	self.cast();
        });
    },
    cast: function () {
    	var self = this,
    		item,
    		random,
    		i,
    		ii,
    		textOutput;

    	for (item in self.pool) {
    		if (typeof self.pool[item][0] === 'string') {
    			textOutput = '';

    			random = Math.floor(Math.random() * self.pool[item].length);

    			for (i = 0, ii = random; i < ii; i++) {
    				random = Math.floor(Math.random() * self.pool[item].length);
    				textOutput += self.pool[item][random] + ' ';
    			}

    			self.outputs[item].text(textOutput);
    		} else if (typeof self.pool[item][0] === 'number') {
    			textOutput = '';

    			random = Math.floor(Math.random() * self.pool[item][1] + self.pool[item][0])

    			self.outputs[item].text(random);
    		}
    	}
    }
};

$(document).ready(function () {
    ENO.init();
    ENO.cast();
});