import React from 'react';
import click1 from './click1.wav';
import click2 from './click2.wav';
import './Metronome.css';

class Metronome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4 
        };

        this.click1 = new Audio(click1);
        this.click2 = new Audio (click2);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;

        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({ bpm });
        }
        this.setState({ bpm });
    };

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true
                },
                this.playClick
            );
        }
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    render () {
        const { playing, bpm } = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input
                        type="range"
                        min="60" max="240"
                        value={bpm}
                        onChange={this.handleBpmChange}
                    />
                </div>
                <button className="ui teal button" onClick={this.startStop}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        );
    }
}

export default Metronome;