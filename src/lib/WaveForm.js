/**
 * Abstracted from SoundCloud-Waveform-Generator
 * https://github.com/Idnan/SoundCloud-Waveform-Generator
 */
window.AudioContext = window.AudioContext || window.webkitAudioContext;

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

const SoundCloudWaveform = {

    settings : {
		canvas_width: 400,
		canvas_height: 66,
		bar_width: 3,
		bar_gap : 0.2,
		wave_color: '#666',
		onComplete: Function.prototype
	},

	audioContext: new AudioContext(),

	generate(file, options) {

		// preparing canvas
		this.settings.canvas = document.createElement('canvas');
		this.settings.context = this.settings.canvas.getContext('2d');

		this.settings.canvas.width = (options.canvas_width !== undefined) ? parseInt(options.canvas_width) : this.settings.canvas_width;
		this.settings.canvas.height = (options.canvas_height !== undefined) ? parseInt(options.canvas_height) : this.settings.canvas_height;

		// setting fill color
		this.settings.wave_color = (options.wave_color !== undefined) ? options.wave_color : this.settings.wave_color;

		// setting bars width and gap
		this.settings.bar_width = (options.bar_width !== undefined) ? parseInt(options.bar_width) : this.settings.bar_width;
		this.settings.bar_gap = (options.bar_gap !== undefined) ? parseFloat(options.bar_gap) : this.settings.bar_gap;

		this.settings.onComplete = (options.onComplete !== undefined) ? options.onComplete : this.settings.onComplete;

		// read file buffer
		const reader = new FileReader();
        reader.onload = (event) => {
            console.log(event.target.result);
            this.audioContext.decodeAudioData(event.target.result, (buffer) => {
                this.extractBuffer(buffer);
            });
        };
        reader.readAsArrayBuffer(file);
	},

	extractBuffer(buffer) {
	    buffer = buffer.getChannelData(0);
	    const sections = this.settings.canvas.width;
	    const len = Math.floor(buffer.length / sections);
	    const maxHeight = this.settings.canvas.height;
        const vals = [];
        let scale;
        let val;
	    for (let i = 0; i < sections; i += this.settings.bar_width) {
	        vals.push(this.bufferMeasure(i * len, len, buffer) * 10000);
	    }
	    for (let j = 0; j < sections; j += this.settings.bar_width) {
	        scale = maxHeight / vals.max();
	        val = this.bufferMeasure(j * len, len, buffer) * 10000;
	        val *= scale;
	        val += 1;
	        this.drawBar(j, val);
	    }
	    this.settings.onComplete(
            this.settings.canvas.toDataURL('image/png'),
            this.settings.context.getImageData(0, 0, this.settings.canvas.width, this.settings.canvas.height)
        );
	    // clear canvas for redrawing
	    this.settings.context.clearRect(0, 0, this.settings.canvas.width, this.settings.canvas.height);
    },

    bufferMeasure(position, length, data) {
        let sum = 0.0;
        for (let i = position; i <= (position + length) - 1; i++) {
            sum += Math.pow(data[i], 2);
        }
        return Math.sqrt(sum / data.length);
    },

    drawBar(i, h) {
    	this.settings.context.fillStyle = this.settings.wave_color;
		let w = this.settings.bar_width;
        if (this.settings.bar_gap !== 0) {
            w *= Math.abs(1 - this.settings.bar_gap);
        }
        const x = i + (w / 2);
        const y = this.settings.canvas.height - h;
        this.settings.context.fillRect(x, y, w, h);
    }
}

module.exports = SoundCloudWaveform;