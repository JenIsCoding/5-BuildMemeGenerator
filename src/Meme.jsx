// import React from 'react'
import React, { useState, useEffect } from 'react'
// import memesData from './memesData.js'

function Meme() {

    const [allMemes, setAllMemes] = React.useState([])

    const [meme, setMeme] = useState({
        topText: "",
        bottomText:"", 
        randomImage: "https://i.imgflip.com/govs4.jpg",
        nameOfImg: "img name"
    })

    useEffect(function() {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    },[])
    

    function getMemeImage(e){
        e.preventDefault()
        // console.log("get arrays", allMemes)
        const randomNum = Math.floor(Math.random() * allMemes.length)
        // console.log("random number", randomNum)
        const urlImg = allMemes[randomNum].url
        // console.log("get new url", urlImg)
        const nameImg = allMemes[randomNum].name
        // console.log("get new name", nameImg)
        setMeme(prevMeme => ({
            ...prevMeme,
            nameOfImg: nameImg,
            randomImage: urlImg
        })
        )
    }


    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
                ...prevMeme,
                [name]: value
                }))
        }

    return (
        <main>
            <form className="form">
                <input 
                    type="text" 
                    id="TopText" 
                    name="topText"
                    className="form--input" 
                    placeholder="Top Text"
                    value = {meme.topText}
                    onChange={handleChange}
                    />
                <input 
                    type="text"
                    id="BottomText"
                    name="bottomText"
                    className="form--input"
                    placeholder="Bottom Text"
                    value = {meme.bottomText}
                    onChange={handleChange}
                    />
                <button className="form--button" onClick={getMemeImage}>Get a new meme image  🖼</button>
            </form>
            <div className="meme">
                <img src={meme.randomImage} alt={meme.nameOfImg} className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )

}

export default Meme;