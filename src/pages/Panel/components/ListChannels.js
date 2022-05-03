import React from 'react'
import useChannels from '../store/useChannels';
import useCurrentChannel from '../store/useCurrentChannel';
import PlayIcon from '../icons/PlayIcon';
import TvIcon from '../icons/TvIcon';
import HeartIcon from '../icons/HeartIcon';

function ListChannels({channels}) {
  const [channelsState, channelsActions] = useChannels();
  const [currentChannel, currentChannelActions] = useCurrentChannel();

  return <ul className='h-100 overflow list-tv'>
    {channels.length && channels.map((c, i) => <li key={i}
      className="d-flex align-center justify-between cp"
    >
      <div className={'d-flex align-center truncate' + (currentChannel.url === c.url ? ' active' : '')}
        onClick={() => { currentChannelActions.set({ ...c, qualityIndex: -1 }); }}>
        {currentChannel.url === c.url
          ? <PlayIcon />
          : <TvIcon />}
        <span className='ml-2 truncate' title={c.name}>{c.name}</span>
      </div>

      <div onClick={() => { channelsActions.addToFavorites(c) }} title="Add to favorites">
        <span><HeartIcon color={channelsState.favorites.some(f => f.url == c.url) ? "#e91e63" : "#fff"} /></span>
      </div>
    </li>)}
  </ul>
}

export default React.memo(ListChannels)