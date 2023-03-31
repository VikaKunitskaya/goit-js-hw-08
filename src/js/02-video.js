import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

updatePage();

const setUpdatedTime = (data) => {
  const seconds = data.seconds;
  localStorage.setItem(STORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(setUpdatedTime, 1000));

function updatePage() {
  const time = localStorage.getItem(STORAGE_KEY);

  if (time) {
    player.setCurrentTime(time)
  }
}