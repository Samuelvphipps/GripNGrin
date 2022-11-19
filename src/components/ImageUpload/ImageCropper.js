import React from "react";
import { useState, useEffect } from 'react';
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

import './crop.css';


function ImageCropper({ setImgUrl,
                        setFinalFile, 
                        imageUrl,  
                        setSelectedFile}){



    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({x:0, y:0});
   ;
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange=(crop)=>{
        setCrop(crop);
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    }

    const onCropComplete = (croppedArea, croppedAreaPixels)=>{
        setCroppedAreaPixels(croppedAreaPixels);
    }
    //npm install node-fetch
    const onCrop = async()=>{
        const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
        console.log('croppedImageUrl return on Crop fn:', croppedBlob);
        setFinalFile(croppedBlob);
        setImgUrl(URL.createObjectURL(croppedBlob));
        setSelectedFile(null);
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
                    <button onClick={onCrop}>Crop</button>
                </div>
            </div>
        </div>
    )

}

export default ImageCropper;