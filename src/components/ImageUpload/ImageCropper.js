import React from "react";
import { useState, useEffect } from 'react';
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

import './crop.css';
import { useDispatch } from "react-redux";


function ImageCropper({ setImgUrl,
                        setFinalFile, 
                        imageUrl,  
                        setSelectedFile,
                        dispatchNewFile,
                        bool}){

    //define dispatch
    const dispatch = useDispatch();
    //zoom useState needed for cropper fn
    const [zoom, setZoom] = useState(1);
    //crop location needed for cropper fn
    const [crop, setCrop] = useState({x:0, y:0});
    //cropped pixels needed for cropper function
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    //changes crop as field and image change locations
    const onCropChange=(crop)=>{
        setCrop(crop);
    }
    //change zoom
    const onZoomChange = (zoom) => {
        setZoom(zoom);
    }
    //when crop pauses set new pixel area
    const onCropComplete = (croppedArea, croppedAreaPixels)=>{
        setCroppedAreaPixels(croppedAreaPixels);
    }
    //npm install node-fetch
    //onCrop function from documentation
    const onCrop = async()=>{  //call imagecroper fn to create file
        const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
        // console.log('croppedImageUrl return on Crop fn:', croppedBlob);
        //set the final file for the dispatch
        setFinalFile(croppedBlob);
        //added the url creation for conditional render image preview to this function
        setImgUrl(URL.createObjectURL(croppedBlob));
        //setSelected file to null to close cropper
        setSelectedFile(null);

        //conditional edit dispatch for edit view. Boolean passed in props
        //when this cropper is used in the edit page update redux here, on new post no bool is passed so this dispatch isnt called
        if(bool===true){dispatch({
            type: 'UPDATE_EDIT_POST',
            payload: {picture: croppedBlob}
        })}
        // const blobFile=new Blob([croppedImageUrl], {type:'image/jpg'});
        
        // console.log('blobFile result', blobFile);
        // const blob = await (await fetch(croppedImageUrl).blob());
        // const file = new File([blob], 'fileName.jpg', {type:"image/jpeg", lastModified:new Date()})
        // console.log('file result after crop:', file);
        // setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
    }

    return(
        <div>
            <div className='backdrop'></div>
            <div className="crop-container">
                <Cropper 
                    image={imageUrl} 
                    zoom={zoom}
                    aspect={9/9}
                    crop={crop} 
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className='controls'>
                <div className="controls-upper-area">
                    <input 
                    type='range' 
                    min={1} 
                    max={3} 
                    step={0.1} 
                    value={zoom}
                    onInput={(evt)=>onZoomChange(evt.target.value)}
                    className='slider'></input>
                </div>
                <div className="button-area">
                    <button className='cropBtn' onClick={onCrop}>Crop</button>
                </div>
            </div>
        </div>
    )

}

export default ImageCropper;