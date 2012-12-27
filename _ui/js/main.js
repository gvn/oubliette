if (typeof window.ENO !== 'undefined') {
    throw 'ENO already in use.';
}

window.ENO = {
	pool: {
		notes: ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'],
		tempo: [20, 200], // BPM
		duration: [1, 100], // Bars
		signature: [1, 8],
		topics: [],
		instruments: [],
		tracks: [1, 16]
	},
    init: function () {
        var self = this;

    },
    cast: function () {
    	var self = this;

    }
};

$(document).ready(function () {
    ENO.init();
    ENO.cast();
});