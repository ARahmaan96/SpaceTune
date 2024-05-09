import React from 'react';
import Image from 'next/image';

const HeaderPlayerController = ({ song }) => {
    return (
        <>
            <div className='album-cover position-relative' style={{ position: "relative" }}>
                <Image src={song.cover} alt={song.title} width={120} height={120}
                    style={{ animationPlayState: song.rotated ? "running" : "paused", }}
                />
                <span className='point' ></span>
            </div>

            <h2>{song.title}</h2>
            <p>{song.name}</p>

            <audio>
                <source src={song.source} type="audio/mpeg" />
            </audio>
        </>
    );
}

export default HeaderPlayerController;
