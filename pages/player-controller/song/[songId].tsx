import React from 'react';
import CustomPlayerController from '../../components/player-controller/player';
import { Typography } from '@mui/material';
const SongId = () => {
    return (
        <div className='d-flex justify-content-start align-items-end h-100' >
            <div className='col-8 bg-danger h-100 p-2'>
                <CustomPlayerController />
            </div>
            <div className='col-4 bg-dark overflow-auto h-100'>
                {lyrics.map((lyric, index) => (
                    <>
                        <Typography key={index} className='text-white text-justify'
                            style={{ textAlign: 'justify', fontSize: '1.rem', padding: '1rem' }}>
                            {lyric}
                        </Typography>
                    </>
                ))}

            </div>
        </div>
    );
}

export default SongId;
const lyrics = [
    `You say I make you nervous, a tragedy
    I'm a beautiful disaster, a reckoning
    You wonder how I got this way (you wonder how I got this way)
    You think I'm someone to be saved, someone to clean up and tame
    Oh somethings never change, never change, oh`,

    `You think I would look pretty on your arm
    Once you cover up my bruises and battle scars
    But it always ends the same (but it always ends the same)
    Can't bear the things I've had to face
    Got you crying on your knees in pain
    Oh, somethings never change, never change, oh`,

    `You'll break your back to make me feel again
    Suffocate to make me breathe again
    Lose your mind from endless praying
    Somethings never change, never change, oh
    Redemption never came`,

    `I stopped asking for forgiveness 'cause you should know
    Only fools tread where the angels fear to go
    But you keep trying to get too close
    (But you keep trying to get too close)
    Saved myself by turning into stone
    So save your judgment 'cause you just don't know
    But somethings never change, never change, oh`,

    `They say I should feel guilty and change my ways
    Leaving crumpled bodies in my wake
    Swear I didn't mean to make them break
    (Swear I didn't mean to make them break)
    But they're so delicate and so mundane
    And they keep coming like a moth to flame
    Oh somethings never change, never change, mmm-mmh`,

    `You'll break your back to make me feel again
    Suffocate to make me breathe again
    Lose your mind from endless praying
    Somethings never change, never change, oh
    Redemption never came`
];