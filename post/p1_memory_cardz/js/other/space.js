import { GameTimer } from "../gameTimer";

if (GameTimer.timeProperties.sec > 59) {
    GameTimer.timeProperties.sec = 0;

    if (GameTimer.timeProperties.min > 59) {
        GameTimer.timeProperties.min = 0;
        console.log('Limit of an hour!')
    };

    if (GameTimer.timeProperties.min < 10) {
        GameTimer.timeProperties.minutes.innerHTML = `0${GameTimer.timeProperties.min++}`;
    } else {
        GameTimer.timeProperties.minutes.innerHTML = GameTimer.timeProperties.min++;
    };

};

if (GameTimer.timeProperties.sec < 10) {
    GameTimer.timeProperties.seconds.innerHTML = `0${GameTimer.timeProperties.sec++}`;
} else {
    GameTimer.timeProperties.seconds.innerHTML = GameTimer.timeProperties.sec++;
};